import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;

  &:focus {
    border-color: #ff69a9;
    outline: none;
    box-shadow: 0 0 5px rgba(255, 105, 169, 0.5);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;