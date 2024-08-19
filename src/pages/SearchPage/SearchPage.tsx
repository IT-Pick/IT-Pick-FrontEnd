import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import RecentSearches from './components/RecentSearches';
import PopularSearches from './components/PopularSearches';
import RecentDiscussions from './components/RecentDiscussions';
import SearchResultItem from './components/SearchResultItem';
import ErrorPage from './components/405ErrorPage';
import LiveDiscussion1 from '../../assets/images/LiveDiscussion/LiveDiscussion1.png';
import LiveDiscussion2 from '../../assets/images/LiveDiscussion/LiveDiscussion2.png';
import LiveDiscussion3 from '../../assets/images/LiveDiscussion/LiveDiscussion3.png';
import { getKeyword } from '@apis/getKeyword';

const discussions = [
  {
    image: LiveDiscussion1,
    hits: 1210,
    comments: 2830,
    title: "김현주 열애설 어떻게 생각함?",
    link: "/Post1",
  },
  {
    image: LiveDiscussion2,
    hits: 990,
    comments: null,
    title: "김현주가 아깝다 vs 차은우가 아깝다",
    link: "/Post2",
  },
  {
    image: LiveDiscussion3,
    hits: 32,
    comments: 48302,
    title: "현주씨 오늘 저녁 뭐 드셨어요",
    link: "/Post3",
  },
  {
    image: LiveDiscussion1,
    hits: 93021,
    comments: 123,
    title: "뉴진스! 뉴진스!",
    link: "/Post4",
  },
  {
    image: LiveDiscussion2,
    hits: null,
    comments: 594,
    title: "현주씨 오늘 저녁 뭐 드셨어요",
    link: "/Post5",
  },
  {
    image: LiveDiscussion3,
    hits: 145,
    comments: 3048,
    title: "김현주 열애설 어떻게 생각함?",
    link: "/Post6",
  },
];

//여기!!!가 get한 검색 결과 dummy data
// const initialSearchResults = [
  // { title: '김현주 열애설', sources: ['나무위키 1등', '트위터 1등'] },
  // { title: '김현주', sources: ['나무위키 2등', '네이버 1등'] },
  // { title: '김윤서 차은우', sources: ['네이버 2등', '트위터 2등'] },
  // { title: '김현주 결혼', sources: ['줌 1등'] },
  // { title: '김윤서 결혼' },
  // { title: '김현주 결혼', sources: ['나무위키 1등', '나무위키 1등'] },
  // { title: '김윤서 결혼', sources: ['줌 5등', '나무위키 5등'] },

// ];



const SearchPage: React.FC = () => {
  const [tags, setTags] = useState([
    '김현주',
    '김현주 열애설',
    '김현주 남친',
  ]);

  const [isSearchActive, setIsSearchActive] = useState(false);

  const [searchResults, setSearchResults] = useState<{ title: string; sources?: string[] }[]>([]);

  const [noResults, setNoResults] = useState(false);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const removeAllTags = () => {
    setTags([]);
  };

  const totalPopularSearches = [
    '김현주',
    '김현주 소속사',
    '김현주 열애설',
    '김현주 남친',
    '김현주',
    '김현주',
    '김현주',
    '김현주',
  ];

  interface KeywordResult {
    keyword: string;
    nateRank: number;
    naverRank: number;
    zumRank: number;
    googleRank: number;
    namuwikiRank: number;
  }

  const handleGetKeyword = async (term: string) => {
    try {
      const data = await getKeyword(term);
      if (data.code === 1000) {
        console.log("키워드 GET 성공");

        // API 응답 데이터를 initialSearchResults에 맞게 변환하여 저장
        const formattedResults = data.result.map((item: KeywordResult) => {
          const sources: string[] = [];
          if (item.nateRank !== -1) sources.push(`네이트 ${item.nateRank}등`);
          if (item.naverRank !== -1) sources.push(`네이버 ${item.naverRank}등`);
          if (item.zumRank !== -1) sources.push(`줌 ${item.zumRank}등`);
          if (item.googleRank !== -1) sources.push(`구글 ${item.googleRank}등`);
          if (item.namuwikiRank !== -1) sources.push(`나무위키 ${item.namuwikiRank}등`);

          return { title: item.keyword, sources };
        });

        formattedResults;
      }
    } catch (error) {
      console.log("키워드 GET 실패:", error.response.data.message);
    }
  }


  const handleSearch = async (term: string) => {
    if (term === '') {
      setSearchResults([]);
      setIsSearchActive(false);
      setNoResults(false);
    } else {
      await handleGetKeyword(term);
  
      // 검색어에 따라 검색 결과 필터링
      const filteredResults = searchResults.filter(result => result.title.includes(term));
      setSearchResults(filteredResults);
      setIsSearchActive(true);
      setNoResults(filteredResults.length === 0);
    }
  };
  

  return (
    <div className="w-[390px] mx-auto pt-[20px] bg-background min-h-screen">
      <div className="ml-[24px]">
        <SearchBar placeholder="김현주 열애설" onSearch={handleSearch} />
      </div>
      
      {/* 검색하지 않았고 결과가 존재할때 */}
      {!isSearchActive && !noResults && (
        <>
          <RecentSearches tags={tags} removeTag={removeTag} removeAllTags={removeAllTags} />
          <PopularSearches searches={totalPopularSearches} />
          <RecentDiscussions discussions={discussions} />
        </>
      )}

      {/* 검색했고 결과가 존재할때 */}
      {isSearchActive && !noResults && (
        <div>
          {searchResults.map((result, index) => (
            <SearchResultItem key={index} title={result.title} sources={result.sources} />
          ))}
        </div>
      )}

      {/* 결과가 없을때 */}
      {noResults && <ErrorPage />}
    </div>
  );
}

export default SearchPage;

