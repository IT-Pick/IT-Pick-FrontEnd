import React, { useState } from "react";
import { useSignUpContext } from "../../../context/SignUpContext";
import travel from "../../../assets/images/40x40/ico_travel.svg";
import politics from "../../../assets/images/40x40/ico_lightbulb.svg";
import economics from "../../../assets/images/40x40/ico_money.svg";
import social from "../../../assets/images/40x40/ico_world.svg";
import culture from "../../../assets/images/40x40/ico_culture.svg";
import entertain from "../../../assets/images/40x40/ico_music.svg";
import sports from "../../../assets/images/40x40/ico_sports.svg";
import food from "../../../assets/images/40x40/ico_food.svg";
import love from "../../../assets/images/40x40/ico_letter.svg";

const Items: {topic: string; icon: string}[] = [
    {topic: "정치", icon: politics},
    {topic: "경제", icon: economics},
    {topic: "사회", icon: social},
    {topic: "문화", icon: culture},
    {topic: "여행", icon: travel},
    {topic: "연예", icon: entertain},
    {topic: "스포츠", icon: sports},
    {topic: "음식", icon: food},
    {topic: "연애", icon: love},
];

const Item: React.FC = () => {
    const { setLikedTopics } = useSignUpContext();
    const [selectedIndexes, setSelectedIndexes] = useState<boolean[]>(Array(Items.length).fill(false));

    const handleSelect = (index: number) => {
        const newSelectedIndexes = [...selectedIndexes];
        newSelectedIndexes[index] = !newSelectedIndexes[index];
        setSelectedIndexes(newSelectedIndexes);

        const selectedTopics = Items.filter((_, i) => newSelectedIndexes[i]).map(item => item.topic);
        setLikedTopics(selectedTopics);
    }

    return (
        <div className="grid grid-cols-3 gap-[20px] pt-[48px]">
            {Items.map((item, index) => (
                <button 
                    key={index}
                    onClick={() => handleSelect(index)} 
                    className="flex flex-col justify-center items-center gap-[4px]"
                >
                    <div 
                        className={`w-[80px] h-[80px] flex justify-center items-center rounded-[20px] text-[16px] font-[500] 
                        ${selectedIndexes[index] ? 'shadow-custom-purple' : 'bg-white'}`}
                    >
                        <div className="bg-white w-full h-full flex justify-center items-center rounded-[18px]">
                            <object data={item.icon} type="image/svg+xml">
                                <img src={item.icon} alt={item.topic} width={40} height={40} className="cursor-pointer"/>
                            </object>
                        </div>
                    </div>
                    <div className="cursor-pointer font-medium">{item.topic}</div>
                </button>
            ))}
        </div>
    )
}

export default Item;
