import styled from 'styled-components';
import PropTypes from 'prop-types';
import starIcon from '../../assets/icons/star.svg'
import { useState } from 'react';
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
  padding: 15px 39px;
`;

const Label = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;

  @media (max-width: 554px) {
    font-size: 15px;
  }

  .rating {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: normal;
    @media (max-width: 554px) {
    font-size: 13px;
  }

    .star {
      width: 16px;
      margin-right: 5px;
    }

    .score {
      font-weight: bold;
      margin-right: 5px;
    }

    .total {
      margin-top: 3px;
      color: #B3B3B3;
      font-size: 11px;
      @media (max-width: 554px) {
    font-size: 10px;
  }
    }
  }
`;

const SortingOptions = styled.div`
  display: flex;
  gap: 10px;

  span {
    color: #B3B3B3;
    font-size: 11px;
    cursor: pointer;
    @media (max-width: 554px) {
    font-size: 8px;
  }

    &:hover {
      color: #FF4B98;
      font-weight: bold;
    }

    &.active {
      font-weight: bold;
      color: #FF4B98;
    }
  }
`;

const Sorting = ({ mode, label, sortingOptions, activeIndex, onSortChange, rating, totalReviews }) => {
  const [activeTab, setActiveTab] = useState(activeIndex);

  const handleChangeTab = (index) => {
    setActiveTab(index);
    onSortChange(index);
  }
  
  return (
    <Container>
      <Label>
        {mode === 'list' && label}
        {mode === 'review' && (
          <div className="rating">
            <img className="star" src={starIcon} alt="별" />
            <span className="score">{rating} / 5</span>
            <span className="total">총 {totalReviews}개</span>
          </div>
        )}
      </Label>
      <SortingOptions>
        {sortingOptions.map((option, index) => (
          <span
            key={index}
            className={index === activeTab ? 'active' : ''}
            onClick={() => handleChangeTab(index)}
          >
            {option}
          </span>
        ))}
      </SortingOptions>
    </Container>
  );
};

Sorting.propTypes = {
  mode: PropTypes.oneOf(['list', 'review']).isRequired,
  label: PropTypes.string,
  sortingOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeIndex: PropTypes.number,
  onSortChange: PropTypes.func,
  rating: PropTypes.number,
  totalReviews: PropTypes.number,
};

Sorting.defaultProps = {
  label: '',
  activeIndex: 0,
  onSortChange: () => {},
  rating: 0,
  totalReviews: 0,
};

export default Sorting;
