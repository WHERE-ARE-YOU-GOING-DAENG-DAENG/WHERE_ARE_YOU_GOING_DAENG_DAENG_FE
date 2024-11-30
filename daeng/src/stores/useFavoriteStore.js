import { create } from "zustand";
import axios from "axios";
import AlertDialog from "../components/commons/SweetAlert";

const useFavoriteStore = create((set, get) => ({
  favorites: [],
  // 즐겨찾기 목록조회
  fetchFavorites: async () => {
    try {
      const response = await axios.get("https://www.daengdaeng-where.link/api/v1/favorites?page=0&size=10");
      
      set({ favorites: response.data.data.content });
      console.log("zustand-bookmark",response.data.data.content) //로그 삭제
    } catch (error) {
      if(error.response){
        AlertDialog({
        mode: "alert",
        title: "즐겨찾기 조회",
        text: "즐겨찾기 조회가 실패하였습니다.",
        confirmText: "확인",
        onConfirm: () => console.log("즐겨찾기 조회 실패"),
    });
  }
    }
  },
  // 즐겨찾기 추가
  addFavorite: async (placeId) => {
    try {
      const response = await axios.post("https://www.daengdaeng-where.link/api/v1/favorites", { placeId });
      // await get().fetchFavorites();
      const newFavorite = response.data.data;
        set((state) => ({ favorites: [...state.favorites, newFavorite] }));
    } catch (error) {
      if(error.response){
        AlertDialog({
        mode: "alert",
        title: "즐겨찾기 등록",
        text: "즐겨찾기 등록이 실패하였습니다.",
        confirmText: "확인",
        onConfirm: () => console.log("즐겨찾기 등록 실패"),
    });
  }
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
      if(error.response){
        AlertDialog({
        mode: "alert",
        title: "즐겨찾기 삭제",
        text: "즐겨찾기 삭제가 실패하였습니다.",
        confirmText: "확인",
        onConfirm: () => console.log("즐겨찾기 삭제 실패"),
    });
  }
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