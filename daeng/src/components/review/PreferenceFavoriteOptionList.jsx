import React from 'react'
import styled from "styled-components";
import PreferenceFavoriteOption from '../commons/PreferenceFavoriteOption';
import dogfood from '../../assets/icons/dogFood.svg'
import run from '../../assets/icons/run.svg'
import water from '../../assets/icons/water.svg'
import toilet from '../../assets/icons/toilet.svg'
import bug from '../../assets/icons/bug.svg'
import cage from '../../assets/icons/cage.svg'
import dogFriend from '../../assets/icons/dogFriend.svg'
import paperbag from '../../assets/icons/paperbag.svg'
import clean from '../../assets/icons/clean.svg'
import gongwon from '../../assets/icons/gongwon.svg'
import parkingLot from '../../assets/icons/parkingLot.svg'

const PreferenceFavoriteOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; 
  margin-top: 10px;
  gap : 3px;


  @media (max-width: 554px) {
    gap: 0px;
  }
`

function PreferenceFavoriteOptionList() {
  return (
    <PreferenceFavoriteOptionContainer>
      <PreferenceFavoriteOption label="강아지 전용 음식이 있어요" icon={dogfood}/>
      <PreferenceFavoriteOption label="뛰어놀기 좋아요" icon={run} size="small"/>
      <PreferenceFavoriteOption label="급수대가 있어요" icon={water} size="small"/>
      <PreferenceFavoriteOption label="화장실이 있어요" icon={toilet} size="small"/>
      <PreferenceFavoriteOption label="벌레가 별로 없어요" icon={bug} size="small"/>
      <PreferenceFavoriteOption label="철장으로 막혀있어요" icon={cage}/>
      <PreferenceFavoriteOption label="강아지 친구들이 많아요" icon={dogFriend}/>
      <PreferenceFavoriteOption label="배변봉투가 구비되어 있어요" icon={paperbag} size="small"/>
      <PreferenceFavoriteOption label="시설이 청결해요" icon={clean} size="small"/>
      <PreferenceFavoriteOption label="산책로가 있어요" icon={gongwon} size="small"/>
      <PreferenceFavoriteOption label="주차하기 편해요" icon={parkingLot} size="small"/>
    </PreferenceFavoriteOptionContainer>
  )
}

export default PreferenceFavoriteOptionList
