from fastapi import FastAPI,UploadFile, File
from backend.models import VideoRequest, QuestionRequest, WebsiteRequest
from backend.core.rag import index_document, ask_question
from backend.loaders.pdf import load as load_pdf
from backend.loaders.youtube import load as load_yt
from backend.loaders.website import load as load_website
from backend.core.session import set_active_collection
from backend.core.chat import chat
from backend.models import MessageRequest
from backend.core.router import process_message



app = FastAPI(
    title="AXEL"
)


@app.get("/")
def home():
    return {
    "message": "AXEL AI Assistant API Running 🚀"
        }

@app.post("/load-video")
def load_video(data: VideoRequest):
    text = load_yt(data.url)

    index_document(
        text,
        "youtube_data"
                   )
    set_active_collection("youtube_data")

    return{
        "message":"Video Load Successfuly"
    }

@app.post("/ask")
def ask(data: QuestionRequest):
    answer = ask_question(
        data.question)

    return{
        "answer" : answer
    }

@app.post("/load-pdf")
async def upload_pdf(file: UploadFile= File(...)):

    #save pdf
    file_path = f"backend/uploads/{file.filename}"

    with open(file_path, "wb") as f:
        f.write(await file.read())

    #Extract Text
    text = load_pdf(file_path)

    #create Knowledge
    index_document(
        text,
        "pdf_data")
    set_active_collection("pdf_data")

    return{
        "message" : "PDF Indexed Successfully"
    }

@app.post("/load-website")
def load_website_data(data: WebsiteRequest):

    #Extract text from website
    text = load_website(data.url)

    #create Knowledge Base
    index_document(
        text,
        "website_data")
    set_active_collection("website_data")

    return{
        "message": "Website Indexed Successfully"
    }

@app.post("/chat")
def general_chat(data: QuestionRequest):

    answer = chat(data.question)

    return {
        "answer": answer
    }

@app.post("/message")
def message(data: MessageRequest):

    return process_message(data.message)