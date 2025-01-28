import styled from "styled-components";

const PlaceDescription = ({data}) => {
  const description = data?.description || "";
    return(
        <Container>
            <p>시설 소개</p>
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: description.replace(/<br>/g, "<br />") }}
            />
        </Container>
    )
};

const Container = styled.div`
  padding: 0px 44px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media(max-width: 554px){
    padding: 0px 8%;
  }

  p{
    font-weight: bold;
    font-size: 20px;
  }

  .description{
    background-color: #F9F9F9;
    width: 100%;
    padding: 20px;
    text-align: left;
    border-radius:10px;
    margin-bottom: 20px;
    line-height: 1.3;
    white-space: pre-line;
  }
`
export default PlaceDescription;