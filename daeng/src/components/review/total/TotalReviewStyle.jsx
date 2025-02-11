import styled from 'styled-components';

export const TotalReviewContainer = styled.div`
  display: block;
  padding:3%;
  margin-left:4%;

  @media (max-width: 554px) {
    padding:4%;
    margin-left:1%;
  }
`

export const ReviewPlaceTitle = styled.span`
  font-size:25px;
  font-weight:bold;
  display: block;
  text-align: left;

  @media (max-width: 554px) {
    font-size:23px;
    margin-left:4px;
  }
`
export const PreferenceContainer = styled.div`
  display: flex;
  margin-top: 3%;
  flex-direction: row;
  margin-bottom:3%;
  gap:3px;
  margin-left:-5px;
  flex-wrap: wrap; 

  @media (max-width: 554px) {
    gap:5px;
    margin-left:3px;
  }
`

export const ReviewSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 6%; 
`;

export const TotalStarPoint = styled.span`
  font-size:18px;
  font-weight: bold;
  display: block;
  margin-left: 2%;
  margin-right: 2%;

  @media (max-width: 554px) {
    font-size:13px;
    margin-left: 2px;
  }
`

export const TotalReviewCount = styled.span`
  color: #B3B3B3;
  font-size:13px;
  display: block;

  @media (max-width: 554px) {
    font-size: 12px;
  }
`

export const StarImg = styled.img`
  width: 15px; 
  height: 15px; 
  border-radius:100px;

  @media (max-width: 554px) {
    margin-left: 10px;
  }
`

export const DivisionLine = styled.div`
  height: 1px;
  background-color: #E5E5E5;
  margin-right:40px;
  margin-top:5px;

  @media (max-width: 554px) {
    margin-left:15px;
  }
`;

export const TotalUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  
`

export const UserStarImg = styled.img`
  width:15px;
  height:15px;
  display: flex;
  margin-top: 5px;
  @media (max-width: 554px) {
    width: 13px;
    margin-top: 0px;
  }
`

export const ReviewUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;

  @media (max-width: 554px) {
  margin-top: 5px;
  margin-left: 10px;
  }
`

export const UserPhoto = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: 2%;
  margin-top: 20px;
  margin-right: 2%;

  @media (max-width: 554px) {
  width: 53px;
  height: 53px;
  margin-left: 5px;
  margin-right: 3%;
  }
`
export const CommentContainer = styled.div`
  width: 380px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;

  @media (max-width: 554px) {
    width: 70vw;
  }
`
export const UserId = styled.span`
  font-size:20px;
  font-weight: bold;
  margin-right: 10px;
  margin-top: 5px;

  @media (max-width: 554px) {
    font-size: 15px;
    margin-top: 10px;
  }
`
export const PetType = styled.span`
  font-size: 15px;
  margin-left: -5px;
  color:#B3B3B3;
  margin-top:8px;

  @media (max-width: 554px) {
    font-size: 11px;
    margin-top:13px;
  }
`

export const PostDate = styled.span`
  font-size: 13px;
  color: #B3B3B3;
  margin-top: 8px;
  margin-bottom: 3px;

  @media (max-width: 554px) {
    font-size: 11px;
    margin-top: 6px;
    margin-right: 20px;
    margin-bottom:10px;
  }
`;

export const StyledArrow  = styled.img`
  width: 15px;
  height: 15px;
  margin-left: 10px;
  cursor: pointer;
`

export const ReviewContent = styled.span`
  font-size: 15px;
  display: block; 
  padding-left: 3%;
  padding-right: 9%;
  text-align: justify;  
  line-height: 1.5;  
  word-break: break-word;  
  margin-top: 30px;
  margin-bottom:10px;

  @media (max-width: 554px) {
    padding-left: 4%;
    font-size: 11px;
    margin-bottom:10px;
  }
`;

export const UserSecondInfoContainer = styled.div`
  display: flex;
  flex-direction: row;  
`

export const DescriptionContainer = styled.div`
  display:flex;
  flex-direction: row;
`

export const VisitDate = styled.span`
  font-size: 13px;
  color: #B3B3B3;
  display: flex;
  flex-direction: flex-start;
  margin-top:3%;
  margin-left: 3%;

  @media (max-width: 554px) {
    font-size: 11px;
    margin-top:4%;
    margin-bottom:5px;
    margin-left:4%;
  }
`

export const NoReview = styled.div`
  font-size: 13px;
  margin-top: 10px;
  font-weight: bold;
`

export const ReadMoreButton = styled.button`
  color: #FF69A9;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;

  @media (max-width: 554px) {
    font-size: 10px; 
  }
`;

export const LastReview = styled.span`
  display: block;
  font-size: 13px;
  margin-top: 30px;
  font-weight: bold;
`