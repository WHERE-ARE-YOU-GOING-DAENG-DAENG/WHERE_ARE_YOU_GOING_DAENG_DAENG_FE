import styled from "styled-components";
import PropTypes from "prop-types";
import star from "../assets/icons/star.svg"

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 25px;
  margin: 10px 0;
  width: 484px;
  height: 74px;
  @media (max-width: 554px) {
    width: 320px;
    height: 60px;
    margin: 5px 0;
    padding: 0px 15px;
  }
`;

const Profile = styled.div`
  margin-right: 25px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 554px) {
    width: 30px;
    height: 30px;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  align-items: baseline;
`;

const Nickname = styled.span`
  font-weight: bold;
  font-size: 20px;
  margin-right: 5px;
  @media (max-width: 554px) {
    font-size: 15px;
  }
`;

const PetType = styled.span`
  margin-left: 5px;
  font-size: 13px;
  color: #B3B3B3;
`;

const Rating = styled.div`
  display: flex;
  margin-top: 5px; 
  font-size: 14px;
  color: #ffbf00;
  gap: 5px;
  
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 10px;
  @media (max-width: 554px) {
    height: 20px;
  }
  `;

const Date = styled.span`
  font-size: 13px;
  color: #818181;
  @media (max-width: 554px) {
    font-size: 10px;
  }
`;

const DeleteButton = styled.button`
  margin-top: 10px;
  width: 49px;
  background: ${({ hidden }) => (hidden ? "transparent" : "#E7E7E7")};
  border: none;
  padding: 5px;
  border-radius: 30px;
  font-size: 10px;
  color: ${({ hidden }) => (hidden ? "transparent" : "#666")};
  cursor: ${({ hidden }) => (hidden ? "default" : "pointer")};
  visibility: ${({ hidden }) => (hidden ? "hidden" : "visible")};

  &:hover {
    background: ${({ hidden }) => (hidden ? "transparent" : "#eaeaea")};
  }
`;

const ReviewProfile = ({ 
  profileImage, 
  nickname, 
  pet, 
  date, 
  rating, 
  isMyReview, 
  onDelete 
}) => {
  return (
    <Card>
      <Profile>
        <ProfileImage src={profileImage} alt='프로필사진' />
      </Profile>
      <Content>
        <Header>
          <Nickname>{nickname}</Nickname>
          <PetType>{pet}</PetType>
        </Header>
        <Rating>
            {Array(rating).fill(null).map((_, index) => (
            <img key={index} src={star} alt="별" />
          ))}
        </Rating>
      </Content>
      <Details>
        <Date>{date}</Date>
        <DeleteButton
          onClick={isMyReview ? onDelete : undefined}
          hidden={!isMyReview}
        >
          삭제
        </DeleteButton>
      </Details>
    </Card>
  );
};

ReviewProfile.propTypes = {
  profileImage: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  pet: PropTypes.string.isRequired,     
  date: PropTypes.string.isRequired,      
  rating: PropTypes.number.isRequired,     
  isMyReview: PropTypes.bool.isRequired,    
  onDelete: PropTypes.func,                 
};

export default ReviewProfile;
