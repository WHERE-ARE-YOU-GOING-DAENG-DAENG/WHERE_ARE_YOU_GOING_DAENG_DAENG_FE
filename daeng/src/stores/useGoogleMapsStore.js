import { create } from "zustand";

let isScriptLoaded = false;

const useGoogleMapsStore = create((set, get) => ({
  isLoaded: false,
  loadGoogleMaps: () => {
    if (isScriptLoaded) {
      set({ isLoaded: true });
      return;
    }

    if (window.google && window.google.maps) {
      isScriptLoaded = true;
      set({ isLoaded: true });
      return;
    }

    const existingScript = document.querySelector("script[src*='maps.googleapis.com']");
    if (existingScript) {
      existingScript.onload = () => {
        isScriptLoaded = true;
        set({ isLoaded: true });
      };
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      isScriptLoaded = true;
      set({ isLoaded: true });
    };
    script.onerror = () => console.error("Google Maps API 로드 실패");
    document.body.appendChild(script);
  },
}));

export default useGoogleMapsStore;
