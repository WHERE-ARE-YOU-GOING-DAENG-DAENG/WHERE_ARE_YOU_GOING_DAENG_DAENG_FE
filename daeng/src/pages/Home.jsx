import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import FavoriteList from '../components/commons/FavoriteList';

function Home() {
  const navigate = useNavigate(); 

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

  return (
    <>
    <button onClick={handleClick}>Go to Pet Register</button>
    <button onClick={handleClickEdit}>Go to Pet Edit</button>
    <button onClick={handleClickAdd}>Go to Pet Add</button>
    <button onClick={handleClickAlarm}>Go to Alarm</button>
    <button onClick={handleMyReview}>내가 작성한 리뷰</button>
    </>
  );
}

export default Home;