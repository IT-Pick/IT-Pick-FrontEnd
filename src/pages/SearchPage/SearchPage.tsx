import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import RecentSearches from './components/RecentSearches';
import PopularSearches from './components/PopularSearches';
import RecentDiscussions from './components/RecentDiscussions';
import SearchResultItem from './components/SearchResultItem';
import ErrorPage from './components/405ErrorPage';
// import PurpleBox from '../../assets/images/ico_purple_box.svg';
import { getKeyword } from '@apis/getKeyword';

const SearchPage: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);

  const [isSearchActive, setIsSearchActive] = useState(false);

  const [searchResults, setSearchResults] = useState<
    { title: string; sources?: string[] }[]
  >([]);

  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const storedTags = JSON.parse(
      localStorage.getItem('recentSearches') || '[]'
    );
    setTags(storedTags);
  }, []);

  const removeTag = (tagToRemove: string) => {
    // setTags(tags.filter(tag => tag !== tagToRemove));
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    localStorage.setItem('recentSearches', JSON.stringify(updatedTags));
  };

  const removeAllTags = () => {
    setTags([]);
    localStorage.removeItem('recentSearches');
  };

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
          item.namuwikiRank !== -1 ? `나무위키 ${item.namuwikiRank}등` : '',
        ].filter((tag) => tag !== ''); // 빈 문자열 제거

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
    <div className="w-custom max-w-custom mx-auto pt-[20px] bg-background h-full">
      <div className="mx-[24px]">
        <SearchBar placeholder="올림픽" onSearch={handleSearch} />
      </div>

      {/* 검색하지 않았고 결과가 존재할때 */}
      {!isSearchActive && !noResults && (
        <>
          <RecentSearches
            tags={tags}
            removeTag={removeTag}
            removeAllTags={removeAllTags}
          />
          <PopularSearches />
          <RecentDiscussions />
        </>
      )}

      {/* 검색했고 결과가 존재할때 */}
      {isSearchActive && !noResults && (
        <div>
          {searchResults.map((result, index) => (
            <SearchResultItem
              key={index}
              title={result.title}
              sources={result.sources}
            />
          ))}
        </div>
      )}

      {/* 결과가 없을때 */}
      {noResults && <ErrorPage />}
    </div>
  );
};

export default SearchPage;
