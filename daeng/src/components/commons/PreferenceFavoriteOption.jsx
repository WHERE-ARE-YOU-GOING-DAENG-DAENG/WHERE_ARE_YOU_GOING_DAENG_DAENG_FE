import React from 'react'
import styled from "styled-components";

const PreferenceButton = styled.button`
  min-width: 130px;
  max-width: auto;
  height: 44px;
  background-color:white;
  border-radius: 5px;
  border: 0.5px solid #E4E4E4;
  font-size: 12px;
  color:black;
  cursor: pointer;
  white-space: nowrap; 

  &:hover {
    background-color: #FDF2F8;
    color: #DB2877;
    font-weight: bold;
  }
`

function PreferenceFavoriteOption({label}) {
  return (
    <PreferenceButton>
      {label}
    </PreferenceButton>
  )
}

export default PreferenceFavoriteOption
