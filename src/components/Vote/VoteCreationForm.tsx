// import React, { useState, useEffect } from 'react';
// import VoteCreationForm from './VoteCreationForm';
// import VoteResult from './VoteResult';
// import ico_vote from '../../assets/images/16x16/tag_ico_vote.svg';

// interface VoteCreationFormProps {
//   onSubmit: (options: VoteOption[], isMultipleChoice: boolean) => void;
// }

// interface VoteOption {
//   id: number;
//   text: string;
//   imageUrl?: string;
//   votes: number;
// }

// interface Vote {
//   options: VoteOption[];
//   isMultipleChoice: boolean;
//   totalVotes: number;
// }

// const VoteCreationComponent = () => {
//   const [showVoteCreation, setShowVoteCreation] = useState(false);
//   const [postContent, setPostContent] = useState('');
//   const [createdVote, setCreatedVote] = useState<Vote | null>(null);
//   const [modalImage, setModalImage] = useState<string | null>(null);

//   useEffect(() => {
//     if (createdVote) {
//       const totalVotes = createdVote.options.reduce((sum, option) => sum + option.votes, 0);
//       setCreatedVote({ ...createdVote, totalVotes });
//     }
//   }, [createdVote?.options]);

//   const handleVoteCreation = (options: VoteOption[], isMultipleChoice: boolean) => {
//     setCreatedVote({
//       options,
//       isMultipleChoice,
//       totalVotes: 0,
//     });
//     setShowVoteCreation(false);
//   };

//   const handleVote = (optionId: number) => {
//     if (createdVote) {
//       const updatedOptions = createdVote.options.map(option =>
//         option.id === optionId ? { ...option, votes: option.votes + 1 } : option
//       );
//       setCreatedVote({ ...createdVote, options: updatedOptions });
//     }
//   };

//   const openImageModal = (imageUrl: string) => {
//     setModalImage(imageUrl);
//   };

//   const closeImageModal = () => {
//     setModalImage(null);
//   };

//   return (
//     <div className="w-[390px] flex flex-col items-center mx-auto">
//       <textarea
//         value={postContent}
//         onChange={(e) => setPostContent(e.target.value)}
//         placeholder="자유롭게 이야기 해보세요."
//         className="w-full p-2 border rounded mb-4"
//         rows={4}
//       />
//       <button
//         className="flex items-center justify-center w-[75px] h-[34px] bg-[#f8f9fc] hover:bg-gray2 text-gray3 font-bold border border-gray3 rounded-full"
//         onClick={() => setShowVoteCreation(true)}
//       >
//         <img src={ico_vote} alt="투표 아이콘" className="mr-2" />
//         투표
//       </button>

//       {showVoteCreation && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
//             <h2 className="text-lg font-bold mb-4 text-purple-700">투표 만들기</h2>
//             <VoteCreationForm onSubmit={handleVoteCreation} />
//             <button
//               onClick={() => setShowVoteCreation(false)}
//               className="mt-4 text-gray-500 hover:text-gray-700"
//             >
//               취소
//             </button>
//           </div>
//         </div>
//       )}

//       {createdVote && (
//         <VoteResult vote={createdVote} onVote={handleVote} openImageModal={openImageModal} />
//       )}

//       {modalImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeImageModal}>
//           <div className="max-w-3xl max-h-3xl">
//             <img src={modalImage} alt="확대된 이미지" className="max-w-full max-h-full" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VoteCreationComponent;
