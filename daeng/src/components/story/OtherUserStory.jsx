import React from "react";
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

function OtherUserStory() {
  return (
    <VideoContainer>
      <TextContainer>스토리는 24시간 동안 업로드 됩니다.</TextContainer>
      <CloseButton src={x} alt="팝업 닫기" />
      <ImageContainer>
          <UploadImg>이미지/동영상 영역.</UploadImg>
      </ImageContainer>
      <BottomBar>
        <Location>
          <img src={crown} alt="왕관" style={{ marginRight: "5px" }} />
        </Location>
        <span>내가 최고님</span>
      </BottomBar>
    </VideoContainer>
  );
}

export default OtherUserStory;
