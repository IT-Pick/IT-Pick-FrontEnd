import React from "react";

interface ContentProps {
    info: {
        title: string;
        text: string;
        debateImgUrl?: string; // debateImgUrl 속성 추가
    };
}

const Content: React.FC<ContentProps> = ({ info }) => {
    return (
        <div className="flex-col mx-auto px-[20px] pb-[30px]">
            <div className="text-[20px] font-[700] mb-[8px]">{info.title}</div>
            <div className="text-[16px] font-[400] whitespace-pre-line leading-snug mb-[20px]">
                {info.text}
            </div>
            {info.debateImgUrl && (
                <div className="mb-[20px]">
                    <img
                        src={info.debateImgUrl}
                        alt="Debate Image"
                        className="w-full h-auto rounded"
                    />
                </div>
            )}
        </div>
    );
};

export default Content;
