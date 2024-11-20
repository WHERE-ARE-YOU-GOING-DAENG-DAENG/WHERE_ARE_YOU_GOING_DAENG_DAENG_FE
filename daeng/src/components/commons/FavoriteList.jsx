import React from "react";
import styled from "styled-components";

const FavoriteListContainer = styled.div`
  width: 430px;
  height: 151px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;

  @media (max-width: 554px) {
    width: 400px;
    height: 151px;
  }
`;

const FavoriteInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 40px;
  text-align: left;
  margin-top:10px;

  @media (max-width: 554px) {
    margin-bottom: 20px;
  }
`;

const FavoriteListPicture = styled.div`
  width: 110px;
  height: 140px;
  border-radius: 10px;
  background-color: #e0e0e0;
  margin-right: 15px;
  background-image: url(${(props) => props.imgUrl});  // 이미지 URL을 props로 받도록 수정
  background-size: cover;
  background-position: center;

  @media (max-width: 554px) {
    width: 100px;
    height: 120px;
  }
`;

const FavoritePlaceTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.color || "#FF69A9"};
  margin: 0; 
`;

const FavoritePlace = styled.p`
  font-size: 15px;
  color: #808080;
  margin: 5px 0;
`;

const FavoritePlaceTime = styled.p`
  font-size: 12px;
  color: black;
  margin: 5px 0;
`;

function FavoriteList({ title, place, time, color, imgUrl }) {
  return (
    <FavoriteListContainer>
      <FavoriteInfoContainer>
        <FavoritePlaceTitle color={color}>{title}</FavoritePlaceTitle>
        <FavoritePlace>{place}</FavoritePlace>
        <FavoritePlaceTime>{time}</FavoritePlaceTime>
      </FavoriteInfoContainer>
      <FavoriteListPicture imgUrl={imgUrl} /> 
    </FavoriteListContainer>
  );
}

export default FavoriteList;
