used_recommendations_cache = {}

import re
import numpy as np
import os
import torch

from backend.services.constants import EXCLUDE_KEYWORDS, INCLUDE_KEYWORDS, STOP_WORDS
from sentence_transformers import SentenceTransformer, util
from sklearn.preprocessing import MinMaxScaler
from rapidfuzz import fuzz, process

current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, '../recommend_models/transformer_model')
embeddings_path = os.path.join(current_dir, '../recommend_models/embeddings.npy')


class PerfumeRecommender:
    def __init__(self, df, alpha=0.7):
        self.df = df[df['Name'].fillna('').str.strip() != ''].copy()
        self.alpha = alpha
        self.model = SentenceTransformer(model_path)
        self.embeddings = torch.tensor(np.load(embeddings_path))
        self.scaler = MinMaxScaler()
        self.used_recommendations = set()
        self.include_prompt = ""
        self.exclude_prompt = ""
        self.device = 'cuda' if torch.cuda.is_available() else 'cpu'
        self.embeddings = self.embeddings.to(self.device)
        self._extract_text_features()
        self._unique_accords_list = self._get_unique_accords()

    def _extract_text_features(self):
        fields = ['Description', 'Accords', 'Designer', 'TopNotes', 'MiddleNotes', 'BaseNotes']
        self.df['text_features'] = self.df[fields].fillna('').agg(' '.join, axis=1)

    def _split_prompt_by_keywords(self, prompt):
        prompt_lower = prompt.lower()
        keywords = {word: 'include' for word in INCLUDE_KEYWORDS}
        keywords.update({word: 'exclude' for word in EXCLUDE_KEYWORDS})
        tokens = re.findall(r'\b\w+\b|,', prompt_lower)
        included, excluded = set(), set()
        current_mode = None

        for token in tokens:
            if token in keywords:
                current_mode = keywords[token]
            elif token != ',':
                if current_mode == 'include':
                    included.add(token)
                elif current_mode == 'exclude':
                    excluded.add(token)
                else:
                    included.add(token)

        return (
            {word for word in included if word not in STOP_WORDS},
            {word for word in excluded if word not in STOP_WORDS}
        )

    def _create_prompts(self, include_words, exclude_words):
        return ' '.join(include_words), ' '.join(exclude_words)

    def _get_unique_accords(self):
        accords = set()
        for row in self.df['Accords'].dropna():
            accords.update(re.findall(r'([\w\s\-]+)\s*\(\d', row))
        return list({a.strip() for a in accords})

    def _match_accords(self, prompt, threshold=80):
        matched = set()
        for word in re.findall(r'\b\w+\b', prompt.lower()):
            match, score, _ = process.extractOne(word, self._unique_accords_list, scorer=fuzz.partial_ratio)
            if score >= threshold:
                matched.add(match)
        return matched

    def _extract_accord_scores(self, include, exclude):
        def extract_scores(accords_string, matched_accords):
            scores = {}
            for match in matched_accords:
                pattern = re.compile(rf'{re.escape(match)}\s*\(([\d\.]+)%\)', re.IGNORECASE)
                result = pattern.search(accords_string)
                if result:
                    scores[match] = float(result.group(1))
            return scores

        self.include_prompt, self.exclude_prompt = self._create_prompts(include, exclude)
        include_matched = self._match_accords(self.include_prompt)
        exclude_matched = self._match_accords(self.exclude_prompt)

        self.df['accord_score_include'] = self.df['Accords'].fillna('').apply(
            lambda x: sum(extract_scores(x, include_matched).values())
        )
        self.df['accord_score_exclude'] = self.df['Accords'].fillna('').apply(
            lambda x: sum(extract_scores(x, exclude_matched).values())
        )

    def _compute_similarity(self):
        for label, prompt in [('like', self.include_prompt), ('exclude', self.exclude_prompt)]:
            user_embedding = self.model.encode(prompt, convert_to_tensor=True).to(self.device)
            cos_scores = util.cos_sim(user_embedding, self.embeddings).cpu().numpy().flatten()
            self.df[f'similarity_{label}'] = cos_scores

    def _compute_final_scores(self):
        self.df['similarity_norm_like'] = self.scaler.fit_transform(self.df[['similarity_like']])
        self.df['similarity_norm_dislike'] = self.scaler.fit_transform(self.df[['similarity_exclude']])
        self.df['accord_score_norm_like'] = self.scaler.fit_transform(self.df[['accord_score_include']])
        self.df['accord_score_norm_dislike'] = self.scaler.fit_transform(self.df[['accord_score_exclude']])

        self.df['final_score_like'] = (
            self.alpha * self.df['similarity_norm_like'] +
            (1 - self.alpha) * self.df['accord_score_norm_like']
        )
        self.df['final_score_dislike'] = (
            self.alpha * self.df['similarity_norm_dislike'] +
            (1 - self.alpha) * self.df['accord_score_norm_dislike']
        )
        self.df['final_score'] = self.df['final_score_like'] - self.df['final_score_dislike']

    def _get_top_recommendations(self, prompt, top_n=5):
        used = used_recommendations_cache.get(prompt, set())
        top = self.df[~self.df['Name'].isin(used)].sort_values(by='final_score', ascending=False).head(top_n)
        new_recommendations = top['Name'].tolist()
        used.update(new_recommendations)
        used_recommendations_cache[prompt] = used

        return top[[
            'Name', 'Designer', 'Description', 'Accords', 'TopNotes',
            'MiddleNotes', 'BaseNotes', 'final_score', 'URL'
        ]].to_dict(orient='records')

    def recommend(self, prompt):
        include, exclude = self._split_prompt_by_keywords(prompt)
        self._extract_accord_scores(include, exclude)
        self._compute_similarity()
        self._compute_final_scores()
        return self._get_top_recommendations(prompt)
