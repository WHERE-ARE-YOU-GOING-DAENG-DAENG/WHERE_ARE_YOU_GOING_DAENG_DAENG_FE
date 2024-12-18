import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import AlertDialog from "../commons/SweetAlert";
import useUserStore from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";

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

  const mappedGender = storeGender === "남자" ? "GND_01" : storeGender === "여자" ? "GND_02" : "";
  
  const [isLoading, setIsLoading] = useState(false);

  const initialUserData = {
    userId,
    email,
    nickname: storeNickname || "",
    gender: mappedGender,
    city: storeCity || "",
    cityDetail: storeCityDetail || "",
    oauthProvider,
  };

  const onConfirm = async (userData) => {
    const { userId, nickname, gender, city, cityDetail, oauthProvider, email } = userData;

    const payload = {
      userId,
      nickname,
      gender,
      city,
      cityDetail,
      oauthProvider,
      email,
    };

    setIsLoading(true);
    try {
      await axiosInstance.put(
        "/api/v1/user/adjust",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setLoginData({
        userId,
        nickname,
        gender: gender === "GND_01" ? "남자" : "여자",
        city,
        cityDetail,
        oauthProvider,
        email,
      });

      AlertDialog({
        mode: "alert",
        title: "회원정보 수정 성공",
        text: "회원 정보가 성공적으로 수정되었습니다!",
        confirmText: "확인",
        icon: "success",
        onConfirm: () => {
          navigate("/my-page");
        },
      });
    } catch (error) {
      AlertDialog({
        mode: "alert",
        title: "회원정보 수정 실패",
        text: error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
        confirmText: "확인",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserForm
      initialUserData={initialUserData}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      onConfirm={onConfirm}
      confirmButtonLabel="수정 완료"
      initialNicknameChecked={true}
    />
  );
}

export default UserEdit;
