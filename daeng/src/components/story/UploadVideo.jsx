import React, { useState } from "react";
import axios from "axios";
import x from "../../assets/icons/x.svg";
import crown from "../../assets/icons/crown.svg";
import AlertDialog from "../../components/commons/SweetAlert";
import {
  VideoContainer,
  CloseButton,
  TextContainer,
  ImageContainer,
  BottomBar,
  Location,
  UploadImg,
} from "./StoryCommonStyle";

function UploadStory({ onClose, nickname, city, cityDetail }) {
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

  const uploadStory = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      AlertDialog({
        mode: "alert", 
        title: "선택 오류",
        text: "이미지나 동영상을 선택해 주세요",
        confirmText: "확인"
      })
      return;
    }

    try {
      const postResponse = await axios.post(
        "https://dev.daengdaeng-where.link/api/v1/S3",
        {
          prefix: "STORY",
          fileNames: [selectedFile.name],
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("POST 요청 응답 데이터:", postResponse.data);
      const presignedUrl = postResponse.data?.data?.[selectedFile.name];
      console.log("생성된 Presigned URL:", presignedUrl);

      if (!presignedUrl) throw new Error("Presigned URL이 없습니다.");

      const uploadResponse = await axios.put(presignedUrl, selectedFile, {
        headers: { "Content-Type": selectedFile.type },
        withCredentials: true,
      });

      if (uploadResponse.status !== 200) {
        console.error("Presigned URL로 파일 업로드 실패:", uploadResponse);
        AlertDialog({
          mode: "alert", 
          title: "오류",
          text: "이미지 업로드에 실패했습니다.",
          confirmText: "확인"
        })
        return;
      }

      const uploadedUrl = presignedUrl.split("?")[0];
      console.log("업로드된 파일 URL:", uploadedUrl);

      const storyData = {
        nickname,
        city,
        cityDetail,
        path: uploadedUrl, 
      };

      const storyResponse = await axios.post(
        "https://dev.daengdaeng-where.link/api/v2/story",
        storyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (storyResponse.status === 200) {
        AlertDialog({
          mode: "alert", 
          title: "성공",
          text: "스토리가 성공적으로 올라갔습니다. ",
          confirmText: "확인",
          icon: 'success'
        })
        onClose();
      } else {
        console.error("스토리 등록 실패:", storyResponse);
        AlertDialog({
          mode: "alert", 
          title: "실패",
          text: "스토리가 업로드에 실패했습니다. ",
          confirmText: "확인"
        })
      }
    } catch (error) {
      console.error("업로드 중 오류 발생:", error);
      AlertDialog({
        mode: "alert", 
        title: "실패",
        text: "스토리가 업로드에 실패했습니다. ",
        confirmText: "확인"
      })
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
      <button onClick={uploadStory}>업로드</button>
    </VideoContainer>
  );
}

export default UploadStory;
