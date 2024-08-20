import React,{ useEffect, useState } from 'react';
import Header from "./component/Header";
import { useNavigate } from 'react-router-dom';
import SearchBar from "./component/SearchBar";
import IntegratedRanking from "./component/IntegratedRanking";
import LiveDiscussion from "./component/LiveDiscussion";
import CommunityRanking from "./component/CommunityRanking";
import GreetingMessage from "./component/GreetingMessage";
import logo from "@images/etc/logo.png";
import victory_banner from "@images/victory_banner.png";

const HomePage = () => {
  // 여기에 실제 로그인 상태를 확인하는 로직을 추가해야 함 -> 추가함
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleNavigateToSearch = () => {
    navigate('/search');
  };

  return (
    <div className="bg-background w-[390px] mx-auto scrollbar-hidden">
      <Header isLoggedIn={isLoggedIn} />
      <GreetingMessage isLoggedIn={isLoggedIn} />
      <div className="flex items-center ml-[24px] mr-[24px] mt-4">
        <img src={logo} alt="Logo Icon" className="w-8 h-8 mr-[14.79px]" />
        <SearchBar placeholder="올림픽" onClick={handleNavigateToSearch} />
      </div>
      <IntegratedRanking />
      <LiveDiscussion />
      <img src={victory_banner} alt="victory_banner" className="w-[390px] mx-auto mt-[40px] px-[20px]" />
      <CommunityRanking/>
    </div>
  );
}

export default HomePage;
