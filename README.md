# 🤖 PDF Chatbot RAG dengan Gemini API

Proyek ini merupakan implementasi **RAG (Retrieval-Augmented Generation)** yang memungkinkan pengguna bertanya jawab dengan konten **dokumen PDF (misalnya skripsi)** melalui antarmuka chatbot berbasis web. Sistem menggunakan **Google Gemini API** sebagai model LLM dan **Langchain** untuk pengelolaan dokumen serta pencarian informasi.

---

## 🧠 Fitur Utama

- 🔍 Chatbot bisa menjawab pertanyaan berdasarkan isi file PDF.
- 📄 Upload dan proses dokumen PDF (contoh: skripsi).
- 🧠 RAG (Retrieval-Augmented Generation) dengan Langchain + FAISS + Embedding.
- 🤖 Menggunakan model LLM Gemini 1.5 Pro / 2.5 Flash dari Google.
- 💬 Tampilan antarmuka mirip chat modern (dengan efek mengetik perlahan).
- 🌐 API backend dengan Flask.
- ⚛️ Frontend modern menggunakan ReactJS.

---

## 🗂️ Struktur Proyek
```bash
├── backend/ # Backend Flask API + Langchain + Gemini
│ ├── app.py # API utama
│ ├── rag_engine.py # Komponen RAG (loader, splitter, embedding, vectorstore)
│ ├── requirements.txt
│ └── .env # Tempat menyimpan Google API Key
├── rag-client/ # Frontend React
│ ├── public/
│ ├── src/
│ │ ├── App.js
│ │ └── components/
│ │ └── RAGForm.jsx
│ └── package.json
└── README.md # Dokumentasi proyek
```

---

## ⚙️ Instalasi & Konfigurasi

**1. Jalankan Backend:**

```bash
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
```
**Buat file .env:**
GOOGLE_API_KEY=masukkan_api_key_gemini_anda
MODEL_NAME=gemini-1.5-pro
EMBEDDING_MODEL=text-embedding-004

**Jalankan API:**
```bash 
python rag_api.py
```

**2. Jalankan Frontend:**
cd rag-client
npm install
npm start

Frontend akan berjalan di: http://localhost:3000
Backend Flask berjalan di: http://localhost:5000

🔍 Contoh Pertanyaan
Setelah PDF dimuat dan chatbot siap:

- Apa isi Bab 1 dari skripsi ini?
- Apa tujuan dari penelitian ini?
- Metode apa yang digunakan dalam penelitian?
- Siapa dosen pembimbing dalam dokumen ini?
