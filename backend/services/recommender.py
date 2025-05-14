used_recommendations_cache = {}
import re
import numpy as np
from sentence_transformers import SentenceTransformer, util
from sklearn.preprocessing import MinMaxScaler
from rapidfuzz import fuzz, process

class PerfumeRecommender:
    def __init__(self, df, alpha=0.7):
        self.df = df.copy()
        # Drop rows where Name is empty or null
        self.df = self.df[self.df['Name'].fillna('').str.strip() != '']
        self.alpha = alpha
        self.model = SentenceTransformer('D:/semestr_10/laboratorium/perfume-recommendation-system/backend/recommend_models/transformer_model')
        self.embeddings = np.load('D:/semestr_10/laboratorium/perfume-recommendation-system/backend/recommend_models/embeddings.npy')
        self.scaler = MinMaxScaler()
        self.matched_accords = set()
        self.used_recommendations = set()

    def extract_text_features(self):
        self.df['text_features'] = (
            self.df['Description'].fillna('') + ' ' +
            self.df['Accords'].fillna('') + ' ' +
            self.df['Designer'].fillna('') + ' ' +
            self.df['TopNotes'].fillna('') + ' ' +
            self.df['MiddleNotes'].fillna('') + ' ' +
            self.df['BaseNotes'].fillna('')
        )

    def compute_similarity(self, prompt):        
        user_embedding = self.model.encode(prompt, convert_to_tensor=True)
        cos_scores = util.cos_sim(user_embedding, self.embeddings).cpu().numpy().flatten()
        self.df['similarity'] = cos_scores

    def match_accords(self, prompt, threshold=80):
        unique_accords = set()
        for row in self.df['Accords'].dropna():
            matches = re.findall(r'([\w\s\-]+)\s*\(\d', row)
            unique_accords.update(name.strip() for name in matches)

        unique_accords_list = list(unique_accords)
        prompt_words = re.findall(r'\b\w+\b', prompt.lower())

        for word in prompt_words:
            match = process.extractOne(word, unique_accords_list, scorer=fuzz.partial_ratio)
            if match and match[1] >= threshold:
                self.matched_accords.add(match[0])

    def extract_accord_scores(self):
        def extract_scores(accords_string):
            scores = {}
            for match in self.matched_accords:
                pattern = re.compile(rf'{re.escape(match)}\s*\(([\d\.]+)%\)', re.IGNORECASE)
                result = pattern.search(accords_string)
                if result:
                    scores[match] = float(result.group(1))
            return scores

        self.df['matched_accord_scores'] = self.df['Accords'].apply(lambda x: extract_scores(str(x)))
        self.df['accord_match_score'] = self.df['matched_accord_scores'].apply(lambda d: sum(d.values()) if d else 0)

    def compute_final_scores(self):
        self.df['similarity_norm'] = self.scaler.fit_transform(self.df[['similarity']])
        self.df['accord_score_norm'] = self.scaler.fit_transform(self.df[['accord_match_score']])
        self.df['final_score'] = self.alpha * self.df['similarity_norm'] + (1 - self.alpha) * self.df['accord_score_norm']

    def get_top_recommendations(self, prompt, top_n=5):
        used = used_recommendations_cache.get(prompt, set())
        top = self.df[~self.df['Name'].isin(used)] \
            .sort_values(by='final_score', ascending=False) \
            .head(top_n)

        new_recommendations = top['Name'].tolist()
        used.update(new_recommendations)
        used_recommendations_cache[prompt] = used

        return top[['Name', 'Designer', 'Description', 'Accords', 'TopNotes', 'MiddleNotes', 'BaseNotes',
                    'similarity', 'accord_match_score', 'final_score', 'URL']].to_dict(orient='records')

    def recommend(self, prompt):
        self.extract_text_features()
        self.compute_similarity(prompt)
        self.match_accords(prompt)
        self.extract_accord_scores()
        self.compute_final_scores()
        return self.get_top_recommendations(prompt)