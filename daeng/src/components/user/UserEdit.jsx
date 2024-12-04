import { useEffect, useState } from "react";
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
import { requestNotificationPermission } from "../../firebase/firebaseMessaging";
import { pushAgree } from '../../data/CommonCode';

function UserEdit() {
  const navigate = useNavigate();
  const [selectedPushType] = useState(pushAgree[0].code);
  const { userId, email, nickname, setUserId, setEmail, setNickname } = useUserStore();
  const [userData, setUserData] = useState({
    gender: "",
    city: "",
    cityDetail: "",
    pushAgreement: "",
    oauthProvider: "",
  });
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://www.daengdaeng-where.link/api/v1/user/adjust",
          { withCredentials: true }
        );
        const { user } = response.data.data;

        setUserId(user.userId || "");
        setEmail(user.email || "");
        setNickname(user.nickname || "");

        setUserData({
          gender: user.gender || "",
          city: user.city || "도",
          cityDetail: user.cityDetail || "시/군/구",
          pushAgreement: user.pushAgreement,
          oauthProvider: user.oauthProvider || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        AlertDialog({
          mode: "alert",
          title: "데이터 불러오기 실패",
          text: "사용자 정보를 불러오는 데 문제가 발생했습니다.",
          confirmText: "확인",
        });
      }
    };

    fetchUserData();
  }, [setUserId, setEmail, setNickname]);

  const handlePushAgreementChange = async (value) => {
    try {
      if (value === "받을래요") {
        const token = await requestNotificationPermission();
        if (!token) {
          AlertDialog({
            mode: "alert",
            title: "알림 권한 필요",
            text: "알림 권한을 허용해주세요.",
            confirmText: "확인",
          });
          return;
        }

        setFcmToken(token);

        const response = await axios.post(
          'https://www.daengdaeng-where.link/api/v1/notifications/pushToken',
          {           
            token,
            pushType: selectedPushType
          },
          { withCredentials: true }
        );

        if (response.status === 200) {
          AlertDialog({
            mode: "alert",
            title: "알림 동의 완료",
            text: "알림 받기가 성공적으로 등록되었습니다.",
            confirmText: "확인",
          });
        }
      } else if (value === "괜찮아요") {
        const response = await axios.delete(
          "https://www.daengdaeng-where.link/api/v1/notifications",
          { withCredentials: true }
        );

        if (response.status === 200) {
          setFcmToken(null);
          AlertDialog({
            mode: "alert",
            title: "알림 취소 완료",
            text: "알림 받기가 성공적으로 취소되었습니다.",
            confirmText: "확인",
          });
        }
      }

      setUserData((prev) => ({
        ...prev,
        pushAgreement: value === "받을래요",
      }));
    } catch (error) {
      console.error("알림 상태 변경 실패:", error);
      AlertDialog({
        mode: "alert",
        title: "알림 상태 변경 실패",
        text: "알림 상태 변경 중 문제가 발생했습니다.",
        confirmText: "확인",
      });
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "pushAgreement") {
      handlePushAgreementChange(value);
      return;
    }

    setUserData((prev) => ({
      ...prev,
      [field]: prev[field] === value ? "" : value,
    }));
  };

  const handleUpdate = async () => {
    if (!validateFields()) return;

    const genderCode = userData.gender === "남자" ? "GND_01" : userData.gender === "여자" ? "GND_02" : "";

    const payload = {
      userId,
      nickname,
      gender: genderCode,
      city: userData.city,
      cityDetail: userData.cityDetail,
      pushAgreement: userData.pushAgreement,
      oauthProvider: userData.oauthProvider,
      email,
    };

    try {
      const response = await axios.put(
        "https://www.daengdaeng-where.link/api/v1/user/adjust",
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      AlertDialog({
        mode: "alert",
        title: "회원정보 수정 성공",
        text: "회원 정보가 성공적으로 수정되었습니다!",
        confirmText: "확인",
        onConfirm: () => navigate("/my-page"),
      });
    } catch (error) {
      console.error("회원정보 수정 실패:", error);
      AlertDialog({
        mode: "alert",
        title: "회원정보 수정 실패",
        text: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
        confirmText: "확인",
      });
    }
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
        text: "특수문자는 사용할 수 없습니다.",
        confirmText: "확인",
      });
      return false;
    }

    if (!userData.gender || !userData.city || !userData.cityDetail || userData.pushAgreement === null) {
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

  return (
    <UserContainer>
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
          onChange={(e) => setNickname(e.target.value)}
        />
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
          onChange={(e) => handleInputChange("cityDetail", e.target.value)}
          value={userData.cityDetail}
          disabled={!userData.city || !AreaField[userData.city]?.length}
        >
          <option value="시/군/구" disabled>
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

      <SelectLabel label="알림 동의" />
      <SelectionContainer>
        <SelectBtn
          label="받을래요"
          selected={userData.pushAgreement === true}
          onClick={() => handleInputChange("pushAgreement", "받을래요")}
        />
        <SelectBtn
          label="괜찮아요"
          selected={userData.pushAgreement === false}
          onClick={() => handleInputChange("pushAgreement", "괜찮아요")}
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
  padding: 10px;
  margin-right: 18px;
  margin-bottom: 10px;
  border: 0.5px solid #e4e4e4;
  font-size: 14px;
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

export default UserEdit;
