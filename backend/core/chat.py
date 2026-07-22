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

Use the previous conversation if it helps answer the current question.

Conversation History:
{history}

Current Question:
{question}

Answer:
""")

parser = StrOutputParser()

chain = prompt | llm | parser

def chat(question: str):
    print("✅ chat.py called")

    history = build_context(limit=10)
    response = chain.invoke(
        {
            "history": history,
            "question": question
        }
    )
    add_message("user",question)
    add_message("assistant",response)

    return response