import VoteCreationComponent from '../../components/Vote/VoteCreationComponent';

const VoteComponentTestPage: React.FC = () => {
  return (
    <div>
      <h1>글쓰기</h1>
      <VoteCreationComponent />
    </div>
  );
};


export default VoteComponentTestPage;


//테스트 페이지 이므로 투표 API 까지 마치면 삭제하셔도 됩니다