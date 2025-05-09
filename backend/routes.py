from flask import Blueprint, request, jsonify
from sqlalchemy import create_engine, text
import pandas as pd
from flask_cors import CORS
from backend.services.recommender import PerfumeRecommender

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

    recommender = PerfumeRecommender(df)
    recommendations = recommender.recommend(user_prompt)

    return jsonify(recommendations)