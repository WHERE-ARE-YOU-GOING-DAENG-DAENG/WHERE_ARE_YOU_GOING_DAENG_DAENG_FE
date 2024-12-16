import styled from "styled-components";
import PropTypes from "prop-types";
import UploadStoryBtn_DefaultImg from "../../assets/icons/UploadStoryBtn_DefaultImg.svg";
import UploadStoryBtnCrown from "../../assets/icons/UploadStoryBtn_crown.svg";

const UploadStoryBtn = ({ location, nickname, isPinkBorder, imageSrc, onClick }) => {
  const textLength = location.length;
  return (
    <ButtonContainer onClick={onClick}>
      <ImageContainer isPinkBorder={isPinkBorder}>
        <ProfileImageWrapper>
          <ProfileImage src={imageSrc || UploadStoryBtn_DefaultImg} alt="프로필 이미지" />
        </ProfileImageWrapper>
        <CrownIcon src={UploadStoryBtnCrown} alt="왕관 아이콘" />
      </ImageContainer>
      <TextContainer>
        <LocationText textLength={textLength}>{location}</LocationText>
        <NicknameText>{nickname}</NicknameText>
      </TextContainer>
    </ButtonContainer>
  );
};

UploadStoryBtn.propTypes = {
  location: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  isPinkBorder: PropTypes.bool,
  imageSrc: PropTypes.string,
  onClick: PropTypes.func, 
};

UploadStoryBtn.defaultProps = {
  isPinkBorder: false,
  imageSrc: null,
  onClick: () => {}, 
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 170px;
  cursor: pointer;
  margin-top: ${({ textLength }) => (textLength > 8 ? '10px' : '0')};

  @media (max-width: 554px) {
    height: 120px;
    margin-top: ${({ textLength }) => (textLength > 8 ? '10px' : '12px')};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: ${({ isPinkBorder }) =>
    isPinkBorder
      ? "linear-gradient(45deg, #FF4B98 0%, #E7B1FF 52%, #FF4B98 100%)"
      : "#d9d9d9"};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 554px) {
    width: 70px;
    height: 70px;
  }
`;

const ProfileImageWrapper = styled.div`
  width: 77px;
  height: 77px;
  border-radius: 50%;
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;

  @media (max-width: 554px) {
    width: 60px;
    height: 60px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 554px) {
    width: 58px;
    height: 58px;
  }
`;

const CrownIcon = styled.img`
  position: absolute;
  top: 0; 
  right: 14.5px;
  width: 25px;
  height: auto;
  transform: translateY(-50%);

  @media (max-width: 554px) {
    width: 20px;
  }
`;

const TextContainer = styled.div`
  text-align: center;
  margin-top: 12px;

  @media (max-width: 554px) {
    margin-top: 8px;
  }
`;

const LocationText = styled.p`
  font-size: 13px;
  font-weight: bold;
  margin: 0;
  color: black;

  @media (max-width: 554px) {
    font-size: 11px;
  }
`;

const NicknameText = styled.p`
  font-size: 13px;
  font-weight: bold;
  margin: 0;
  color: #ff69b4;

  @media (max-width: 554px) {
    font-size: 11px;
  }
`;

export default UploadStoryBtn;
