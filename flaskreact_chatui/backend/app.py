"""Initialize and run the Flask backend API.

Execution:
1. Start the Flask server:
   python app.py

2. Access the health check endpoint:
   http://127.0.0.1:5000/

3. Chat API endpoint:
   POST http://127.0.0.1:5000/api/chat
"""

from flask import Flask
from flask_cors import CORS
from routes.chat import chat_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(chat_bp)


@app.route("/", methods=["GET"])
def home():
    return "Flask API is running!"


if __name__ == "__main__":
    app.run(debug=True)