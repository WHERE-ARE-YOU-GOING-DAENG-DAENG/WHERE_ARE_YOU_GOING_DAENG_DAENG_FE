import React from "react";
import styled from "styled-components";

const FavoriteListContainer = styled.div`
  width: 466px;
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
  margin-left: 34px;
  margin-bottom: 42px;
`;

const FavoriteListPicture = styled.div`
  width: 110px;
  height: 140px;
  border-radius: 10px;
  background-color: #e0e0e0;
  margin-right: 15px;
`;

const FavoritePlaceTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.color || "#FF69A9"};
  margin-top: 65px;
`;

const FavoritePlace = styled.p`
  font-size: 15px;
  color: #808080;
`;

const FavoritePlaceTime = styled.p`
  font-size: 12px;
  color: black;
`;

const DeleteButton = styled.button`
  width: 49px;
  height: 22px;
  background-color: #d9d9d9;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  font-size: 10px;
  text-align: center;
  margin-left: 240px;

  &:hover {
    background-color: #c4c4c4;
    font-weight: bold;
  }
`;

function FavoriteList({ title, place, time, color }) {
  return (
    <FavoriteListContainer>
      <FavoriteInfoContainer>
        <FavoritePlaceTitle color={color}>{title}</FavoritePlaceTitle>
        <FavoritePlace>{place}</FavoritePlace>
        <FavoritePlaceTime>{time}</FavoritePlaceTime>
        <DeleteButton>삭제</DeleteButton>
      </FavoriteInfoContainer>
      <FavoriteListPicture />
    </FavoriteListContainer>
  );
}

export default FavoriteList;
