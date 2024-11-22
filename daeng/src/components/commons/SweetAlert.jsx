import Swal from "sweetalert2";
import styled, { css } from "styled-components";

const StyledConfirmButton = css`
  background-color: #FF69A9;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #FF99C8;
  }
`;

const injectStyles = () => {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.textContent = `
    .custom-confirm-button {
      ${StyledConfirmButton}
    }
  `;
  document.head.appendChild(styleSheet);
};

const AlertDialog = ({
  mode,
  title,
  text,
  confirmText,
  cancelText ,
  onConfirm,
  onCancel,
}) => {
  injectStyles(); // SweetAlert 스타일 동적 추가 부분

  if (mode === "alert") {
    Swal.fire({
      title,
      text,
      icon: "warning",
      confirmButtonText: confirmText,
      customClass: {
        confirmButton: "custom-confirm-button",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm();
      }
    });
  } else if (mode === "confirm") {
    Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      customClass: {
        confirmButton: "custom-confirm-button",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm();
      } else if (result.isDismissed && onCancel) {
        onCancel();
      }
    });
  }
};
//여기 아이콘 변경해서 넣을게요

export default AlertDialog;
