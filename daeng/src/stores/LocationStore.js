import { create } from 'zustand';

const useLocationStore = create((set) => ({
  userLocation: { lat: 0.0, lng: 0.0 }, // 초기 위치
  setUserLocation: (location) => set({ userLocation: location }),
  clearLocation: () => set({ userLocation: { lat: 0.0, lng: 0.0 } }),
}));

export default useLocationStore;
