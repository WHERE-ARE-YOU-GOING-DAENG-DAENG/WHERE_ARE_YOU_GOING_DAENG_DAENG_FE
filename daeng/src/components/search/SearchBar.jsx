import { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import searchIcon from "../../assets/icons/footer_search.svg";
import footerHoverSearch from "../../assets/icons/footer_hover_search.svg";

const SearchBarContainer = styled.div`
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

const SearchBar = ({ placeholder, onSearch, query }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState("");

  useEffect(()=>{
    if (query === "") {
      setValue("");
    }
  },[query])

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(value);
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
    </SearchBarContainer>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
};

export default SearchBar;
