import React from 'react';
import styled from 'styled-components';

const SortingContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
  cursor: pointer;
  margin-right: 1px;

  @media (max-width: 554px) {
    gap: 5px;
  }
`;

const SortingOption = styled.span`
  font-size: 14px;
  margin-left: 10px;
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  color: ${({ isActive }) => (isActive ? '#FF69A9' : '#B3B3B3')};

  &:last-child {
    margin-right: 33px; 
  }

  &:hover {
    color: #FF69A9;
  }

  @media (max-width: 554px) {
    font-size: 10px;

    &:last-child {
      margin-right: 40px; 
    }
  }
`;


const ReviewSorting = ({ sortingOptions, activeIndex, onSortChange }) => {
  return (
    <SortingContainer>
      {sortingOptions.map((option, index) => (
        <SortingOption
          key={index}
          isActive={activeIndex === index}
          onClick={() => onSortChange(index)}
        >
          {option}
        </SortingOption>
      ))}
    </SortingContainer>
  );
};

export default ReviewSorting;
