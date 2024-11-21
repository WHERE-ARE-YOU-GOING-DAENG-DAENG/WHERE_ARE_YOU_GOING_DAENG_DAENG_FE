import styled from "styled-components";

const Container = styled.div`
  padding: 0px 44px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p{
    font-weight: bold;
    font-size: 20px;
  }

  .description{
    background-color: #F9F9F9;
    width: 100%;
    height: 437px;
    border-radius:10px;
    margin-bottom: 20px;
  }
`
const PlaceDescription = () => {
    return(
        <Container>
            <p>시설 소개</p>
            <div className="description"></div>
        </Container>
    )
};

export default PlaceDescription;