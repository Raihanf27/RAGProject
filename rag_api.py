from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import re

from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain.chains import RetrievalQA
from langchain_google_genai import ChatGoogleGenerativeAI

# --- Inisialisasi Flask ---
app = Flask(__name__)
CORS(app)

# --- Konfigurasi API Key Google Gemini ---
API_KEY = ""  # Ganti jika pakai env
genai.configure(api_key=API_KEY)

# --- Fungsi pembersih teks dari PDF ---
def clean_text(text):
    text = text.replace('\n', ' ')  # Hapus newline
    text = re.sub(r'\s+', ' ', text)  # Hilangkan spasi ganda
    return text.strip()

# --- Load dan proses PDF ---
print("📄 Loading PDF dan membuat vectorstore...")

try:
    loader = PyPDFLoader("file.pdf")
    docs = loader.load()

    # Bersihkan setiap halaman
    for doc in docs:
        doc.page_content = clean_text(doc.page_content)

    splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    texts = splitter.split_documents(docs)

    embedding = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
    vectorstore = FAISS.from_documents(texts, embedding)

    # --- Inisialisasi LLM & QA Chain ---
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-pro", google_api_key=API_KEY)
    qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=vectorstore.as_retriever())

except Exception as e:
    print(f"❌ Error saat memuat PDF atau membuat vectorstore: {e}")
    vectorstore = None
    qa_chain = None

# --- Route API ---
@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    question = data.get("question")

    if not question:
        return jsonify({"error": "Pertanyaan tidak boleh kosong."}), 400

    if qa_chain is None:
        return jsonify({"error": "Vectorstore tidak tersedia."}), 500

    try:
        answer = qa_chain.run(question)
        return jsonify({"question": question, "answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- Run app ---
if __name__ == "__main__":
    print("🚀 RAG Flask API running on http://localhost:5000")
    app.run(debug=True)
