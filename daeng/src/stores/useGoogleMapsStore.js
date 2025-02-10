import { create } from "zustand";

let isScriptLoaded = false;
let isLoading = false;

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

    // 중복요청 방지
    if (isLoading) return;
    isLoading = true;

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

    script.onerror = () => {
      console.error("Google Maps API 로드 실패");
      isLoading = false;

      //3초 후 자동 재시도 (최대 3번)
      let retryCount = 0;
      const retryLoad = () => {
        if (retryCount < 3) {
          console.warn(`Google Maps API 재시도 중... (${retryCount + 1}/3)`);
          retryCount++;
          setTimeout(() => {
            document.body.removeChild(script);
            get().loadGoogleMaps();
          }, 3000);
        } else {
          console.error("Google Maps API 로드 재시도 실패");
        }
      };

      retryLoad();
    };

    document.body.appendChild(script);
  },
}));

export default useGoogleMapsStore;
