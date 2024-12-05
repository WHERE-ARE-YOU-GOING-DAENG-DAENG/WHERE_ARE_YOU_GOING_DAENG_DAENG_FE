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
      gender: '',
      oauthProvider: '',
      setLoginData: (userData) =>
        set({
          userId: userData.userId || '',
          email: userData.email || '',
          nickname: userData.nickname || '',
          city: userData.city || '',
          cityDetail: userData.cityDetail || '',
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
        gender: '',
        oauthProvider: '',
      }),
    }),
    {
      name: 'user-session-storage',
      getStorage: () => sessionStorage,
    }
  )
);

export default useUserStore;
