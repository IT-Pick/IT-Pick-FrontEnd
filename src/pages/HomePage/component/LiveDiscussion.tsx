import React from 'react';
import LiveDiscussion1 from '@images/LiveDiscussion/LiveDiscussion1.png';
import LiveDiscussion2 from '@images/LiveDiscussion/LiveDiscussion2.png';
import LiveDiscussion3 from '@images/LiveDiscussion/LiveDiscussion3.png';
import DiscussionCard from '@components/DiscussionCard';

const discussions = [
  {
    image: LiveDiscussion1,
    hits: 120,
    comments: 123,
    title: "김현주 열애설 어떻게 생각함?",
    link: "/Post1",
  },
  {
    image: LiveDiscussion2,
    hits: 990,
    comments: 45,
    title: "김현주가 아깝다 vs 차은우가 아깝다",
    link: "/Post2",
  },
  {
    image: LiveDiscussion3,
    hits: 990,
    comments: 45,
    title: "김현주가 아깝다 vs 차은우가 아깝다",
    link: "/Post3",
  },
];

const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};


const LiveDiscussion: React.FC = () => {
  return (
    <div className="mt-[26px] ml-[24px]">
      <div className="flex items-center">
        <span className="text-[#2E333B] font-pretendard text-[20px] font-bold leading-normal">실시간 토론 BEST 3</span>
      </div>
      <div className="flex space-x-[12px] mt-[12px]">
      {discussions.map((discussion, index) => (
         <DiscussionCard 
         key={index}
         title={discussion.title}
         image={discussion.image}  // Added image prop
         hits={formatNumber(discussion.hits)}  // Formatted hits
         comments={formatNumber(discussion.comments)}  // Formatted comments
         link={discussion.link}  // Added link prop
         className="w-[164px] h-[284px]"
       />
     ))}
   </div>
 </div>
  );
};

export default LiveDiscussion;





// import React from 'react';
// import DiscussionCard from '@components/DiscussionCard';

// interface DiscussionCardProps {
//   image: string;
//   hits: number;
//   comments: number | null;
//   title: string;
//   link: string;
// }


// const LiveDiscussion: React.FC<{ discussions: DiscussionCardProps[] }> = ({ discussions }) => {
//   return (
//     <div className="mt-[26px] ml-[24px]">
//       <div className="flex items-center">
//         <span className="text-[#2E333B] font-pretendard text-[20px] font-bold leading-normal">실시간 토론 BEST 3</span>
//       </div>
//       <div className="flex overflow-x-auto space-x-[12px] mt-[12px]">
//         {discussions.map((discussion, index) => (
//           <DiscussionCard key={index} {...discussion} />
//         ))}
//       </div>
//     </div>
//   );
// };


// export default LiveDiscussion;
