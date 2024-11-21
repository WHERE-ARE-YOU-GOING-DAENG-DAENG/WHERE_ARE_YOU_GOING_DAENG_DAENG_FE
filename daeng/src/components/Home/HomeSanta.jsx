import { useNavigate } from "react-router-dom"; 
import styled from "styled-components";
import santaImage from "../../assets/icons/home_santa.svg";

const SantaImage = styled.img`
  width: 100%;
  height: 148px;
  margin-top: 30px;
  cursor: pointer; 

  @media (max-width: 554px) {
    height: 50%;
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

function HomeSanta() {
  const navigate = useNavigate(); 

  const handleSantaClick = () => {
    navigate("/search"); 
  };

  return (
    <SantaImage
      src={santaImage}
      alt="추천 산타 이미지"
      onClick={handleSantaClick} 
    />
  );
}

export default HomeSanta;