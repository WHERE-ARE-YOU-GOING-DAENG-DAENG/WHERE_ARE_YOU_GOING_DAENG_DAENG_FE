import { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import searchIcon from "../../assets/icons/footer_search.svg";
import footerHoverSearch from "../../assets/icons/footer_hover_search.svg";

const SearchBar = ({ placeholder, onSearch }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (keyword) => {
    if (!keyword) {
      setSuggestions([]);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.daengdaeng-where.link/api/v1/places/autocomplete?keyword=${keyword}`
      );
      const data = await response.json();
      setSuggestions(data.data || []);
    } catch (error) {
      console.error("자동검색어 불러오는 중 오류 발생:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [value]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && onSearch) {
      setSuggestions([]);
      onSearch(value);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      setSuggestions([]);
      onSearch(value);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSuggestions([]);
    setValue(suggestion);
    if (onSearch) {
      onSearch(suggestion);
    }
  };

  return (
    <SearchBarContainer>
      <Input
        type="text"
        placeholder={placeholder || "원하는 장소나 위치를 검색해보세요!"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SearchIcon
        src={isHovered ? footerHoverSearch : searchIcon}
        alt="Search"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleSearchClick}
      />
      {suggestions.length > 0 && (
        <AutoCompleteList>
          {loading && <li>Loading...</li>}
          {!loading &&
            suggestions.map((item, index) => (
              <li key={index} onClick={() => handleSuggestionClick(item)}>
                {item}
              </li>
            ))}
        </AutoCompleteList>
      )}
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  position: relative;
  margin: 0 auto;
  margin-bottom: 17px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 456px;
  height: 59px;
  padding: 0 15px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;

  &:focus-within, &:hover {
    border-color: #ff4b98;
    box-shadow: 0 0 5px rgba(255, 75, 152, 0.5);
  }

  @media (max-width: 554px) {
    width: 80%;
    height: 50px;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #333;

  &::placeholder {
    color: #b3b3b3;
    font-size: 15px;
    font-weight: lighter;
    @media (max-width: 554px) {
      font-size: 13px;
    }
  }
  @media (max-width: 554px) {
    font-size: 14px;
  }
`;

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const AutoCompleteList = styled.ul`
  position: absolute;
  top: 74%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 0 0 10px 10px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  list-style: none;
  padding-left: 8px;

  li {
    text-align: left;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #f9f9f9;
    }
  }
`;

export default SearchBar;
