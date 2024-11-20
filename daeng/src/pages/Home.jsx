import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function SomeComponent() {
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

  return (
    <>
    <button onClick={handleClick}>Go to Pet Register</button>
    <button onClick={handleClickEdit}>Go to Pet Edit</button>
    <button onClick={handleClickAdd}>Go to Pet Add</button>
    <button onClick={handleClickAlarm}>Go to Alarm</button>
    </>
  );
}

export default SomeComponent;