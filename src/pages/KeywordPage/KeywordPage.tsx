import React from "react";
import Header from "./component/Header";
import MainCard from "./component/MainCard";
import RelatedData from "./component/RelatedData";
import LiveDiscussion from "./component/LiveDiscussion";
import { useNavigate } from "react-router-dom";
import ico_write from "../../assets/images/etc/ico_write.svg";
import KeywordDebates from "./component/KeywordDebates";

const KeywordPage: React.FC = () => {
    const navigate = useNavigate();
    const keywordId = 231; // 실제 키워드 ID를 적절히 설정해야 합니다.
    const sort: 'popularity' | 'latest' = 'popularity'; // 정렬 기준

    const handleButtonClick = () => {
        navigate('/create'); // 라우팅 링크 typo 수정
    };

    return (
        <div className="w-[390px] mx-auto bg-[#F8F9FC]">
            <Header />
            <MainCard />
            <RelatedData />
            <LiveDiscussion />
            {/* KeywordDebates 컴포넌트를 렌더링, 실제 키워드 ID와 정렬 옵션을 전달합니다. */}
            <KeywordDebates keywordId={keywordId} sort={sort} />
            <button className="fixed bottom-[18px] right-0" onClick={handleButtonClick}>
                <img src={ico_write} alt="add discussion icon" />
            </button>
        </div>
    );
}

export default KeywordPage;
