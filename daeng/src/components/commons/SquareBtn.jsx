import styled from "styled-components";
import visitIcon from "../../assets/icons/join.svg"
import reviewIcon from "../../assets/icons/realtimereview.svg"

const Button = styled.button`
  width: 100%;
  max-width: 190px;  
  background-color: ${({ mode }) => (mode === "review" ? "#FFFFFF" : "#FF69A9")};
  color: ${({ mode }) => (mode === "review" ? "#FF69A9" : "#FFFFFF")};
  border: ${({ mode }) => (mode === "review" ? "2px solid #FF69A9" : "none")};
  border-radius: 5px;
  padding: 9px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  gap: 8px;
  cursor: pointer;
  font-size: 15px;
  &:hover {
    background-color: ${({ mode }) => (mode === "review" ? "#FFE1EE" : "#FF96C3")};
  }
  img{
   width: 20px;
  }
  @media(max-width: 554px){
    max-width: 150px;
    font-size: 11px;
    padding: 8px 10px;
    img{
        width: 16px;
    }  
  }
`;
const SquareBtn = ({mode, onClick}) => {
    const modes = {
        visit: {
            label: "방문하고 싶어요!",
            icon: visitIcon
        },
        review:{
            label: "땅따먹기 리뷰 작성하기",
            icon: reviewIcon
        }
    }
    return(
        <Button mode={mode} onClick={onClick}>
            <img src={modes[mode].icon} alt="아이콘" />
            {modes[mode].label}
        </Button>
    )
};

export default SquareBtn;