from flask import Blueprint, jsonify
from sqlalchemy import create_engine, text
import pymysql

api = Blueprint('api', __name__)

# Database connection details
username = 'michals2'
password = 'Nv1VZRmuTxRvJn3u'
host = 'mysql.agh.edu.pl'
port = 3306
database = 'michals2'

connection_string = f'mysql+pymysql://{username}:{password}@{host}:{port}/{database}'

engine = create_engine(connection_string)

@api.route('/api/perfumes', methods=['GET'])
def get_perfumes():

    query = text("SELECT * FROM Perfumes")  
    with engine.connect() as connection:
        result = connection.execute(query)
        perfumes = [dict(row._mapping) for row in result]
    
    print(perfumes) 

    return jsonify(perfumes)