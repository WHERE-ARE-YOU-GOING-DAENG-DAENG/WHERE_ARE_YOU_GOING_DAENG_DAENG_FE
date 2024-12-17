import { useState } from "react";
import PropTypes from "prop-types";
import SelectLabel from "../../components/commons/SelectLabel";
import SelectBtn from "../../components/commons/SelectBtn";
import ConfirmBtn from "../../components/commons/ConfirmBtn";
import AlertDialog from "../commons/SweetAlert";
import Loading from "../commons/Loading";
import AreaField from "../../data/AreaField";
import kakaoBtn from "../../assets/icons/kakaoBtn.svg";
import googleBtn from "../../assets/icons/GoogleBtn.svg";
import axios from "axios";
import {
  UserContainer,
  InputEmailContainer,
  InputBox,
  Input,
  Icon,
  DuplicateBtn,
  InputAlert,
  SelectionContainer,
  SelectBox,
  ConfirmContainer,
} from "./UserForm.styles";

function UserForm({
  initialUserData,
  isLoading,
  setIsLoading,
  onConfirm,
  confirmButtonLabel = "확인",
  initialNicknameChecked = false,
}) {
  const [userData, setUserData] = useState(initialUserData);
  const [isNicknameChecked, setIsNicknameChecked] = useState(initialNicknameChecked);

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenderChange = (genderCode) => {
    setUserData((prev) => ({
      ...prev,
      gender: prev.gender === genderCode ? "" : genderCode,
    }));
  };

  const validateFields = () => {
    if (!userData.nickname.trim()) {
      AlertDialog({
        mode: "alert",
        title: "닉네임 필요",
        text: "닉네임은 최소 1자 이상 작성해 주세요.",
        confirmText: "확인",
      });
      return false;
    }

    const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
    if (!nicknameRegex.test(userData.nickname)) {
      AlertDialog({
        mode: "alert",
        title: "닉네임 오류",
        text: "닉네임에 특수문자나 자음/모음 단독 사용은 불가능합니다.",
        confirmText: "확인",
      });
      return false;
    }

    if (!userData.nickname || !userData.gender || !userData.city || !userData.cityDetail) {
      AlertDialog({
        mode: "alert",
        title: "입력 필요",
        text: "모든 필드를 작성해주세요.",
        confirmText: "확인",
      });
      return false;
    }

    if (!isNicknameChecked) {
      AlertDialog({
        mode: "alert",
        title: "닉네임 중복 확인 필요",
        text: "닉네임 중복 확인을 완료해 주세요.",
        confirmText: "확인",
      });
      return false;
    }

    return true;
  };

  const handleNicknameCheck = async () => {
    if (!userData.nickname.trim()) {
      AlertDialog({
        mode: "alert",
        title: "닉네임 필요",
        text: "닉네임을 입력해 주세요.",
        confirmText: "확인",
      });
      return;
    }

    const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
    if (!nicknameRegex.test(userData.nickname)) {
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
        `https://api.daengdaeng-where.link/api/v1/user/duplicateNickname`,
        {
          params: { nickname: userData.nickname },
          withCredentials: true,
        }
      );

      if (!data.data.isDuplicate) {
        setIsNicknameChecked(true);
        AlertDialog({
          mode: "alert",
          title: "닉네임 사용 가능",
          text: "사용 가능한 닉네임입니다.",
          confirmText: "확인",
          icon: "success",
        });
      } else {
        setIsNicknameChecked(false);
        AlertDialog({
          mode: "alert",
          title: "닉네임 중복",
          text: "사용 불가능한 닉네임입니다. 다른 닉네임을 입력해주세요.",
          confirmText: "확인",
        });
      }
    } catch (error) {
      AlertDialog({
        mode: "alert",
        title: "닉네임 확인 실패",
        text: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
        confirmText: "확인",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmClick = () => {
    if (!validateFields()) return;
    onConfirm(userData);
  };

  const getOAuthIcon = () => {
    if (userData.oauthProvider === "kakao") return kakaoBtn;
    if (userData.oauthProvider === "google") return googleBtn;
    return null;
  };

  return (
    <UserContainer>
      {isLoading && <Loading label="처리 중입니다..." />}

      <SelectLabel label="이메일" />
      <InputEmailContainer>
        <Input type="email" value={userData.email} disabled />
        {getOAuthIcon() && <Icon src={getOAuthIcon()} alt="OAuth Provider" />}
      </InputEmailContainer>

      <SelectLabel label="닉네임" />
      <InputBox>
        <Input
          type="text"
          placeholder="사용하실 닉네임을 입력해 주세요."
          value={userData.nickname}
          onChange={(e) => {
            handleInputChange("nickname", e.target.value);
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
          selected={userData.gender === "GND_01"}
          onClick={() => handleGenderChange("GND_01")}
        />
        <SelectBtn
          label="여자"
          selected={userData.gender === "GND_02"}
          onClick={() => handleGenderChange("GND_02")}
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

      <ConfirmContainer>
        <ConfirmBtn label={confirmButtonLabel} onClick={handleConfirmClick} />
      </ConfirmContainer>
    </UserContainer>
  );
}

UserForm.propTypes = {
  initialUserData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    cityDetail: PropTypes.string.isRequired,
    oauthProvider: PropTypes.string,
    userId: PropTypes.any,
  }).isRequired,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmButtonLabel: PropTypes.string,
  initialNicknameChecked: PropTypes.bool,
};

UserForm.defaultProps = {
  isLoading: false,
  confirmButtonLabel: "확인",
  initialNicknameChecked: false,
};

export default UserForm;
