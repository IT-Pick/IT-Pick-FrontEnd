import React, { useState, useEffect } from 'react';
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

const SearchPage: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);

  const [isSearchActive, setIsSearchActive] = useState(false);

  const [searchResults, setSearchResults] = useState<{ title: string; sources?: string[] }[]>([]);

  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const storedTags = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setTags(storedTags);
  }, []);

  const removeTag = (tagToRemove: string) => {
    // setTags(tags.filter(tag => tag !== tagToRemove));
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    localStorage.setItem('recentSearches', JSON.stringify(updatedTags));
  };

  const removeAllTags = () => {
    setTags([]);
    localStorage.removeItem('recentSearches');
  };

  // const totalPopularSearches = [
  //   '김현주',
  //   '김현주 소속사',
  //   '김현주 열애설',
  //   '김현주 남친',
  //   '김현주',
  //   '김현주',
  //   '김현주',
  //   '김현주',
  // ];

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
      const response = await getKeyword(term);
      console.log('키워드 API 응답 데이터 확인', response);

      const keywordResults = response.result.map((item: KeywordResult) => {
        const sources = [
          item.nateRank !== -1 ? `네이트 ${item.nateRank}등` : '',
          item.naverRank !== -1 ? `네이버 ${item.naverRank}등` : '',
          item.zumRank !== -1 ? `줌 ${item.zumRank}등` : '',
          item.googleRank !== -1 ? `구글 ${item.googleRank}등` : '',
          item.namuwikiRank !== -1 ? `나무위키 ${item.namuwikiRank}등` : ''
        ].filter(tag => tag !== ''); // 빈 문자열 제거

        return {
          title: item.keyword,
          sources: sources.length > 0 ? sources : [],
        };
      });

      return keywordResults;
    } catch (error) {
      console.error('키워드 조회 중 오류:', error);
      throw error;
    }
  };


  const handleSearch = async (term: string) => {
    if (term === '') {
      setSearchResults([]);
      setIsSearchActive(false);
      setNoResults(false);
    } else {
      try {
        const results = await handleGetKeyword(term);
        setSearchResults(results);
        setIsSearchActive(true);
        setNoResults(results.length === 0);
        console.log('검색 결과 확인', results);
      } catch (error) {
        setNoResults(true);
        setIsSearchActive(true);
      }
    }
  };
  
  return (
    <div className="w-[390px] mx-auto pt-[20px] bg-background min-h-screen">
      <div className="ml-[24px]">
        <SearchBar placeholder="김현주 열애설" onSearch={handleSearch} />
      </div>
      
      {!isSearchActive && !noResults && (
        <>
          <RecentSearches tags={tags} removeTag={removeTag} removeAllTags={removeAllTags} />
          <PopularSearches />
          <RecentDiscussions discussions={discussions} />
        </>
      )}

      {isSearchActive && !noResults && (
        <div>
          {searchResults.map((result, index) => (
            <SearchResultItem key={index} title={result.title} sources={result.sources} />
          ))}
        </div>
      )}

      {noResults && <ErrorPage />}
    </div>
  );
}

export default SearchPage;

