import React from 'react'
import styled from "styled-components";

const PictureContainer = styled.button`
  width: 25vw; 
  height: 25vw; 
  max-width: 135px; 
  max-height: 135px; 
  border-radius: 100px;
  background-color: #FBC9E4;
  display: flex;
  margin-right: 22px;
  border: none;
  margin-left:5%;

  @media (max-width: 768px) {
    width: 100%; 
    height: 100vh; 
  }
`

function AddPicture() {
  return (
    <PictureContainer />
  )
}

export default AddPicture
