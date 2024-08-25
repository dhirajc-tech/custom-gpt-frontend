import './App.css';
import msgIcon from "./assets/message.svg";
import plusSvg from "./assets/plus.svg"
import HomeBtn from "./assets/home.svg";
import saveBtn from "./assets/bookmark.svg";
import Pro from "./assets/rocket.svg";
import SendBtn from "./assets/send.svg"
import UserIcon from "./assets/user-icon.png";
import GPTLogo from "./assets/chatgptLogo.svg"
import GitHub from "./assets/github.svg"
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import logo from "./assets/logo.png";
import { IoCall } from "react-icons/io5";
import { sendQueryToOpenAI } from './openAi';
import { useState, useRef, useEffect } from 'react';

const LoadingDots = () => {
  return (
    <div className="loading-dots">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

function App() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const msgsEnd = useRef(null);

  useEffect(() => {
    if (msgsEnd.current) {
      msgsEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const predefinedPrompts = [
    "What is Dhiraj's educational background?",
    "What technical skills does Dhiraj have?",
    "Can you summarize Dhiraj's professional experience?",
    "Which all companies has Dhiraj worked for?",
  ];

  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([...messages, { text, isBot: false }]);
    setIsLoading(true);
    try {
      const res = await sendQueryToOpenAI(text);
      displayMessage(res); // Use displayMessage to handle the bot response
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnter = async (e) => {
    if (e.key === 'Enter') {
      await handleSend();
    }
  }

  const handleClick = async (e) => {
    const text = e.target.value;
    setMessages([...messages, { text, isBot: false }]);
    setIsLoading(true);

    try {
      const res = await sendQueryToOpenAI(text);
      displayMessage(res); // Use displayMessage to handle the bot response
    } finally {
      setIsLoading(false);
    }
  };

  const handlePredefinedPromptClick = async (prompt) => {
    const text = prompt;
    setMessages([...messages, { text, isBot: false }]);
    setIsLoading(true);
    try {
      const res = await sendQueryToOpenAI(text);
      displayMessage(res); // Use displayMessage to handle the bot response
    } finally {
      setIsLoading(false);
    }
  };

  const displayMessage = (text) => {
    const words = text.split(' ');
    let displayText = '';
    let i = 0;

    const interval = setInterval(() => {
      if (i < words.length) {
        displayText += words[i] + ' ';
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          if (updatedMessages[updatedMessages.length - 1]?.isBot) {
            updatedMessages[updatedMessages.length - 1].text = displayText;
          } else {
            updatedMessages.push({ text: displayText, isBot: true });
          }
          return updatedMessages;
        });
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  };

  const formatMessageText = (text) => {
    const lines = text.split('\n');
    return (
      <div>
        {lines.map((line, index) => {
          if (line.match(/^\d+\./)) {
            return <li key={index}>{line}</li>;
          }
          return <p key={index}>{line}</p>;
        })}
      </div>
    );
  };

  const openMultipleLinks = () => {
    window.open('https://digitalcommons.harrisburgu.edu/do/search/?q=%20Dhiraj%20Choithramani&start=0&context=10415227&facet=', '_blank');
    window.open('https://digitalcommons.harrisburgu.edu/cgi/preview.cgi?article=1040&context=dandt', '_blank');
  };

  return (
    <div className="App">
      <div className='sidebar'>
        <div className='top-navigation'>
          <div className='upper-side-top'>
            <img src={logo} alt='Logo' className='logo'></img>
            <span className='brand'>Dhiraj's Personalized GPT</span>
          </div>
          <button className='mid-btn' onClick={() => window.location.reload()}>
            <img src={plusSvg} alt='' className='add-btn'></img>New Chat
          </button>
          <div className='upper-side-bottom'>
            <button disabled={isLoading} className='query' onClick={handleClick} value={"How did Dhiraj perform in his Master's in Computer Science program?"}>
              <img src={msgIcon} alt='' />
              How did Dhiraj perform in his Master's in Computer Science program?
            </button>
            <button disabled={isLoading} className='query' onClick={handleClick} value={"Does Dhiraj knows UI Testing?"}>
              <img src={msgIcon} alt='' />
              Does Dhiraj knows UI Testing?
            </button>
            <button disabled={isLoading} className='query' onClick={handleClick} value={"Can you summarize Dhiraj Choithramani's Sam's Club experience?"}>
              <img src={msgIcon} alt='' />
              Can you summarize Dhiraj Choithramani's Sam's Club experience?
            </button>
            <button disabled={isLoading} className='query' onClick={handleClick} value={"Apart from React what other Frameworks/Programming Languages is Dhiraj Choithramani good in?"}>
              <img src={msgIcon} alt='' />
              Apart from React what other Frameworks/Programming Languages is Dhiraj good in?
            </button>
          </div>
        </div>
        <div className='bottom-navigation'>
          <div className='list-items'>
            <button onClick={openMultipleLinks} className='download-btn'>
              <img src={HomeBtn} className='list-items-image' alt="document icon" />
              View My Publications?
            </button>
          </div>
          <div className='list-items'>
            <a href="Dhiraj_Frontend-Dev_4+YOE.pdf" download className='download-btn'>
              <img src={saveBtn} className='list-items-image' alt='Download Resume' />
              Download My Resume!
            </a>
          </div>
          <div className='list-items'>
            <img src={Pro} className='list-items-image' alt="calendar icon" />
            <a href="https://calendly.com/chat-dhiraj" target="_blank" rel="noopener noreferrer" className="list-item-link">
              Schedule a 1:1 Meeting with me?
            </a>
          </div>
          <div className='list-items'>
            <img src={GitHub} className='list-items-image' alt="calendar icon" />
            <a href="https://github.com/dhirajc-tech" target="_blank" rel="noopener noreferrer" className="list-item-link">
              My Github
            </a>
          </div>
        </div>
      </div>

      <div className='main'>
        {messages.length === 0 ? (
          <div className="landing-page">
            <img src={logo} alt="Logo" className="logo-large" />
            <div className="header">Dhiraj Choithramani's - Personalized ChatBot Assistant</div>
            <div className="contact-icons">
              <a href="https://www.linkedin.com/in/dhirajdeepak/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin /> LinkedIn
              </a>
              <a href="tel:+15513591079">
                <IoCall /> (+1) 551-359-1079
              </a>
              <a href="mailto:chat@dhiraj.tech">
                <FaEnvelope /> chat@dhiraj.tech
              </a>
            </div>
            <div className="additional-text">
              Feel Free to ask any questions about Dhiraj's Personal / Professional / Academic background.
            </div>
            <div className="prompts">
              {predefinedPrompts.map((prompt, index) => (
                <button key={index} className="prompt-button" onClick={() => handlePredefinedPromptClick(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className='chats'>
            {messages.map((message, i) =>
              <div key={i} className={message.isBot ? 'chat bot' : 'chat'}>
                <img className='chat-image' src={message.isBot ? GPTLogo : UserIcon} alt="" />
                <p className='bot-query'>{formatMessageText(message.text)}</p>
              </div>
            )}
            {isLoading && (
              <div className="chat bot">
                <img className='chat-image' src={GPTLogo} alt="" />
                <div className="loading-dots-container"><LoadingDots /></div>
              </div>
            )}
            <div ref={msgsEnd}></div>
          </div>
        )}

        <div className='message-input'>
          <div className='input-footer'>
            <input placeholder="Message Chat bot - Dhiraj's Experience / Expertise / Education" value={input} disabled={isLoading} onKeyDown={handleEnter} onChange={(e) => { setInput(e.target.value) }} />
            <button className='send-btn' onClick={handleSend}><img src={SendBtn} alt="send button" /></button>
          </div>
          <p className='footer'>Personalized GPT may produce incorrect results, please refer to the updated Resume provided.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
