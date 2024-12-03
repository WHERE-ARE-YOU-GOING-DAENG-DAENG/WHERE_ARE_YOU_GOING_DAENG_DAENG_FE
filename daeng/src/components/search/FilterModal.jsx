import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import xIcon from "../../assets/icons/x.svg"
import trashcan from "../../assets/icons/trashcan.svg"
import AreaBtn from "../commons/AreaBtn"
import AreaField from '../../data/AreaField';
import PlaceType from '../../data/PlaceType';
import PreferencePlaceOption from "../commons/PreferencePlaceOption";
import ConfirmBtn from '../commons/ConfirmBtn';

const FilterModal = ({ isOpen, onClose, keywords, setKeywords, setFilter }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState(keywords.city);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 400);
    };

    const handleRegionSelect = (region) => {
        setSelectedRegion(region);
        setKeywords((prev) => ({
            ...prev,
            city: region,
            cityDetail: "",
        }));
    };

    const handleSubRegionSelect = (subRegion) => {
        setKeywords((prev) => ({
            ...prev,
            cityDetail: subRegion,
        }));
    };

    const handlePlaceTypeSelect = (placeType) => {
        setKeywords((prev) => ({
            ...prev,
            placeType,
        }));
    };

    const resetKeywords = () => {
        setKeywords({
            city: "",
            cityDetail: "",
            placeType: "",
        });
    };

    useEffect(() => {

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };

    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <Overlay onClick={handleClose} />
            <Modal isClosing={isClosing}>
                <Header>
                    <h2>관심태그</h2>
                    <img src={xIcon} alt="닫기" onClick={handleClose}/>
                </Header>
                <Thindivision />
                <Title>지역</Title>
                <City>
                {Object.keys(AreaField).map((region,index) => (
                    <AreaBtn
                        mode="area" 
                        key={index}
                        label={region}
                        isSelected={selectedRegion === region}
                        onClick={()=>handleRegionSelect(region)}
                    />
                    ))}
                </City>
                <Area>
                {selectedRegion &&
                    AreaField[selectedRegion].map((subRegion, index) => (
                        <AreaBtn
                            mode="area" 
                            key={index}
                            label={subRegion}
                            isSelected={keywords.cityDetail === subRegion}
                            onClick={() => handleSubRegionSelect(subRegion)}
                        />
                    ))}
                </Area>
                <Division />
                <Title>시설종류</Title>
                <Place>
                    {PlaceType.map((place, index) => (
                        <PreferencePlaceOption
                            key={index}
                            icon={place.icon}
                            label={place.label}
                            isSelected={keywords.placeType === place.label}
                            onClick={() => handlePlaceTypeSelect(place.label)}
                        />
                    ))}
                </Place>
                <Division />
                <Keyword>
                <Reset onClick={resetKeywords}>
                    <img src={trashcan} alt="초기화" />
                </Reset>
                <Gap>
                {Object.entries(keywords)
                    .filter(([key]) => key === "cityDetail" || key === "placeType") // 필터링
                    .map(([key, value]) =>
                        value ? (
                            <AreaBtn
                                key={key}
                                mode="keyword"
                                isSelected={true}
                                label={`${value}`}
                                onClick={() =>
                                    setKeywords((prev) => ({
                                        ...prev,
                                        [key]: "",
                                    }))
                                }
                            />
                        ) : null
                    )}
                </Gap>
                </Keyword>
                <Thindivision />
                <Footer>
                    <ConfirmBtn onClick={()=> {setFilter(true); handleClose();}} label="적용"/>
                </Footer>
            </Modal>
            
        </>
    );
};

FilterModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    keywords: PropTypes.array.isRequired,
    setKeywords: PropTypes.func.isRequired,
    setFilter: PropTypes.bool.isRequired,
};

const slideUp = keyframes`
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
`;

const slideDown = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(100%);
    }
`;

const Modal = styled.div`
    color: black;
    position: fixed;
    bottom: 76px;
    width: 555px;
    height: 80%;
    background-color: white;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    animation: ${({ isClosing }) => (isClosing ? slideDown : slideUp)} 0.4s ease-out;
    z-index: 999;
    overflow-y: auto; /* 모달 내부에서 스크롤 가능 */
    -webkit-overflow-scrolling: touch; /* 모바일 스크롤 부드럽게 */
    @media (max-width: 554px) {
        width: 100%;
        bottom: 64px;
    }
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    width: 554px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
    @media (max-width: 554px) {
        width: 100%;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28px 41px;

    h2 {
        margin: 0;
        font-size: 20px;
        font-weight: bold;
    }

    img {
        cursor: pointer;
        width: 20px;
    }
`;

const Thindivision = styled.div`
    height: 1px;
    background-color: #E5E5E5;
    width: 100%;
`;

const Division = styled.div`
    height: 8px;
    background-color: #E5E5E5;
    width: 100%;
`;
const Title = styled.h3`
    text-align:left;
    margin-left:41px;
`
const City = styled.div`
    margin: 0px 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 17px;
    align-items: center;
`
const Area = styled.div`
    border-radius: 10px;
    background-color: #f6f6f6;
    padding: 15px;
    margin: 30px;
    display:flex;
    flex-wrap: wrap;
    gap: 10px;
`
const Place = styled.div`
    margin: 0px 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin-bottom: 20px;
    @media (max-width: 554px) {
        justify-content: space-between;
        gap: 10px;
    }
`
const Keyword = styled.div`
    margin: 20px 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`
const Gap = styled.div`
    display: flex;
    gap: 10px;
`

const Reset = styled.button`
    margin-top: -2px;
    background-color: white;
    border: 1px solid #ECECEC;
    border-radius: 10px;
    width: 40px;
    height: 38px;
    cursor: pointer;
    
    &:hover{
        background-color: #d9d9d9;
    }
    img {
        pointer-events: none;
    }
`
const Footer = styled.div`
    margin-top: 20px;
    margin-left: 10%;
    margin-right: 10%;
    display:flex;
    justify-content: center;
    @media (max-width: 554px) {
        width: 80%;
        margin-left: 10%;
    }
`

export default FilterModal;
