from flask import Blueprint, request, jsonify
from sqlalchemy import create_engine, text
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pymysql
import pandas as pd
from flask_cors import CORS
import re
from sentence_transformers import SentenceTransformer, util
from sklearn.preprocessing import MinMaxScaler
from rapidfuzz import fuzz, process

api = Blueprint('api', __name__)
CORS(api)

# Database connection details
username = 'michals2'
password = 'Nv1VZRmuTxRvJn3u'
host = 'mysql.agh.edu.pl'
port = 3306
database = 'michals2'

connection_string = f'mysql+pymysql://{username}:{password}@{host}:{port}/{database}'

engine = create_engine(connection_string)


@api.route('/api/recommend', methods=['POST'])
def recommend_perfumes():
    data = request.get_json()
    user_prompt = data.get("prompt", "").strip()

    if not user_prompt:
        return jsonify({"error": "No prompt provided"}), 400

    query = text("SELECT * FROM Perfumes")
    with engine.connect() as connection:
        result = connection.execute(query)
        perfumes = [dict(row._mapping) for row in result]

    df = pd.DataFrame(perfumes)

    if df.empty or 'Name' not in df.columns:
        return jsonify({"error": "No valid perfume data found"}), 500

    df['text_features'] = (
        df['Description'].fillna('') + ' ' +
        df['Accords'].fillna('') + ' ' +
        df['Designer'].fillna('') + ' ' +
        df['TopNotes'].fillna('') + ' ' +
        df['MiddleNotes'].fillna('') + ' ' +
        df['BaseNotes'].fillna('')
    )

    # Sentence transformer model
    model = SentenceTransformer('all-MiniLM-L6-v2')
    text_features_list = df['text_features'].tolist()
    embeddings = model.encode(text_features_list, convert_to_tensor=True)
    user_embedding = model.encode(user_prompt, convert_to_tensor=True)
    cos_scores = util.cos_sim(user_embedding, embeddings).cpu().numpy().flatten()
    df['similarity'] = cos_scores

    unique_accords = set()
    for row in df['Accords'].dropna():
        matches = re.findall(r'([\w\s\-]+)\s*\(\d', row)
        unique_accords.update(name.strip() for name in matches)

    unique_accords_list = list(unique_accords)
    prompt_words = re.findall(r'\b\w+\b', user_prompt.lower())
    matched_accords = set()
    threshold = 80

    for word in prompt_words:
        match = process.extractOne(word, unique_accords_list, scorer=fuzz.partial_ratio)
        if match and match[1] >= threshold:
            matched_accords.add(match[0])

    def extract_accord_scores(accords_string, matched_accords):
        scores = {}
        for match in matched_accords:
            pattern = re.compile(rf'{re.escape(match)}\s*\(([\d\.]+)%\)', re.IGNORECASE)
            result = pattern.search(accords_string)
            if result:
                scores[match] = float(result.group(1))
        return scores

    df['matched_accord_scores'] = df['Accords'].apply(lambda x: extract_accord_scores(str(x), matched_accords))
    df['accord_match_score'] = df['matched_accord_scores'].apply(lambda d: sum(d.values()) if d else 0)

    scaler = MinMaxScaler()
    df['similarity_norm'] = scaler.fit_transform(df[['similarity']])
    df['accord_score_norm'] = scaler.fit_transform(df[['accord_match_score']])
    alpha = 0.7
    df['final_score'] = alpha * df['similarity_norm'] + (1 - alpha) * df['accord_score_norm']

    top_recommendations = df.sort_values(by='final_score', ascending=False).head(5)
    response_data = top_recommendations[['Name', 'Designer', 'Description', 'Accords', 'TopNotes', 'MiddleNotes', 'BaseNotes', 'similarity', 'accord_match_score', 'final_score']]
    print(top_recommendations[['Name', 'Designer', 'final_score']])
    return jsonify(response_data.to_dict(orient='records'))