import { useState } from 'react';
import styled from 'styled-components';
import FilterBtn from '../commons/FilterBtn';
import FilterModal from './FilterModal';
import filterIcon from '../../assets/icons/filter.svg';
import cafeIcon from '../../assets/icons/cafe.svg';
import parkIcon from '../../assets/icons/park.svg';
import houseIcon from '../../assets/icons/house.svg';
import restaurantIcon from '../../assets/icons/restaurant.svg';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 34px 40px;
    @media (max-width: 554px) {
        padding: 28px;
    }
`;

const FilterBtnList = ({keywords, setKeywords, setFilter}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <Container>
                <FilterBtn label="필터" icon={filterIcon} onClick={toggleModal} />
                <FilterBtn label="카페" icon={cafeIcon} size="small" />
                <FilterBtn label="숙소" icon={houseIcon} size="small" />
                <FilterBtn label="공원" icon={parkIcon} size="small" />
                <FilterBtn label="음식점" icon={restaurantIcon} size="small" />
            </Container>

            <FilterModal isOpen={isModalOpen} onClose={toggleModal} keywords={keywords} setKeywords={setKeywords} setFilter={setFilter}/>
        </>
    );
};

export default FilterBtnList;
