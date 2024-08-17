// import React, { useState, useEffect } from 'react';
// import DebateIconBar from './components/DebateIconBar';
// import VoteCreationForm from '../../components/Vote/VoteCreationForm';
// import DialogModal from '@components/Modal/DialogModal';
// import Modal from 'react-modal';

// // Modal 설정: root element를 지정해야 합니다.
// Modal.setAppElement('#root'); // root id는 프로젝트의 root element id와 맞춰야 합니다.



// const DebateCreatePage: React.FC = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
//   const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
//   const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       const currentViewportHeight = visualViewport.height;
//       setViewportHeight(currentViewportHeight);

//       if (window.visualViewport.height < window.innerHeight) {
//         setIsKeyboardVisible(true);
//       } else {
//         setIsKeyboardVisible(false);
//       }
//     };

//     window.visualViewport.addEventListener('resize', handleResize);
//     handleResize(); // 초기화
//     return () => {
//       window.visualViewport.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div className="w-[390px] h-screen mx-auto flex flex-col items-center justify-between bg-background">
//       <div className="w-full h-full flex flex-col">
//         <div className="flex justify-between items-center mb-6 py-4 px-6 bg-white">
//           <div className="font-pretendard font-bold text-lg">
//             <span className="text-point500">#김현주 열애설</span>
//             <span className="text-black"> 토론 만들기</span>
//           </div>
//           <button 
//             className="text-point400 font-pretendard font-medium text-[14px]"
//             onClick={() => setIsVoteModalOpen(true)}
//           >
//             투표 만들기
//           </button>
//         </div>
//         <input 
//           type="text" 
//           placeholder="제목을 입력해주세요."
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-[335px] px-5 font-pretendard font-bold text-[18px] text-[#2E333B] placeholder-gray3 border-none focus:outline-none bg-background"
//         />
//         <hr className="w-[350px] border-t border-gray1 my-[20px]" />
//         <textarea
//           placeholder="자유롭게 이야기해 보세요."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="w-[335px] flex-grow px-5 font-pretendard font-medium text-[16px] text-gray5 placeholder-gray3 border-none focus:outline-none resize-none bg-background"
//         />
//       </div>
//       <div className={`w-[390px] flex justify-center py-3 bg-white ${isKeyboardVisible ? 'fixed bottom-0' : 'absolute bottom-0'}`}
//         style={{ bottom: isKeyboardVisible ? `${window.innerHeight - viewportHeight}px` : '0' }}>
//         <DebateIconBar />
//       </div>

//       {isVoteModalOpen && (
//          <DialogModal
//          isOpen={isVoteModalOpen}
//          onRequestClose={() => setIsVoteModalOpen(false)}
//          onConfirm={() => setIsVoteModalOpen(false)}
//          icon="투표 아이콘 경로"
//          title="투표 만들기"
//          message={(
//            <VoteCreationForm onSubmit={(options, isMultipleChoice) => {
//              // 투표 생성을 처리하고, 모달을 닫음
//              console.log('투표 생성:', options, isMultipleChoice);
//              setIsVoteModalOpen(false);
//            }} />
//          )}
//          confirmText="확인"
//          contentLabel="Vote Modal"
//          isVoteModal={true} // 투표 모달이기 때문에 true로 설정
//        />
//       )}
//     </div>
//   );
// };

// export default DebateCreatePage;
