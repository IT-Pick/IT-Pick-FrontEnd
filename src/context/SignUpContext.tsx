import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SignUpContextProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
  birthDate: string;
  setBirthDate: (birthDate: string) => void;
  likedTopics: string[];
  setLikedTopics: (likedTopics: string[]) => void;
}

const SignUpContext = createContext<SignUpContextProps | undefined>(undefined);

export const SignUpProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [likedTopics, setLikedTopics] = useState<string[]>([]);

  return (
    <SignUpContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        nickname,
        setNickname,
        birthDate,
        setBirthDate,
        likedTopics,
        setLikedTopics,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUpContext = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error('useSignUpContext must be used within a SignUpProvider');
  }
  return context;
};
