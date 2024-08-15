import React,{ useEffect, useState } from 'react';
import Header from "./component/Header";
import { useNavigate } from 'react-router-dom';
import SearchBar from "@components/SearchBar";
import IntegratedRanking from "./component/IntegratedRanking";
import LiveDiscussion from "./component/LiveDiscussion";
import CommunityRanking from "./component/CommunityRanking";
import GreetingMessage from "./component/GreetingMessage";
import logo from "@images/etc/logo.png";
import victory_banner from "@images/victory_banner.png";
import { refreshAccessToken } from '@apis/refreshAccessToken';  // 토큰 재발급 API 함수 import

const HomePage = () => {
  // 여기에 실제 로그인 상태를 확인하는 로직을 추가해야 함 -> 추가함
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate();

  // 컴포넌트가 마운트될 때 로그인 상태를 확인
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token) {
      setIsLoggedIn(true);
    } else if (refreshToken) {
      refreshAccessToken(refreshToken)
        .then(newRefreshToken => {
          // 토큰 재발급 성공 시, 새로운 토큰 저장 및 로그인 상태 갱신
          localStorage.setItem('refreshToken', newRefreshToken);
          setIsLoggedIn(true);
        })
        .catch(error => {
          console.error('토큰 재발급 실패:', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          navigate('/login');  // 재로그인 유도
        });
    } else {
      navigate('/login');  // 액세스 토큰과 리프레시 토큰 모두 없으면 로그인 페이지로 리디렉션
    }
  }, [navigate]);

  const handleSearch = (term: string) => {
    navigate('/search', { state: { searchTerm: term } });
  };

  return (
    <div className="bg-background w-[390px] mx-auto">
      <Header />
      <GreetingMessage isLoggedIn={isLoggedIn} />
      <div className="flex items-center ml-[24px] mr-[24px] mt-4">
        <img src={logo} alt="Logo Icon" className="w-8 h-8 mr-[14.79px]" />
        <SearchBar placeholder="김현주 열애설" onSearch={handleSearch} onSearchAll={true} />
      </div>
      <IntegratedRanking />
      <LiveDiscussion />
      <img src={victory_banner} alt="victory_banner" className="w-[390px] mx-auto mt-[40px]" />
      <CommunityRanking/>
    </div>
  );
}

export default HomePage;
