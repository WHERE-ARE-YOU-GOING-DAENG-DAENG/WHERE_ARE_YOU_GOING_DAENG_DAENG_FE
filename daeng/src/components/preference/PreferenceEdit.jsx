import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AlertDialog from "../commons/SweetAlert";
import PreferenceForm from "./PreferenceForm";
import { placeTypes, placeFeatures } from "../../data/CommonCode";
import { placeIcons, featureIcons } from "../../data/PreferenceIcons";

function PreferenceEdit() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlaceOptions, setSelectedPlaceOptions] = useState([]);
  const [selectedFavoriteOptions, setSelectedFavoriteOptions] = useState([]);

  useEffect(() => {
    const fetchPreferences = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://dev.daengdaeng-where.link/api/v1/preferences",
          { withCredentials: true }
        );
        const data = response.data.data || [];

        const placeTypesMapping =
          data
            .find((item) => item.preferenceInfo === "시설종류")
            ?.preferenceTypes.map(
              (label) => placeTypes.find((option) => option.name === label)?.codeId
            ) || [];

        const placeFeaturesMapping =
          data
            .find((item) => item.preferenceInfo === "시설특징")
            ?.preferenceTypes.map(
              (label) => placeFeatures.find((option) => option.name === label)?.codeId
            ) || [];

        setSelectedPlaceOptions(placeTypesMapping);
        setSelectedFavoriteOptions(placeFeaturesMapping);
      } catch (error) {
        console.error("선호도 데이터 불러오기 실패:", error);
        AlertDialog({
          mode: "alert",
          title: "데이터 불러오기 실패",
          text: "선호도 정보를 불러오지 못했습니다.",
          confirmText: "확인",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchPreferences();
  }, []);

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

    setIsLoading(true);
    try {
      await axios.put(
        "https://dev.daengdaeng-where.link/api/v1/preferences",
        placePayload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      await axios.put(
        "https://dev.daengdaeng-where.link/api/v1/preferences",
        favoritePayload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      AlertDialog({
        mode: "alert",
        title: "수정 성공",
        text: "선호 정보가 성공적으로 수정되었습니다!",
        confirmText: "확인",
        icon: "success",
        onConfirm: () => navigate("/my-page"),
      });
    } catch (error) {
      console.error("선호도 수정 실패:", error.response?.data);
      AlertDialog({
        mode: "alert",
        title: "수정 실패",
        text: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
        confirmText: "확인",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PreferenceForm
      selectedPlaceOptions={selectedPlaceOptions}
      setSelectedPlaceOptions={setSelectedPlaceOptions}
      selectedFavoriteOptions={selectedFavoriteOptions}
      setSelectedFavoriteOptions={setSelectedFavoriteOptions}
      isLoading={isLoading}
      onConfirm={handleConfirm}
      confirmButtonLabel="수정 완료"
      placeIcons={placeIcons}
      featureIcons={featureIcons}
    />
  );
}

export default PreferenceEdit;
