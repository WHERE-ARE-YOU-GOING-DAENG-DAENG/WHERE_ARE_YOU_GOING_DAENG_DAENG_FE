import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TotalReview from '../../components/review/TotalReview'
import ReviewForm from '../../components/review/ReviewForm'
function MyReviewPage() {
  return (
    <>
    <Header label="내가 작성한 리뷰" />
    <TotalReview />
    <ReviewForm />
    <Footer />
    </>
  )
}

export default MyReviewPage
