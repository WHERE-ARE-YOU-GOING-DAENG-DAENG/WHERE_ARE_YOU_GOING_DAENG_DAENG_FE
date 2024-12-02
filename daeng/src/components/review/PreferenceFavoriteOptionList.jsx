import React from "react";
import styled from "styled-components";
import PreferenceFavoriteOption from "../commons/PreferenceFavoriteOption";
import AlertDialog from "../../components/commons/SweetAlert";
import { placeFeatures } from "../../data/CommonCode";
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

function PreferenceFavoriteOptionList({ selectedOptions, onSelectOptions }) {
  const maxOptions = 3;

  const featureIcons = {
    PLACE_FTE_01: dogfood,
    PLACE_FTE_02: run,
    PLACE_FTE_03: water,
    PLACE_FTE_04: toilet,
    PLACE_FTE_05: bug,
    PLACE_FTE_06: cage,
    PLACE_FTE_07: dogFriend,
    PLACE_FTE_08: paperbag,
    PLACE_FTE_09: clean,
    PLACE_FTE_10: gongwon,
    PLACE_FTE_11: parkingLot,
  };

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

  return (
    <PreferenceFavoriteOptionContainer>
      {placeFeatures.map(({ codeId, name }) => (
        <PreferenceFavoriteOption
          key={codeId}
          label={name}
          icon={featureIcons[codeId]} 
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
