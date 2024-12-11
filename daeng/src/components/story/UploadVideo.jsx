import React from "react";
import x from "../../assets/icons/x.svg";
import {
  VideoContainer,
  CloseButton,
  TextContainer,
  ImageContainer,
  BottomBar,
  Location,
  UploadImg,
} from './StoryCommonStyle';
import crown from '../../assets/icons/crown.svg';

function UploadVideo({ onClose, nickname, city, cityDetail }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previews, setPreviews] = useState("");
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (file.type.startsWith("video/")) {
          setPreview({ type: "video", src: reader.result, name: file.name });
        } else if (file.type.startsWith("image/")) {
          setPreview({ type: "image", src: reader.result, name: file.name });
        }
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
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
          <img src="crown" alt="왕관"/>
          {city} {cityDetail}
        </Location>
        <span>{nickname}님</span>
      </BottomBar>
      <button onClick={handleUploadClick}>업로드</button>
    </VideoContainer>
  );
}

export default UploadVideo;