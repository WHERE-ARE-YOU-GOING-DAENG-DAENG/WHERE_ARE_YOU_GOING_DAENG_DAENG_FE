import { useState } from 'react';
import styled from "styled-components";
import PreferenceFavoriteOption from '../commons/PreferenceFavoriteOption';
import dogfood from '../../assets/icons/dogFood.svg';
import run from '../../assets/icons/run.svg';
import water from '../../assets/icons/water.svg';
import toilet from '../../assets/icons/toilet.svg';
import bug from '../../assets/icons/bug.svg';
import cage from '../../assets/icons/cage.svg';
import dogFriend from '../../assets/icons/dogFriend.svg';
import paperbag from '../../assets/icons/paperbag.svg';
import clean from '../../assets/icons/clean.svg';
import gongwon from '../../assets/icons/gongwon.svg';
import parkingLot from '../../assets/icons/parkingLot.svg';

function PreferenceFavoriteOptionList() {
  const [selectedOptions, setSelectedOptions] = useState([]); 

  const handleOptionClick = (label) => {
    if (selectedOptions.length >= 3 && !selectedOptions.includes(label)) {
      alert("최대 3개만 선택 가능합니다."); 
      return;
    }

    setSelectedOptions((prev) => {
      if (prev.includes(label)) {
        return prev.filter(option => option !== label);  
      } else {
        return [...prev, label];  
      }
    });
  };

  return (
    <PreferenceFavoriteOptionContainer>
      <PreferenceFavoriteOption 
        label="강아지 전용 음식이 있어요" 
        icon={dogfood}
        isSelected={selectedOptions.includes("강아지 전용 음식이 있어요")}
        onClick={() => handleOptionClick("강아지 전용 음식이 있어요")} 
      />
      <PreferenceFavoriteOption 
        label="뛰어놀기 좋아요" 
        icon={run} 
        isSelected={selectedOptions.includes("뛰어놀기 좋아요")}
        onClick={() => handleOptionClick("뛰어놀기 좋아요")} 
      />
      <PreferenceFavoriteOption 
        label="급수대가 있어요" 
        icon={water}
        isSelected={selectedOptions.includes("급수대가 있어요")}
        onClick={() => handleOptionClick("급수대가 있어요")} 
      />
      <PreferenceFavoriteOption 
        label="화장실이 있어요" 
        icon={toilet} 
        isSelected={selectedOptions.includes("화장실이 있어요")}
        onClick={() => handleOptionClick("화장실이 있어요")} 
      />
      <PreferenceFavoriteOption 
        label="벌레가 별로 없어요" 
        icon={bug} 
        isSelected={selectedOptions.includes("벌레가 별로 없어요")}
        onClick={() => handleOptionClick("벌레가 별로 없어요")} 
      />
      <PreferenceFavoriteOption 
        label="철장으로 막혀있어요" 
        icon={cage} 
        isSelected={selectedOptions.includes("철장으로 막혀있어요")}
        onClick={() => handleOptionClick("철장으로 막혀있어요")} 
      />
      <PreferenceFavoriteOption 
        label="강아지 친구들이 많아요" 
        icon={dogFriend} 
        isSelected={selectedOptions.includes("강아지 친구들이 많아요")}
        onClick={() => handleOptionClick("강아지 친구들이 많아요")} 
      />
      <PreferenceFavoriteOption 
        label="배변봉투가 구비되어 있어요" 
        icon={paperbag} 
        isSelected={selectedOptions.includes("배변봉투가 구비되어 있어요")}
        onClick={() => handleOptionClick("배변봉투가 구비되어 있어요")} 
      />
      <PreferenceFavoriteOption 
        label="시설이 청결해요" 
        icon={clean} 
        isSelected={selectedOptions.includes("시설이 청결해요")}
        onClick={() => handleOptionClick("시설이 청결해요")} 
      />
      <PreferenceFavoriteOption 
        label="산책로가 있어요" 
        icon={gongwon} 
        isSelected={selectedOptions.includes("산책로가 있어요")}
        onClick={() => handleOptionClick("산책로가 있어요")} 
      />
      <PreferenceFavoriteOption 
        label="주차하기 편해요" 
        icon={parkingLot} 
        isSelected={selectedOptions.includes("주차하기 편해요")}
        onClick={() => handleOptionClick("주차하기 편해요")} 
      />
    </PreferenceFavoriteOptionContainer>
  );
}

const PreferenceFavoriteOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 3px;

  @media (max-width: 554px) {
    gap: 0px;
  }
`;

export default PreferenceFavoriteOptionList;
