import React, { useState, useEffect } from "react";
import styled from "styled-components";
import x from "../../assets/icons/x.svg";
import axiosInstance from "../../services/axiosInstance";
import AlertDialog from "../../components/commons/SweetAlert";

const FirstPopupContainer = styled.div`
  width: 481px;
  height: 342px;
  background-color: #fdf2f8;
  border-radius: 10px;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 554px) {
    width: 70%;
    height: 50%;
  }
`;

const CloseButton = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const Title = styled.h2`
  margin-top: 50px;
  font-size: 20px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 554px) {
    font-size: 15px;
  }
`;

const InputField = styled.input`
  width: 90%;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 0 10px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #ff69b4;
  }
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 20px;
`;

const Dropdown = styled.select`
  width: 48%;
  height: 40px;
  border: 1px solid #ddd;
  background-color: white;
  color: black;
  border-radius: 5px;
  font-size: 14px;
  padding: 0 10px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #ff69b4;
  }
`;

const SubmitButton = styled.button`
  width: 90%;
  height: 40px;
  background-color: #ff69b4;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #ff85c1;
  }
`;

function Detail({ onClose, onNext }) {
  const [nickname, setNickname] = useState("");
  const [city, setCity] = useState("");
  const [cityDetail, setCityDetail] = useState("");
  const [cityDetails, setCityDetails] = useState([]);
  const [lands, setLands] = useState([]);

  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        const response = await axiosInstance.get("/api/v2/region", {
          withCredentials: true,
        });
        if (response.data.message === "success") {
          const data = response.data.data;
          setNickname(data.nickname);
          setLands(data.lands);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            AlertDialog({
              mode: "confirm",
              title: "로그인 필요",
              text: "로그인이 필요한 기능입니다.<br/>로그인페이지로 이동하시겠습니까?",
              confirmText: "네",
              cancelText: "아니오",
              onConfirm: onClose,
            });
          } else if (error.response.status === 404) {
              AlertDialog({
                mode: "alert",
                title: "알림",
                text: "땅주인만 스토리를 올릴 수 있습니다.<br/>원하는 지역의 땅따먹기 1등을 해보세요!",
                confirmText: "확인",
                icon: "warning",
                onConfirm: onClose,
            });
          }
      };
    }}
    fetchRegionData();
  }, []);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);

    const selectedLand = lands.find((land) => land.city === selectedCity);
    setCityDetails(selectedLand ? selectedLand.cityDetails : []);
  };

  const handleNextClick = () => {
    if (!city || !cityDetail) {
      AlertDialog({
        mode: "alert",
        title: "알림",
        text: "지역을 선택해주세요.",
        confirmText: "확인",
        icon: "warning",
      });
      return;
    }
    const selectedData = {
      nickname,
      city,
      cityDetail,
    };
    onNext(selectedData);
  };

  return (
    <FirstPopupContainer>
      <CloseButton src={x} alt="닫기" onClick={onClose} />
      <Title>업로드하고 싶은 지역을 선택해 주세요</Title>
      <InputField type="text" placeholder="닉네임" value={nickname} readOnly />
      <DropdownContainer>
        <Dropdown value={city} onChange={handleCityChange}>
          <option value="">도</option>
          {lands.map((land, index) => (
            <option key={index} value={land.city}>
              {land.city}
            </option>
          ))}
        </Dropdown>
        <Dropdown value={cityDetail} onChange={(e) => setCityDetail(e.target.value)}>
          <option value="">시/군/구</option>
          {cityDetails.map((detail, index) => (
            <option key={index} value={detail.cityDetail}>
              {detail.cityDetail}
            </option>
          ))}
        </Dropdown>
      </DropdownContainer>
      <SubmitButton onClick={handleNextClick}>다음</SubmitButton>
    </FirstPopupContainer>
  );
}

export default Detail;
