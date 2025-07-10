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