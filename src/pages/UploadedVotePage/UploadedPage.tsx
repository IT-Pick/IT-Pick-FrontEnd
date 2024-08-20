import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { getDebateDetails } from '@apis/WriteDebate/getDebateDetails';
import Header from "../UploadedVotePage/components/Header";
import Content from "../UploadedVotePage/components/Content";
import CommentList from "../UploadedVotePage/components/CommentList";
import AddComment from "../UploadedVotePage/components/AddComment";

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
    const [comments, setComments] = useState([]);
    const [currentUser, setCurrentUser] = useState(''); // 현재 유저명

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
                    setComments(data.result.comments.map(comment => ({
                        userName: comment.userNickname,
                        time: new Date(comment.createAt).toLocaleString(),
                        like: comment.commentHeartCount,
                        text: comment.commentText,
                        parentCommentId: comment.parentCommentId,
                    })));
                    setCurrentUser(data.result.currentUserNickname);
                } catch (error) {
                    console.error('토론 정보를 불러오는 중 오류가 발생했습니다:', error);
                }
            }
        };

        fetchDetails();
    }, [debateId]);

    if (!info.title) {
        return <div>로딩 중...</div>;
    }

    const addComment = (newComment: any) => {
        setComments([...comments, newComment]);
    };

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
            <CommentList comments={comments} />
            <AddComment onAddComment={addComment} debateId={debateId} userId={123} />
        </div>
    );
};

export default UploadedPage;
