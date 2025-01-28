import { create } from 'zustand';

const useLocationStore = create((set, get, api) => ({
  userLocation: { lat: 0.0, lng: 0.0, accuracy: Number.MAX_VALUE },
  setUserLocation: (location) => set({ userLocation: location }),
  clearLocation: () => set({ userLocation: { lat: 0.0, lng: 0.0, accuracy: Number.MAX_VALUE } }),
  subscribeToLocationChanges: (callback) => {
    const unsubscribe = api.subscribe(
      (state) => state.userLocation,
      (newLocation) => {
        callback(newLocation);
      }
    );
    return unsubscribe;
  },
}));

export default useLocationStore;
