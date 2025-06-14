import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ChatbotIcon from "./components/ChatBot/Chatbotlcon";
import ChatForm from "./components/ChatBot/ChatForm";
import ChatMessage from "./components/ChatBot/ChatMessage";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import CarList from "./components/CarList/CarList";
import AppStoreBanner from "./components/AppStoreBanner/AppStoreBanner";
import Testimonial from "./components/Testimonial/Testimonial";
import Footer from "./components/Footer/Footer";

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

const App = () => {
  const [chatHistory, setChatHistory] = useState([
    { id: makeId(), role: "model", text: "How can I help you today?" },
  ]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const root = document.documentElement;
  const generateBotResponse = async (history) => {
    setChatHistory((prev) => [
      ...prev.filter((m) => m.text !== "Thinking..."),
      { id: makeId(), role: "model", text: "Thinking..." },
    ]);
    const payload = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));
    try {
      const res = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: payload }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || res.statusText);
      const reply = data.candidates[0].content.parts[0].text.trim();
      setTimeout(() => {
        setChatHistory((h) =>
          h
            .filter((m) => m.text !== "Thinking...")
            .concat({ id: makeId(), role: "model", text: reply })
        );
      }, 600);
    } catch {
      setChatHistory((h) =>
        h
          .filter((m) => m.text !== "Thinking...")
          .concat({ id: makeId(), role: "model", text: "Error." })
      );
    }
  };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      <div className="dev container">
        <div className="chatbot-popup">
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className="logo-text ">Chatbot</h2>
            </div>
            <button className="material-symbols-outlined">
              keyboard_arrow_down
            </button>
          </div>
          <div className="chat-body">
            {chatHistory.map((msg) => (
              <ChatMessage key={msg.id} chat={msg} />
            ))}
          </div>
          <div className="chat-footer">
            <ChatForm
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
            />
          </div>
        </div>
      </div>
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero theme={theme} />
      <About />
      <Services />
      <CarList />
      <Testimonial />
      <AppStoreBanner />
      <Footer />
    </div>
  );
};

export default App;
