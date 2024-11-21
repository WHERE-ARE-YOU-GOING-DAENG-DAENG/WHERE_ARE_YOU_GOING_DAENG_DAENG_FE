import { useState } from "react";
import styled from "styled-components";
import PreferencePlaceOption from "../commons/PreferencePlaceOption";
import restaurantIcon from "../../assets/icons/restaurant.svg";
import cafeIcon from "../../assets/icons/cafe.svg";
import parkIcon from "../../assets/icons/park.svg";
import houseIcon from "../../assets/icons/house.svg";
import galleryIcon from "../../assets/icons/gallery.svg";
import playgroundIcon from "../../assets/icons/playground.svg";
import travelIcon from "../../assets/icons/travel.svg";
import museumIcon from "../../assets/icons/museum.svg";
import filmIcon from "../../assets/icons/film.svg";

const PreferencePlaceOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 5px;

  @media (max-width: 554px) {
    gap: 3px;
  }
`;

function PreferencePlaceOptionList() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (label) => {
    if (selectedOptions.length >= 3 && !selectedOptions.includes(label)) {
      alert("최대 3개만 선택 가능합니다.");
      return;
    }

    setSelectedOptions((prev) => {
      if (prev.includes(label)) {
        return prev.filter((option) => option !== label);
      } else {
        return [...prev, label];
      }
    });
  };

  return (
    <PreferencePlaceOptionContainer>
      <PreferencePlaceOption
        label="음식점"
        icon={restaurantIcon}
        isSelected={selectedOptions.includes("음식점")}
        onClick={() => handleOptionClick("음식점")}
      />
      <PreferencePlaceOption
        label="카페"
        icon={cafeIcon}
        isSelected={selectedOptions.includes("카페")}
        onClick={() => handleOptionClick("카페")}
      />
      <PreferencePlaceOption
        label="공원"
        icon={parkIcon}
        isSelected={selectedOptions.includes("공원")}
        onClick={() => handleOptionClick("공원")}
      />
      <PreferencePlaceOption
        label="숙소"
        icon={houseIcon}
        isSelected={selectedOptions.includes("숙소")}
        onClick={() => handleOptionClick("숙소")}
      />
      <PreferencePlaceOption
        label="미술관"
        icon={galleryIcon}
        isSelected={selectedOptions.includes("미술관")}
        onClick={() => handleOptionClick("미술관")}
      />
      <PreferencePlaceOption
        label="놀이터"
        icon={playgroundIcon}
        isSelected={selectedOptions.includes("놀이터")}
        onClick={() => handleOptionClick("놀이터")}
      />
      <PreferencePlaceOption
        label="여행지"
        icon={travelIcon}
        isSelected={selectedOptions.includes("여행지")}
        onClick={() => handleOptionClick("여행지")}
      />
      <PreferencePlaceOption
        label="박물관"
        icon={museumIcon}
        isSelected={selectedOptions.includes("박물관")}
        onClick={() => handleOptionClick("박물관")}
      />
      <PreferencePlaceOption
        label="문예회관"
        icon={filmIcon}
        isSelected={selectedOptions.includes("문예회관")}
        onClick={() => handleOptionClick("문예회관")}
      />
    </PreferencePlaceOptionContainer>
  );
}

export default PreferencePlaceOptionList;
