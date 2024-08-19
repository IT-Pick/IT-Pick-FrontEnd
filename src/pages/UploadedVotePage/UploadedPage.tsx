// import React, { useState, useEffect } from "react";
// import Header from "../UploadedVotePage/components/Header";
// import Content from "../UploadedVotePage/components/Content";
// import CommentList from "../UploadedVotePage/components/CommentList";
// import AddComment from "../UploadedVotePage/components/AddComment";
// import { getDebateDetails } from "@apis/WriteDebate/getDebateDetails";

// const UploadedPage: React.FC = () => {
//     const [debateInfo, setDebateInfo] = useState<any>(null);
//     const [comments, setComments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const debateId = 68; // 여기에 실제 debateId를 설정해야 함

//     useEffect(() => {
//         const fetchDebateDetails = async () => {
//             try {
//                 const data = await getDebateDetails(debateId);
//                 setDebateInfo(data.result);
//                 setComments(data.result.comments);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDebateDetails();
//     }, [debateId]);

//     const addComment = (text: string) => {
//         const newComment = {
//             userName: "김잇픽",
//             time: 0, 
//             like: 0, 
//             text: text,
//         };
//         setComments([...comments, newComment]);
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div className="w-[390px] bg-[#F8F9FC] mx-auto py-4">
//             {debateInfo && (
//                 <>
//                     <Header info={debateInfo} />
//                     <Content info={debateInfo} />
//                     <CommentList comments={comments}/>
//                     <AddComment onAddComment={addComment} />
//                 </>
//             )}
//         </div>
//     );
// }

// export default UploadedPage;

import React, { useState, useEffect } from "react";
import Header from "../UploadedVotePage/components/Header";
import Content from "../UploadedVotePage/components/Content";
import CommentList from "../UploadedVotePage/components/CommentList";
import AddComment from "../UploadedVotePage/components/AddComment";
import { getDebateDetails } from "@apis/WriteDebate/getDebateDetails";

const UploadedPage: React.FC = () => {
    const [debateInfo, setDebateInfo] = useState<any>(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const debateId = 68; // 여기에 실제 debateId를 설정해야 함

    useEffect(() => {
        const fetchDebateDetails = async () => {
            try {
                const data = await getDebateDetails(debateId);
                setDebateInfo(data.result);
                setComments(data.result.comments);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDebateDetails();
    }, [debateId]);

    const addComment = (text: string) => {
        const newComment = {
            userName: "김잇픽",
            time: 0, 
            like: 0, 
            text: text,
        };
        setComments([...comments, newComment]);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-[390px] bg-[#F8F9FC] mx-auto py-4">
            {debateInfo && (
                <>
                    <Header info={debateInfo} />
                    <Content info={debateInfo} />
                    <CommentList comments={comments}/>
                    <AddComment onAddComment={addComment} />
                </>
            )}
        </div>
    );
}

export default UploadedPage;
