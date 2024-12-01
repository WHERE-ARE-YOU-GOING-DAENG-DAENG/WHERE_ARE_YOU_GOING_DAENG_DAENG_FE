import React, { useEffect } from "react";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import ReviewForm from "../../components/review/ReviewForm";
import styled from "styled-components";
import Sorting from "../../components/commons/Sorting";
import useReviewStore from "../../stores/UseReviewStore";

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: auto;
  padding-bottom: 20%;
`;

const StyledTotalReview = styled.span`
  font-weight: bold;
  font-size: 20px;
  display: block;
  margin-right: 65%;
  margin-top: 5%;

  @media (max-width: 554px) {
    font-size: 18px;
    margin-right: 50%;
  }
`;

function MyReviewPage({ userId }) {
  const { reviews, total, fetchUserReviews, sortedType, setSortedType } = useReviewStore();

  useEffect(() => {
    fetchUserReviews(userId, sortedType);
  }, [userId, sortedType]);

  const handleSortChange = (index) => {
    const sortingOptions = ["LATEST", "OLDEST"];
    setSortedType(sortingOptions[index]);
  };

  return (
    <>
      <Header label="내 리뷰" />
      <ReviewContainer>
        <StyledTotalReview>등록한 리뷰 {total} 건</StyledTotalReview>
        {reviews.length > 0 ? (
          reviews.map((review) => <ReviewForm key={review.reviewId} review={review} />)
        ) : (
          <div>작성한 리뷰가 없습니다.</div>
        )}
        <Footer />
      </ReviewContainer>
    </>
  );
}

export default MyReviewPage;
