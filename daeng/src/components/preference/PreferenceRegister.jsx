import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeFeatures, placeTypes } from "../../data/CommonCode";
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
import AlertDialog from "../commons/SweetAlert";
import axios from "axios";

function PreferenceRegister() {
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

  const placeIcons = {
    PLACE_TYP_01: restaurantIcon,
    PLACE_TYP_02: cafeIcon,
    PLACE_TYP_03: parkIcon,
    PLACE_TYP_04: houseIcon,
    PLACE_TYP_05: playgroundIcon,
    PLACE_TYP_06: travelIcon,
    PLACE_TYP_07: galleryIcon,
    PLACE_TYP_08: museumIcon,
    PLACE_TYP_09: filmIcon,
  };

  const navigate = useNavigate();
  const [selectedPlaceOptions, setSelectedPlaceOptions] = useState([]);
  const [selectedFavoriteOptions, setSelectedFavoriteOptions] = useState([]);

  const handleOptionClick = (selectedOptions, setSelectedOptions, code) => {
    if (selectedOptions.length >= 3 && !selectedOptions.includes(code)) {
      AlertDialog({
        mode: "alert",
        title: "선택 초과",
        text: "최대 3개만 선택 가능합니다.",
        confirmText: "확인",
        onConfirm: () => console.log("확인 버튼 클릭됨"),
      });
      return;
    }

    setSelectedOptions((prev) =>
      prev.includes(code) ? prev.filter((option) => option !== code) : [...prev, code]
    );
  };

  const handleConfirm = async () => {
    if (selectedPlaceOptions.length === 0 || selectedFavoriteOptions.length === 0) {
      AlertDialog({
        mode: "alert",
        title: "항목 선택 필요",
        text: "시설과 선호 항목을 각각 최소 1개 이상 선택해 주세요.",
        confirmText: "확인",
        onConfirm: () => console.log("필수 항목 선택 경고 확인됨"),
      });
      return;
    }

    const placePayload = {
      preferenceInfo: "PLACE_TYP",
      preferenceTypes: selectedPlaceOptions,
    };

    const favoritePayload = {
      preferenceInfo: "PLACE_FTE",
      preferenceTypes: selectedFavoriteOptions,
    };

    try {
      const response1 = await axios.post(
        "https://www.daengdaeng-where.link/api/v1/preferences",
        placePayload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Response1 데이터:", response1.data);

      const response2 = await axios.post(
        "https://www.daengdaeng-where.link/api/v1/preferences",
        favoritePayload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Response2 데이터:", response2.data);

      AlertDialog({
        mode: "alert",
        title: "등록 성공",
        text: "선호 정보가 성공적으로 등록되었습니다!",
        confirmText: "확인",
        icon: "success",
        onConfirm: () => {
          console.log("등록 성공 확인됨");
          navigate("/");
        },
      });
    } catch (error) {
      if (error.response?.status === 409) {
        AlertDialog({
          mode: "alert",
          title: "등록 실패",
          text: "이미 등록된 선호도입니다.",
          confirmText: "확인",
          onConfirm: () => navigate("/main"),
        });
      } else if (error.response) {
        console.error("등록 실패:", error.response.data);
        AlertDialog({
          mode: "alert",
          title: "등록 실패",
          text: error.response.data.message || "알 수 없는 오류가 발생했습니다.",
          confirmText: "확인",
        });
      }
    }
  };

  return (
    <Wrap>
      <Section>
        <Title>어떤 시설에 관심이 많으신가요?</Title>
        <StyledParagraph>* 최소 1개 ~ 3개 선택가능</StyledParagraph>
        <OptionContainer>
          {placeTypes.map(({ codeId, name }) => (
            <PreferencePlaceOption
              key={codeId}
              label={name}
              icon={placeIcons[codeId]}
              isSelected={selectedPlaceOptions.includes(codeId)}
              onClick={() =>
                handleOptionClick(selectedPlaceOptions, setSelectedPlaceOptions, codeId)
              }
            />
          ))}
        </OptionContainer>
      </Section>

      <Section>
        <Title>어떤 부분이 중요하신가요?</Title>
        <StyledParagraph>* 최소 1개 ~ 3개 선택가능</StyledParagraph>
        <OptionContainer>
          {placeFeatures.map(({ codeId, name }) => (
            <PreferenceFavoriteOption
              key={codeId}
              label={name}
              icon={featureIcons[codeId]}
              isSelected={selectedFavoriteOptions.includes(codeId)}
              onClick={() =>
                handleOptionClick(selectedFavoriteOptions, setSelectedFavoriteOptions, codeId)
              }
            />
          ))}
        </OptionContainer>
      </Section>

      <StyledParagraph2>
        보호자님과 우리 댕댕이 맞춤 장소 추천을 위해 필요한 정보입니다.
      </StyledParagraph2>

      <Footer>
        <ConfirmBtn label="등록 완료" onClick={handleConfirm} />
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
  font-size: 12px;
  color: #ff69a9;
  font-weight: bold;
  margin-top: 9px;
  margin-left: 10px;
  display: flex;

  @media (max-width: 554px) {
    font-size: 10px;
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
  font-size: 14px;
  color: red;
  font-weight: bold;
  margin-top: 80px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;

  @media (max-width: 554px) {
    font-size: 10px;
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

export default PreferenceRegister;
