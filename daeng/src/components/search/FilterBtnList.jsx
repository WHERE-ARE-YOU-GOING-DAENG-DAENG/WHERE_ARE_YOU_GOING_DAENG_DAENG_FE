import styled from 'styled-components';
// import PropTypes from 'prop-types';
import FilterBtn from '../commons/FilterBtn';
import filterIcon from '../../assets/icons/filter.svg'
import cafeIcon from '../../assets/icons/cafe.svg'
import parkIcon from '../../assets/icons/park.svg'
import houseIcon from '../../assets/icons/house.svg'
import restaurantIcon from '../../assets/icons/restaurant.svg'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 34px 40px;
    justify-content: space-between;
    @media (max-width: 554px) {
        padding: 28px;
}
`
const FilterBtnList = () => {
    return (
        <Container>
            <FilterBtn label="필터" icon={filterIcon}/>
            <FilterBtn label="카페" icon={cafeIcon} size="small"/>
            <FilterBtn label="숙소" icon={houseIcon} size="small"/>
            <FilterBtn label="공원" icon={parkIcon} size="small"/>
            <FilterBtn label="음식점" icon={restaurantIcon} size="small"/>
        </Container>
    );
};

export default FilterBtnList;