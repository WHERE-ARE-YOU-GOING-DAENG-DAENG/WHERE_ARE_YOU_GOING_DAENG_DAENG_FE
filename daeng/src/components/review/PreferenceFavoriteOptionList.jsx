import React, { useState } from "react";
import styled from "styled-components";
import PreferenceFavoriteOption from "../commons/PreferenceFavoriteOption";
import dogfood from "../../assets/icons/dogFood.svg";
import run from "../../assets/icons/run.svg";
import water from "../../assets/icons/water.svg";
import toilet from "../../assets/icons/toilet.svg";
import bug from "../../assets/icons/bug.svg";
import cage from "../../assets/icons/cage.svg";
import dogFriend from "../../assets/icons/dogFriend.svg";
import paperbag from "../../assets/icons/paperbag.svg";
import clean from "../../assets/icons/clean.svg";
import gongwon from "../../assets/icons/gongwon.svg";
import parkingLot from "../../assets/icons/parkingLot.svg";
import AlertDialog from "../../components/commons/SweetAlert";

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

function PreferenceFavoriteOptionList() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const maxOptions = 3;

  const handleOptionClick = (label) => {
    if (selectedOptions.length >= maxOptions && !selectedOptions.includes(label)) {
      AlertDialog({
        mode: "alert",
        title: "선택 제한",
        text: `최대 ${maxOptions}개까지만 선택할 수 있습니다.`,
        confirmText: "닫기"
      });
      return;
    }

    setSelectedOptions((prev) =>
      prev.includes(label)
        ? prev.filter((option) => option !== label) // 선택 해제
        : [...prev, label] // 새로운 선택 추가
    );
  };

  const options = [
    { label: "강아지 전용 음식이 있어요", icon: dogfood },
    { label: "뛰어놀기 좋아요", icon: run },
    { label: "급수대가 있어요", icon: water },
    { label: "화장실이 있어요", icon: toilet },
    { label: "벌레가 별로 없어요", icon: bug },
    { label: "철장으로 막혀있어요", icon: cage },
    { label: "강아지 친구들이 많아요", icon: dogFriend },
    { label: "배변봉투가 구비되어 있어요", icon: paperbag },
    { label: "시설이 청결해요", icon: clean },
    { label: "산책로가 있어요", icon: gongwon },
    { label: "주차하기 편해요", icon: parkingLot },
  ];

  return (
    <PreferenceFavoriteOptionContainer>
      {options.map(({ label, icon }) => (
        <PreferenceFavoriteOption
          key={label}
          label={label}
          icon={icon}
          isSelected={selectedOptions.includes(label)}
          onClick={() => handleOptionClick(label)}
        />
      ))}
    </PreferenceFavoriteOptionContainer>
  );
}

export default PreferenceFavoriteOptionList;
