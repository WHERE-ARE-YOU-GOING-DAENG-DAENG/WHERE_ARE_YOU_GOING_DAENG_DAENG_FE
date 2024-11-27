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
    background-color: #FF4796;
  }
`;

const StyledCancelButton = css`
  border: 1px solid #FF69A9;
  background-color: white;
  margin-right: 20px;
  border-radius: 5px;
  padding: 10px 20px;
  color: #FF69A9;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: #FF4796;
    border: 1px solid #FF4796;
  }
`;

const injectStyles = () => {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.textContent = `
    .custom-confirm-button {
      ${StyledConfirmButton}
    }
    .custom-cancel-button {
      ${StyledCancelButton}
    }
    .swal2-actions {
      display: flex;
      flex-direction: row-reverse;  
    }
    
    /* 핑크색 아이콘 변경 */
    .swal2-icon {
      fill: #FF69A9 !important; /* 아이콘 색상 변경 */
    }
    .swal2-icon.swal2-success .swal2-icon-file,
    .swal2-icon.swal2-error .swal2-icon-file,
    .swal2-icon.swal2-warning .swal2-icon-file,
    .swal2-icon.swal2-info .swal2-icon-file,
    .swal2-icon.swal2-question .swal2-icon-file {
      fill: #FF69A9 !important; /* 모든 아이콘 배경을 핑크로 */
    }
  `;
  document.head.appendChild(styleSheet);
};

const AlertDialog = ({
  mode,
  title,
  text,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  icon = "warning"
}) => {
  injectStyles(); // SweetAlert 스타일 동적 추가 부분

  const iconOptions = {
    success: "success",
    error: "error",
    warning: "warning",
    info: "info",
    question: "question"
  };

  const selectedIcon = iconOptions[icon] || "warning"; 

  if (mode === "alert") {
    Swal.fire({
      title,
      text,
      icon: selectedIcon,
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
      icon: selectedIcon,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      customClass: {
        confirmButton: "custom-confirm-button",
        cancelButton: "custom-cancel-button",
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

export default AlertDialog;
