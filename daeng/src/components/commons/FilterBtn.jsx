import styled from 'styled-components';
import PropTypes from 'prop-types';

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ size }) => (size === 'small' ? '3px' : '8px')};
  padding: 0px 15px;
  height: ${({ size }) => (size === 'small' ? '28px' : '35px')};
  background-color: #fdf2f8;
  color: #db2877;
  font-size: ${({ size }) => (size === 'small' ? '13px' : '16px')};
  border-radius: 20px;
  border: none;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 554px) {
    padding: 0px 13px;
    height: ${({ size }) => (size === 'small' ? '26px' : '33px')};
    font-size: ${({ size }) => (size === 'small' ? '11px' : '13px')};
  }

  @media (max-width: 410px) {
    padding: 0px 10px;
    height: ${({ size }) => (size === 'small' ? '25px' : '30px')};
    font-size: ${({ size }) => (size === 'small' ? '11px' : '13px')};
  }

  &:hover {
    background-color: #fbd1e6;
  }

  img {
    width: ${({ size }) => (size === 'small' ? '13px' : '20px')};
    height: ${({ size }) => (size === 'small' ? '13px' : '18px')};
    @media (max-width: 554px) {
      width: ${({ size }) => (size === 'small' ? '10px' : '16px')};
      height: ${({ size }) => (size === 'small' ? '13px' : '16px')};
    }
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
  onClick: PropTypes.func,
};

FilterBtn.defaultProps = {
  icon: null,
  size: 'default',
  onClick: null,
};

export default FilterBtn;
