import { create } from "zustand";
import axios from "axios";

const useTotalReviewStore = create((set, get) => ({
  reviews: [],
  total: 0,
  bestKeywords: [], 
  score: 0, 
  page: 0, // 현재 페이지
  isLast: false, // 마지막 페이지 여부
  isLoading: false, // 로딩 상태
  placeName: "",
  error: null, 
  sortedType: "LATEST", 

  setSortedType: (type) =>
    set({
      sortedType: type,
      page: 0,
      reviews: [], // 정렬 변경 시 기존 리뷰 초기화
      isLast: false, // 새 정렬에서는 처음부터 다시 로드
    }),

  fetchReviews: async (placeId) => {
    const { page, sortedType, isLoading, isLast } = get();
    const size = 15; 

    if (isLoading || isLast) return; // 중복 요청 방지 및 마지막 페이지 처리

    set({ isLoading: true, error: null }); // 로딩 상태 활성화

    try {
      const response = await axios.get(
        `https://www.daengdaeng-where.link/api/v1/reviews/place/${placeId}/${sortedType}?page=${page}&size=${size}`,
        
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("응답 데이터:", response.data);
      const data = response.data.data;
    
      set((state) => ({
        reviews: page === 0 ? data.reviews : [...state.reviews, ...data.reviews],
        total: data.total,
        bestKeywords: data.bestKeywords,
        score: parseFloat(data.score) || 0,
        page: state.page + 1,
        isLast: data.isLast,
        isLoading: false,
      }));

    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "리뷰 데이터를 가져오는 데 실패했습니다.";
      set({ isLoading: false, error: errorMessage });
    }
  },
}));

export default useTotalReviewStore;