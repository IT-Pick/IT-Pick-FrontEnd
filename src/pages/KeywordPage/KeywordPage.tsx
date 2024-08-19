import React, { useState, useEffect } from "react";
import Header from "./component/Header";
import MainCard from "./component/MainCard";
import RelatedData from "./component/RelatedData";
import LiveDiscussion from "./component/LiveDiscussion";
import { useNavigate } from "react-router-dom";
import ico_write from "../../assets/images/etc/ico_write.svg";

const KeywordPage: React.FC = () => {
    const navigate = useNavigate();

    const [data, setData] = useState<{
        keyword: string;
        searchLink: string;
        newsTitle: string;
        newsContent: string;
        newsLink: string;
        imageUrl: string;
      } | null>(null);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await getKeywordRelatedData('total', 'realtime', '우상혁'); // 예시로 'total', 'realtime', '우상혁' 사용
            setData(result);
          } catch (error) {
            console.error('데이터를 가져오는 중 오류 발생:', error);
          }
        };
        fetchData();
      }, []);
    
      if (!data) {
        return <div>Loading...</div>;
      }

    const handleButtonClick = () => {
        navigate('/create'); //라우팅 링크 typo 수정
    };

    return(
        <div className="w-[390px] mx-auto bg-[#F8F9FC]">
            <Header/>
            <MainCard/>
            <RelatedData/>
            <LiveDiscussion/>
            <button className="fixed bottom-[18px] right-0" onClick={handleButtonClick}>
                <img src={ico_write} alt="add discussion icon"/>
            </button>
            
        </div>
    )
}

export default KeywordPage;