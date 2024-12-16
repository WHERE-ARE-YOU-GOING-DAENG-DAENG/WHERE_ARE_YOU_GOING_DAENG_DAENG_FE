import React from "react";
import styled from "styled-components";
import DeleteBtn from "./DeleteBtn";

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
        <DeleteBtn label="삭제" onClick={onDelete} />
      </DeleteButtonWrapper>
    </FavoriteListContainer>
  );
}
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
  @media (max-width: 554px) {
    height: 130px;
  }
  @media (max-width: 450px) {
    height: 120px;
    padding: 8px;
  }
`;

const FavoriteInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
  text-align: left;
  margin-bottom: 10px;
`;

const FavoriteListPicture = styled.div`
  width: 100px;
  height: 120px;
  border-radius: 10px;
  background-color: #e0e0e0;
  margin: 0px 15px;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;

  @media (max-width: 554px) {
    width: 90px;
    height: 108px;
  }
  @media (max-width: 450px) {
    width: 80px;
    height: 96px;
  }
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

    img{
      width: 20px;
      margin-left: 8px;
    }
  }

   @media (max-width: 450px) {
    font-size: 17px;

    img{
      width: 15px;
      margin-left: 5px;
    }
  }
`;

const FavoritePlace = styled.p`
  font-size: 15px;
  color: #808080;
  margin: 5px 0;
  cursor: pointer;
  font-weight: normal !important;
  @media (max-width: 554px) {
    font-size: 13px;
  }
  @media (max-width: 450px) {
    font-size: 11px;
  }
`;

const FavoritePlaceTime = styled.p`
  font-size: 12px;
  color: black;
  margin: 0;
  font-weight: normal !important;
  @media (max-width: 554px) {
    font-size: 11px;
  }
    @media (max-width: 450px) {
    font-size: 10px;
  }
`;

const DeleteButtonWrapper = styled.div`
  position: absolute;
  padding-right: 40px;
  bottom: 25px; 
  right: 95px;
  @media (max-width: 554px) {
    bottom: 20px;
    right: 81px;
  }
  @media (max-width: 450px) {
    bottom: 20px;
    right: 68px;
`;

export default FavoriteList;
