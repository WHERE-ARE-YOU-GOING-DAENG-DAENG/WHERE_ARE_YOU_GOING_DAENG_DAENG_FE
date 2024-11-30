import { create } from 'zustand';

const useLocationStore = create((set, get, api) => ({
  userLocation: { lat: 0.0, lng: 0.0 }, // 초기 위치
  setUserLocation: (location) => set({ userLocation: location }),
  clearLocation: () => set({ userLocation: { lat: 0.0, lng: 0.0 } }),
  // 구독 API를 통해 상태 변화를 감지할 수 있도록 확장
  subscribeToLocationChanges: (callback) => {
    const unsubscribe = api.subscribe(
      (state) => state.userLocation, // userLocation 값 선택
      (newLocation) => {
        callback(newLocation); // 콜백 호출
      }
    );
    return unsubscribe; // 구독 해제 함수 반환
  },
}));

export default useLocationStore;
