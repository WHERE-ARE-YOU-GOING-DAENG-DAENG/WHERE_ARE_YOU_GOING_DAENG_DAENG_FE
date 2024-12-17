import React, { useState, useEffect } from "react";
import styled from "styled-components";
import reversearrow from "../../assets/icons/reversearrow.svg";
import arrow from "../../assets/icons/arrow.svg";
import HomeStoryAdd from "../../assets/icons/home_storyadd.svg";
import HomeStoryAddBtn from "../../assets/icons/home_storyaddBtn.svg";
import DefaultImg from "../../assets/icons/UploadStoryBtn_DefaultImg.svg";
import Crown from "../../assets/icons/UploadStoryBtn_crown.svg";
import UploadStoryBtn from "../../components/commons/UploadStoryBtn";
import Detail from "../story/Detail";
import ShowMyStory from "../story/ShowMyStory";
import UploadVideo from "../story/UploadVideo";
import OtherUserStory from "../story/OtherUserStory";
import axios from "axios";

const HomeStory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPopup, setCurrentPopup] = useState(null); 
  const [detailData, setDetailData] = useState(null); 
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await axios.get(
        "https://dev.daengdaeng-where.link/api/v2/story",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("전체 스토리 데이터:", response.data);
      
      const fetchedStories = response.data.data.map((story) => ({
        nickname: story.nickname,
        city: story.city,
        cityDetail: story.cityDetail,
        petImage: story.petImage,
        storyType: story.storyType,
      }));
      console.log("스토리 데이터:", fetchedStories);
      setStories(fetchedStories);
    } catch (error) {
      console.error("데이터를 가져오는 데 실패했습니다:", error);
    }
  };

  const ITEMS_PER_VIEW = 3;

  const handleNext = () => {
    if (currentIndex < stories.length - ITEMS_PER_VIEW + 3) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  const openMyStoryPopup = () => {
    setCurrentPopup("myStory"); 
  };

  const openDetailPopup = () => {
    setCurrentPopup("detail"); 
  };

  const closePopup = () => {
    setCurrentPopup(null); 
  };

  const openNextPopup = (data) => {
    setDetailData(data); 
    setCurrentPopup("uploadVideo"); 
  };

  const openOtherUserStoryPopup = (story) => {
    setSelectedStory(story);
    setCurrentPopup("otherUserStory");
  };


  return (
    <StoryWrapper>
      <Title>땅주인들의 스토리</Title>
      <StoryContainer>
        <ArrowButton onClick={handlePrev}>
          <img src={reversearrow} alt="왼쪽 화살표" />
        </ArrowButton>
        <ScrollableArea>
          <ScrollableStories currentIndex={currentIndex}>
            <FixedStoryAdd>
              <PersonIconWrapper>
                <PersonIcon src={HomeStoryAdd} alt="내 스토리 확인" onClick={openMyStoryPopup} />
                <CrownIcon src={Crown} alt="왕관 아이콘" />
                <PlusIcon src={HomeStoryAddBtn} alt="스토리 추가 아이콘" onClick={openDetailPopup} />
              </PersonIconWrapper>
              <AddText>내 스토리</AddText>
            </FixedStoryAdd>
            {stories.map((story, index) => (
              <UploadStoryBtn
                key={index}
                location={`${story.city} ${story.cityDetail}`}
                nickname={story.nickname}
                isPinkBorder={story.storyType === "unviewed"}
                imageSrc={story.petImage || DefaultImg}
                onClick={() => openOtherUserStoryPopup(story)} 
                onClose={closePopup} 
              />
            ))}
          </ScrollableStories>
        </ScrollableArea>
        <ArrowButton onClick={handleNext}>
          <img src={arrow} alt="오른쪽 화살표" />
        </ArrowButton>
      </StoryContainer>

      {currentPopup === "myStory" && (
        <Overlay>
          <ShowMyStory onClose={closePopup} />
        </Overlay>
      )}

      {currentPopup === "detail" && (
        <Overlay>
          <Detail onClose={closePopup} onNext={(data) => openNextPopup(data)} />
        </Overlay>
      )}

      {currentPopup === "uploadVideo" && detailData && (
        <Overlay>
          <UploadVideo
            onClose={closePopup}
            nickname={detailData.nickname}
            city={detailData.city}
            cityDetail={detailData.cityDetail}
          />
        </Overlay>
      )}
      {currentPopup === "otherUserStory" && selectedStory && (
        <Overlay>
          <OtherUserStory
            nickname={selectedStory.nickname}
            city={selectedStory.city}
            cityDetail={selectedStory.cityDetail}
            imageSrc={selectedStory.petImage}
            onClose={() => {
              closePopup();
              fetchStories();
            }}
          />
        </Overlay>
      )}
    </StoryWrapper>
  );
};

const StoryWrapper = styled.div`
  margin: 10px 0;
  padding: 0 20px;

  @media (max-width: 554px) {
    padding: 0 10px;
    margin: 10px 0 0 0;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-left: 10px;
  text-align: left;

  @media (max-width: 554px) {
    font-size: 15px;
    margin: 10px 10px 0 10px;
  }
`;

const StoryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 554px) {
    gap: 5px;
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;

    @media (max-width: 554px) {
      width: 20px;
      height: 20px;
    }
  }
`;

const ScrollableArea = styled.div`
  overflow: hidden;
  flex: 1;

  @media (max-width: 554px) {
    margin-top: 5px;
  }
`;

const ScrollableStories = styled.div`
  display: flex;
  gap: 15px;
  transform: translateX(${({ currentIndex }) => -currentIndex * 104}px); 
  transition: transform 0.3s ease-in-out;
  align-items: center;

  @media (max-width: 554px) {
    gap: 10px;
  }
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
  margin-top: 10px;

  @media (max-width: 554px) {
    width: 88px;
    height: 120px;
    margin-top: 10px;
  }
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

  @media (max-width: 554px) {
    width: 70px;
    height: 70px;
  }
`;

const PersonIcon = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background-color: #d9d9d9;

  @media (max-width: 554px) {
    width: 70px;
    height: 70px;
  }
`;

const PlusIcon = styled.img`
  position: absolute;
  bottom: 5px;
  right: 0;
  width: 30px;
  height: 30px;

  @media (max-width: 554px) {
    width: 20px;
    height: 20px;
  }
`;

const AddText = styled.p`
  margin-top: 8px;
  font-size: 14px;
  font-weight: bold;
  color: black;

  @media (max-width: 554px) {
    font-size: 12px;
    margin-top: 5px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CrownIcon = styled.img`
  position: absolute;
  top: -12px;
  right: 14.5px;
  width: 25px;
  height: auto;

  @media (max-width: 554px) {
    width: 20px;
  }
`;

export default HomeStory;
