import create from "zustand";
import axios from "axios";

const useFavoriteStore = create((set, get) => ({
  favorites: [],
  // 즐겨찾기 목록조회
  fetchFavorites: async () => {
    try {
      const response = await axios.get("http://54.180.234.13:8080/api/v1/favorites");
      set({ favorites: response.data });
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  },
  // 즐겨찾기 추가
  addFavorite: async (placeId) => {
    try {
      await axios.post("http://54.180.234.13:8080/api/v1/favorites", { placeId });
      await get().fetchFavorites();
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  },
  // 즐겨찾기 삭제
  removeFavorite: async (favoriteId) => {
    try {
      await axios.delete(`http://54.180.234.13:8080/api/v1/favorites/${favoriteId}`);
      await get().fetchFavorites();
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  },
  // 즐겨찾기 id 가져오기
  getFavoriteId: (placeId) => {
    const state = get();
    const favorite = state.favorites.find((fav) => fav.placeId === placeId);
    return favorite ? favorite.favoriteId : null;
  },
}));

export default useFavoriteStore;