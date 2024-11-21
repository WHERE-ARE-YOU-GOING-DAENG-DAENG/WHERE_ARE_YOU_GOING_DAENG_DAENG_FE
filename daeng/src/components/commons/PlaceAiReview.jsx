import styled from "styled-components";
import badcomment from '../../assets/icons/badcomment.svg';
import goodcomment from '../../assets/icons/goodcomment.svg';

const CommentAi = styled.span`
  font-size: 20px;
  font-weight: bold;
  display: block; 
  text-align: left;
  margin-top: 20px;
  margin-bottom:22px;
`;

const AiCommentContainer = styled.div`
  display: flex;
  width: 95%;
  height: 48px;
  margin-bottom:18px;
  background-color: rgba(247, 247, 247, 0.78);  
  color:#FF69A9;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
  align-items: center; 
  padding: 5px 0; 

  @media (max-width: 554px) {
    width: 95%;
    height: 40px;
    font-size: 9px;
  }
`;

const StyleImg = styled.img`
  width: 20px; 
  height: 20px; 
  margin-right: 10px; 
  margin-left:37px;
`

const Container = styled.div`
    margin: 0px;
    padding: 0px 3%;
    margin-left: 4%;
`

const PlaceAiReview = () => {
    return(
        <Container>
            <CommentAi>AI로 리뷰 요약본을 확인해보세요 !</CommentAi>
            <AiCommentContainer>
                <StyleImg src={goodcomment} alt="AI가 남겨주는 장소의 좋은 점"/>좋아요 !
            </AiCommentContainer>
            <AiCommentContainer>
                <StyleImg src={badcomment} alt="AI가 남겨주는 장소의 안 좋은점"/>싫어요 !
            </AiCommentContainer>
        </Container>
    )
};

export default PlaceAiReview;