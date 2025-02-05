import React, { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";
import styled from "styled-components";
import goodcomment from "../../assets/icons/goodcomment.svg";
import badcomment from "../../assets/icons/badcomment.svg";

const AiCommentContainer = styled.div`
  display: flex;
  width: 95%;
  height: 48px;
  margin-bottom: 18px;
  background-color: rgba(247, 247, 247, 0.78);
  color: #ff69a9;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  align-items: center;
  padding: 5px 10px; 
  text-align: left;

  @media (max-width: 554px) {
    width: 91%;
    height: 40px;
    font-size: 12px;
  }
`;

const CommentAi = styled.span`
  font-size: 20px;
  font-weight: bold;
  display: block;
  text-align: left;
  margin-top: 5%;
  margin-bottom: 22px;
`;

const StyleImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

function AiReviewSummary({ placeId }) {
  const [goodSummary, setGoodSummary] = useState("");
  const [badSummary, setBadSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchAiSummary = async () => {
    try {
      const getResponse = await axiosInstance.get(
        `/api/v1/places/${placeId}/reviews/summary`,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
          },
        }
      );

      setGoodSummary(getResponse.data.goodSummary || "요약된 좋은 점이 없습니다.");
      setBadSummary(getResponse.data.badSummary || "요약된 나쁜 점이 없습니다.");
    } catch (error) {
      setGoodSummary( "좋은 점에 대한 요약이 없습니다.");
      setBadSummary("안 좋은 점에 대한 요약이 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (placeId) fetchAiSummary();
}, [placeId]);
  

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <CommentAi>AI로 리뷰 요약본을 확인해보세요!</CommentAi>
      <AiCommentContainer>
        <StyleImg src={goodcomment} alt="좋은 점" />
        <span>{goodSummary || "좋은 점에 대한 요약이 없습니다."}</span>
      </AiCommentContainer>
      <AiCommentContainer>
        <StyleImg src={badcomment} alt="안 좋은 점" />
        <span>{badSummary || "안 좋은 점에 대한 요약이 없습니다."}</span>
      </AiCommentContainer>
    </>
  );
}

export default AiReviewSummary;
