import { useState } from "react";
import styled from "styled-components";
import ConfirmBtn from "../commons/ConfirmBtn";
import PreferencePlaceOption from "../commons/PreferencePlaceOption";
import PreferenceFavoriteOption from "../commons/PreferenceFavoriteOption";
import restaurantIcon from "../../assets/icons/restaurant.svg";
import cafeIcon from "../../assets/icons/cafe.svg";
import parkIcon from "../../assets/icons/park.svg";
import houseIcon from "../../assets/icons/house.svg";
import galleryIcon from "../../assets/icons/gallery.svg";
import playgroundIcon from "../../assets/icons/playground.svg";
import travelIcon from "../../assets/icons/travel.svg";
import museumIcon from "../../assets/icons/museum.svg";
import filmIcon from "../../assets/icons/film.svg";
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

function PreferenceEdit() {
  const [selectedPlaceOptions, setSelectedPlaceOptions] = useState([]);
  const [selectedFavoriteOptions, setSelectedFavoriteOptions] = useState([]);

  const handlePlaceOptionClick = (label) => {
    if (selectedPlaceOptions.length >= 3 && !selectedPlaceOptions.includes(label)) {
      alert("최대 3개만 선택 가능합니다.");
      return;
    }

    setSelectedPlaceOptions((prev) =>
      prev.includes(label)
        ? prev.filter((option) => option !== label)
        : [...prev, label]
    );
  };

  const handleFavoriteOptionClick = (label) => {
    if (selectedFavoriteOptions.length >= 3 && !selectedFavoriteOptions.includes(label)) {
      alert("최대 3개만 선택 가능합니다.");
      return;
    }

    setSelectedFavoriteOptions((prev) =>
      prev.includes(label)
        ? prev.filter((option) => option !== label)
        : [...prev, label]
    );
  };

  return (
    <Wrap>
      <Section>
        <Title>어떤 시설에 관심이 많으신가요?</Title>
        <StyledParagraph>* 최소 1개 ~ 3개 선택가능</StyledParagraph>
        <OptionContainer>
          <PreferencePlaceOption
            label="음식점"
            icon={restaurantIcon}
            isSelected={selectedPlaceOptions.includes("01")}
            onClick={() => handlePlaceOptionClick("01")}
          />
          <PreferencePlaceOption
            label="카페"
            icon={cafeIcon}
            isSelected={selectedPlaceOptions.includes("02")}
            onClick={() => handlePlaceOptionClick("02")}
          />
          <PreferencePlaceOption
            label="공원"
            icon={parkIcon}
            isSelected={selectedPlaceOptions.includes("03")}
            onClick={() => handlePlaceOptionClick("03")}
          />
          <PreferencePlaceOption
            label="숙소"
            icon={houseIcon}
            isSelected={selectedPlaceOptions.includes("04")}
            onClick={() => handlePlaceOptionClick("04")}
          />
          <PreferencePlaceOption
            label="미술관"
            icon={galleryIcon}
            isSelected={selectedPlaceOptions.includes("05")}
            onClick={() => handlePlaceOptionClick("05")}
          />
          <PreferencePlaceOption
            label="놀이터"
            icon={playgroundIcon}
            isSelected={selectedPlaceOptions.includes("06")}
            onClick={() => handlePlaceOptionClick("06")}
          />
          <PreferencePlaceOption
            label="여행지"
            icon={travelIcon}
            isSelected={selectedPlaceOptions.includes("07")}
            onClick={() => handlePlaceOptionClick("07")}
          />
          <PreferencePlaceOption
            label="박물관"
            icon={museumIcon}
            isSelected={selectedPlaceOptions.includes("08")}
            onClick={() => handlePlaceOptionClick("08")}
          />
          <PreferencePlaceOption
            label="문예회관"
            icon={filmIcon}
            isSelected={selectedPlaceOptions.includes("09")}
            onClick={() => handlePlaceOptionClick("09")}
          />
        </OptionContainer>
      </Section>

      <Section>
        <Title>어떤 부분이 중요하신가요?</Title>
        <StyledParagraph>* 최소 1개 ~ 3개 선택가능</StyledParagraph>
        <OptionContainer>
          <PreferenceFavoriteOption
            label="강아지 전용 음식이 있어요"
            icon={dogfood}
            isSelected={selectedFavoriteOptions.includes("01")}
            onClick={() => handleFavoriteOptionClick("01")}
          />
          <PreferenceFavoriteOption
            label="뛰어놀기 좋아요"
            icon={run}
            isSelected={selectedFavoriteOptions.includes("02")}
            onClick={() => handleFavoriteOptionClick("02")}
          />
          <PreferenceFavoriteOption
            label="급수대가 있어요"
            icon={water}
            isSelected={selectedFavoriteOptions.includes("03")}
            onClick={() => handleFavoriteOptionClick("03")}
          />
          <PreferenceFavoriteOption
            label="화장실이 있어요"
            icon={toilet}
            isSelected={selectedFavoriteOptions.includes("04")}
            onClick={() => handleFavoriteOptionClick("04")}
          />
          <PreferenceFavoriteOption
            label="벌레가 별로 없어요"
            icon={bug}
            isSelected={selectedFavoriteOptions.includes("05")}
            onClick={() => handleFavoriteOptionClick("05")}
          />
          <PreferenceFavoriteOption
            label="철장으로 막혀있어요"
            icon={cage}
            isSelected={selectedFavoriteOptions.includes("06")}
            onClick={() => handleFavoriteOptionClick("06")}
          />
          <PreferenceFavoriteOption
            label="강아지 친구들이 많아요"
            icon={dogFriend}
            isSelected={selectedFavoriteOptions.includes("07")}
            onClick={() => handleFavoriteOptionClick("07")}
          />
          <PreferenceFavoriteOption
            label="배변봉투가 구비되어 있어요"
            icon={paperbag}
            isSelected={selectedFavoriteOptions.includes("08")}
            onClick={() => handleFavoriteOptionClick("08")}
          />
          <PreferenceFavoriteOption
            label="시설이 청결해요"
            icon={clean}
            isSelected={selectedFavoriteOptions.includes("09")}
            onClick={() => handleFavoriteOptionClick("09")}
          />
          <PreferenceFavoriteOption
            label="산책로가 있어요"
            icon={gongwon}
            isSelected={selectedFavoriteOptions.includes("10")}
            onClick={() => handleFavoriteOptionClick("10")}
          />
          <PreferenceFavoriteOption
            label="주차하기 편해요"
            icon={parkingLot}
            isSelected={selectedFavoriteOptions.includes("11")}
            onClick={() => handleFavoriteOptionClick("11")}
          />
        </OptionContainer>
      </Section>
      <StyledParagraph2>
        보호자님과 우리 댕댕이 맞춤 장소 추천을 위해 필요한 정보입니다.
      </StyledParagraph2>

      <Footer>
        <ConfirmBtn label="수정완료" />
      </Footer>
    </Wrap>
  );
}

const Wrap = styled.div`
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h3`
  text-align: left;
  margin-left: 10px;
  font-size: 16px;
  margin-bottom: 10px;

  @media (max-width: 554px) {
    font-size: 14px;
    margin-left: 20px;
  }
`;

const StyledParagraph = styled.p`
  font-size: 9px;
  color: #ff69a9;
  font-weight: bold;
  margin-top: 9px;
  margin-left: 10px;
  display: flex;

  @media (max-width: 554px) {
    font-size: 8px;
    margin-left: 20px;
  }
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 5px;
  margin-left: 5px;

  @media (max-width: 554px) {
    gap: 3px;
  }
`;

const StyledParagraph2 = styled.p`
  font-size: 8px;
  color: red;
  font-weight: bold;
  margin-top: 80px;
  margin-left: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;

  @media (max-width: 554px) {
    font-size: 7px;
    margin-left: 10px;
    text-align: center;
  }
`;

const Footer = styled.div`
  margin-left: 15px;
  padding-bottom: 10px;

  @media (max-width: 554px) {
    margin-left: 20px;
  }
`;

export default PreferenceEdit;
