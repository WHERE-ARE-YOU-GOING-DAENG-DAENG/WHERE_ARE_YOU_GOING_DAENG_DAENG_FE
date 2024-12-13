import { create } from "zustand";
import axiosInstance from "../services/axiosInstance";
import AlertDialog from "../components/commons/SweetAlert";

const useVisitStore = create((set) => ({
  myVisits: [],
  fetchVisits: async () => {
    try {
      const response = await axiosInstance.get("https://dev.daengdaeng-where.link/api/v1/visit/user",{
        withCredentials: true,
    });
      set({ myVisits: response.data.data });
    } catch (error) {
      AlertDialog({
        mode: "alert",
        title: "방문일정목록 조회",
        text: "방문일정목록 조회에 실패하였습니다.",
        confirmText: "확인",
        onCancel: () => console.error(error)
    });
    }
  },
  removeVisit: async (visitId) => {
    try {
      const response = await axiosInstance.delete(`https://dev.daengdaeng-where.link/api/v1/visit/${visitId}`,{
        withCredentials: true,
    });
      set((state) => ({
        myVisits: state.myVisits.filter((v) => v.visitId !== visitId),
      }));
      if(response.status === 200){
        AlertDialog({
          mode: "alert",
          title: "방문일정취소",
          text: "방문일정이 취소되었습니다.",
          icon: "success",
          confirmText: "확인",
        });
      }

    } catch (error) {
        AlertDialog({
        mode: "alert",
        title: "방문일정취소",
        text: "방문일정 취소에 실패하였습니다.",
        confirmText: "확인",
        onCancel: () => console.error(error)
    });
    }
  },
}));

export default useVisitStore;