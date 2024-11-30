import { create } from 'zustand';

const useUserStore = create((set) => ({
    userId: '', 
    setUserId: (id) => set({ userId: id }), 
}));

export default useUserStore;