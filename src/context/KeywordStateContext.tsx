import React, { createContext, useContext, useState, ReactNode } from 'react';

interface KeywordStateContextProps {
  selectedKeyword: string | null;
  setSelectedKeyword: (keyword: string) => void;
}

const KeywordStateContext = createContext<KeywordStateContextProps | undefined>(undefined);

export const KeywordStateProvider: React.FC<{ children: ReactNode }>  = ({ children }) => {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  return (
    <KeywordStateContext.Provider value={{ selectedKeyword, setSelectedKeyword }}>
      {children}
    </KeywordStateContext.Provider>
  );
};

export const useKeywordState = () => {
  const context = useContext(KeywordStateContext);
  if (!context) {
    throw new Error('useKeywordState must be used within a KeywordStateProvider');
  }
  return context;
};
