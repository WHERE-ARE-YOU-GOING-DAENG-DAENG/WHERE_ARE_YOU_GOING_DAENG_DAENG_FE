import AlertDialog from "../../commons/SweetAlert";

const validateReview = ({ selectKeywords, selectPet, visitedAt, ratings, text }) => {
  if (selectKeywords.length === 0) {
    AlertDialog({
      mode: "alert",
      title: "등록 실패",
      text: "최소 하나 이상의 키워드를 선택해주세요.",
      confirmText: "확인",
    });
    return false;
  }

  if (selectPet.length === 0) {
    AlertDialog({
      mode: "alert",
      title: "등록 실패",
      text: "함께한 펫을 선택해주세요.",
      confirmText: "확인",
    });
    return false;
  }

  if (!visitedAt) {
    AlertDialog({
      mode: "alert",
      title: "등록 실패",
      text: "방문한 날짜를 선택해주세요.",
      confirmText: "확인",
    });
    return false;
  }

  if (!ratings.filter(Boolean).length) {
    AlertDialog({
      mode: "alert",
      title: "등록 실패",
      text: "별점을 선택해주세요.",
      confirmText: "확인",
    });
    return false;
  }

  if (!text.trim()) {
    AlertDialog({
      mode: "alert",
      title: "등록 실패",
      text: "리뷰 내용을 작성해주세요.",
      confirmText: "확인",
    });
    return false;
  }

  return true; 
};

export default validateReview;
