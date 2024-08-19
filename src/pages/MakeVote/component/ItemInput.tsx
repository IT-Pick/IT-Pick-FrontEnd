import React, { useState } from "react";
import ico_vote_add_photo from "../../../assets/images/etc/ico_vote_add_photo.svg";
import ico_vote_delete_item_active from "../../../assets/images/etc/ico_vote_delete_item_active.svg";
import ico_vote_delete_item_unactive from "../../../assets/images/etc/ico_vote_delete_item_unactive.svg";

interface ItemInputProps {
  id: number;
  onRemove: (id: number) => void;
  canRemove: boolean;
  onNameChange: (id: number, name: string) => void;
  onImageChange: (id: number, image: File | null) => void; // 이미지 변경 콜백 함수 prop 추가
}

const ItemInput: React.FC<ItemInputProps> = ({ id, onRemove, canRemove, onNameChange, onImageChange }) => {
  const [text, setText] = useState(""); 
  const [image, setImage] = useState<File | null>(null); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    onNameChange(id, newText); 
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      onImageChange(id, selectedImage); 
    }
  };

  return (
    <div className="w-[350px] h-[47px] flex flex-col justify-center items-start">
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-3">
          <button
            className={`w-[18px] h-[18px] relative ${
              canRemove ? 'cursor-pointer' : 'cursor-not-allowed'
            }`}
            onClick={() => canRemove && onRemove(id)}
            disabled={!canRemove}
            aria-label="항목 삭제"
          >
            <img
              src={canRemove ? ico_vote_delete_item_active : ico_vote_delete_item_unactive}
              alt="삭제 아이콘"
              className="w-full h-full"
            />
          </button>
          <input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="항목 입력"
            className="text-black text-base font-medium font-['Pretendard'] bg-transparent focus:outline-none w-[250px]"
          />
        </div>
        <div className="w-[35px] h-[35px]">
          <label htmlFor={`image-upload-${id}`}>
            <img src={ico_vote_add_photo} alt="사진 추가" className="w-full h-full cursor-pointer" />
          </label>
          <input
            id={`image-upload-${id}`}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>
      <div className="w-full h-[0px] border border-[#edf0f3] mt-2"></div>
    </div>
  );
};

export default ItemInput;
