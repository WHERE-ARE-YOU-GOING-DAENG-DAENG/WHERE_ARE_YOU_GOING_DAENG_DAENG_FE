import styled from "styled-components";
import PropTypes from "prop-types";
import dogIcon from "../../assets/icons/detaildog.svg"
import addressIcon from "../../assets/icons/place.svg"
import hourIcon from "../../assets/icons/operatingHour.svg"
import callnumberIcon from "../../assets/icons/callnumber.svg"
import websiteIcon from "../../assets/icons/website.svg"
import inandout from "../../assets/icons/indoorandoutdoor.svg"
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
      font-size: 11px;
      padding: 10px;
    }
  }
    .dog-icon {
    position: absolute;
    bottom: 20px;
    right: -10px;

    @media (max-width: 554px){
      bottom: 20px;
      width: 30%;
    }

  }
`;

const OptionCard = styled.div`
  margin: 20px 0px;
  position: relative;
`
const Container = styled.div`
  padding: 0px 44px;
`

const PlaceInfo = ({data}) => {
    return(
        <Container>
        <InfoCard>
                  <div className="info-title"><span>댕댕어디가</span>가 설명드려요 !</div>
                  <div className="info-item">
                    <img src={addressIcon} alt="주소" />
                    <span> {data.address.city} {data.address.district} {data.address.roadAddress}</span>
                  </div>
                  <div className="info-item">
                    <img src={hourIcon} alt="운영시간" />
                    <span>{data.openHours}</span>
                  </div>
                  <div className="info-item">
                    <img src={callnumberIcon} alt="전화번호" />
                    <span>0507-1340-2573</span>
                  </div>
                  <div className="info-item">
                    <img src={websiteIcon} alt="웹사이트" />
                    <span>https://treehousegp.imweb.me</span>
                  </div>
                  <img src={dogIcon} alt="강아지아이콘" className="dog-icon"/>
                </InfoCard>
                <OptionCard>
                  <PlaceOption parking= "주차가능" space="실내 · 실외공간" weightLimit="~15kg" icon={inandout}/>
                </OptionCard>
        </Container>
    )
};

PlaceInfo.propTypes = {
    data: PropTypes.shape({
      address: PropTypes.shape({
        city: PropTypes.string.isRequired,
        district: PropTypes.string.isRequired,
        roadAddress: PropTypes.string.isRequired,
      }).isRequired,
      openHours: PropTypes.string.isRequired,
    }).isRequired,
  };
export default PlaceInfo;