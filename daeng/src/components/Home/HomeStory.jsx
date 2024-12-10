import { useState } from "react";
import styled from "styled-components";
import HomeLeftArrow from "../../assets/icons/home_leftarrow.svg";
import HomeRightArrow from "../../assets/icons/home_rightarrow.svg";
import HomeStoryAdd from "../../assets/icons/home_storyadd.svg";
import HomeStoryAddBtn from "../../assets/icons/home_storyaddBtn.svg";
import UploadStoryBtn from "../../components/commons/UploadStoryBtn";

const HomeStory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stories = [
    { location: "서울 강남구", nickname: "내가 짱", isPinkBorder: true, imageSrc: "https://via.placeholder.com/80" },
    { location: "서울 중구", nickname: "내가 짱", isPinkBorder: true, imageSrc: null },
    { location: "서울 강동구", nickname: "내가 짱", isPinkBorder: false, imageSrc: null },
    { location: "서울 마포구", nickname: "내가 짱", isPinkBorder: false, imageSrc: null },
    { location: "서울 송파구", nickname: "내가 짱", isPinkBorder: true, imageSrc: null },
    { location: "서울 종로구", nickname: "내가 짱", isPinkBorder: false, imageSrc: null },
  ];

  const ITEMS_PER_VIEW = 3;

  const handleNext = () => {
    if (currentIndex < stories.length - ITEMS_PER_VIEW) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <StoryWrapper>
      <Title>땅주인들의 스토리</Title>
      <StoryContainer>
        <LeftArrowButton onClick={handlePrev}>
          <img src={HomeLeftArrow} alt="왼쪽 화살표" />
        </LeftArrowButton>
        <StoriesWrapper>
          <FixedStoryAdd>
            <PersonIconWrapper>
              <PersonIcon src={HomeStoryAdd} alt="스토리 추가" />
              <PlusIcon src={HomeStoryAddBtn} alt="더하기 아이콘" />
            </PersonIconWrapper>
            <AddText>스토리 추가</AddText>
          </FixedStoryAdd>
          <ScrollableArea>
            <ScrollableStories currentIndex={currentIndex}>
              {stories.map((story, index) => (
                <UploadStoryBtn
                  key={index}
                  location={story.location}
                  nickname={story.nickname}
                  isPinkBorder={story.isPinkBorder}
                  imageSrc={story.imageSrc}
                />
              ))}
            </ScrollableStories>
          </ScrollableArea>
        </StoriesWrapper>
        <RightArrowButton onClick={handleNext}>
          <img src={HomeRightArrow} alt="오른쪽 화살표" />
        </RightArrowButton>
      </StoryContainer>
    </StoryWrapper>
  );
};

const StoryWrapper = styled.div`
  margin: 20px 0;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-left: 20px;
  text-align: left;
`;

const StoryContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LeftArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  img {
    width: 30px;
    height: 30px;
  }
`;

const RightArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  img {
    width: 30px;
    height: 30px;
  }
`;

const StoriesWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const FixedStoryAdd = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 104px;
  height: 136px;
  text-align: center;
  cursor: pointer;
  margin-right: 15px;
`;

const PersonIconWrapper = styled.div`
  position: relative;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PersonIcon = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background-color: #d9d9d9;
`;

const PlusIcon = styled.img`
  position: absolute;
  bottom: 5px;
  right: 0;
  width: 30px;
  height: 30px;
`;

const AddText = styled.p`
  margin-top: 8px;
  font-size: 14px;
  font-weight: bold;
  color: black;
`;

const ScrollableArea = styled.div`
  overflow: hidden;
  width: calc(104px * 3 + 30px); /* 스토리 3개와 간격 포함한 너비 */
`;

const ScrollableStories = styled.div`
  display: flex;
  gap: 10px;
  transform: translateX(${({ currentIndex }) => -currentIndex * (104 + 15)}px);
  transition: transform 0.3s ease-in-out;
`;

export default HomeStory;
