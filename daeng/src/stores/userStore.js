import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      userId: '',
      email: '',
      nickname: '',
      city: '',
      cityDetail: '',
      pushAgreement: false,
      gender: '',
      oauthProvider: '',
      setLoginData: (userData) =>
        set({
          userId: userData.userId || '',
          email: userData.email || '',
          nickname: userData.nickname || '',
          city: userData.city || '',
          cityDetail: userData.cityDetail || '',
          pushAgreement: userData.pushAgreement || false,
          gender: userData.gender || '',
          oauthProvider: userData.oauthProvider || '',
        }),
      // 상태를 초기화하는 함수
      clearStorage: () => set({
        userId: '',
        email: '',
        nickname: '',
        city: '',
        cityDetail: '',
        pushAgreement: false,
        gender: '',
        oauthProvider: '',
      }),
    }),
    {
      name: 'user-storage', // localStorage에 저장될 키 이름
      getStorage: () => localStorage, // localStorage를 사용 (기본값)
    }
  )
);

export default useUserStore;
