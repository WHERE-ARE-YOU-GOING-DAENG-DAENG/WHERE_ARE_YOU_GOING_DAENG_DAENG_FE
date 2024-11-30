import { create } from 'zustand';

const useUserStore = create((set) => ({
  userId: '',
  email: '',
  nickname: '',
  setUserId: (id) => set({ userId: id }),
  setEmail: (email) => set({ email }),
  setNickname: (nickname) => set({ nickname }),
}));

export default useUserStore;