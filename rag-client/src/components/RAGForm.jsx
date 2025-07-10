import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './RAGForm.css';

const RAGForm = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentBotText, setCurrentBotText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, currentBotText]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setCurrentBotText('');

    try {
      const response = await axios.post('http://localhost:5000/ask', { question: input });
      const answer = response.data.answer;

      // Typing effect
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < answer.length) {
          setCurrentBotText((prev) => prev + answer[index]);
          index++;
        } else {
          clearInterval(typingInterval);
          setMessages((prev) => [...prev, { sender: 'bot', text: answer }]);
          setCurrentBotText('');
          setIsTyping(false);
        }
      }, 20); // 20 ms per karakter
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Terjadi kesalahan saat mengambil jawaban.' },
      ]);
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}

        {/* Tampilkan animasi typing sementara */}
        {isTyping && (
          <div className="chat-bubble bot">
            {currentBotText}
            <span className="cursor">▌</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pertanyaanmu..."
        />
        <button type="submit" disabled={isTyping}>Kirim</button>
      </form>
    </div>
  );
};

export default RAGForm;
