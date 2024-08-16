import React, { useState, useEffect } from 'react';

const MakingVote: React.FC = () => {


  return (
    <div className="w-[390px] h-screen mx-auto flex flex-col items-center justify-between bg-background">
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between items-center mb-6 py-4 px-6 bg-white">
          <div className="flex flex-row justify-between items-center ">
            <span className="text-point500 text-lg font-bold font-pretendard">투표 만들기</span>
            <span  className='text-gray3 text-sm font-medium font-pretendard'>완료</span>
          </div>

        </div>
        
        <div className="w-[350px] h-[47px] flex-col justify-center items-start gap-3 inline-flex">
    <div className="w-[350px] h-[35px] justify-start items-center gap-3 inline-flex">
        <div className="w-[18px] h-[18px] relative" />
        <div className="h-[35px] justify-between items-center flex">
            <div className="text-[#ced5db] text-base font-medium font-['Pretendard']">항목 입력</div>
            <div className="w-[35px] h-[35px] relative">
                <div className="w-[35px] h-[35px] left-0 top-0 absolute bg-[#edf0f3] rounded" />
                <div className="w-[23px] h-[23px] left-[6px] top-[6px] absolute opacity-80" />
            </div>
        </div>
    </div>
    <div className="w-[350px] h-[0px] border border-[#edf0f3]"></div>
</div>
        {/* <textarea
          placeholder="자유롭게 이야기해 보세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-[335px] flex-grow px-5 font-pretendard font-medium text-[16px] text-gray5 placeholder-gray3 border-none focus:outline-none resize-none bg-background"
        />
      </div>
      <div className={`w-[390px] flex justify-center py-3 bg-white ${isKeyboardVisible ? 'fixed bottom-0' : 'absolute bottom-0'}`}
        style={{ bottom: isKeyboardVisible ? `${window.innerHeight - viewportHeight}px` : '0' }}>*/}
      </div> ㅌ
    </div>
  );
};

export default MakingVote;
