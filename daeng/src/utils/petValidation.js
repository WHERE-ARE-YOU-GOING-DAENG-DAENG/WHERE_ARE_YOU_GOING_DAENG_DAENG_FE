import AlertDialog from "../components/commons/SweetAlert";
export const validatePetForm = ({ petName, selectedPetType, petBirth, selectedGender, selectedNeutering, selectedSize }) => {
  const nameRegex = /^[가-힣a-zA-Z\s]+$/;

  if (!petName || !nameRegex.test(petName)) {
    AlertDialog({
      mode: "alert",
      title: "입력 오류",
      text: "댕댕이 이름은 한글 또는 영문만 입력 가능합니다.",
      confirmText: "확인",
    });
    return false;
  }

  if (!selectedPetType) {
    AlertDialog({
      mode: "alert",
      title: "선택 오류",
      text: "댕댕이 견종을 선택해주세요",
      confirmText: "확인",
    });
    return false;
  }

  if (!petBirth) {
    AlertDialog({
      mode: "alert",
      title: "선택 오류",
      text: "댕댕이 생일을 선택해주세요",
      confirmText: "확인",
    });
    return false;
  }

  if (!selectedGender) {
    AlertDialog({
      mode: "alert",
      title: "선택 오류",
      text: "댕댕이 성별을 선택해주세요",
      confirmText: "확인",
    });
    return false;
  }

  if (!selectedNeutering) {
    AlertDialog({
      mode: "alert",
      title: "선택 오류",
      text: "댕댕이 중성화 여부를 선택해주세요",
      confirmText: "확인",
    });
    return false;
  }

  if (!selectedSize) {
    AlertDialog({
      mode: "alert",
      title: "선택 오류",
      text: "댕댕이 크기를 선택해주세요",
      confirmText: "확인",
    });
    return false;
  }

  return true;
};
