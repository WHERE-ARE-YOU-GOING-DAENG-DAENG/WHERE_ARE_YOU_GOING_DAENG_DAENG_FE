import { create } from "zustand";
import axios from "axios";

const useReviewStore = create((set) => ({
  reviews: [], 
  total: 0, // 총 리뷰 개수
  page: 0, // 현재 페이지
  size: 15, // 페이지 크기 (고정)
  isFirst: true, // 첫 번째 페이지 여부
  isLast: true, // 마지막 페이지 여부
  isLoading: false, // 로딩 상태
  error: null, // 에러 메시지

  fetchUserReviews: async (page = 0, size = 15) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `https://www.daengdaeng-where.link/api/v1/reviews/user?page=${page}&size=${size}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const data = response.data.data;

      set({
        reviews: data.reviews,
        total: data.total,
        page: data.page,
        size: data.size,
        isFirst: data.isFirst,
        isLast: data.isLast,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "리뷰 데이터를 가져오는 데 실패했습니다.";
      set({ isLoading: false, error: errorMessage });
      console.error("리뷰 데이터 요청 실패:", errorMessage);
    }
  },
}));

export default useReviewStore; 