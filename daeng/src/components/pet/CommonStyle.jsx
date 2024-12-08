import styled from 'styled-components';
import footerSearch from "../../assets/icons/footer_search.svg";
import reviewDefaultImg from "../../assets/icons/reviewDefaultImg.svg";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3%;
  margin-left: 2%;
`;

export const FirstInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center; 
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  height:100%;
`;

export const PetImg = styled.div`
  width: 180px;
  height: 180px;
  margin-right: 20px;
  border-radius: 100px;
  background-image: url(${(props) => props.src || reviewDefaultImg});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const PetNameInput = styled.input`
  width: 96%;
  height: 44px;
  font-size: 14px;
  border-radius: 5px;
  border: 0.5px solid #e4e4e4;
  margin-bottom: 10px;
  padding: 10px;

  &:focus {
    outline: none;
    border-color: #ff69a9; 
  }
`;

export const InputAlert = styled.p`
  color: #ff69a9;
  font-size: 12px;
  display: flex;
  margin-top: -1px;
  margin-bottom: 4%;
`;

export const PetTypeOption = styled.select`
  width: 96%;
  height: 44px;
  border: 0.5px solid #e4e4e4;
  border-radius: 5px;
  padding: 10px;
  font-size: 13px;
  color: ${(props) => (props.value === "" ? "#b3b3b3" : "#000")};
  box-sizing: border-box; 
  appearance: none; 
  -webkit-appearance: none; 
  -moz-appearance: none; 

  background: url(${footerSearch}) no-repeat right 10px center; 
  background-size: 16px; 

  &:focus {
    border-color: #FF69A9;  
    outline: none;  
  }
`;

export const PetTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const BirthInput = styled.input`
  width: 96%;
  height: 44px;
  margin-right: 10%;
  border: 0.5px solid #e4e4e4;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  color: #000;
  cursor: pointer;

  -webkit-appearance: none; 
  -moz-appearance: none;   
  appearance: none;         

  &::placeholder {
    color: #b3b3b3; 
  }

  &:focus {
    outline: none;
    border-color: #ff69a9; 
  }
`;


export const BirthContainer = styled.div`
  margin-bottom: 20px;
`;

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const SelectWeight = styled.button`
  width: 98px;
  height: 44px;
  margin-right:1px;
  background-color: white;
  border: 0.5px solid #E4E4E4;
  border-radius: 5px;
  font-size: 11px;
  cursor: pointer;
  color: #B3B3B3;
  
  @media (max-width: 554px) {
    margin-bottom: 3%;
    font-size: 10px;
    width: 20%;
  }
  
  &:hover {
    background-color: #ff69a9;
    font-weight: bold;
    color: #ffffff;
  }

  ${(props) => props.selected && `
    background-color: #FF69A9;
    font-weight: bold;
    color: #ffffff;
  `}
`;

export const NextRegisterBtn = styled.button`
  background-color: white;
  color:#B3B3B3;
  font-size:14px;
  border:none;
  cursor: pointer;
  text-align: center;
  margin-right:20px;
  margin-bottom: 20px;

  @media (max-width: 554px) {
    margin-top:1%;
    margin-right:5%;
  }

  &:hover{
    font-weight: bold;
  }
`;
