import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ParticipatedDebates from './pages/HistoryPage/ParticipatedDebate';
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
import InterestEditPage from './pages/ChangeInfoPage/InterestEdit/InterestEditPage';
import { SignUpProvider } from './context/SignUpContext';
import MakeVote from './pages/MakeVote/MakeVote';
import SignUpandGreetingPage from './pages/SignUpandGreetingPage/SignUpandGreeetingPage';
import { KeywordStateProvider } from './context/KeywordStateContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <KeywordStateProvider>
  <SignUpProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new-set-profile" element={<NewSetProfile />} />
        <Route path="/participated-debates" element={<ParticipatedDebates />} />
        <Route path="/debate" element={<DebatePage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/change-password" element={<PwdChangePage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/profile-edit" element={<ProfileEditPage />} />
        <Route path='/agreement' element={<AgreementPage/>} />
        <Route path='/debate-no-data' element={<NoDataPage id={1}/>} />
        <Route path='/participated-debate-no-data' element={<NoDataPage id={2}/>} />
        <Route path='/notification-no-data' element={<NoDataPage id={3}/>} />
        <Route path='/keyword' element={<KeywordPage/>} />
        <Route path='/my-alarm' element={<MyAlarm />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/create" element={<DebateCreatePage />} />
        <Route path='/interest' element={<InterestPage/>} />
        <Route path='/uploaded-debate' element={<UploadedPage/>} />
        <Route path='/interest-edit' element={<InterestEditPage/>} />
        {/* <Route path="/vote-test" element={<VoteComponentTestPage />} /> */}
        <Route path='/make-vote' element={<MakeVote/>} />
        <Route path='/welcome' element={<SignUpandGreetingPage />} />
        {/* <Route path='/debate/details?:debateId' element={<UploadedPage/>} /> */}
        <Route path='/debate/details' element={<UploadedPage />} />

        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </SignUpProvider>
  </KeywordStateProvider>
    
  // </React.StrictMode>
);