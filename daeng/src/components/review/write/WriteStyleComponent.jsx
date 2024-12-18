import styled from "styled-components";

export const TotalReviewContainer = styled.div`
  padding: 3%;
`;

export const WriteReviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  position: relative;
`;

export const PlaceTitle = styled.span`
  font-size: 25px;
  font-weight: bold;
  display: flex;
  margin-bottom: 27px;
  margin-left: 3%;

  @media (max-width: 554px) {
    font-size: 20px;
    margin-left: 20px;
    margin-bottom: 15px;
  }
`;

export const WriteReviewDate = styled.span`
  position: absolute; 
  right: 20px; 
  top: 0; 
  color: #b3b3b3;
  font-size: 18px;

  @media (max-width: 554px) {
    font-size: 15px;
    top: 5px; 
  }
`;

export const SelectPlaceOptionContainer = styled.div`
  width: auto;
  height: 90%;
  text-align: left;
  padding: 5%;
  border-radius: 10px;
  background-color: #F7F7F7;

  @media (max-width: 554px) {
    padding: 7%;
  }
`;

export const WhatPointLike = styled.span`
  font-size: 20px;
  color: #333;
  font-weight: 600;

  @media (max-width: 554px) {
    margin-left: 10px;
    font-size: 18px;
  }
`;

export const SelectWarning = styled.span`
  color: #ff69a9;
  font-size: 15px;

  @media (max-width: 554px) {
    width: 95%;
    margin-left: 10px;
    font-size: 13px;
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5%;
  align-items: center;
`;

export const UserImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 10px;
  border: none;

  @media (max-width: 554px) {
    margin-top: 2%;
  }
`;

export const UserNickname = styled.span`
  font-size: 20px;
  color: #333;
  font-weight: bold;

  @media (max-width: 554px) {
    margin-top: 2%;
  }
`;

export const UserQuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  justify-content: space-between;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  cursor: pointer;
`;

export const StarContainer = styled.span`
  display: flex;
  flex-direction: row;
`;

export const StyleStar = styled.img`
  width: 20px;
  margin-right: 5px;
  cursor: pointer;
`;

export const AddImgContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const AddImg = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  border: 0.5px solid #d9d9d9;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 10px;
  color: #d9d9d9;
  background-image: url(${(props) => props.src || "none"});
  background-size: cover;
  background-position: center;

  input {
    display: none;
    cursor: pointer;
  }
  
  img {
    width: 130px;
    height: 130px;
    object-fit: cover;
  }

  label {
    font-size: 12px;
    cursor: pointer;
  }

  .add-img-button {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: auto;
  min-height: 400px; 
  border: none;
  padding: 5px;
  resize: none; 
  font-size: 15px;
  line-height: 1.5; 

  &:focus {
    outline: none;    
    border: none;  
    box-shadow: none;
  }

  @media (max-width: 554px) {
    min-height: 50px;
  }
`;

export const Question = styled.span`
  font-size: 18px;

  p {
    display: inline-block;
    font-size: 15px;
    color: #d9d9d9;
    margin-left: 5px;
  }

  @media (max-width: 554px) {
      font-size: 14px; 
      margin-left: 0; 
      margin-right: 4px;
      display: block;
      text-wrap:nowrap;
  }
`
export const SecondContainer = styled.div`
  padding:3%;
`

export const LastContainer = styled.div`
  margin-bottom: 15%;
  margin-left:1%;
  align-items: center;

  @media (max-width: 554px) {
    margin-bottom: 25%;
    align-items: center;
  }
`

export const DateSelection = styled.input`
  width: 50%;
  height: 40px;
  padding: 10px;
  border: 0.5px solid #d9d9d9;
  border-radius: 5px;
  cursor: pointer;
  color: black;
  padding-right: 1%;
  font-size: 15px;
  cursor: pointer;

  &:focus {
    border-color: #ff69a9;
    outline: none;
  }
`
export const CountText = styled.span`
  font-size: 15px;
  color: black;
  margin-top:3px;
  margin-right:10px;
`
export const TextDescriptionContainer = styled.div`
  margin-top: 20px;
  display: flex;
  margin-bottom: -12px;
  justify-content: space-between;  
  align-items: center;  
`
export const DivisionLine = styled.div`
  height: 1px;
  background-color: #E5E5E5;
  margin-top:20px;
  margin-right:10px;
  margin-bottom:29px;
`;
export const AddImgPlus = styled.span`
  width:1px;
`
export const QuestionBox = styled.span`
  font-size: 18px;
  display: inline; 
  color: #333;

  p {
    display: inline-block;
    font-size: 13px;
    color: #D9D9D9;
    margin-left: 5px;
  }
`
export const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused ? "0.5px solid #ff69a9" : "0.5px solid #d9d9d9",
    borderRadius: "5px",
    padding: "2px",
    cursor: "pointer",
    fontSize: "15px",
    boxShadow: state.isFocused ? "none" : "none",
    "&:hover": {
      borderColor: "#ff69a9",
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#ffcee1",
    borderRadius: "3px",
    padding: "2px",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ff4b98",
      color: "white", 
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "5px",
    borderColor: "#ff69a9",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f4f4f4" : "white",
    color: "#333",
    cursor: "pointer",
  }),
};

