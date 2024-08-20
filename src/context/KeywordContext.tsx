// context/KeywordContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface KeywordContextType {
  keywordId: number | null;
  keywordName: string | null;
  setKeyword: (id: number, name: string) => void;
}

const KeywordContext = createContext<KeywordContextType | undefined>(undefined);

export const KeywordProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [keywordId, setKeywordId] = useState<number | null>(null);
  const [keywordName, setKeywordName] = useState<string | null>(null);

  const setKeyword = (id: number, name: string) => {
    setKeywordId(id);
    setKeywordName(name);
  };

  return (
    <KeywordContext.Provider value={{ keywordId, keywordName, setKeyword }}>
      {children}
    </KeywordContext.Provider>
  );
};

export const useKeyword = () => {
  const context = useContext(KeywordContext);
  if (!context) {
    throw new Error('useKeyword must be used within a KeywordProvider');
  }
  return context;
};
