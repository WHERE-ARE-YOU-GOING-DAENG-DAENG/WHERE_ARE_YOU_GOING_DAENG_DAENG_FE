import { create } from "zustand";
import axios from "axios";

const useFavoriteStore = create((set, get) => ({
  favorites: [],
  // 즐겨찾기 목록조회
  fetchFavorites: async () => {
    try {
      const response = await axios.get("https://www.daengdaeng-where.link/api/v1/favorites?page=0&size=10");
      
      set({ favorites: response.data.data.content });
      console.log(response.data.data.content)
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  },
  // 즐겨찾기 추가
  addFavorite: async (placeId) => {
    try {
      const response = await axios.post("https://www.daengdaeng-where.link/api/v1/favorites", { placeId });
      // await get().fetchFavorites();
      const newFavorite = response.data;
        set((state) => ({ favorites: [...state.favorites, newFavorite] }));
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  },
  // 즐겨찾기 삭제
  removeFavorite: async (favoriteId) => {
    try {
      await axios.delete(`https://www.daengdaeng-where.link/api/v1/favorites/${favoriteId}`);
      // await get().fetchFavorites();
      set((state) => ({
        favorites: state.favorites.filter((fav) => fav.favoriteId !== favoriteId),
      }));
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