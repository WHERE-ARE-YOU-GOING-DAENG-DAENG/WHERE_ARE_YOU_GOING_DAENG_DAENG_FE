import { create } from "zustand";
import axios from "axios";
import AlertDialog from "../components/commons/SweetAlert";
import axiosInstance from "../services/axiosInstance"

const useFavoriteStore = create((set, get) => ({
  favorites: [],
  hasMore: true,
  isLoading: false,
  lastUpdatedAt: null, 
  lastFavoriteId: null,

  fetchFavorites: async () => {
    const { isLoading, lastUpdatedAt, lastFavoriteId, hasMore } = get();
    if (isLoading || !hasMore) return;
    
    try {
      set({ isLoading: true });
      const url = `https://dev.daengdaeng-where.link/api/v1/favorites?lastUpdatedAt=${lastUpdatedAt || ""}&lastFavoriteId=${lastFavoriteId || ""}`
      const response = await axiosInstance.get(url, { withCredentials: true });
      const newFavorites = response.data.data;
  
      if (newFavorites.length > 0) {
        const lastItem = newFavorites[newFavorites.length - 1];
        set((state) => ({
          favorites: [...state.favorites, ...newFavorites],
          lastUpdatedAt: lastItem.updatedAt,
          lastFavoriteId: lastItem.favoriteId,
          hasMore: newFavorites.length === 10,
        }));
      } else {
        set({ hasMore: false });
      }
    } catch (error) {
      if (error.response) {
        if (error.response?.status === 401) {
          AlertDialog({
              mode: "alert",
              title: "로그인 필요",
              text: `즐겨찾기는 로그인이 필요한 기능입니다.`,
              confirmText: "확인",
            });
        }else{
        AlertDialog({
          mode: "alert",
          title: "즐겨찾기 조회",
          text: "즐겨찾기 조회가 실패하였습니다.",
          confirmText: "확인",
        });
      }
      }
      set({ hasMore: false });
    } finally {
      set({ isLoading: false });
    }
  },
  addFavorite: async (placeId) => {
    try {
      const response = await axiosInstance.post("/api/v1/favorites", { placeId },{
        withCredentials: true
      });

      if (response.status === 200) {
      const newFavorite = response.data.data;
      set((state) => ({
        favorites: [...state.favorites, newFavorite],
      }));
        AlertDialog({
          mode: "alert",
          title: "즐겨찾기 추가",
          text: "즐겨찾기 목록에 추가되었습니다.",
          icon: "success",
          confirmText: "확인",
        });
      }
    } catch (error) {
      if(error.response){
        AlertDialog({
          mode: "alert",
          title: "즐겨찾기 등록",
          text: "즐겨찾기 등록이 실패하였습니다.",
          confirmText: "확인",
        });
  }
    }
  },
  removeFavorite: async (favoriteId) => {
    try {
      const response = await axiosInstance.delete(`/api/v1/favorites/${favoriteId}`,{
        withCredentials: true
      });
      set((state) => ({
        favorites: state.favorites.filter((fav) => fav.favoriteId !== favoriteId),
      }));

      if(response.status === 200){
        AlertDialog({
          mode: "alert",
          title: "즐겨찾기 삭제",
          text: "즐겨찾기 목록에서 삭제되었습니다.",
          icon: "success",
          confirmText: "확인",
        });
      }
    } catch (error) {
      if(error.response){
        AlertDialog({
        mode: "alert",
        title: "즐겨찾기 삭제",
        text: "즐겨찾기 삭제가 실패하였습니다.",
        confirmText: "확인",
    });
  }
    }
  },
  getFavoriteId: (placeId) => {
    const state = get();
    const favorite = state.favorites.find((fav) => fav.placeId === placeId);
    return favorite ? favorite.favoriteId : null;
  },
}));

export default useFavoriteStore;