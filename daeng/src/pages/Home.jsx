import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function Home() {
  const navigate = useNavigate(); 


  const goToLogin = () => {
    navigate('/login');
};


  const handleClick = () => {
    navigate('/pet-register');
  };

  const handleClickEdit = () => {
    navigate('/pet-edit');
  };

  const handleClickAdd = () => {
    navigate('/pet-add');
  };

  const handleClickAlarm = () => {
    navigate('/alarm');
  };

  const handleMyReview = () => {
    navigate('/my-review');
  };

  const handleTotalReview = () => {
    navigate('/total-review');
  }

  return (
    <>
    <button onClick={handleClick}>Go to Pet Register</button>
    <button onClick={handleClickEdit}>Go to Pet Edit</button>
    <button onClick={handleClickAdd}>Go to Pet Add</button>
    <button onClick={handleClickAlarm}>Go to Alarm</button>
    <button onClick={handleMyReview}>내가 작성한 리뷰</button>
    <button onClick={handleTotalReview}>전체리뷰</button>
    </>
  );
}

export default Home;