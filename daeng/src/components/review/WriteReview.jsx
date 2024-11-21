import React from 'react'
import styled from "styled-components";
import PreferenceFavoriteOptionList from './PreferenceFavoriteOptionList';

const WriteReviewAllContainer = styled.div`
  display: block;
  padding:3%;
  margin-left: 4%;
`
const WriteReviewContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const PlaceTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-right:50%;
  margin-bottom:27px;
  margin-left: 10px;

  @media (max-width: 554px) {
    font-size: 15px;
    margin-right:40%;
  }
`

const WriteReviewDate = styled.span`
  color: #B3B3B3;
  font-size: 13px;
`

const SelectPlaceOptionContainer = styled.div`
  width: auto;
  height: 266px;
  background-color: rgba(247, 247, 247, 0.78); 
  text-align:left;
  padding: 5%; 

  @media (max-width: 554px) {
    max-width: auto;
  }
`

const WhatPointLike = styled.span`  
    font-size: 14px;
    color: #333;
    font-weight: 600;
  
`
const SelectWarning = styled.span`
    font-size: 14px;
    color: #FF69A9;
    font-size: 10px;

  @media (max-width: 554px) {
    width: 95%;
  }
`

function WriteReview() {
  return (
    <WriteReviewAllContainer>
      <WriteReviewContainer>
        <PlaceTitle>
          가평 트리하우스 
        </PlaceTitle>
        <WriteReviewDate>2024-06-20</WriteReviewDate>
      </WriteReviewContainer>
      <SelectPlaceOptionContainer>
        <WhatPointLike>어떤 점이 좋았나요 ?</WhatPointLike><br />
        <SelectWarning>*이 장소에 맞는 키워드를 골라주세요 (1개~3개)</SelectWarning>
        <PreferenceFavoriteOptionList />
      </SelectPlaceOptionContainer>
    </WriteReviewAllContainer>
  )
} //더미데이터

export default WriteReview
