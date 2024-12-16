import { create } from "zustand";
import axios from "axios";

const useReviewStore = create((set, get) => ({
  reviews: [],
  total: 0,
  page: 0,
  size: 15,
  isFirst: true,
  isLast: false, 
  isLoading: false,
  placeName: "",
  error: null,

  fetchUserReviews: async (page = get().page, size = get().size) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `https://dev.daengdaeng-where.link/api/v1/reviews/user?page=${page}&size=${size}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const data = response.data.data;

      set({
        reviews: page === 0 ? data.reviews : [...get().reviews, ...data.reviews],
        total: data.total,
        page: data.page,
        size: data.size,
        isFirst: data.isFirst,
        placeName: data.placeName || "",
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

  increasePage: () => {
    set({ page: get().page + 1 });
  },
}));

export default useReviewStore;
