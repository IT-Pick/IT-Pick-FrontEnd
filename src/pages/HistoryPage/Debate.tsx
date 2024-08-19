import React, { useEffect, useState } from "react";
import tag_ico_comment from '../../assets/images/16x16/tag_ico_comment.svg';
import tag_ico_view from "../../assets/images/16x16/tag_ico_view.svg";
import ico_roundcheck from "../../assets/images/24x24/ico_roundcheck_filled.svg";
import ico_rounduncheck from "../../assets/images/24x24/ico_roundcheck_outline.svg";
import { useNavigate } from "react-router-dom";
import { getMyDebate } from "@apis/getMyDebate";
import { deleteDebate } from "@apis/deleteDebate";

const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
};

const handleDelete = async (debateIds: number[], setDebates: React.Dispatch<React.SetStateAction<Debate[]>>) => {
    try {
        for (const debateId of debateIds) {
            const data = await deleteDebate(debateId);
            if (data.code !== 1000) {
                throw new Error("삭제 실패");
            }
        }
        setDebates(prevDebates => prevDebates.filter(debate => !debateIds.includes(debate.debateId)));
        console.log("삭제 성공");
    } catch (error) {
        console.log("삭제 실패");
    }
}

interface Debate {
    debateId: number;
    title: string;
    keyword: string;
    duration: string;
    hits: number;
    comments: number;
}

interface DebateItemProps {
    debateId: number;
    id: number;
    title: string;
    keyword: string;
    duration: string;
    hits: number;
    comments: number;
    editMode: boolean;
    selectedItems: number[];
    toggleSelect: (id: number) => void;
}

const SortingDebates: React.FC<DebateItemProps & { className?: string }> = ({ id, title, keyword, duration, hits, comments, editMode, selectedItems, toggleSelect, className }) => (
    <div className="w-[390px] px-[20px] pt-6 justify-between items-center">
        <div className={`flex pb-[20px] ${className}`}>
            {editMode && (
                <button onClick={() => toggleSelect(id)} className="mr-4">
                    <img src={selectedItems.includes(id) ? ico_roundcheck : ico_rounduncheck} alt="select_icon" />
                </button>
            )}
            <div className="flex flex-col items-start flex-grow">
                <div className="text-center font-[600] text-[16px]">{title}</div>
                <div className="flex gap-[4px]">
                    <div className="text-[#9EAAB5] text-[12px] font-[400]">{duration} |</div>
                    <div className="text-[#7620E4] text-[12px] font-[400]">#{keyword}</div>
                </div>
            </div>
            <div className="flex items-center gap-[8px]">
                <div className="flex items-center gap-[4px] bg-purple-100 rounded-2xl px-2 py-1 text-xs text-violet-700 font-medium">
                    <img src={tag_ico_view} alt="tag_ico_view" />
                    {formatNumber(hits)}
                </div>
                <div className="flex items-center gap-[4px] bg-purple-100 rounded-2xl px-2 py-1 text-xs text-violet-700 font-medium">
                    <img src={tag_ico_comment} alt="tag_ico_comment" />
                    {formatNumber(comments)}
                </div>
            </div>
        </div>
    </div>
);

const Debate: React.FC = () => {
    const navigate = useNavigate();
    const [debates, setDebates] = useState<Debate[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
        setSelectedItems([]);
    };

    const toggleSelect = (id: number) => {
        setSelectedItems(prevSelected =>
            prevSelected.includes(id) ? prevSelected.filter(item => item !== id) : [...prevSelected, id]
        );
    };

    const handleDeleteClick = async () => {
        if (selectedItems.length > 0) {
            await handleDelete(selectedItems, setDebates);
            setIsEditMode(false);
            setSelectedItems([]);
        }
    };

    useEffect(() => {
        const fetchDebates = async () => {
            const debateData: Debate[] = await getMyDebate();

            if (debateData.length === 0) {
                navigate('/debate-no-data', { replace: true });
            } else {
                setDebates(debateData);
            }
        };
        fetchDebates();
    }, [navigate]);

    return (
        <div className="w-[390px] h-screen mx-auto">
            <header className="w-full flex justify-between items-center py-4">
                <h1 className="text-[20px] text-black font-pretendard font-bold leading-[28px] ml-6">내가 만든 토론</h1>
                <div className="flex items-center">
                    <button
                        onClick={handleDeleteClick}
                        disabled={!isEditMode || selectedItems.length === 0}
                        className={`text-[14px] font-[500] mr-[12px] cursor-pointer ${isEditMode && selectedItems.length > 0 ? 'text-purple-600' : 'text-gray-400'}`}
                    >
                        삭제
                    </button>
                    <p onClick={toggleEditMode} className="text-point400 text-[14px] font-[500] mr-[24px] cursor-pointer">
                        {isEditMode ? '완료' : '편집'}
                    </p>
                </div>
            </header>
            <div className="bg-background h-screen">
                {debates.map((item) => (
                    <SortingDebates
                        key={item.debateId}
                        debateId={item.debateId}
                        id={item.debateId}
                        title={item.title}
                        keyword={item.keyword}
                        duration={item.duration}
                        hits={item.hits}
                        comments={item.comments}
                        editMode={isEditMode}
                        selectedItems={selectedItems}
                        toggleSelect={toggleSelect}
                        className="border-b-[1px]"
                    />
                ))}
            </div>
        </div>
    );
}

export default Debate;
