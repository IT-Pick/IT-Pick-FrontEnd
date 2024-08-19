import React, { useState, useEffect } from 'react';
// import LiveDiscussion1 from '../../../assets/images/LiveDiscussion/LiveDiscussion1.png';
// import LiveDiscussion2 from '../../../assets/images/LiveDiscussion/LiveDiscussion2.png';
// import LiveDiscussion3 from '../../../assets/images/LiveDiscussion/LiveDiscussion3.png';

import tag_ico_view from "../../../assets/images/16x16/tag_ico_view.svg";
import tag_ico_comment from "../../../assets/images/16x16/tag_ico_comment.svg";
import { getKeywordLiveDiscussion } from "@apis/getKeywordLiveDiscussion";

// // 하드 코딩된 코드 삭제요망
// const discussions = [
//   {
//     image: LiveDiscussion1,
//     hits: 1210,
//     comments: 123,
//     title: "김현주 열애설 어떻게 생각함?",
//     link: "/Post1",
//   },
//   {
//     image: LiveDiscussion2,
//     hits: 990,
//     comments: 45,
//     title: "김현주가 아깝다 vs 차은우가 아깝다",
//     link: "/Post2",
//   },
//   {
//     image: LiveDiscussion3,
//     hits: 990,
//     comments: 45,
//     title: "김현주가 아깝다 vs 차은우가 아깝다",
//     link: "/Post3",
//   },
//   {
//     image: LiveDiscussion1,
//     hits: 1210,
//     comments: 123,
//     title: "김현주 열애설 어떻게 생각함?",
//     link: "/Post1",
//   },

// ];

const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

const DiscussionCard = ({ image, hits, comments, title, link }) => (
  <div className="w-[164px] flex-shrink-0 mb-[20px]">
    <img src={image} alt={title} className="w-[164px] h-[200px] rounded-lg mb-2" />
    <div className="w-[130px] h-6 justify-start items-start gap-2 inline-flex">
      <div className="w-[65px] px-2 py-1 bg-purple-100 rounded-2xl justify-center items-center gap-1 flex">
        <div className="flex flex-row gap-[4px] text-point500 text-xs font-medium font-pretendard">
          <img src={tag_ico_view} alt='tag_ico_view' />{formatNumber(hits)}
        </div>
      </div>
      <div className="w-[57px] px-2 py-1 bg-purple-100 rounded-2xl justify-center items-center gap-1 flex">
        <div className="flex flex-row gap-[4px] text-point500 text-xs font-medium font-pretendard">
          <img src={tag_ico_comment} width={16} height={16} alt='tag_ico_comment' />{formatNumber(comments)}
        </div>
      </div>
    </div>
    <a href={link} className="block text-[#1D2228] font-pretendard font-bold text-[16px] leading-[22.4px] no-underline mt-2">
      {title}
    </a>
  </div>
);

const RecentDiscussion: React.FC<{ keywordId: number }> = ({ keywordId }) => {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const data = await getKeywordLiveDiscussion(keywordId, 'latest');
        setDiscussions(data);
      } catch (error) {
        console.error('토론 목록을 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    fetchDiscussions();
  }, [keywordId]);

  return (
    <div >
      <div className="grid grid-cols-2 gap-x-[12px]">
        {discussions.map((discussion, index) => (
          <DiscussionCard
            key={index}
            image={discussion.mediaUrl || ''} // mediaUrl이 없는 경우 빈 문자열 사용
            hits={discussion.hit}
            comments={discussion.comment}
            title={discussion.title}
            link={`/debate/${discussion.debateId}`} // debateId를 링크로 사용
          />
        ))}
      </div>
    </div>
  );
};

export default RecentDiscussion;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import tag_ico_view from "../../../assets/images/16x16/tag_ico_view.svg";
// import tag_ico_comment from "../../../assets/images/16x16/tag_ico_comment.svg";

// const RecentDiscussion: React.FC = () => {
//   const [discussions, setDiscussions] = useState([]);

//   useEffect(() => {
//     const fetchDiscussions = async () => {
//       try {
//         const response = await axios.get('/api/debates'); // 서버에서 토론 목록 가져오기
//         setDiscussions(response.data.result); // 결과를 상태에 저장
//       } catch (error) {
//         console.error('토론 목록을 가져오는 중 오류가 발생했습니다.', error);
//       }
//     };

//     fetchDiscussions(); // 컴포넌트가 마운트될 때 데이터 가져오기
//   }, []);

//   const formatNumber = (num: number) => {
//     return new Intl.NumberFormat().format(num);
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-2 gap-x-[12px]">
//         {discussions.map((discussion, index) => (
//           <div key={index} className="w-[164px] flex-shrink-0 mb-[20px]">
//             <img src={discussion.image} alt={discussion.title} className="w-[164px] h-[200px] rounded-lg mb-2" />
//             <div className="w-[130px] h-6 justify-start items-start gap-2 inline-flex">
//               <div className="w-[65px] px-2 py-1 bg-purple-100 rounded-2xl justify-center items-center gap-1 flex">
//                 <div className="flex flex-row gap-[4px] text-violet-700 text-xs font-medium font-['Pretendard']">
//                   <img src={tag_ico_view} alt='tag_ico_view' />{formatNumber(discussion.hits)}
//                 </div>
//               </div>
//               <div className="w-[57px] px-2 py-1 bg-purple-100 rounded-2xl justify-center items-center gap-1 flex">
//                 <div className="flex flex-row gap-[4px] text-violet-700 text-xs font-medium font-['Pretendard']">
//                   <img src={tag_ico_comment} width={16} height={16} alt='tag_ico_comment' />{formatNumber(discussion.comments)}
//                 </div>
//               </div>
//             </div>
//             <a href={discussion.link} className="block text-[#1D2228] font-pretendard font-bold text-[16px] leading-[22.4px] no-underline mt-2">
//               {discussion.title}
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecentDiscussion;
