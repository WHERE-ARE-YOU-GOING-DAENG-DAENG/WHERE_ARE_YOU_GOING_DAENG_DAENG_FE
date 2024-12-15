import React, { useState } from 'react';
import styled from 'styled-components';
import AreaField from '../data/AreaField';
import AdminHeader from '../components/admin/AdminHeader';
import FormField from '../components/admin/FormField';
import SelectLabel from '../components/commons/SelectLabel';
import ConfirmBtn from '../components/commons/ConfirmBtn';
import SelectBtn from '../components/commons/SelectBtn';

const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  min-height: 100vh; 
  overflow-y: auto; 
`;

const SelectionContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const SelectBox = styled.select`
  flex: 1;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
`;

const Form = styled.div`
  background-color: #fff0f6;
  width: 90%;
  max-width: 500px;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TimeInputContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px; 
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
`;

function AdminPage() {
  const [formData, setFormData] = useState({
    placeName: '',
    phone: '',
    openTime: '',
    closeTime: '',
    placeType: '',
    homepage: '',
    petRestriction: '',
    photo: '',
    parkingAvailable: '',
    indoorOutdoor: '',
  });

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFocus = (e) => {
    e.target.showPicker();
  };

  return (
    <TotalWrapper>
      <AdminHeader />
      <Form>
        <FormField
          label="장소명"
          type="text"
          placeholder="장소명을 입력하세요"
          value={formData.placeName}
          onChange={(e) => handleChange('placeName', e.target.value)}
        />
        <FormField
          label="번호"
          type="text"
          placeholder="전화번호를 입력하세요"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
        <FormField
          label="장소 타입"
          type="text"
          placeholder="장소 타입을 입력하세요"
          value={formData.placeType}
          onChange={(e) => handleChange('placeType', e.target.value)}
        />
        <FormField
          label="홈페이지 주소"
          type="text"
          placeholder="홈페이지 주소를 입력하세요"
          value={formData.homepage}
          onChange={(e) => handleChange('homepage', e.target.value)}
        />
        <FormField
          label="반려견 제한"
          type="text"
          placeholder="반려견 제한 사항을 입력하세요"
          value={formData.petRestriction}
          onChange={(e) => handleChange('petRestriction', e.target.value)}
        />
        <FormField
          label="등록 사진"
          type="file"
          onChange={(e) => handleChange('photo', e.target.files[0])}
        />
        <FormField
          label="주차 가능 여부"
          type="text"
          placeholder="주차 가능 여부를 입력하세요"
          value={formData.parkingAvailable}
          onChange={(e) => handleChange('parkingAvailable', e.target.value)}
        />
        <FormField
          label="실내/실외 여부"
          type="text"
          placeholder="실내 또는 실외를 입력하세요"
          value={formData.indoorOutdoor}
          onChange={(e) => handleChange('indoorOutdoor', e.target.value)}
        />
        <div>
          <SelectLabel label="도로명주소" />
          <SelectionContainer>
            <SelectBox value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="" disabled>도 선택</option>
              {Object.keys(AreaField).map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </SelectBox>
            <SelectBox
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedCity}
            >
              <option value="" disabled>시/군/구 선택</option>
              {(AreaField[selectedCity] || []).map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </SelectBox>
          </SelectionContainer>
        </div>
        <div>
          <SelectLabel label="오픈-마감 시간" />
          <TimeInputContainer>
            <Input
              type="time"
              value={formData.openTime}
              onChange={(e) => handleChange('openTime', e.target.value)}
              onFocus={handleFocus}  
            />
            <Input
              type="time"
              value={formData.closeTime}
              onChange={(e) => handleChange('closeTime', e.target.value)}
              onFocus={handleFocus}  
            />
          </TimeInputContainer>
        </div>
        <ConfirmBtn label="등록" />
      </Form>
    </TotalWrapper>
  );
}

export default AdminPage;
