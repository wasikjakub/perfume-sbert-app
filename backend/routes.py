from flask import Blueprint, request, jsonify
from sqlalchemy import create_engine, text
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pymysql
import pandas as pd
from flask_cors import CORS

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

    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(df['text_features'])

    user_vec = vectorizer.transform([user_prompt])

    cos_similarities = cosine_similarity(user_vec, tfidf_matrix).flatten()

    top_indices = cos_similarities.argsort()[::-1][:5]
    top_perfumes = df.iloc[top_indices].copy()
    top_perfumes['similarity'] = cos_similarities[top_indices]

    recommendations = top_perfumes[top_perfumes['Name'].notna()]
    return jsonify(recommendations.to_dict(orient='records'))