import React, { useState, useEffect } from "react";
import Header from "./component/Header";
import MainCard from "./component/MainCard";
import RelatedData from "./component/RelatedData";
import LiveDiscussion from "./component/LiveDiscussion";
import { useNavigate } from "react-router-dom";
import ico_write from "../../assets/images/etc/ico_write.svg";
import { getKeywordRelatedData } from "@apis/getKeywordRelatedData";

interface KeywordResult {
    keywordId: number;
    keyword: string;
    searchLink: string;
    newsTitle: string;
    newsContent: string;
    newsLink: string;
    imageUrl: string;
  }

const KeywordPage: React.FC = () => {
    const [keywordData, setKeywordData] = useState<KeywordResult | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getKeywordRelatedData("total", "realtime", "원빈");
                setKeywordData(result);
            } catch (error) {
                console.error("Error fetching keyword data:", error);
            }
        };

        fetchData();
    }, []);

    const handleButtonClick = () => {
        navigate('/create'); //라우팅 링크 typo 수정
    };

    return(
        <div className="w-[390px] mx-auto bg-[#F8F9FC]">
            <Header/>
            {keywordData && (
                <>
                    <MainCard 
                        keyword={keywordData.keyword}
                        searchLink={keywordData.searchLink}
                    />
                    <RelatedData 
                        newsTitle={keywordData.newsTitle}
                        newsContent={keywordData.newsContent}
                        newsLink={keywordData.newsLink}
                        imageUrl={keywordData.imageUrl}
                    />
                </>
            )}
            <LiveDiscussion/>
            <button className="fixed bottom-[18px] right-0" onClick={handleButtonClick}>
                <img src={ico_write} alt="add discussion icon"/>
            </button>
            
        </div>
    )
}

export default KeywordPage;