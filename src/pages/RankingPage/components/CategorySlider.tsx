import React, { useState } from 'react';

const categories = [
  { name: '통합', value: 'total' },
  { name: '네이트', value: 'nate' },
  { name: '네이버', value: 'naver' },
  { name: '줌', value: 'zum' },
  { name: '구글', value: 'google' },
  { name: '나무위키', value: 'namuwiki' }
];

interface CategorySliderProps {
  // communityType: string;
  setCommunityType: (type: string) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ setCommunityType }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCategoryClick = (index: number) => {
    setActiveIndex(index);
    setCommunityType(categories[index].value); // communityType 설정
  };

  return (
    <div className="relative">
      <div
        className="flex overflow-x-auto whitespace-nowrap bg-background pt-2 px-5"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>
          {`
            .category-slider::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`px-4 py-1.5 rounded-full cursor-pointer text-sm border ${
              index === activeIndex ? 'bg-point500 text-white' : 'bg-white text-gray3 border-gray2'
            } transition-all duration-300 mx-1`}
            onClick={() => handleCategoryClick(index)}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
