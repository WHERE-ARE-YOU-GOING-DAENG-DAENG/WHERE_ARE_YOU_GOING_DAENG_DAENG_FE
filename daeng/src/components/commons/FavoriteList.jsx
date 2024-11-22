import React from "react";
import styled from "styled-components";

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
  @media (max-width: 554px) {
    font-size: 18px;
  }
`;

const FavoritePlace = styled.p`
  font-size: 15px;
  color: #808080;
  margin: 5px 0;
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

function FavoriteList({ title, place, time, imgUrl }) {
  return (
    <FavoriteListContainer>
      <FavoriteInfoContainer>
        <FavoritePlaceTitle>{title}</FavoritePlaceTitle>
        <FavoritePlace>{place}</FavoritePlace>
        <FavoritePlaceTime>{time}</FavoritePlaceTime>
      </FavoriteInfoContainer>
      <FavoriteListPicture imgUrl={imgUrl} /> 
    </FavoriteListContainer>
  );
}

export default FavoriteList;
