import { create } from "zustand";
import axiosInstance from "../services/axiosInstance";

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
      const response = await axiosInstance.get(
        `/api/v1/reviews/user?page=${page}&size=${size}`,
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

  removeReview: async (reviewId) => {
    try {
      const response = await axiosInstance.delete(
        `/api/v1/review/${reviewId}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const newReviews = get().reviews.filter((review) => review.reviewId !== reviewId);
        set({ reviews: newReviews });
      }
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
      throw new Error("리뷰 삭제 중 오류가 발생했습니다.");
    }
  },

  increasePage: () => {
    set({ page: get().page + 1 });
  },
}));

export default useReviewStore;
