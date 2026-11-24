"""
Interact with Amazon Bedrock Knowledge Bases to retrieve relevant information and generate answers.

Main functions:
1. Create a Bedrock Agent Runtime client using AWS credentials and configuration.
2. Send user questions to the managed Knowledge Base.
3. Retrieve and generate answers using Bedrock's managed retrieval and generation.
4. Collect streaming response events and return the final answer.
"""

import boto3
import config


def create_bedrock_client():
    """
    Create a Bedrock Agent Runtime client.
    """

    session = boto3.Session(
        profile_name=config.AWS_PROFILE,
        region_name=config.AWS_REGION
    )

    return session.client("bedrock-agent-runtime")


def chat_with_knowledge_base(question):
    """
    Ask a question using a managed Knowledge Base.
    Bedrock handles retrieval and answer generation.
    """

    client = create_bedrock_client()

    response = client.agentic_retrieve_stream(
        messages=[
            {
                "role": "user",
                "content": {
                    "text": question
                }
            }
        ],
        retrievers=[
            {
                "configuration": {
                    "knowledgeBase": {
                        "knowledgeBaseId": config.BEDROCK_KB_ID
                    }
                }
            }
        ],
        agenticRetrieveConfiguration={
            "foundationModelType": "MANAGED"
        },
        generateResponse=True
    )

    # Collect the generated answer
    answer_parts = []
    final_answer = None

    for event in response["stream"]:

        if "responseEvent" in event:
            answer_parts.append(
                event["responseEvent"]["text"]
            )

        elif "result" in event:
            final_answer = (
                event["result"]
                .get("generatedResponse", {})
                .get("answer")
            )

    if final_answer:
        return final_answer

    if answer_parts:
        return "".join(answer_parts)

    raise ValueError("Bedrockから回答を取得できませんでした。")
