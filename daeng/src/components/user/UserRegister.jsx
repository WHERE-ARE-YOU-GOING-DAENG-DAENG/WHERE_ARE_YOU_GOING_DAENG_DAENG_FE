import styled from 'styled-components';
import SelectLabel from '../../components/commons/SelectLabel';
import SelectBtn from '../../components/commons/SelectBtn';
import kakaoBtn from '../../assets/icons/kakaoBtn.svg';
import googleBtn from '../../assets/icons/GoogleBtn.svg';
import ConfirmBtn from '../../components/commons/ConfirmBtn';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AreaField from '../../data/AreaField';
import axios from 'axios';
import AlertDialog from "../commons/SweetAlert";
import { requestNotificationPermission } from '../../firebase/firebaseMessaging';
import { pushAgree } from '../../data/CommonCode';
function UserRegister() { 
  const navigate = useNavigate();
  const [selectedPushType] = useState(pushAgree[0].code);
  const [fcmToken, setFcmToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 중복 요청 방지 부분

  const getCookieValue = (key) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ').reduce((acc, cookie) => {
      const [cookieKey, cookieValue] = cookie.split('=');
      acc[cookieKey] = decodeURIComponent(cookieValue);
      return acc;
    }, {});
    return cookies[key];
  };

  const emailFromCookie = getCookieValue('email');
  const providerFromCookie = getCookieValue('provider');


  const [userData, setUserData] = useState({
    email: emailFromCookie || '',
    nickname: '',
    gender: '',
    city: '',
    cityDetail: '',
    alarmAgreement: '',
    oauthProvider: providerFromCookie || '',
    isNicknameChecked: false,
  });


  const handleInputChange = async (field, value) => {

    if (field === "alarmAgreement" && value === "받을래요" && isLoading) {
      return; // 중복 요청 방지
    }

    setUserData((prev) => ({
      ...prev,
      [field]: prev[field] === value ? '' : value,
    }));
  
    // "받을래요"를 선택하면 FCM 토큰 발급 시작 ~
    if (field === "alarmAgreement" && value === "받을래요") {
      try {
        const token = await requestNotificationPermission(); 
        if (token) {
          console.log("FCM 토큰 발급 성공:", token);
          setFcmToken(token); // FCM 토큰 상태에 저장
        }
      } catch (error) {
        console.error("FCM 토큰 요청 실패:", error);
        AlertDialog({
          mode: "alert",
          title: "알림 권한 요청 실패",
          text: "알림 권한을 활성화할 수 없습니다.",
          confirmText: "확인",
        });
      }
    }
  };
  
  const handleGenderChange = (genderCode) => {
    setUserData((prev) => ({
      ...prev,
      gender: prev.gender === genderCode ? '' : genderCode,
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

  const validateFields = () => {
    if (!userData.nickname.trim()) {
      AlertDialog({
        mode: "alert",
        title: "닉네임 필요",
        text: "닉네임은 최소 1자 이상 작성해 주세요.",
        confirmText: "확인",
        onConfirm: () => console.log("닉네임 부족 경고 확인됨"),
      });
      return false;
    }

    const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
    if (!userData.nickname || !nicknameRegex.test(userData.nickname)) {
      AlertDialog({
        mode: "alert",
        title: "닉네임 오류",
        text: "특수문자는 사용하실 수 없습니다.",
        confirmText: "확인",
        onConfirm: () => console.log("닉네임 오류 경고 확인됨"),
      });
      return false;
    }

    if (!userData.isNicknameChecked) {
      AlertDialog({
        mode: "alert",
        title: "중복 확인 필요",
        text: "닉네임 중복 확인을 완료해 주세요.",
        confirmText: "확인",
        onConfirm: () => console.log("닉네임 중복 확인 경고 확인됨"),
      });
      return false;
    }

    if (
      !userData.nickname ||
      !userData.gender ||
      !userData.city ||
      !userData.cityDetail ||
      userData.alarmAgreement === null
    ) {
      AlertDialog({
        mode: "alert",
        title: "입력 필요",
        text: "모든 필드를 작성해주세요.",
        confirmText: "확인",
        onConfirm: () => console.log("모든 필드 작성 경고 확인됨"),
      });
      return false;
    }

    return true;
  };

  const handleConfirm = async () => {
    if (!validateFields()) {
      return; // 함수 내부에서 조건에 따라 종료
    }
  
    const payload = {
      nickname: userData.nickname,
      pushAgreement: userData.alarmAgreement,
      email: userData.email,
      gender: userData.gender,
      city: userData.city,
      cityDetail: userData.cityDetail,
      oauthProvider: userData.oauthProvider,
      fcmToken: userData.alarmAgreement === "받을래요" ? fcmToken : null,
    };
  
    try {
      const response = await axios.post(
        "https://www.daengdaeng-where.link/api/v1/notifications/pushToken",
        {
          token: fcmToken,
          pushType: selectedPushType,
        },
        {
          withCredentials: true,
        }
      );
  
      if (response.status === 200) {
        console.log("서버에 FCM 토큰 전송 성공:", response.data);
  
        // 회원가입 요청
        const { data, status } = await axios.post(
          "https://www.daengdaeng-where.link/api/v1/signup",
          payload,
          {
            withCredentials: true,
          }
        );
  
        if (status === 200 || status === 201) {
          AlertDialog({
            mode: "alert",
            title: "회원가입 성공",
            text: "회원가입이 성공적으로 완료되었습니다.",
            confirmText: "확인",
            onConfirm: () => navigate("/preference-register"),
          });
        } else {
          console.error(`회원가입 실패 - 상태 코드: ${status}`);
        }
      } else {
        console.error("FCM 토큰 전송 실패:", response);
      }
    } catch (error) {
      console.error("요청 실패:", error.response?.data || error.message);
      AlertDialog({
        mode: "alert",
        title: "오류",
        text: "서버와 통신 중 문제가 발생했습니다.",
        confirmText: "확인",
      });
    }
  };

  const handleNicknameCheck = async () => {
    if (!userData.nickname.trim()) {
      AlertDialog({
        mode: "alert",
        title: "닉네임 필요",
        text: "닉네임을 입력해 주세요.",
        confirmText: "확인",
        onConfirm: () => console.log("닉네임 부족 경고 확인됨"),
      });
      return;
    }

    try {
      const { data } = await axios.get(
        `https://www.daengdaeng-where.link/api/v1/user/duplicateNickname`,
        {
          params: { nickname: userData.nickname },
          withCredentials: true,
        }
      );

      if (data.data.isDuplicate === false) {
        setUserData((prev) => ({ ...prev, isNicknameChecked: true }));
        AlertDialog({
          mode: "alert",
          title: "닉네임 사용 가능",
          text: "사용 가능한 닉네임입니다.",
          confirmText: "확인",
          onConfirm: () => console.log("사용 가능한 닉네임 확인됨"),
        });
      } else if (data.data.isDuplicate === true) {
        setUserData((prev) => ({ ...prev, isNicknameChecked: false }));
        AlertDialog({
          mode: "alert",
          title: "닉네임 중복",
          text: "사용 불가능한 닉네임입니다. 다른 닉네임을 입력해주세요.",
          confirmText: "확인",
          onConfirm: () => console.log("닉네임 중복 확인됨"),
        });
      }
    } catch (error) {
      if (error.response) {
        AlertDialog({
          mode: "alert",
          title: "닉네임 확인 실패",
          text: error.response.data.message || "알 수 없는 오류가 발생했습니다.",
          confirmText: "확인",
          onConfirm: () => console.log("서버 응답 오류 확인됨"),
        });
      }
    }
  };

  return (
    <UserContainer>
      <SelectLabel label="이메일" />
      <InputEmailContainer>
        <Input type="email" value={userData.email} disabled />
        {userData.oauthProvider === 'google' ? (
          <Icon src={googleBtn} alt="구글 로그인" />
        ) : userData.oauthProvider === 'kakao' ? (
          <Icon src={kakaoBtn} alt="카카오 로그인" />
        ) : null}
      </InputEmailContainer>

      <SelectLabel label="닉네임" />
      <InputBox>
        <Input
          type="text"
          placeholder="사용하실 닉네임을 입력해 주세요."
          value={userData.nickname}
          onChange={(e) => handleInputChange('nickname', e.target.value)}
        />
        <DuplicateBtn onClick={handleNicknameCheck}>중복확인</DuplicateBtn>
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
            도 선택
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
          시/군/구 선택
          </option>
          {(AreaField[userData.city] || [])
          .slice(1)
          .map((districtName, index) => (
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
  font-size: 14px;
  color: black;

  ::placeholder {
    color: #b3b3b3;
  }

  &:disabled {
    color: #b3b3b3;
  }

  @media (max-width: 554px) {
    font-size: 10px;
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
  font-size: 11px;
  cursor: pointer;
  background-color: #ff69a9;
  color: white;

  &:hover {
    background-color: #f9a9d4;
  }

  @media (max-width: 554px) {
    font-size: 8px;
  }
`;

const InputAlert = styled.p`
  color: #ff69a9;
  font-size: 12px;
  display: flex;
  margin-top: -1px;
  flex-direction: flex-start;
  margin-bottom: 4%;

  @media (max-width: 554px) {
    font-size: 10px;
  }
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
  font-size: 14px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-align: center;

  &:focus {
    border-color: #ff69a9;
    outline: none;
  }

  @media (max-width: 554px) {
    font-size: 11px;
  }
`;

const ConfirmContainer = styled.div`
  display: flex;
  margin-top: 40px;
`;

export default UserRegister;
