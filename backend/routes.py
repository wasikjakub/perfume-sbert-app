from flask import Blueprint, jsonify

api = Blueprint('api', __name__)

@api.route('/api/perfumes', methods=['GET'])
def get_perfumes():
    # Implement logic to fetch and return perfume data
    perfumes = [...]  # Retrieve perfumes from database or other source
    return jsonify(perfumes)