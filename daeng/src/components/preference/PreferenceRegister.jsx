import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import AlertDialog from "../commons/SweetAlert";
import PreferenceForm from "./PreferenceForm";
import { placeIcons, featureIcons } from "../../data/PreferenceIcons";

function PreferenceRegister() {
  const navigate = useNavigate();
  const [selectedPlaceOptions, setSelectedPlaceOptions] = useState([]);
  const [selectedFavoriteOptions, setSelectedFavoriteOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      await axiosInstance.post(
        "/api/v1/preferences",
        placePayload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      await axiosInstance.post(
        "/api/v1/preferences",
        favoritePayload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      AlertDialog({
        mode: "confirm",
        title: "등록 성공",
        text: "펫을 등록하시겠습니까?",
        confirmText: "예",
        cancelText: "아니요",
        icon: "success",
        onConfirm: () => {
          navigate("/pet-register");
        },
        onCancel: () => {
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
      confirmButtonLabel="등록 완료"
      placeIcons={placeIcons}
      featureIcons={featureIcons}
    />
  );
}

export default PreferenceRegister;
