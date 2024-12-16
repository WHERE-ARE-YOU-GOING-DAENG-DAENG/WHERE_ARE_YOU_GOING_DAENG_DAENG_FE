import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Wrapper } from "../../components/admin/AdminCommonStyle";
import SelectLabel from "../commons/SelectLabel";

const ImageUpload = ({ label, onUpload }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      console.log("파일 선택 취소됨");
      return;
    }
    console.log("선택된 파일:", selectedFile);
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) {
      alert("이미지를 선택해주세요.");
      console.log("이미지가 선택되지 않음");
      return;
    }

    console.log("업로드 시작:", file);
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

      console.log("서버 응답 데이터:", response.data);

      const { thumbImgPath, imgPath } = response.data.data;
      console.log("업로드 성공 - 썸네일 경로:", thumbImgPath);
      console.log("업로드 성공 - 이미지 경로:", imgPath);

      onUpload({ thumbImgPath, imgPath }); // 부모 컴포넌트로 데이터 전달
      alert("이미지가 성공적으로 업로드되었습니다.");
    } catch (error) {
      console.error("이미지 업로드 실패 - 에러 메시지:", error.response?.data || error.message);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
      console.log("업로드 종료");
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
