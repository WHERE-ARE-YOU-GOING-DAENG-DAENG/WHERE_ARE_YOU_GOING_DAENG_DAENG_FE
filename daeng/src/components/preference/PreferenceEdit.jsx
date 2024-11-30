import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const PLACE_TYPE_MAP = {
  "음식점": "PLACE_TYP_01",
  "카페": "PLACE_TYP_02",
  "공원": "PLACE_TYP_03",
  "숙소": "PLACE_TYP_04",
  "놀이터": "PLACE_TYP_05",
  "여행지": "PLACE_TYP_06",
  "미술관": "PLACE_TYP_07",
  "박물관": "PLACE_TYP_08",
  "문예회관": "PLACE_TYP_09"
};

const FAVORITE_TYPE_MAP = {
  "뛰어놀기 좋아요": "PLACE_FTE_01",
  "사방이 철장/벽으로 막혀있어요": "PLACE_FTE_02",
  "급수대가 있어요": "PLACE_FTE_03",
  "배변봉투가 구비되어 있어요": "PLACE_FTE_04",
  "벌레가 별로 없어요": "PLACE_FTE_05",
  "화장실이 있어요": "PLACE_FTE_06",
  "강아지 전용 음식이 있어요": "PLACE_FTE_07",
  "산책로가 있어요": "PLACE_FTE_08",
  "강아지 친구들이 많아요": "PLACE_FTE_09",
  "시설이 청결해요": "PLACE_FTE_10",
  "주차하기 편해요": "PLACE_FTE_11"
};

function PreferenceEdit() {
  const navigate = useNavigate();
  const [selectedPlaceOptions, setSelectedPlaceOptions] = useState([]);
  const [selectedFavoriteOptions, setSelectedFavoriteOptions] = useState([]);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get("https://www.daengdaeng-where.link/api/v1/preferences", {
          withCredentials: true,
        });

        const data = response.data.data;

        // 서버에서 받아온 데이터를 공통 코드로 변환하여 선택된 상태 업데이트
        const placeOptions = data
          .find((item) => item.preferenceInfo === "시설종류")
          ?.preferenceTypes.map((label) => PLACE_TYPE_MAP[label]) || [];
        const favoriteOptions = data
          .find((item) => item.preferenceInfo === "시설특징")
          ?.preferenceTypes.map((label) => FAVORITE_TYPE_MAP[label]) || [];

        setSelectedPlaceOptions(placeOptions);
        setSelectedFavoriteOptions(favoriteOptions);
      } catch (error) {
        console.error("선호도 데이터 불러오기 실패:", error);
        AlertDialog({
          mode: "alert",
          title: "데이터 불러오기 실패",
          text: "선호도 정보를 불러오지 못했습니다.",
          confirmText: "확인",
        });
      }
    };

    fetchPreferences();
  }, []);

  const handlePlaceOptionClick = (code) => {
    if (selectedPlaceOptions.length >= 3 && !selectedPlaceOptions.includes(code)) {
      AlertDialog({
        mode: "alert",
        title: "선택 초과",
        text: "최대 3개만 선택 가능합니다.",
        confirmText: "확인",
      });
      return;
    }

    setSelectedPlaceOptions((prev) =>
      prev.includes(code) ? prev.filter((option) => option !== code) : [...prev, code]
    );
  };

  const handleFavoriteOptionClick = (code) => {
    if (selectedFavoriteOptions.length >= 3 && !selectedFavoriteOptions.includes(code)) {
      AlertDialog({
        mode: "alert",
        title: "선택 초과",
        text: "최대 3개만 선택 가능합니다.",
        confirmText: "확인",
      });
      return;
    }

    setSelectedFavoriteOptions((prev) =>
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
      await axios.put("https://www.daengdaeng-where.link/api/v1/preferences", placePayload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      await axios.put("https://www.daengdaeng-where.link/api/v1/preferences", favoritePayload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      AlertDialog({
        mode: "alert",
        title: "수정 성공",
        text: "선호 정보가 성공적으로 수정되었습니다!",
        confirmText: "확인",
        onConfirm: () => {
          console.log("수정 성공 확인됨");
          navigate("/my-page");
        },
      });
    } catch (error) {
      console.error("선호도 수정 실패:", error.response?.data);
      AlertDialog({
        mode: "alert",
        title: "수정 실패",
        text: error.response?.data.message || "알 수 없는 오류가 발생했습니다.",
        confirmText: "확인",
      });
    }
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
            isSelected={selectedPlaceOptions.includes("PLACE_TYP_01")}
            onClick={() => handlePlaceOptionClick("PLACE_TYP_01")}
          />
          <PreferencePlaceOption
            label="카페"
            icon={cafeIcon}
            isSelected={selectedPlaceOptions.includes("PLACE_TYP_02")}
            onClick={() => handlePlaceOptionClick("PLACE_TYP_02")}
          />
          <PreferencePlaceOption
            label="공원"
            icon={parkIcon}
            isSelected={selectedPlaceOptions.includes("PLACE_TYP_03")}
            onClick={() => handlePlaceOptionClick("PLACE_TYP_03")}
          />
          <PreferencePlaceOption
            label="숙소"
            icon={houseIcon}
            isSelected={selectedPlaceOptions.includes("PLACE_TYP_04")}
            onClick={() => handlePlaceOptionClick("PLACE_TYP_04")}
          />
            <PreferencePlaceOption
              label="놀이터"
              icon={playgroundIcon}
              isSelected={selectedPlaceOptions.includes("PLACE_TYP_05")}
              onClick={() => handlePlaceOptionClick("PLACE_TYP_05")}
            />
          <PreferencePlaceOption
            label="여행지"
            icon={travelIcon}
            isSelected={selectedPlaceOptions.includes("PLACE_TYP_06")}
            onClick={() => handlePlaceOptionClick("PLACE_TYP_06")}
          />
          <PreferencePlaceOption
            label="미술관"
            icon={galleryIcon}
            isSelected={selectedPlaceOptions.includes("PLACE_TYP_07")}
            onClick={() => handlePlaceOptionClick("PLACE_TYP_07")}
          />
          <PreferencePlaceOption
            label="박물관"
            icon={museumIcon}
            isSelected={selectedPlaceOptions.includes("PLACE_TYP_08")}
            onClick={() => handlePlaceOptionClick("PLACE_TYP_08")}
          />
          <PreferencePlaceOption
            label="문예회관"
            icon={filmIcon}
            isSelected={selectedPlaceOptions.includes("PLACE_TYP_09")}
            onClick={() => handlePlaceOptionClick("PLACE_TYP_09")}
          />
        </OptionContainer>
      </Section>

      <Section>
        <Title>어떤 부분이 중요하신가요?</Title>
        <StyledParagraph>* 최소 1개 ~ 3개 선택가능</StyledParagraph>
        <OptionContainer>
          <PreferenceFavoriteOption
            label="뛰어놀기 좋아요"
            icon={run}
            isSelected={selectedFavoriteOptions.includes("PLACE_FTE_01")}
            onClick={() => handleFavoriteOptionClick("PLACE_FTE_01")}
          />
          <PreferenceFavoriteOption
              label="급수대가 있어요"
              icon={water}
              isSelected={selectedFavoriteOptions.includes("PLACE_FTE_03")}
              onClick={() => handleFavoriteOptionClick("PLACE_FTE_03")}
                />
          <PreferenceFavoriteOption
              label="주차하기 편해요"
              icon={parkingLot}
              isSelected={selectedFavoriteOptions.includes("PLACE_FTE_11")}
              onClick={() => handleFavoriteOptionClick("PLACE_FTE_11")}
              />
          <PreferenceFavoriteOption
              label="사방이 철장/벽으로 막혀있어요"
              icon={cage}
              isSelected={selectedFavoriteOptions.includes("PLACE_FTE_02")}
              onClick={() => handleFavoriteOptionClick("PLACE_FTE_02")}
            />
          <PreferenceFavoriteOption
              label="배변봉투가 구비되어 있어요"
              icon={paperbag}
              isSelected={selectedFavoriteOptions.includes("PLACE_FTE_04")}
              onClick={() => handleFavoriteOptionClick("PLACE_FTE_04")}
            />
          <PreferenceFavoriteOption
            label="벌레가 별로 없어요"
            icon={bug}
            isSelected={selectedFavoriteOptions.includes("PLACE_FTE_05")}
            onClick={() => handleFavoriteOptionClick("PLACE_FTE_05")}
          />
          <PreferenceFavoriteOption
            label="화장실이 있어요"
            icon={toilet}
            isSelected={selectedFavoriteOptions.includes("PLACE_FTE_06")}
            onClick={() => handleFavoriteOptionClick("PLACE_FTE_06")}
          />
          <PreferenceFavoriteOption
            label="강아지 전용 음식이 있어요"
            icon={dogfood}
            isSelected={selectedFavoriteOptions.includes("PLACE_FTE_07")}
            onClick={() => handleFavoriteOptionClick("PLACE_FTE_07")}
          />
          <PreferenceFavoriteOption
            label="산책로가 있어요"
            icon={gongwon}
            isSelected={selectedFavoriteOptions.includes("PLACE_FTE_08")}
            onClick={() => handleFavoriteOptionClick("PLACE_FTE_08")}
          />
          <PreferenceFavoriteOption
            label="강아지 친구들이 많아요"
            icon={dogFriend}
            isSelected={selectedFavoriteOptions.includes("PLACE_FTE_09")}
            onClick={() => handleFavoriteOptionClick("PLACE_FTE_09")}
          />
          <PreferenceFavoriteOption
            label="시설이 청결해요"
            icon={clean}
            isSelected={selectedFavoriteOptions.includes("PLACE_FTE_10")}
            onClick={() => handleFavoriteOptionClick("PLACE_FTE_10")}
          />
        </OptionContainer>
      </Section>
      <StyledParagraph2>
        보호자님과 우리 댕댕이 맞춤 장소 추천을 위해 필요한 정보입니다.
      </StyledParagraph2>

      <Footer>
        <ConfirmBtn label="수정 완료" onClick={handleConfirm}/>
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
