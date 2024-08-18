import React, { useEffect, useState } from "react";
import tag_ico_comment from '../../assets/images/16x16/tag_ico_comment.svg'
import tag_ico_view from "../../assets/images/16x16/tag_ico_view.svg"
import ico_roundcheck from "../../assets/images/24x24/ico_roundcheck_filled.svg"
import ico_rounduncheck from "../../assets/images/24x24/ico_roundcheck_outline.svg"
import { useNavigate } from "react-router-dom";
import { getMyDebate } from "@apis/getMyDebate";

const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
};

interface DebateItemProps {
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


const SortingDebates: React.FC<DebateItemProps & {className?: string}> = ({ id, title, keyword, duration, hits, comments, editMode, selectedItems, toggleSelect, className }) => (
    <div className="w-[390px] px-[20px] pt-6 bg-[#F8F9FC] justify-between items-center">
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
    const [debates, setDebates] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
        setSelectedItems([]);
    };

    const toggleSelect = (id: number) => {
        setSelectedItems(prevSelected => 
            prevSelected.includes(id) ? prevSelected.filter(item => item !== id) : [...prevSelected, id]
        );
    };

    useEffect(() => {
        const fetchDebates = async () =>{
            const debateData = await getMyDebate();

            if(debateData.length === 0){
                navigate('/debate-no-data');
            }else{
                setDebates(debateData);
            }
        };
        fetchDebates();
    },[]);

    return (
        <div className="w-[390px] mx-auto">
            <header className="w-full flex justify-between items-center py-4">
                <h1 className="text-[20px] text-black font-pretendard font-bold leading-[28px] ml-6">내가 만든 토론</h1>
                <p onClick={toggleEditMode} className="text-point400 text-[14px] font-[500] mr-[24px] cursor-pointer">
                    {isEditMode ? '삭제' : '편집'}
                </p>
            </header>

            {debates.map((item, index) => (
                <SortingDebates 
                key={index} 
                id={index}
                title={item.title}
                keyword={item.keyword}
                duration={item.duration}
                hits={item.hits}
                comments={item.comments}
                editMode={isEditMode} 
                selectedItems={selectedItems} 
                toggleSelect={toggleSelect} 
                className={index === debates.length - 1 ? '' : 'border-b-[1px]'} 

                />
            ))}
        </div>
        
    );
}

export default Debate;
