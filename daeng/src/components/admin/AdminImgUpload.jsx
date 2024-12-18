import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Wrapper } from "../../components/admin/AdminCommonStyle";
import SelectLabel from "../commons/SelectLabel";
import AlertDialog from "../../components/commons/SweetAlert";

const ImageUpload = ({ label, onUpload }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return;
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) {
      AlertDialog({
        mode: "alert",
        title: "경고",
        text: "이미지를 선택해주세요",
        confirmText: "닫기",
      });
      console.error("이미지가 선택되지 않음");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://dev.daengdaeng-where.link/api/v2/admin/placeImage",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      const { thumbImgPath, imgPath } = response.data.data;

      onUpload({ thumbImgPath, imgPath }); 
      AlertDialog({
        mode: "alert",
        title: "성공",
        text: "이미지를 성공적으로 등록했습니다.",
        confirmText: "닫기",
        icon:"success",
      });
    } catch (error) {
      console.error("이미지 업로드 실패 - 에러 메시지:", error.response?.data || error.message);
      AlertDialog({
        mode: "alert",
        title: "실패",
        text: "이미지 등록에 실패했습니다.",
        confirmText: "닫기",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Wrapper>
      <SelectLabel label={label} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <ImagePreview src={preview} alt="미리보기" />}
      <UploadButton onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "업로드 중..." : "저장"}
      </UploadButton>
    </Wrapper>
  );
};

export default ImageUpload;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const UploadButton = styled.button`
  padding: 10px 15px;
  background-color: #ff69a9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
