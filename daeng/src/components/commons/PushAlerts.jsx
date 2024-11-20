import React from "react";
import styled from "styled-components";
import DeleteBtn from "../commons/DeleteBtn";

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

  @media (max-width: 554px) {
    width: 100%; 
    height: auto; 
    flex-direction: column; 
    padding: 15px; 
  }
`;

const FavoriteInfoContainer = styled.div`
  margin-left: 34px;
  margin-bottom: 42px;

  @media (max-width: 554px) {
    margin-left: 0; 
    text-align: center; 
  }
`;

const FavoriteListPicture = styled.div`
  width: 110px;
  height: 140px;
  border-radius: 10px;
  background-color: #e0e0e0;
  margin-right: 15px;

  @media (max-width: 554px) {
    width: 80px; 
    height: 100px;
    margin-bottom: 15px;
  }
`;

const FavoritePlaceTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.color || "#FF69A9"};
  margin-top: 65px;

  @media (max-width: 554px) {
    font-size: 18px;
    margin-top: 10px; 
  }
`;

const FavoritePlace = styled.p`
  font-size: 15px;
  color: #808080;

  @media (max-width: 554px) {
    font-size: 14px; 
  }
`;

const FavoritePlaceTime = styled.p`
  font-size: 12px;
  color: black;

  @media (max-width: 554px) {
    font-size: 11px;
  }
`;

function FavoriteList({ title, place, time, color }) {
  return (
    <FavoriteListContainer>
      <FavoriteInfoContainer>
        <FavoritePlaceTitle color={color}>{title}</FavoritePlaceTitle>
        <FavoritePlace>{place}</FavoritePlace>
        <FavoritePlaceTime>{time}</FavoritePlaceTime>
        <DeleteBtn label='삭제' />
      </FavoriteInfoContainer>
      <FavoriteListPicture />
    </FavoriteListContainer>
  );
}

export default FavoriteList;
