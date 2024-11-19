import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function SomeComponent() {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/pet-register');
  };

  return (
    <button onClick={handleClick}>Go to Pet Register</button>
  );
}

export default SomeComponent;