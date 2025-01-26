import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
}

interface ChatContextType {
  isChatOpen: boolean;
  toggleChat: () => void;
  messages: Message[];
  addMessage: (message: Message) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const toggleChat = () => setIsChatOpen((prev) => !prev);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <ChatContext.Provider value={{ isChatOpen, toggleChat, messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
