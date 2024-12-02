import styled from "styled-components";
import PropTypes from "prop-types";
import TotalReviewForm from '../../components/review/TotalReviewForm';
import writeIcon from "../../assets/icons/pen.svg";
import ReviewKeywords from "../commons/ReviewKeywords";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Container = styled.div`
  margin: 10px 0px;
  padding: 0px 44px;
  h2 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const ReviewsSection = styled.div`
  margin-left: -4%;
  padding: 0px 3%;
  padding-bottom: 77px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  h2 {
    font-size: 20px;
    font-weight: bold;
  }
  
  button{
    border: none;
    background-color: white;
  }

  .actions {
    display: flex;
    align-items: center;

    .action {
      margin-left: 10px;
      font-size: 11px;
      cursor: pointer;

      &:hover {
        color: #666;
      }

      img {
        margin: 0px 3px;
      }
    }
  }
`;

const KeywordsContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  .title {
    font-size: 11px;
    font-weight: semi-bold;
  }

  .keywords {
    display: flex;
    gap: 5px;
  }
  @media (max-width: 460px){
    flex-direction: column;
    .title{
      margin-bottom: 18px;
    }
  }
`;

const PlaceReviewList = ({ reviews }) => {
  const navigate = useNavigate();
  const { id: placeId } = useParams();

  return (
    <>
      <Container>
        <ReviewHeader>
          <h2>보호자님들의 리뷰</h2>
          <div className="actions">
            <button className="action" onClick={()=> navigate(`/write-review/${placeId}`)}>
              리뷰 작성
              <img src={writeIcon} alt="리뷰 작성" />
            </button>
            <button className="action"  onClick={() => navigate(`/total-review/${placeId}`)}>전체보기 &gt;</button>
          </div>
        </ReviewHeader>

        <KeywordsContainer>
          <div className="title">가장 많이 선택된 키워드 &gt;</div>
          <div className="keywords">
            <ReviewKeywords label="배변봉투가 있어요"/>
            <ReviewKeywords label="금속대가 없어요"/>
            <ReviewKeywords label="뛰어놀기 좋아요"/>
          </div>
        </KeywordsContainer>
      </Container>
      <ReviewsSection>
        <TotalReviewForm />
        <TotalReviewForm />
        <TotalReviewForm />
      </ReviewsSection>
    </>
  );
};

PlaceReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      userImg: PropTypes.string,
      nickname: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string),
      videos: PropTypes.arrayOf(PropTypes.string),
      keywords: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

export default PlaceReviewList;
