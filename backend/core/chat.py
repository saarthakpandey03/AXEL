from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama import OllamaLLM
from langchain_core.output_parsers import StrOutputParser
from backend.memory.conversation import(
    add_message,
    build_context
)


llm = OllamaLLM(model="llama3")

prompt = ChatPromptTemplate.from_template("""
You are AXEL, an intelligent AI assistant.

Use the previous conversation only when it is relevant.
If the current question is unrelated, answer it independently.

Conversation History:
{history}

Current Question:
{question}

Answer:
""")

parser = StrOutputParser()

chain = prompt | llm | parser

def chat(session_id: str, question: str):
    

    history = build_context(session_id, limit=10)
    response = chain.invoke(
        {
            "history": history,
            "question": question
        }
    )
    add_message(session_id, "user", question)
    add_message(session_id, "assistant", response)

    return response