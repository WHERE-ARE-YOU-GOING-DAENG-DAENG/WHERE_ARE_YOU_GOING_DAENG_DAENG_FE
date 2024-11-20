import React from 'react'
import Header from '../../components/commons/Header'
import Footer from '../../components/commons/Footer'
import TotalReview from '../../components/review/TotalReview'
import ReviewForm from '../../components/review/ReviewForm'
import FavoriteList from '../../components/commons/PushAlerts'
function MyReviewPage() {
  return (
    <>
    <Header label="내가 작성한 리뷰" />
    <TotalReview />
    <ReviewForm />
    <Footer />
    <FavoriteList />
    </>
  )
}

export default MyReviewPage
