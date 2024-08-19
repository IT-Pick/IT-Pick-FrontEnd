import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { getDebateDetails } from '@apis/WriteDebate/getDebateDetails'; // API 함수 가져오기
import Header from "../UploadedVotePage/components/Header";
import Content from "../UploadedVotePage/components/Content";
import CommentList from "../UploadedVotePage/components/CommentList";
import AddComment from "../UploadedVotePage/components/AddComment";

const UploadedPage: React.FC = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const debateId = params.get('debateId'); // 쿼리 문자열에서 debateId 가져 오기

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
    const [currentUser, setCurrentUser] = useState(''); // 현재 유저명을 저장할 상태

    useEffect(() => {
        const fetchDetails = async () => {
            if (debateId) {
                try {
                    // API 호출
                    const data = await getDebateDetails(parseInt(debateId));
                    
                    // 토론 상세 정보를 상태에 저장
                    setInfo({
                        userName: data.result.userNickname, // 작성자 닉네임
                        time: new Date(data.result.createAt).toLocaleString(), // 작성 시간, 적절한 포맷으로 변환
                        view: data.result.hits, // 조회수
                        title: data.result.title, // 글 제목
                        text: data.result.content, // 글 내용
                        userImgUrl: data.result.userImgUrl || '', // 작성자 프로필 이미지 URL (없으면 빈 값)
                        debateImgUrl: data.result.debateImgUrl || '', // 토론 이미지 URL (없으면 빈 값)
                    });

                    // 댓글 정보를 상태에 저장
                    setComments(data.result.comments.map(comment => ({
                        userName: comment.userNickname, // 댓글 작성자 닉네임
                        time: new Date(comment.createAt).toLocaleString(), // 댓글 작성 시간
                        like: comment.commentHeartCount, // 댓글 좋아요 수
                        text: comment.commentText, // 댓글 내용
                        userHearted: comment.userHearted, // 유저가 좋아요를 눌렀는지 여부
                        parentCommentId: comment.parentCommentId, // 부모 댓글 ID (대댓글 여부 판단)
                    })));

                    // 현재 유저 정보도 가져와 상태에 저장
                    setCurrentUser(data.result.currentUserNickname); // 예를 들어, 서버에서 현재 유저 닉네임을 받는 경우
                } catch (error) {
                    console.error('토론 정보를 불러오는 중 오류가 발생했습니다:', error);
                }
            }
        };

        fetchDetails();
    }, [debateId]);

    if (!info.title) {
        return <div>로딩 중...</div>; // 데이터를 불러오는 동안 로딩 표시
    }

    const addComment = (text: string) => {
        const newComment = {
            userName: currentUser, // 현재 유저명으로 댓글 추가
            time: new Date().toLocaleString(), // 현재 시간을 포맷하여 사용
            like: 0, 
            text: text,
            userHearted: false,
            parentCommentId: null, // 새 댓글이므로 부모 없음
        };
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
            <AddComment onAddComment={addComment} />
        </div>
    );
}

export default UploadedPage;
