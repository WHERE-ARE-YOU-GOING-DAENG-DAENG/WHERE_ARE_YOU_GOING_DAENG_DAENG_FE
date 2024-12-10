import { create } from "zustand";
import axios from "axios";
import AlertDialog from "../components/commons/SweetAlert";
import axiosInstance from "../services/axiosInstance"

const useFavoriteStore = create((set, get) => ({
  favorites: [],
  hasMore: true,
  isLoading: false,

  fetchFavorites: async (page) => {
    const state = get();
    if (state.isLoading) return;
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(
        `https://www.daengdaeng-where.link/api/v1/favorites?page=${page}&size=10`,
        {
          withCredentials: true,
        }
      );

      const newFavorites = response.data.data.content;
      const totalPages = response.data.data.totalPages;

      const existingIds = new Set(state.favorites.map((fav) => fav.favoriteId));
        const filteredFavorites = newFavorites.filter(
            (fav) => !existingIds.has(fav.favoriteId)
        );

      set((state) => ({
        favorites: [...state.favorites, ...filteredFavorites],
        hasMore: page + 1 < totalPages,
      }));
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          AlertDialog({
            mode: "alert",
            title: "로그인 필요",
            text: "로그인이 필요한 기능입니다.",
            confirmText: "확인",
          });
        } else {
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
        if (error.response.status === 401) {
          AlertDialog({
            mode: "alert",
            title: "로그인 필요",
            text: "로그인이 필요한 기능입니다.",
            confirmText: "확인",
          });
        } else {
          AlertDialog({
            mode: "alert",
            title: "즐겨찾기 등록",
            text: "즐겨찾기 등록이 실패하였습니다.",
            confirmText: "확인",
          });
        }
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