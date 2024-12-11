import React, { useState } from "react";
import styled from "styled-components";
import x from "../../assets/icons/x.svg";
//지역 입력 팝업창
import axios from 'axios';

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
  const [city, setCity] = useState([]);
  const [cityDetails, setCityDetails] = useState([]);
  const [lands, setLands] = useState([]);
  //const { nickname, city, cityDetail } = useUserStore.getState();
  // 이 부분에서 city랑 cityDetail은 땅 주인이 된 지역만 받아와야 해서.. 다르게 받아올듯 

  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        const response = await axios.get("https://dev.daengdaeng-where.link/api/v2/region", {
          withCredentials: true,
        });
        if (response.data.message === "success") {
          const data = response.data.data;
          setNickname(data.nickname); 
          setLands(data.lands);
        }
      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다.", error);
      }
    };

    fetchRegionData();
  }, []);


  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);

    const selectedLand = lands.find((land) => land.city === selectedCity);
    setCityDetails(selectedLand ? selectedLand.cityDetails : []);
  };

  const handleNextClick = () => {
    onNext(); 
  };

  return (
    <FirstPopupContainer>
      <CloseButton src={x} alt="닫기" onClick={onClose} />
      <Title>업로드하고 싶은 지역을 선택해 주세요</Title>
      <InputField
        type="text"
        placeholder="닉네임"
        value={nickname}
        readOnly
      />
      <DropdownContainer>
        <Dropdown value={city} onChange={handleCityChange}>
        <option value="">city</option>
          {lands.map((land, index) => (
            <option key={index} value={land.city}>
              {land.city}
            </option>
          ))}
        </Dropdown> 
        <Dropdown value={cityDetails.cityDetail} onChange={(e) => setCityDetails(e.target.value)}>
          <option value="">city detail</option>
          {cityDetails.map((detail, index) => (
            <option key={index} value={detail.cityDetail}>
              {detail.cityDetail} ({detail.count})
            </option>
          ))}
        </Dropdown>
      </DropdownContainer>
      <SubmitButton onClick={handleNextClick}>다음</SubmitButton> 
    </FirstPopupContainer>
  ); 
}

export default Detail;
