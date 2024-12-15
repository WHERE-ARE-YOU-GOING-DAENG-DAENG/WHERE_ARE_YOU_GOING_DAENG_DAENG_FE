import styled from "styled-components";
import PropTypes from "prop-types";
import dogIcon from "../../assets/icons/detailmark.svg";
import addressIcon from "../../assets/icons/place.svg";
import hourIcon from "../../assets/icons/operatingHour.svg";
import callnumberIcon from "../../assets/icons/callnumber.svg";
import websiteIcon from "../../assets/icons/website.svg";
import inandout from "../../assets/icons/indoorandoutdoor.svg";
import inIcon from "../../assets/icons/indoor.svg";
import outIcon from "../../assets/icons/outdoor.svg";
import PlaceOption from "../../components/commons/PlaceOption";

const InfoCard = styled.div`
  background: #F7F7F7;
  border-radius: 10px;
  padding: 20px 30px;
  margin-top: 20px;
  position: relative;

  @media (max-width: 554px){
    padding: 20px 5%;
  }

  .info-title{
    display: flex;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
    span{
    color: #FF4B98;
    }
  }

  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    img {
      width: 20px;
      margin-right: 10px;
    }

    span {
      font-size: 14px;
      padding: 10px;
      width: 60%;
      text-align:left;
      word-wrap: break-word;
      @media(max-width:554px){
        font-size: 12px;
      }
    }
    a {
      font-size: 14px;
      padding: 10px;
      width: 60%;
      text-align: left;
      word-wrap: break-word;

      @media(max-width:554px){
        font-size: 12px;
      }
    }
  }
    .dog-icon {
    position: absolute;
    bottom: 20px;
    right: 0px;

    @media (max-width: 554px){
      bottom: 20px;
      width: 35%;
    }

  }
`;

const OptionCard = styled.div`
  margin: 20px 0px;
  position: relative;
`
const Container = styled.div`
  padding: 0px 44px;
  @media(max-width: 554px){
    padding: 0px 8%;
  }
`

const PlaceInfo = ({data}) => {
    const parkingStatus = data.parking ? "주차가능" : "주차불가";

    const spaceStatus = () => {
      if (data.indoor && data.outdoor) return "실내 · 실외공간";
      if (data.indoor) return "실내공간";
      if (data.outdoor) return "실외공간";
      return "공간정보 없음";
    };

    const iconStatus = () => {
      if (data.indoor && data.outdoor) return inandout;
      if (data.indoor) return inIcon;
      if (data.outdoor) return outIcon;
      return null;
    };

    const weightLimit = "제한없음";

    const formatTime = (time) => {
      if (!time) return "정보없음";
      return time.length === 8 ? time.slice(0, 5) : time;
    };
    
    return(
        <Container>
        <InfoCard>
                  <div className="info-title"><span>댕댕어디가</span>가 설명드려요 !</div>
                  <div className="info-item">
                    <img src={addressIcon} alt="주소" />
                    <span> {data.streetAddresses}</span>
                  </div>
                  <div className="info-item">
                    <img src={hourIcon} alt="운영시간" />
                    {data.placeType === "숙소"? (
                      <span>체크인 - {formatTime(data.startTime)} | 체크아웃 - {formatTime(data.endTime)}</span>
                    ):(<span>{formatTime(data.startTime)} - {formatTime(data.endTime)}</span>)}
                    
                  </div>
                  <div className="info-item">
                    <img src={callnumberIcon} alt="전화번호" />
                    <span>{data.telNumber}</span>
                  </div>
                  {data.url !== "정보없음" ? (<div className="info-item">
                    <img src={websiteIcon} alt="웹사이트" />
                    <a href={data.url} target="_blank" rel="noopener noreferrer">{data.url}</a>
                  </div>):
                  (<></>)}
                  <img src={dogIcon} alt="강아지아이콘" className="dog-icon"/>
                </InfoCard>
                <OptionCard>
                  <PlaceOption parking={parkingStatus} space={spaceStatus()} weightLimit={weightLimit} icon={iconStatus()}/>
                </OptionCard>
        </Container>
    )
};


export default PlaceInfo;