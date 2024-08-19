// import React from 'react';
// import { getTimeDifference } from '../../../utils/timeUtils';

// interface AlarmItemProps extends Alarm {
//   onAlarmClick: (id: number) => void;
// }

// const AlarmItem: React.FC<AlarmItemProps> = (
//   { title, keyword, duration, debateId, comment, isRead, onAlarmClick }
// ) => {
//   return (
//     <div 
//       className={`p-[16px] ${isRead ? 'bg-[#f8f9fc]' : 'bg-purple-100'}`}
//       onClick={() => onAlarmClick(debateId)}
//     > 
//         <div className=''>
//           <div className="text-[14px] text-gray-700 font-semibold">{title} {keyword}</div>
//           <p className='flex space-x-[4px] text-[12px] text-gray-500'>
//               <span className='text-gray3'>{getTimeDifference(duration)}</span>
//               <span className='text-gray2'>|</span>
//               <span className='text-purple-500'>{comment}</span>
//           </p>
//         </div>
//     </div>
//   );
// };

// export default AlarmItem;

import React from 'react';

interface AlarmItemProps {
  title: string;
  keyword: string;
  duration: string;
  debateId: number;
  comment: boolean;
  isRead: boolean;
  onAlarmClick: (id: number) => void;
}

const AlarmItem: React.FC<AlarmItemProps> = ({
  title,
  keyword,
  duration,
  debateId,
  comment,
  isRead,
  onAlarmClick,
}) => {
  return (
    <div 
      className={`p-[16px] ${isRead ? 'bg-[#f8f9fc]' : 'bg-purple-100'}`}
      onClick={() => onAlarmClick(debateId)}
    > 
      <div className=''>
        <div className="text-[14px] text-gray-700 font-semibold">
          {title} {keyword}
        </div>
        <p className='flex space-x-[4px] text-[12px] text-gray-500'>
          <span className='text-gray3'>{duration}</span>
          <span className='text-gray2'>|</span>
          <span className='text-purple-500'>{comment ? 'Comment Available' : 'No Comment'}</span>
        </p>
      </div>
    </div>
  );
};

export default AlarmItem;
