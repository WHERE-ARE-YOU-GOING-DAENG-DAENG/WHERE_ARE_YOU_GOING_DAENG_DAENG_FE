import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SelectLabel from '../../components/commons/SelectLabel';
import SelectBtn from '../../components/commons/SelectBtn';
import kakaoBtn from '../../assets/icons/kakaoBtn.svg';
import GoogleBtn from '../../assets/icons/GoogleBtn.svg';
import ConfirmBtn from '../../components/commons/ConfirmBtn';
import AreaField from '../../data/AreaField';
import axios from 'axios';
import AlertDialog from "../commons/SweetAlert";
import useUserStore from '../../stores/userStore';
import { useNavigate } from 'react-router-dom';

function UserEdit() {
  const navigate = useNavigate();
  const { userId, email, nickname, setUserId, setEmail, setNickname } = useUserStore();
  const [userData, setUserData] = useState({
    gender: '',
    city: '',
    cityDetail: '',
    pushAgreement: '',
    oauthProvider: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://www.daengdaeng-where.link/api/v1/user/adjust', {
          withCredentials: true,
        });
        const { user } = response.data.data;
  
        setUserId(user.userId || '');
        setEmail(user.email || '');
        setNickname(user.nickname || '');

        setUserData({
          gender: user.gender || '',
          city: user.city || '도',
          cityDetail: user.cityDetail || '시/군/구',
          pushAgreement: user.pushAgreement,
          oauthProvider: user.oauthProvider || '',
        });
  
        console.log('Fetched User Data:', user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        AlertDialog({
          mode: 'alert',
          title: '데이터 불러오기 실패',
          text: '사용자 정보를 불러오는 데 문제가 발생했습니다.',
          confirmText: '확인',
          onConfirm: () => console.log('데이터 불러오기 실패 확인됨'),
        });
      }
    };
  
    fetchUserData();
  }, [setUserId, setEmail, setNickname]);

  const handleInputChange = (field, value) => {
    setUserData((prev) => {
      if (field === "pushAgreement") {
        console.log(`Updating pushAgreement to: ${value === "받을래요"}`);
        return {
          ...prev,
          pushAgreement: value === "받을래요",
        };
      }
      return {
        ...prev,
        [field]: prev[field] === value ? "" : value,
      };
    });
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
      cityDetail: '시/군/구',
    }));
  };

  const validateFields = () => {
    if (!nickname.trim()) {
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
    if (!nickname || !nicknameRegex.test(nickname)) {
      AlertDialog({
        mode: "alert",
        title: "닉네임 오류",
        text: "특수문자는 사용하실 수 없습니다.",
        confirmText: "확인",
        onConfirm: () => console.log("닉네임 오류 경고 확인됨"),
      });
      return false;
    }
  
    if (!nickname || !userData.gender || !userData.city || !userData.cityDetail || !userData.pushAgreement) {
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
  

  const getOAuthIcon = () => {
    if (userData.oauthProvider === 'kakao') return kakaoBtn;
    if (userData.oauthProvider === 'google') return GoogleBtn;
    return null;
  };

  const handleNicknameCheck = async () => {
    if (!nickname.trim()) { 
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
                params: { nickname }, 
                withCredentials: true,
            }
        );

        if (data.data.isDuplicate === false) {
            AlertDialog({
                mode: "alert",
                title: "닉네임 사용 가능",
                text: "사용 가능한 닉네임입니다.",
                confirmText: "확인",
                onConfirm: () => console.log("사용 가능한 닉네임 확인됨"),
            });
        } else if (data.data.isDuplicate === true) {
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
  
const handleUpdate = async () => {
  if (!validateFields()) return;

  
  const genderCode = userData.gender === '남자' ? 'GND_01' : userData.gender === '여자' ? 'GND_02' : '';

  const payload = {
    userId,
    nickname,
    gender: genderCode, 
    city: userData.city,
    cityDetail: userData.cityDetail,
    pushAgreement: userData.pushAgreement,
    email,
  };

  try {
    const response = await axios.put(
      'https://www.daengdaeng-where.link/api/v1/user/adjust',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    console.log('Updated User Data:', response.data);
    AlertDialog({
      mode: 'alert',
      title: '회원정보 수정 성공',
      text: '회원 정보가 성공적으로 수정되었습니다!',
      confirmText: '확인',
      onConfirm: () => {
        console.log("수정 성공 확인됨");
        navigate("/my-page"); 
      },
    });
  } catch (error) {
    if (error.response) {
      AlertDialog({
        mode: 'alert',
        title: '회원정보 수정 실패',
        text: error.response.data.message || '알 수 없는 오류가 발생했습니다.',
        confirmText: '확인',
        onConfirm: () => console.log('수정 실패 확인됨'),
      });
    }
  }
};

  return (
    <UserContainer>
      <SelectLabel label="이메일" />
      <InputEmailContainer>
      <Input
          type="email"
          value={email} 
          disabled
        />
        {getOAuthIcon() && <Icon src={getOAuthIcon()} alt="OAuth Provider" />}
      </InputEmailContainer>

      <SelectLabel label="닉네임" />
      <InputBox>
        <Input
            type="text"
            placeholder="사용하실 닉네임을 입력해 주세요."
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)} 
          />
        <DuplicateBtn onClick={handleNicknameCheck}>중복확인</DuplicateBtn>
      </InputBox>
      <InputAlert>*닉네임은 최소 1자 이상 작성해 주세요. 특수문자는 사용할 수 없습니다.</InputAlert>

      <SelectLabel label="성별" />
        <SelectionContainer>
          <SelectBtn
            label="남자"
            selected={userData.gender === '남자'}
            onClick={() => handleGenderChange('남자')}
          />
          <SelectBtn
            label="여자"
            selected={userData.gender === '여자'}
            onClick={() => handleGenderChange('여자')}
          />
        </SelectionContainer>

      <SelectLabel label="주소" />
      <SelectionContainer>
        <SelectBox onChange={handleCityChange} value={userData.city}>
          <option value="도" disabled>
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
          disabled={!userData.city || !AreaField[userData.city]?.length}
        >
          <option value="시/군/구" disabled>
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
          selected={userData.pushAgreement === true }
          onClick={() => handleInputChange('pushAgreement', '받을래요')}
        />
        <SelectBtn
          label="괜찮아요"
          selected={userData.pushAgreement === false }
          onClick={() => handleInputChange('pushAgreement', '괜찮아요')}
        />
      </SelectionContainer>
      <InputAlert>*장소에 함께하는 댕댕이를 알려드려요</InputAlert>

      <ConfirmContainer>
        <ConfirmBtn label="수정 완료" onClick={handleUpdate} />
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

  @media (max-width: 554px) {
    width:18%;
    height: 20px;
    font-size:10px;
    height: auto;
  }

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

export default UserEdit;
