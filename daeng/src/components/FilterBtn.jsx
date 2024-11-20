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
  font-size: ${({ size }) => (size === 'small' ? '11px' : '15px')};
  border-radius: 20px;
  border: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #fbd1e6;
  }

  img {
    width: ${({ size }) => (size === 'small' ? '16px' : '21px')};
    height: ${({ size }) => (size === 'small' ? '16px' : '21px')};
    @media (max-width: 554px) {
    width: ${({ size }) => (size === 'small' ? '13px' : '16px')};
    height: ${({ size }) => (size === 'small' ? '13px' : '16px')};
  }
  }
  @media (max-width: 554px) {
    width: ${({ size }) => (size === 'small' ? '70px' : '110px')};
    height: ${({ size }) => (size === 'small' ? '20px' : '30px')};
    font-size: ${({ size }) => (size === 'small' ? '8px' : '12px')};
  }
  
`;

function FilterBtn({ label, icon, size }) {
  return (
    <FilterButton size={size}>
      {icon && <img src={icon} alt={`${label} icon`} />}
      {label}
    </FilterButton>
  );
}

FilterBtn.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  size: PropTypes.oneOf(['default', 'small']),
};

FilterBtn.defaultProps = {
  icon: null,
  size: 'default',
};

export default FilterBtn;
