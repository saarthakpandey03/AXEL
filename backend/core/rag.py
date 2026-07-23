from sentence_transformers import SentenceTransformer
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama import OllamaLLM
from langchain_core.output_parsers import StrOutputParser

from backend.database.vectorDB import create_vector_db,search_all
from backend.services.chunking import create_chunks
from backend.core.session import get_loaded_collections

from backend.memory.conversation import (
    add_message,
    build_context
)
# Global Models
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

llm = OllamaLLM(model="llama3")

prompt = ChatPromptTemplate.from_template("""
You are AXEL, an intelligent AI assistant.

Use the given context to answer the question.
                                          
Use the retrieved context to answer the question.

Conversation History:
{history}

Context:
{context}

Question:
{question}

Instructions:
- Answer the question in your own words.
- Do NOT copy the context.
- Keep the answer short (3-6 lines).
- If the answer is not available in the context, reply only:
"I don't know."

Answer:
""")
parser = StrOutputParser()

chain = prompt | llm | parser


def index_document(text: str,collection_name: str,session_id: str):
    """
    Converts any text into a searchable knowledge base.

    Input:
        Plain Text

    Output:
        Stores embeddings inside ChromaDB
    """

    chunks = create_chunks(text)

    create_vector_db(
        chunks=chunks,
        model=embedding_model,
        collection_name=collection_name,
        session_id=session_id
    )


def ask_question(session_id:str, question: str):

    loaded_collections = get_loaded_collections(session_id)

    history = build_context(session_id)

    if not loaded_collections:
        return "No Knowledge Source loaded"
        
    context = search_all(
        query=question,
        model=embedding_model,
        collections = loaded_collections,
        session_id=session_id
    )

    if not context:
        return "I don't know."
    
    response = chain.invoke(
        {
            "history": history,
            "context": context,
            "question": question
        }
    )

    add_message(session_id,"user",question)
    add_message(session_id,"assistant",response)

    return response

