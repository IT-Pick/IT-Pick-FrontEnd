import React from "react";

interface RelatedDataProps {
    newsTitle: string;
    newsContent: string;
    newsLink: string;
    imageUrl: string;
}

const RelatedData:React.FC<RelatedDataProps> = ({ newsTitle, newsContent, newsLink, imageUrl }) =>{
    return(
        <div className="flex flex-col justify-center mx-[24px] mt-[44px] gap-[12px]">
            <header className="text-[20px] font-[700]">
                관련 자료
            </header>
            <a href={newsLink} className="flex justify-between items-center gap-[12px]">
                <img src={imageUrl} alt="relatedData" className="w-[88px] h-[88px]"/>
                <div>
                    <header className="text-[18px] font-[700]">
                        {newsTitle}
                    </header>
                    <div className="text-[#464F59] text-[14px] font-[500] line-clamp-2">
                        {newsContent}
                    </div>
                </div>
            </a>
        </div>
    )
}

export default RelatedData;