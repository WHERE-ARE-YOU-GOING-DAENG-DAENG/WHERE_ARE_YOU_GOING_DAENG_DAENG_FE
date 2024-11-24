import React from "react";
import styled from "styled-components";
import DeleteBtn from "./DeleteBtn";

const FavoriteListContainer = styled.div`
  width: 80%;
  height: 151px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  position: relative;
`;

const FavoriteInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
  text-align: left;
  margin-top:10px;
  margin-bottom: 10px;
`;

const FavoriteListPicture = styled.div`
  width: 100px;
  height: 120px;
  border-radius: 10px;
  background-color: #e0e0e0;
  margin: 0px 15px;
  background-image: url(${(props) => props.imgUrl});  // 이미지 URL을 props로 받도록 수정
  background-size: cover;
  background-position: center;
`;

const FavoritePlaceTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #FF69A9;
  margin: 0;
  cursor: pointer;
  img{
    margin-left: 10px;
  }
  @media (max-width: 554px) {
    font-size: 18px;
  }
`;

const FavoritePlace = styled.p`
  font-size: 15px;
  color: #808080;
  margin: 5px 0;
  cursor: pointer;
  @media (max-width: 554px) {
    font-size: 13px;
  }
`;

const FavoritePlaceTime = styled.p`
  font-size: 12px;
  color: black;
  margin: 0;
  @media (max-width: 554px) {
    font-size: 10px;
  }
`;

const DeleteButtonWrapper = styled.div`
  position: absolute; /* 부모 요소를 기준으로 위치 조정 */
  padding-right: 40px;
  bottom: 10px; /* 아래에서 10px */
  right: 25%; /* 오른쪽에서 10px */
`;

function FavoriteList({ title, icon, place, time, imgUrl, onTitleClick, onPlaceClick, onDelete }) {
  return (
    <FavoriteListContainer>
      <FavoriteInfoContainer>
        <FavoritePlaceTitle onClick={onTitleClick}>
          {title}
          <img src={icon} alt="아이콘" />
        </FavoritePlaceTitle>
        <FavoritePlace onClick={onPlaceClick}>{place}</FavoritePlace>
        <FavoritePlaceTime>{time}</FavoritePlaceTime> 
      </FavoriteInfoContainer>
      <FavoriteListPicture imgUrl={imgUrl} />
      <DeleteButtonWrapper>
        <DeleteBtn label="삭제" onClick={onDelete} /> {/* 삭제 버튼 배치 */}
      </DeleteButtonWrapper>
    </FavoriteListContainer>
  );
}

export default FavoriteList;
