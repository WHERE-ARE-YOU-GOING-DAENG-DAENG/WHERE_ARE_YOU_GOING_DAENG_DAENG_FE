import { create } from 'zustand';

const useUserStore = create((set) => ({
  userData: {
    userId: '',
    email: '',
    nickname: '',
    gender: '',
    city: '',
    cityDetail: '',
    pushAgreement: '',
    oauthProvider: '',
  },
  setUserData: (newData) =>
    set((state) => ({
      userData: { ...state.userData, ...newData },
    })),
}));

export default useUserStore;