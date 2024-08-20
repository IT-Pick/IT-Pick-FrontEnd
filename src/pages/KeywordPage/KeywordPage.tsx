import React, { useState, useEffect } from "react";
import Header from "./component/Header";
import MainCard from "./component/MainCard";
import RelatedData from "./component/RelatedData";
import LiveDiscussion from "./component/LiveDiscussion";
import { useNavigate } from "react-router-dom";
import ico_write from "../../assets/images/etc/ico_write.svg";
import { getKeywordRelatedData } from "@apis/getKeywordRelatedData";
import { useKeywordState } from '../../context/KeywordStateContext';

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
    const [keywordId, setKeywordId] = useState<number | null>(null);
    const { selectedKeyword } = useKeywordState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndSetKeywordData = async () => {
            if (!selectedKeyword) return;

            try {
                const result = await getKeywordRelatedData('total', 'realtime', selectedKeyword);
                setKeywordData(result);
                setKeywordId(result.keywordId);
            } catch (error) {
                console.error('Error fetching keyword data:', error);
            }
        };

        fetchAndSetKeywordData();
    }, [selectedKeyword]);

    const handleButtonClick = () => {
        if (keywordId) {
            navigate('/create', { state: { keywordId } }); // keywordId를 전달하며 이동
        } else {
            alert('키워드 정보가 없습니다.');
        }
    };

    return (
        <div className="w-[390px] mx-auto bg-[#F8F9FC] min-h-screen">
            <Header />
            {keywordData && (
                <>
                    <MainCard 
                        keyword={keywordData.keyword}
                        newsContent={keywordData.newsContent}
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
            {keywordId && <LiveDiscussion keywordId={keywordId} />} {/* keywordId를 전달 */}
            <button className="fixed bottom-[18px] right-0" onClick={handleButtonClick}>
                <img src={ico_write} alt="add discussion icon"/>
            </button>
        </div>
    );
}

export default KeywordPage;
