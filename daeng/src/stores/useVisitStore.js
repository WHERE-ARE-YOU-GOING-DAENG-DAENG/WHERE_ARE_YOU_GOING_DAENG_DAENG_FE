import { create } from "zustand";
import axios from "axios";

const useVisitStore = create((set) => ({
  myVisits: [],
  // 내방문예정목록 조회
  fetchVisits: async () => {
    try {
      const response = await axios.get("https://www.daengdaeng-where.link/api/v1/visit/user");
      
      set({ myVisits: response.data.data });
    } catch (error) {
      console.error("Error fetching Visits:", error);
    }
  },
  // 방문예정 삭제
  removeVisit: async (visitId) => {
    try {
      await axios.delete(`https://www.daengdaeng-where.link/api/v1/visit/${visitId}`);
      set((state) => ({
        myVisits: state.myVisits.filter((v) => v.visitId !== visitId),
      }));
    } catch (error) {
      console.error("Error removing Visit:", error);
    }
  },
}));

export default useVisitStore;