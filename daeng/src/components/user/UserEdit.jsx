import { useState } from "react";
import styled from "styled-components";
import SelectLabel from "../../components/commons/SelectLabel";
import SelectBtn from "../../components/commons/SelectBtn";
import kakaoBtn from "../../assets/icons/kakaoBtn.svg";
import GoogleBtn from "../../assets/icons/GoogleBtn.svg";
import ConfirmBtn from "../../components/commons/ConfirmBtn";
import AreaField from "../../data/AreaField";
import axios from "axios";
import AlertDialog from "../commons/SweetAlert";
import useUserStore from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import Loading from "../commons/Loading";


function UserEdit() {
  const navigate = useNavigate();

  const {
    userId,
    email,
    nickname: storeNickname,
    city: storeCity,
    cityDetail: storeCityDetail,
    gender: storeGender,
    oauthProvider,
    setLoginData,
  } = useUserStore.getState();

  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState(storeNickname || '');
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); 
  const [userData, setUserData] = useState({
    userId,
    email,
    gender: storeGender || '',
    city: storeCity || '',
    cityDetail: storeCityDetail || '',
    oauthProvider,
  });

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: prev[field] === value ? "" : value,
    }));
  };

  const validateFields = () => {
    if (!nickname.trim()) {
      AlertDialog({
        mode: "alert",
        title: "닉네임 필요",
        text: "닉네임은 최소 1자 이상 작성해 주세요.",
        confirmText: "확인",
      });
      return false;
    }

    const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
    if (!nicknameRegex.test(nickname)) {
      AlertDialog({
        mode: "alert",
        title: "닉네임 오류",
        text: "닉네임에 특수문자나 자음/모음 단독 사용은 불가능합니다.",
        confirmText: "확인",
      });
      return;
    }

    if (
      !userData.gender || 
      !userData.city || 
      !userData.cityDetail
    ) {
      AlertDialog({
        mode: "alert",
        title: "입력 필요",
        text: "모든 필드를 작성해주세요.",
        confirmText: "확인",
      });
      return false;
    }

    return true;
  };

  const getOAuthIcon = () => {
    if (userData.oauthProvider === "kakao") return kakaoBtn;
    if (userData.oauthProvider === "google") return GoogleBtn;
    return null;
  };

  const handleNicknameCheck = async () => {
    if (!nickname.trim()) {
      AlertDialog({
        mode: "alert",
        title: "닉네임 필요",
        text: "닉네임을 입력해 주세요.",
        confirmText: "확인",
      });
      return;
    }

    const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
    if (!nicknameRegex.test(nickname)) {
      AlertDialog({
        mode: "alert",
        title: "닉네임 오류",
        text: "닉네임에 특수문자나 자음/모음 단독 사용은 불가능합니다.",
        confirmText: "확인",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://dev.daengdaeng-where.link/api/v1/user/duplicateNickname`,
        {
          params: { nickname },
          withCredentials: true,
        }
      );

      if (nickname === storeNickname) {
        setIsNicknameChecked(true);
        AlertDialog({
          mode: "alert",
          title: "닉네임 확인",
          text: "현재 닉네임을 그대로 사용할 수 있습니다.",
          confirmText: "확인",
          icon: "success",
        });
        return;
      }

      if (data.data.isDuplicate === false) {
        setIsNicknameChecked(true);
        AlertDialog({
          mode: "alert",
          title: "닉네임 사용 가능",
          text: "사용 가능한 닉네임입니다.",
          confirmText: "확인",
          icon: "success",
        });
      } else if (data.data.isDuplicate === true) {
        setIsNicknameChecked(false);
        AlertDialog({
          mode: "alert",
          title: "닉네임 중복",
          text: "사용 불가능한 닉네임입니다. 다른 닉네임을 입력해주세요.",
          confirmText: "확인",
        });
      }
    } catch (error) {
      if (error.response) {
        AlertDialog({
          mode: "alert",
          title: "닉네임 확인 실패",
          text: error.response.data.message || "알 수 없는 오류가 발생했습니다.",
          confirmText: "확인",
        });
      }
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const handleUpdate = async () => {

    if (!isNicknameChecked) { 
      AlertDialog({
        mode: "alert",
        title: "닉네임 중복 확인 필요",
        text: "닉네임 중복 확인을 완료해 주세요.",
        confirmText: "확인",
      });
      return ;
    }

    if (!validateFields()) return;

    const genderCode = userData.gender === '남자' ? 'GND_01' : userData.gender === '여자' ? 'GND_02' : '';

    const payload = {
      userId,
      nickname,
      gender: genderCode,
      city: userData.city,
      cityDetail: userData.cityDetail,
      oauthProvider,
      email,
    };

    setIsLoading(true);
    try {
      await axios.put(
        'https://dev.daengdaeng-where.link/api/v1/user/adjust',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      setLoginData({
        userId,
        nickname,
        gender: userData.gender,
        city: userData.city,
        cityDetail: userData.cityDetail,
        oauthProvider,
        email,
      });

      AlertDialog({
        mode: 'alert',
        title: '회원정보 수정 성공',
        text: '회원 정보가 성공적으로 수정되었습니다!',
        confirmText: '확인',
        icon: "success",
        onConfirm: () => {
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
        });
      }
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <UserContainer>
      {isLoading && <Loading label="처리 중입니다..." />}
      <SelectLabel label="이메일" />
      <InputEmailContainer>
        <Input type="email" value={email} disabled />
        {getOAuthIcon() && <Icon src={getOAuthIcon()} alt="OAuth Provider" />}
      </InputEmailContainer>

      <SelectLabel label="닉네임" />
      <InputBox>
        <Input
          type="text"
          placeholder="사용하실 닉네임을 입력해 주세요."
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setIsNicknameChecked(false);
          }}
        />
        <DuplicateBtn onClick={handleNicknameCheck}>중복확인</DuplicateBtn>
      </InputBox>
      <InputAlert>*닉네임은 최소 1자 이상 작성해 주세요. 특수문자는 사용할 수 없습니다.</InputAlert>

      <SelectLabel label="성별" />
      <SelectionContainer>
        <SelectBtn
          label="남자"
          selected={userData.gender === "남자"}
          onClick={() => handleInputChange("gender", "남자")}
        />
        <SelectBtn
          label="여자"
          selected={userData.gender === "여자"}
          onClick={() => handleInputChange("gender", "여자")}
        />
      </SelectionContainer>

      <SelectLabel label="주소" />
      <SelectionContainer>
        <SelectBox onChange={(e) => handleInputChange("city", e.target.value)} value={userData.city}>
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
          onChange={(e) => handleInputChange("cityDetail", e.target.value)}
          value={userData.cityDetail}
          disabled={!userData.city || !AreaField[userData.city]?.length}
        >
          <option value="" disabled >
            시/군/구 선택
          </option>
          {(AreaField[userData.city] || []).slice(1).map((districtName, index) => (
            <option key={index} value={districtName}>
              {districtName}
            </option>
          ))}
        </SelectBox>
      </SelectionContainer>
      <InputAlert>*보호자님과 우리 댕댕이 맞춤 장소 추천을 위해 필요한 정보입니다.</InputAlert>

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
  font-size: 14px;
  color: black;

  ::placeholder {
    color: #b3b3b3;
  }

  &:disabled {
    color: #b3b3b3;
  }

  @media (max-width: 554px) {
    font-size: 12px;
  }
`;

const Icon = styled.img`
  width: 20px;
  cursor: pointer;
  margin-right: 10px;
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
  padding: 0;
  margin-right: 18px;
  margin-bottom: 10px;
  border: 0.5px solid #e4e4e4;
  font-size: 14px;
  text-align-last: center;
  background-color: white;
  color: black;
  line-height: 44px;
  

  &:focus {
    border-color: #ff69a9;
    outline: none;
  }

  @media (max-width: 554px) {
    font-size: 11px;
  }
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

const ConfirmContainer = styled.div`
  display: flex;
  margin-top: 40px;
`;

export default UserEdit;
