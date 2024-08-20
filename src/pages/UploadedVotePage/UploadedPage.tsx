import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { getDebateDetails } from '@apis/WriteDebate/getDebateDetails';
import Header from "../UploadedVotePage/components/Header";
import Content from "../UploadedVotePage/components/Content";
import CommentList from "../UploadedVotePage/components/CommentList";
import AddComment from "../UploadedVotePage/components/AddComment";
import { useTrendStore } from "@store/useTrendStore"; // zustand store import

const UploadedPage: React.FC = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const debateId = parseInt(params.get('debateId') || '0');

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
                        time: new Date(data.result.createAt).toLocaleString(),
                        view: data.result.hits,
                        title: data.result.title,
                        text: data.result.content,
                        userImgUrl: data.result.userImgUrl || '',
                        debateImgUrl: data.result.debateImgUrl || '',
                    });
                    
                    // 서버에서 받아온 댓글 데이터를 zustand 스토어에 저장
                    const formattedComments = data.result.comments.map(comment => ({
                        commentId: comment.commentId,
                        userName: comment.userNickname,
                        time: new Date(comment.createAt).toLocaleString(),
                        like: comment.commentHeartCount,
                        text: comment.commentText,
                        parentCommentId: comment.parentCommentId,
                    }));
                    setComments(debateId, formattedComments);

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
        <div className="w-[390px] bg-[#F8F9FC] mx-auto py-4">
            <Header 
                info={{
                    userName: info.userName,
                    time: info.time,
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
