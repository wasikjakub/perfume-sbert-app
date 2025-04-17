from flask import Flask, jsonify, request, render_template
from backend.routes import api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.register_blueprint(api)

if __name__ == '__main__':
    app.run(debug=True)