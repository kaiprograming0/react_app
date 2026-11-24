
from flask import Blueprint, request, jsonify
from chat_service.chat_service import chat_with_knowledge_base

chat_bp = Blueprint("chat", __name__)


@chat_bp.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()

    question = data.get("question", "").strip()

    if not question:
        return jsonify({
            "error": "質問を入力してください。"
        }), 400

    try:
        answer = chat_with_knowledge_base(question)

        return jsonify({
            "answer": answer
        }), 200

    except Exception as e:
        import traceback

        traceback.print_exc()

        return jsonify({
            "error": "回答生成に失敗しました。",
            "details": str(e)
        }), 500