import styled from 'styled-components';
import SelectLabel from '../../components/commons/SelectLabel';
import SelectBtn from '../../components/commons/SelectBtn';
import kakaoBtn from '../../assets/icons/kakaoBtn.svg';
import ConfirmBtn from '../../components/commons/ConfirmBtn';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AreaField from '../../data/AreaField';
import axios from 'axios';

function UserRegister() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = new URLSearchParams(window.location.search);
    let email = queryString.get('email');
    if (email) {
      email = email.trim();
      setUserData((prev) => ({
        ...prev,
        email: decodeURIComponent(email),
      }));
    }
  }, []);

  const [userData, setUserData] = useState({
    email: '',
    nickname: '',
    gender: '', 
    city: '',
    cityDetail: '',
    alarmAgreement: '',
  });

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenderChange = (genderCode) => {
    setUserData((prev) => ({
      ...prev,
      gender: genderCode, 
    }));
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setUserData((prev) => ({
      ...prev,
      city: selectedCity,
      cityDetail: '',
    }));
  };

  const handleConfirm = async () => {
    const payload = {
      nickname: userData.nickname,
      PushAgreement: userData.alarmAgreement === '받을래요',
      RegionAgreement: true,
      email: userData.email,
      gender: userData.gender, 
      city: userData.city, 
      cityDetail: userData.cityDetail,
    };

    console.log('회원가입 데이터:', payload);

    try {
      const { data, status } = await axios.post(
        'https://www.daengdaeng-where.link/api/v1/signup',
        payload,
        {
          withCredentials: true
        }
      );

      if (status === 200 || status === 201) {
        console.log('응답 데이터:', data);
        alert('회원가입 성공!');
        navigate('/');
      } else {
        console.error(`Unexpected status code: ${status}`);
        alert('회원가입 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      if (error.response) {
        console.error('회원가입 실패 - 서버 응답:', error.response.data);
        alert(
          `회원가입 실패: ${
            error.response.data.message || '알 수 없는 오류가 발생했습니다.'
          }`
        );
      } else if (error.request) {
        console.error('회원가입 실패 - 응답 없음:', error.request);
        alert('회원가입 중 네트워크 문제가 발생했습니다. 다시 시도해주세요.');
      } else {
        console.error('회원가입 실패 - 요청 설정 오류:', error.message);
        alert('회원가입 중 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <UserContainer>
      <SelectLabel label="이메일" />
      <InputEmailContainer>
        <Input type="email" value={userData.email} disabled />
        <Icon src={kakaoBtn} alt="카카오 로그인" />
      </InputEmailContainer>

      <SelectLabel label="닉네임" />
      <InputBox>
        <Input
          type="text"
          placeholder="사용하실 닉네임을 입력해 주세요."
          value={userData.nickname}
          onChange={(e) => handleInputChange('nickname', e.target.value)}
        />
        <DuplicateBtn>중복확인</DuplicateBtn>
      </InputBox>
      <InputAlert>*닉네임은 최소 1자 이상 작성해 주세요. 특수문자는 사용할 수 없습니다.</InputAlert>

      <SelectLabel label="성별" />
      <SelectionContainer>
        <SelectBtn
          label="남자"
          selected={userData.gender === 'GND_01'}
          onClick={() => handleGenderChange('GND_01')}
        />
        <SelectBtn
          label="여자"
          selected={userData.gender === 'GND_02'}
          onClick={() => handleGenderChange('GND_02')}
        />
      </SelectionContainer>

      <SelectLabel label="주소" />
      <SelectionContainer>
        <SelectBox onChange={handleCityChange} value={userData.city}>
          <option value="" disabled>
            시 선택
          </option>
          {Object.keys(AreaField).map((cityName, index) => (
            <option key={index} value={cityName}>
              {cityName}
            </option>
          ))}
        </SelectBox>
        <SelectBox
          onChange={(e) => handleInputChange('cityDetail', e.target.value)}
          value={userData.cityDetail}
          disabled={!AreaField[userData.city]?.length}
        >
          <option value="" disabled>
            군 선택
          </option>
          {(AreaField[userData.city] || []).map((districtName, index) => (
            <option key={index} value={districtName}>
              {districtName}
            </option>
          ))}
        </SelectBox>
      </SelectionContainer>
      <InputAlert>*보호자님과 우리 댕댕이 맞춤 장소 추천을 위해 필요한 정보입니다.</InputAlert>

      <SelectLabel label="알림 동의" />
      <SelectionContainer>
        <SelectBtn
          label="받을래요"
          selected={userData.alarmAgreement === '받을래요'}
          onClick={() => handleInputChange('alarmAgreement', '받을래요')}
        />
        <SelectBtn
          label="괜찮아요"
          selected={userData.alarmAgreement === '괜찮아요'}
          onClick={() => handleInputChange('alarmAgreement', '괜찮아요')}
        />
      </SelectionContainer>
      <InputAlert>*장소에 함께하는 댕댕이를 알려드려요</InputAlert>
      <ConfirmContainer>
        <ConfirmBtn label="다음" onClick={handleConfirm} />
      </ConfirmContainer>
    </UserContainer>
  );
}

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3%;
  margin-left: 4%;
`;

const InputEmailContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(228, 228, 228, 0.2);
  width: 95%;
  height: 44px;
  border-radius: 5px;
  border: 0.5px solid #E4E4E4;
  color: black;
  padding: 0 10px;
  margin-bottom: 20px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  height: 44px;
  border-radius: 5px;
  border: 0.5px solid #E4E4E4;
  color: black;
  padding: 0 10px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 12px;
  color: black;

  ::placeholder {
    color: #b3b3b3;
  }

  &:disabled {
    color: #b3b3b3;
  }
`;

const Icon = styled.img`
  width: 20px;
  cursor: pointer;
  margin-right: 10px;
`;

const DuplicateBtn = styled.button`
  width: 15%;
  height: 23px;
  border-radius: 10px;
  border: none;
  font-size: 10px;
  cursor: pointer;
  background-color: #ff69a9;
  color: white;

  &:hover {
    background-color: #f9a9d4;
  }
`;

const InputAlert = styled.p`
  color: #ff69a9;
  font-size: 10px;
  display: flex;
  margin-top: -1px;
  flex-direction: flex-start;
  margin-bottom: 4%;
`;

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const SelectBox = styled.select`
  flex: 1;
  height: 44px;
  border-radius: 5px;
  padding: 10px;
  margin-right: 18px;
  margin-bottom: 10px;
  border: 0.5px solid #e4e4e4;
  font-size: 12px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-align: center;

  &:focus {
    border-color: #ff69a9;
    outline: none;
  }
`;

const ConfirmContainer = styled.div`
  display: flex;
  margin-top: 40px;
`;

export default UserRegister;
