from fastapi import FastAPI
from pydantic import BaseModel
from rag_engine import ask_question

app = FastAPI()

class Question(BaseModel):
    query: str

@app.post("/ask")
def ask(data: Question):
    try:
        answer = ask_question(data.query)
        return {"question": data.query, "answer": answer}
    except Exception as e:
        return {"error": str(e)}
