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

function PreferenceFavoriteOptionList({ selectedOptions, onSelectOptions }) {
  const maxOptions = 3;

  const handleOptionClick = (codeId) => {
    if (selectedOptions.length >= maxOptions && !selectedOptions.includes(codeId)) {
      AlertDialog({
        mode: "alert",
        title: "선택 초과",
        text: "최대 3개만 선택 가능합니다.",
        confirmText: "확인",
      });
      return;
    }

    const newSelectedOptions = selectedOptions.includes(codeId)
      ? selectedOptions.filter((option) => option !== codeId)
      : [...selectedOptions, codeId];

    onSelectOptions(newSelectedOptions);
  };

  const options = [
    { codeId: "PLACE_FTE_01", label: "강아지 전용 음식이 있어요", icon: dogfood },
    { codeId: "PLACE_FTE_02", label: "뛰어놀기 좋아요", icon: run },
    { codeId: "PLACE_FTE_03", label: "급수대가 있어요", icon: water },
    { codeId: "PLACE_FTE_04", label: "화장실이 있어요", icon: toilet },
    { codeId: "PLACE_FTE_05", label: "벌레가 별로 없어요", icon: bug },
    { codeId: "PLACE_FTE_06", label: "철장으로 막혀있어요", icon: cage },
    { codeId: "PLACE_FTE_07", label: "강아지 친구들이 많아요", icon: dogFriend },
    { codeId: "PLACE_FTE_08", label: "배변봉투가 구비되어 있어요", icon: paperbag },
    { codeId: "PLACE_FTE_09", label: "시설이 청결해요", icon: clean },
    { codeId: "PLACE_FTE_10", label: "산책로가 있어요", icon: gongwon },
    { codeId: "PLACE_FTE_11", label: "주차하기 편해요", icon: parkingLot },
  ];

  return (
    <PreferenceFavoriteOptionContainer>
      {options.map(({ codeId, label, icon }) => (
        <PreferenceFavoriteOption
          key={codeId}
          label={label}
          icon={icon}
          isSelected={selectedOptions.includes(codeId)}
          onClick={() => handleOptionClick(codeId)}
        />
      ))}
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
    gap: 6px;
    margin-top: 20px;
  }
`;

export default PreferenceFavoriteOptionList;
