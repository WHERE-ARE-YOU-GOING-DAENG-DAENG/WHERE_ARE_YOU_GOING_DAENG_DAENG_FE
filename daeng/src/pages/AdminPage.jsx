import React, { useState } from "react";
import styled from "styled-components";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import LocationSelect from "../components/admin/LocationSelect";
import AdminHeader from "../components/admin/AdminHeader";
import FormField from "../components/admin/FormField";
import SelectLabel from "../components/commons/SelectLabel";
import ConfirmBtn from "../components/commons/ConfirmBtn";
import GeoLocationField from "../components/admin/GeoLocationField";
import PhoneNumberField from '../components/admin/PhoneNumberField';
import ParkingAllow from "../components/admin/PakingAllow";
import PlaceTypeSelector from "../components/admin/PlaceTypeSelector";
import IndoorAllow from '../components/admin/IndoorAllow';
import OutdoorAllow from '../components/admin/OutdoorAllow';
import ImageUpload from '../components/admin/AdminImgUpload';
import StoreOpenTime from "../components/admin/StoreOpenTime";
import AlertDialog from "../components/commons/SweetAlert";
function AdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    cityDetail: "",
    postCode: "",
    streetAddresses: "",
    townShip: "",
    latitude: "",
    longitude: "",
    telNumber: "",
    url: "",
    placeType: "",
    description: "",
    weightLimit: "",
    parking: true,
    indoor: true,
    outdoor: true,
    openTime: "",
    closeTime: "",
    thumbImgPath: null,
    imgPath: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleCityChange = (city) => {
    setFormData((prev) => ({
      ...prev,
      city,
      cityDetail: "",
    }));
  };

  const handleCityDetailChange = (cityDetail) => {
    setFormData((prev) => ({
      ...prev,
      cityDetail,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const placeData = {
        ...formData,
      };
      const response = await axiosInstance.post(
        "/api/v2/admin/place",
        placeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        AlertDialog({
          mode: "alert",
          title: "성공",
          text: "정상적으로 등록되었습니다.",
          confirmText: "확인",
          icon: "success", 
          onConfirm: () => {
            navigate("/"); 
          }
        });
      } else {
        throw new Error("장소 등록 실패");
      }
    } catch (error) {
      console.error("장소 등록 에러 - 응답:", error.response?.data || "응답 없음");
      AlertDialog({
        mode: "alert",
        title: "실패",
        text: "등록에 실패했습니다",
        confirmText: "확인",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TotalWrapper>
      <AdminHeader />
      <Form onSubmit={handleSubmit}>
        <FormField
          label="장소명"
          type="text"
          placeholder="장소명을 입력하세요"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <GeoLocationField
          onAddressSelect={({ address, latitude, longitude, postalCode }) =>
            setFormData((prev) => ({
              ...prev,
              streetAddresses: address,
              latitude,
              longitude,
              postCode: postalCode,
            }))
          }
        />
        <SelectLabel label="도/시/군/구 선택" />
        <LocationSelect
          city={formData.city}
          cityDetail={formData.cityDetail}
          onCityChange={handleCityChange}
          onCityDetailChange={handleCityDetailChange}
        />
        <FormField
          label="읍/면/동"
          type="text"
          placeholder="읍/면/동을 입력하세요"
          value={formData.townShip}
          onChange={(e) => handleChange("townShip", e.target.value)}
        />
        <PhoneNumberField
          label="전화번호"
          placeholder="전화번호를 입력하세요"
          value={formData.telNumber}
          onChange={(value) => handleChange("telNumber", value)}
          format 
        />
        <FormField
          label="웹사이트"
          type="text"
          placeholder="웹사이트url을 넣어주세요"
          value={formData.url}
          onChange={(e) => handleChange("url", e.target.value)}
        />
        <FormField
          label="몸무게 제한(댕댕이들)"
          type="text"
          placeholder="몸무게 제한이 있나요? 없다면 모두가능이라고 입력해주세요"
          value={formData.weightLimit}
          onChange={(e) => handleChange("weightLimit", e.target.value)}
        />
        <PlaceTypeSelector
          value={formData.placeType}
          onChange={(value) => handleChange("placeType", value)}
        />

        <ParkingAllow
          label="주차 가능 여부"
          value={formData.parking} 
          onChange={(value) => handleChange("parking", value)} 
        />
        <IndoorAllow
          label="실내 공간"
          value={formData.indoor} 
          onChange={(value) => handleChange("indoor", value)} 
        />
        <OutdoorAllow
          label="실외 공간"
          value={formData.outdoor}
          onChange={(value) => handleChange("outdoor", value)}
        />
        <StoreOpenTime
          openTime={formData.openTime}
          closeTime={formData.closeTime}
          onOpenTimeChange={(value) => handleChange("openTime", value)}
          onCloseTimeChange={(value) => handleChange("closeTime", value)}
        />
        <FormField
          label="장소 설명"
          type="text"
          value={formData.description} 
          onChange={(e) => handleChange("description", e.target.value)} 
        />
        <ImageUpload
          label="썸네일 이미지 업로드"
          onUpload={({ thumbImgPath }) => handleChange("thumbImgPath", thumbImgPath)}
        />
        <ImageUpload
          label="장소 이미지 업로드"
          onUpload={({ imgPath }) => handleChange("imgPath", imgPath)}
        />
        <ConfirmBtn
          label={isSubmitting || isUploading ? "등록 중..." : "등록"}
          disabled={isSubmitting || isUploading}
        />
      </Form>
    </TotalWrapper>
  );
}

export default AdminPage;

const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  overflow-y: auto;
`;

const Form = styled.form`
  background-color: #fff0f6;
  width: 90%;
  max-width: 500px;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
