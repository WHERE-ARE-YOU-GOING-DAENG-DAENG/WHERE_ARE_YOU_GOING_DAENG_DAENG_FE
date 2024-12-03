import styled from 'styled-components';
import PropTypes from 'prop-types';

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ size }) => (size === 'small' ? '3px' : '8px')};
  width: ${({ size }) => (size === 'small' ? '77px' : '118px')};
  height: ${({ size }) => (size === 'small' ? '28px' : '43px')};
  background-color: #fdf2f8;
  color: #db2877;
  font-size: ${({ size }) => (size === 'small' ? '13px' : '18px')};
  border-radius: 20px;
  border: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #fbd1e6;
  }

  img {
    width: ${({ size }) => (size === 'small' ? '18px' : '25px')};
    height: ${({ size }) => (size === 'small' ? '16px' : '21px')};
    @media (max-width: 554px) {
      width: ${({ size }) => (size === 'small' ? '13px' : '16px')};
      height: ${({ size }) => (size === 'small' ? '13px' : '16px')};
    }
  }

  @media (max-width: 554px) {
    width: ${({ size }) => (size === 'small' ? '70px' : '110px')};
    height: ${({ size }) => (size === 'small' ? '25px' : '35px')};
    font-size: ${({ size }) => (size === 'small' ? '12px' : '15px')};
  }
`;

function FilterBtn({ label, icon, size, onClick }) {
  return (
    <FilterButton size={size} onClick={onClick}>
      {icon && <img src={icon} alt={`${label} icon`} />}
      {label}
    </FilterButton>
  );
}

FilterBtn.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  size: PropTypes.oneOf(['default', 'small']),
  onClick: PropTypes.func, // onClick Prop 추가
};

FilterBtn.defaultProps = {
  icon: null,
  size: 'default',
  onClick: null, // 기본값 null
};

export default FilterBtn;
