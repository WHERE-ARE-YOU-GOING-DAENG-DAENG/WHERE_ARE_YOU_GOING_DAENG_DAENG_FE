import { create } from "zustand";
import axios from "axios";
import AlertDialog from "../components/commons/SweetAlert";
import axiosInstance from "../services/axiosInstance"

const useFavoriteStore = create((set, get) => ({
  favorites: [],
  hasMore: true, //추가데이터 여부 확인
  isLoading: false, //로딩상태

  // 즐겨찾기 목록 조회
  fetchFavorites: async (page) => {
    const state = get();
    if (state.isLoading) return; // 중복 요청 방지
    try {
      set({ isLoading: true }); // 로딩 시작
      const response = await axiosInstance.get(
        `https://www.daengdaeng-where.link/api/v1/favorites?page=${page}&size=10`,
        {
          withCredentials: true,
        }
      );

      const newFavorites = response.data.data.content;
      const totalPages = response.data.data.totalPages;

      //중복 데이터 확인
      const existingIds = new Set(state.favorites.map((fav) => fav.favoriteId));
        const filteredFavorites = newFavorites.filter(
            (fav) => !existingIds.has(fav.favoriteId)
        );

      set((state) => ({
        favorites: [...state.favorites, ...filteredFavorites], // 기존 데이터와 병합
        hasMore: page + 1 < totalPages, // 다음 페이지 여부 갱신
      }));
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          AlertDialog({
            mode: "alert",
            title: "로그인 필요",
            text: "로그인이 필요한 기능입니다.",
            confirmText: "확인",
            onConfirm: () => console.log("로그인이 필요합니다."),
          });
        } else {
          AlertDialog({
            mode: "alert",
            title: "즐겨찾기 조회",
            text: "즐겨찾기 조회가 실패하였습니다.",
            confirmText: "확인",
            onConfirm: () => console.log("즐겨찾기 조회 실패"),
          });
        }
      }
      set({ hasMore: false });
    } finally {
      set({ isLoading: false }); // 로딩 종료
    }
  },
  // 즐겨찾기 추가
  addFavorite: async (placeId) => {
    try {
      await axiosInstance.post("/api/v1/favorites", { placeId },{
        withCredentials: true
      });
      // await get().fetchFavorites();
    } catch (error) {
      if(error.response){
        if (error.response.status === 401) {
          AlertDialog({
            mode: "alert",
            title: "로그인 필요",
            text: "로그인이 필요한 기능입니다.",
            confirmText: "확인",
            onConfirm: () => console.log("로그인이 필요합니다."),
          });
        } else {
          AlertDialog({
            mode: "alert",
            title: "즐겨찾기 등록",
            text: "즐겨찾기 등록이 실패하였습니다.",
            confirmText: "확인",
            onConfirm: () => console.log("즐겨찾기 등록 실패"),
          });
        }
  }
    }
  },
  // 즐겨찾기 삭제
  removeFavorite: async (favoriteId) => {
    try {
      await axiosInstance.delete(`/api/v1/favorites/${favoriteId}`,{
        withCredentials: true
      });
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