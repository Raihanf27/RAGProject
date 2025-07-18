import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './RAGForm.css';

const removeMarkdown = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/#+\s*(.*)/g, '$1');
};

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
      const rawAnswer = response.data.answer;
      const answer = removeMarkdown(rawAnswer);

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
      }, 20);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Terjadi kesalahan saat mengambil jawaban.' },
      ]);
      setIsTyping(false);
    }
  };

  return (
    <div className="rag-chat-container">
      <h2 className="rag-title">🧠 Ask Your Document</h2>

      <div className="rag-chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`rag-chat-bubble ${msg.sender === 'user' ? 'rag-user' : 'rag-bot'}`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="rag-chat-bubble rag-bot typing">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="rag-chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          disabled={isTyping}
        />
        <button type="submit" disabled={isTyping}>Send</button>
      </form>
    </div>
  );
};

export default RAGForm;
