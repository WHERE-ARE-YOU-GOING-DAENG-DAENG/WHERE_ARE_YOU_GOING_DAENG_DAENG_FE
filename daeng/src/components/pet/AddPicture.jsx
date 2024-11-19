import React from 'react'
import styled from "styled-components";

const PictureContainer = styled.button`
  width: 135px;
  height: 135px;
  border-radius: 100px;
  background-color: #FBC9E4;
  display: flex;
  margin-right:22px;
  border:none;
`

function AddPicture() {
  return (
    <PictureContainer />
  )
}

export default AddPicture
