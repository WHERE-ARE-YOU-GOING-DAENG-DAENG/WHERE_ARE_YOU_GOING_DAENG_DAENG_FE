import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../commons/SweetAlert";
import UserForm from "./UserForm";
import axios from "axios";

function UserRegister() {
  const navigate = useNavigate();

  const getCookieValue = (key) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ').reduce((acc, cookie) => {
      const [cookieKey, cookieValue] = cookie.split('=');
      acc[cookieKey] = decodeURIComponent(cookieValue);
      return acc;
    }, {});
    return cookies[key];
  };

  const emailFromCookie = getCookieValue('email') || '';
  const providerFromCookie = getCookieValue('provider') || '';

  const [isLoading, setIsLoading] = useState(false);

  const initialUserData = {
    email: emailFromCookie,
    nickname: "",
    gender: "",
    city: "",
    cityDetail: "",
    oauthProvider: providerFromCookie,
  };

  const onConfirm = async (userData) => {
    const { nickname, email, gender, city, cityDetail, oauthProvider } = userData;

    const payload = {
      nickname,
      email,
      gender,
      city,
      cityDetail,
      oauthProvider,
    };

    setIsLoading(true);
    try {
      const { status } = await axios.post(
        "https://dev.daengdaeng-where.link/api/v1/signup",
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
          icon: "success",
          onConfirm: () => navigate("/preference-register"),
        });
      } else {
        console.error(`회원가입 실패 - 상태 코드: ${status}`);
      }
    } catch {
      AlertDialog({
        mode: "alert",
        title: "오류",
        text: "서버와 통신 중 문제가 발생했습니다.",
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
      confirmButtonLabel="다음"
      initialNicknameChecked={false}
    />
  );
}

export default UserRegister;
