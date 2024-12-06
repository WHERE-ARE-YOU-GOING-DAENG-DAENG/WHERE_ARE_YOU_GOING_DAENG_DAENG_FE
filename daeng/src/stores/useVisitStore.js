import { create } from "zustand";
import axios from "axios";
import axiosInstance from "../services/axiosInstance";
import AlertDialog from "../components/commons/SweetAlert";

const useVisitStore = create((set) => ({
  myVisits: [],
  // 내방문예정목록 조회
  fetchVisits: async () => {
    try {
      const response = await axiosInstance.get("https://www.daengdaeng-where.link/api/v1/visit/user",{
        withCredentials: true,
    });
      
      set({ myVisits: response.data.data });
    } catch (error) {
      if(error.response){
        if(error.response.status === 401){
          AlertDialog({
            mode: "alert",
            title: "로그인 필요",
            text: "로그인이 필요한 기능입니다.",
            confirmText: "확인",
            onConfirm: () => console.log("로그인이 필요합니다."),
          });
        }else{
          AlertDialog({
            mode: "alert",
            title: "방문예정목록 조회",
            text: "방문예정목록 조회에 실패하였습니다.",
            confirmText: "확인",
            onConfirm: () => console.log("방문예정 조회 실패"),
        });
        }
  }
    }
  },
  // 방문예정 삭제
  removeVisit: async (visitId) => {
    try {
      await axiosInstance.delete(`https://www.daengdaeng-where.link/api/v1/visit/${visitId}`,{
        withCredentials: true,
    });
      set((state) => ({
        myVisits: state.myVisits.filter((v) => v.visitId !== visitId),
      }));
    } catch (error) {
      if(error.response){
        AlertDialog({
        mode: "alert",
        title: "방문예정삭제",
        text: "방문예정 삭제에 실패하였습니다.",
        confirmText: "확인",
        onConfirm: () => console.log("방문예정 삭제 실패"),
    });
  }
    }
  },
}));

export default useVisitStore;