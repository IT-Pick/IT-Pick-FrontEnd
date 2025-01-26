import React from 'react';
import { useChat } from '../../context/ChatContext';
import { MessageCircle } from '@images/etc/ico_write.svg'
const ChatButton = () => {
  const { toggleChat } = useChat();

  return (
    <button
      onClick={toggleChat}
      className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

export default ChatButton;
