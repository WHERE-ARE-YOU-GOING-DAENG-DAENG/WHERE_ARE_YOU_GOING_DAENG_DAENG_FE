import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/commons/Footer";
import Header from "../components/commons/Header";
import ProgressBar from "../components/hopscotch/ProgressBar";
import HopscotchMap from "../components/hopscotch/HopscotchMap";
import MyLandLabel from "../components/hopscotch/MyLandLabel";
import rightarrow from "../assets/icons/arrow.svg";
import leftarrow from "../assets/icons/reversearrow.svg";
import styled from "styled-components";
import axios from "axios";
import Confetti from "../components/commons/Confetti";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-y: auto;
  padding-bottom: 76px;
`;

const LandContainer = styled.div`
  padding: 0px 30px;
`;

const Label = styled.p`
  padding-top: 10px;
  text-align: left;
  font-weight: bold;
`;

const Pink = styled.p`
  color: #FF69A9;
  display: inline;
`;

const ScrollContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  ${(props) => (props.direction === "left" ? "left: -30px;" : "right: -30px;")}
  img {
    width: 24px;
    height: 24px;
  }
`;

const LandList = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: hidden;
  scroll-behavior: smooth;
  white-space: nowrap;
  width: 100%;
  padding: 10px 0;
`;

const MyLandWrapper = styled.div`
  flex: 0 0 auto;
`;

const Hopscotch = () => {
  const [myLandlist, setMyLandList] = useState({ nickname: "", lands: [] })
  const landListRef = useRef(null);
  const [selectedArea, setSelectedArea] = useState([]);
  const [visitCount, setVisitCount] = useState({});
  const [myLand, setMyLand] = useState({region: "", subRegion: ""});
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(()=>{
    fetchMyLand();
    fetchMyVisit();
  },[])

  const scroll = (direction) => {
    if (landListRef.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        landListRef.current.scrollLeft -= scrollAmount;
      } else {
        landListRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  const totalLands = myLandlist.lands.reduce((acc, land) => acc + land.cityDetails.length, 0);
  
  const fetchMyLand = async() => {
    try{
      const response = await axios.get("https://dev.daengdaeng-where.link/api/v2/region",{
        withCredentials: true
      });
      setMyLandList(response.data.data);
    }catch(error){
      console.error("땅 목록을 불러오는 데 에러 발생",error)
    }
  }

  const fetchMyVisit = async() => {
    try{
      const response = await axios.get("https://dev.daengdaeng-where.link/api/v2/region/visitCount",{
        withCredentials: true
      });
      setVisitCount(response.data.data.visitInfo);
    }catch(error){
      console.error("방문 횟수를 불러오는 데 에러 발생",error)
    }
  };

  const getCurrentVisitCount = () => {
    const [region, subRegion] = selectedArea;
    if (region && subRegion && visitCount[region]?.[subRegion] !== undefined) {
      return visitCount[region][subRegion];
    }
    return 0;
  };

  const isOwned = () => {
    const [region, subRegion] = selectedArea;

    if (!region || !subRegion) return false;

    return myLandlist.lands.some(
      (land) =>
        land.city === region &&
        land.cityDetails.some((detail) => detail.cityDetail === subRegion)
    );
  };

  useEffect(() => {
    if (isOwned()) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  }, [selectedArea]);

  return (
    <Container>
      {showConfetti && <Confetti />}
      <Header label="땅따먹기" />
      <HopscotchMap removeUi={false} setSelectedArea={setSelectedArea} changeCenter={myLand}/>
      <LandContainer>
        {selectedArea[0]? (
          <>
            <Label>
              <Pink>{selectedArea[0]} {selectedArea[1]}</Pink>
              {isOwned() ? "를(을) 점령하셨습니다!" : " 점령까지 남은 방문횟수"}
            </Label>
            <ProgressBar current={getCurrentVisitCount()} total={isOwned() ? selectedArea[2] : selectedArea[2]+1 || 1} />
          </>
        ):<Label>점령하고 싶은 땅을 선택해보세요</Label>}
        <Label>
          <Pink>{myLandlist.nickname}</Pink>님의 땅 목록
        </Label>
        <ScrollContainer>
          {totalLands > 2 && (
            <ArrowButton direction="left" onClick={() => scroll("left")}>
              <img src={leftarrow} alt="왼쪽 화살표" />
            </ArrowButton>
          )}
          <LandList ref={landListRef}>
            {myLandlist.lands.map((land) =>
              land.cityDetails.map((detail) => (
                <MyLandWrapper key={`${land.city}-${detail.cityDetail}`}>
                  <MyLandLabel region={land.city} subRegion={detail.cityDetail} onClick={()=>setMyLand({region:land.city, subRegion:detail.cityDetail})}/>
                </MyLandWrapper>
              ))
            )}
          </LandList>
          {totalLands > 2 && (
            <ArrowButton direction="right" onClick={() => scroll("right")}>
              <img src={rightarrow} alt="오른쪽 화살표" />
            </ArrowButton>
          )}
        </ScrollContainer>
      </LandContainer>
      <Footer />
    </Container>
  );
};

export default Hopscotch;
