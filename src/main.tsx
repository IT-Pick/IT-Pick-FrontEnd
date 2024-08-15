import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ParticipatedDebatesPage from './pages/HistoryPage/ParticipatedDebate';
import DebatePage from './pages/HistoryPage/Debate';
import RankingPage from './pages/RankingPage/RankingPage';
import PwdChangePage from './pages/ChangeInfoPage/PwdChangePage';
import MyPage from './pages/MyPage/MyPage';
import ProfileEditPage from './pages/ChangeInfoPage/ProfileEditPage';
import NewSetProfile from './pages/SetProfile/NewSetProfile';
import AgreementPage from './pages/AgreementPage/AgreementPage';
import NoDataPage from './components/NoDataPage';
import KeywordPage from './pages/KeywordPage/KeywordPage';
import SearchPage from './pages/SearchPage/SearchPage';
import ErrorPage from './pages/ErrorPage/404ErrorPage';
import MyAlarm from './pages/MyAlarmPage/MyAlarmPage';
import UploadedPage from './pages/UploadedVotePage/UploadedPage';
import DebateCreatePage from './pages/WritePostPage/DebateCreatePage';
import InterestPage from './pages/InterestPage/InterestPage';
import { SignUpProvider } from './context/SignUpContext';
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute 컴포넌트 임포트

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <SignUpProvider>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/debate" element={<DebatePage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path='/agreement' element={<AgreementPage />} />
        <Route path='/keyword' element={<KeywordPage/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path='/uploaded-debate' element={<UploadedPage/>} />
        <Route path='*' element={<ErrorPage />} />

        {/* 보호된 페이지 */}
        <Route path="/debate" element={<PrivateRoute element={<DebatePage />} />} />
        <Route path="/new-set-profile" element={<PrivateRoute element={<NewSetProfile />} />} />
        <Route path="/participated-debates" element={<PrivateRoute element={<ParticipatedDebatesPage />} />} />
        <Route path="/change-password" element={<PrivateRoute element={<PwdChangePage />} />} />
        <Route path="/my-page" element={<PrivateRoute element={<MyPage />} />} />
        <Route path="/profile-edit" element={<PrivateRoute element={<ProfileEditPage />} />} />
        <Route path='/debate-no-data' element={<PrivateRoute element={<NoDataPage id={1}/>} />} />
        <Route path='/participated-debate-no-data' element={<PrivateRoute element={<NoDataPage id={2}/>} />} />
        <Route path='/notification-no-data' element={<PrivateRoute element={<NoDataPage id={3}/>} />} />
        <Route path='/my-alarm' element={<PrivateRoute element={<MyAlarm />} />} />
        <Route path="/create" element={<PrivateRoute element={<DebateCreatePage />} />} />
        <Route path='/interest' element={<PrivateRoute element={<InterestPage/>} />} />
      </Routes>
\    </BrowserRouter>
  </SignUpProvider>
    
  // </React.StrictMode>
);