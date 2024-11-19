import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDebateDetails } from '@apis/WriteDebate/getDebateDetails';
import Header from '../UploadedVotePage/components/Header';
import Content from '../UploadedVotePage/components/Content';
import CommentList from '../UploadedVotePage/components/CommentList';
import AddComment from '../UploadedVotePage/components/AddComment';
import { useTrendStore } from '@store/useTrendStore'; // zustand store import

// 시간 차이를 계산해주는 함수
const getTimeDifference = (time: number) => {
  const alarmTime = new Date(time); // 문자열을 Date 객체로 변환
  const now = new Date();
  const diffInMs = now.getTime() - alarmTime.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else {
    return `${diffInDays}일 전`;
  }
};

const UploadedPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const debateId = parseInt(params.get('debateId') || '0');
  console.log(debateId);

  const [info, setInfo] = useState({
    userName: '',
    time: '',
    view: 0,
    title: '',
    text: '',
    userImgUrl: '',
    debateImgUrl: '',
  });
  const [currentUser, setCurrentUser] = useState(''); // 현재 유저명
  const setComments = useTrendStore((state) => state.setComments); // zustand의 setComments 함수

  useEffect(() => {
    const fetchDetails = async () => {
      if (debateId) {
        try {
          const data = await getDebateDetails(debateId);
          setInfo({
            userName: data.result.userNickname,
            time: data.result.createAt, // 원래 서버에서 온 포맷을 그대로 유지
            view: data.result.hits,
            title: data.result.title,
            text: data.result.content,
            userImgUrl: data.result.userImgUrl || '',
            debateImgUrl: data.result.debateImgUrl || '',
          });

          // 서버에서 받아온 댓글 데이터를 zustand 스토어에 저장
          const formattedComments = data.result.comments.map((comment) => ({
            commentId: comment.commentId,
            userName: comment.userNickname,
            time: getTimeDifference(comment.createAt), // 시간 변환
            like: comment.commentHeartCount,
            text: comment.commentText,
            parentCommentId: comment.parentCommentId,
          }));
          setComments(debateId, (existingComments) => {
            const existingIds = new Set(existingComments.map((c) => c.commentId));
            return [
              ...existingComments,
              ...formattedComments.filter((comment) => !existingIds.has(comment.commentId)),
            ];
          });

          setCurrentUser(data.result.currentUserNickname);
        } catch (error) {
          console.error('토론 정보를 불러오는 중 오류가 발생했습니다:', error);
        }
      }
    };

    fetchDetails();
  }, [debateId, setComments]);

  if (!info.title) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="w-custom max-w-custom mx-auto bg-[#F8F9FC] py-4">
      <Header
        info={{
          userName: info.userName,
          time: new Date(info.time).getTime(), // 시간을 변환하여 전달
          view: info.view,
          title: info.title,
          userImgUrl: info.userImgUrl,
        }}
      />
      <Content
        info={{
          title: info.title,
          text: info.text,
          debateImgUrl: info.debateImgUrl,
        }}
      />
      <CommentList debateId={debateId} />
      <AddComment debateId={debateId} userId={123} />
    </div>
  );
};

export default UploadedPage;
