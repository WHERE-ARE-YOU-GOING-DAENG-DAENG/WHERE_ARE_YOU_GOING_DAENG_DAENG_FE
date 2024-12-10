import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 554px;
  margin: 0 auto;
  position: relative;

  @media (max-width: 554px) {
    width: 100%;
  }
`;

export default Wrapper;