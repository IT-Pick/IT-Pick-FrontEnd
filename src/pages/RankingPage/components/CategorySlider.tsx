import React, { useState } from 'react';

const categories = ['통합', '네이트', '네이버', '줌', '구글', '나무위키'];

const CategorySlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
            onClick={() => setActiveIndex(index)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
