import { useState, useEffect } from "react";
import axios from "axios";
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
import {
  StoryWrapper,
  Title,
  StoryContainer,
  ArrowButton,
  ScrollableArea,
  ScrollableStories,
  FixedStoryAdd,
  PersonIconWrapper,
  PersonIcon,
  PlusIcon,
  AddText,
  Overlay,
  CrownIcon,
} from "./HomeStory.styles";

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
      
      const fetchedStories = response.data.data.map((story) => ({
        nickname: story.nickname,
        city: story.city,
        cityDetail: story.cityDetail,
        petImage: story.petImage,
        storyType: story.storyType,
      }));
      setStories(fetchedStories);
    } catch (error) {
      console.error("데이터를 가져오는 데 실패했습니다:", error);
    }
  };

  const ITEMS_PER_VIEW = 3; 

  const handleNext = () => {
    if (stories.length > ITEMS_PER_VIEW) {
      if (currentIndex + ITEMS_PER_VIEW < stories.length) {
        setCurrentIndex(currentIndex + ITEMS_PER_VIEW);
      }
    }
  };
  
  const handlePrev = () => {
    if (stories.length > ITEMS_PER_VIEW) {
      if (currentIndex - ITEMS_PER_VIEW >= 0) {
        setCurrentIndex(currentIndex - ITEMS_PER_VIEW);
      }
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

export default HomeStory;
