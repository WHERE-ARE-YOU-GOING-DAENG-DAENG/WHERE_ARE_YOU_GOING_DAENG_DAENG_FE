import React, { useState } from "react";
import axios from "axios";
import x from "../../assets/icons/x.svg";
import crown from "../../assets/icons/crown.svg";
import {
  VideoContainer,
  CloseButton,
  TextContainer,
  ImageContainer,
  BottomBar,
  Location,
  UploadImg,
} from "./StoryCommonStyle";

function UploadVideo({ onClose, nickname, city, cityDetail }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileType = file.type.startsWith("video/") ? "video" : "image";
        setPreview({ type: fileType, src: reader.result, name: file.name });
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const uploadMedia = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("파일을 선택하세요!");
      return;
    }

    try {
      const postResponse = await axios.post(
        "https://dev.daengdaeng-where.link/api/v2/S3",
        {
          prefix: "STORY",
          path: selectedFile.name,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const presignedUrl = postResponse.data?.data?.presignedUrl;
      if (!presignedUrl) throw new Error("Presigned URL이 없습니다.");

      const uploadResponse = await axios.put(presignedUrl, selectedFile, {
        headers: { "Content-Type": selectedFile.type },
        withCredentials: true,
      });

      if (uploadResponse.status !== 200) {
        console.error("파일 업로드 실패:", uploadResponse);
        alert("스토리 업로드 실패!");
        return;
      }

      const imageUrl = presignedUrl.split("?")[0];
      const uploadData = {
        nickname,
        city,
        cityDetail,
        path: imageUrl,
      };

      const storyResponse = await axios.post(
        "https://dev.daengdaeng-where.link/api/v2/story",
        uploadData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (storyResponse.status === 200) {
        alert("스토리가 성공적으로 업로드되었습니다!");
        onClose();
      } else {
        console.error("스토리 등록 실패:", storyResponse);
        alert("스토리 등록 실패!");
      }
    } catch (error) {
      console.error("업로드 중 오류 발생:", error);
      alert("업로드 실패!");
    }
  };

  return (
    <VideoContainer>
      <TextContainer>스토리는 24시간 동안 업로드 됩니다.</TextContainer>
      <CloseButton src={x} alt="팝업 닫기" onClick={onClose} />
      <ImageContainer>
        {preview ? (
          preview.type === "video" ? (
            <video src={preview.src} controls style={{ width: "100%" }} />
          ) : (
            <img src={preview.src} alt="미리보기" style={{ width: "100%" }} />
          )
        ) : (
          <UploadImg>
            <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
              이미지/동영상 업로드
              <input
                type="file"
                id="file-upload"
                accept="image/*,video/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
          </UploadImg>
        )}
      </ImageContainer>
      <BottomBar>
        <Location>
          <img src={crown} alt="왕관" style={{ marginRight: "5px" }} />
          {city} {cityDetail}
        </Location>
        <span>{nickname}님</span>
      </BottomBar>
      <button onClick={uploadMedia}>업로드</button>
    </VideoContainer>
  );
}

export default UploadVideo;
