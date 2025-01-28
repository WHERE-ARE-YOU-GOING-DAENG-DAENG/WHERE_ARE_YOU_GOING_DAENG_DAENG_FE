import { useState } from 'react';
import styled from 'styled-components';
import FilterBtn from '../commons/FilterBtn';
import FilterModal from './FilterModal';
import filterIcon from '../../assets/icons/filter.svg';
import cafeIcon from '../../assets/icons/cafe.svg';
import parkIcon from '../../assets/icons/park.svg';
import houseIcon from '../../assets/icons/house.svg';
import restaurantIcon from '../../assets/icons/restaurant.svg';

const FilterBtnList = ({ keywords, setKeywords, setFilter }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handlePlaceTypeFilter = (placeType) => {
        setKeywords({
            city: "",
            cityDetail: "",
            placeType,
        });
        setFilter(true);
    };

    const buttons = [
        { label: "카페", icon: cafeIcon, placeType: "카페" },
        { label: "숙소", icon: houseIcon, placeType: "숙소" },
        { label: "공원", icon: parkIcon, placeType: "공원" },
        { label: "음식점", icon: restaurantIcon, placeType: "음식점" },
    ];

    return (
        <>
            <Container>
                <FilterBtn label="필터" icon={filterIcon} onClick={toggleModal} />
                {buttons.map(({ label, icon, placeType }) => (
                    <FilterBtn
                        key={label}
                        label={label}
                        icon={icon}
                        size="small"
                        onClick={() => handlePlaceTypeFilter(placeType)}
                    />
                ))}
            </Container>

            <FilterModal
                isOpen={isModalOpen}
                onClose={toggleModal}
                keywords={keywords}
                setKeywords={setKeywords}
                setFilter={setFilter}
            />
        </>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding-top: 5%;
    padding-bottom: 2%;
    @media (max-width: 554px) {
        gap: 20px;
    }
    @media (max-width: 410px) {
       gap: 10px;
    }
`;

export default FilterBtnList;
