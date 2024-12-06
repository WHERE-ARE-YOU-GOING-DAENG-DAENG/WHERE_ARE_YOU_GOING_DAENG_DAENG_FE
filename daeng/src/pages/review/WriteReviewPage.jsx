import React from "react";
import Header from "../../components/commons/Header";
import Footer from "../../components/commons/Footer";
import styled from "styled-components";
import WriteReview from "../../components/review/WriteReview";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;


function WriteReviewPage() {
  return (
    <PageWrapper>
      <Header label="리뷰 작성" />
        <WriteReview />
      <Footer />
    </PageWrapper>
  );
}

export default WriteReviewPage;
