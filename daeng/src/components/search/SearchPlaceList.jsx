import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import filledbookmarkIcon from "../../assets/icons/filledbookmark.svg"
import { useNavigate } from "react-router-dom";

// Styled-components
const ListContainer = styled.div`
  padding-bottom: 81px;
  padding-left: 33px;
  padding-right: 33px;
`;

const PlaceItem = styled.div`
  position: relative;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #fff;
  border-top: 1px solid #d9d9d9;

  .header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    cursor: pointer;

    .place-name {
      font-size: 15px;
      font-weight: bold;
      color: #ff4b98;
    }

    .facility-type {
      margin-top: 3px;
      margin-left: 6px;
      font-size: 10px;
      color: #b3b3b3;
    }
  }

  .details {
    display: flex;
    font-size: 9px;

    .address {
      margin-left: 3px;
    }
  }

  .images {
    display: flex;
    gap: 10px;
    margin-top: 15px;

    img {
      width: 108px;
      height: 130px;
      border-radius: 10px;
      object-fit: cover;
    }
  }

  .favorite {
    position: absolute;
    top: 15px;
    right: 15px;
    color: #ff4b98;
    font-size: 20px;
    cursor: pointer;
  }
`;

const SearchPlaceList = ({ list }) => {
  const [places, setPlaces] = useState(Array.isArray(list) ? list : []);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!Array.isArray(list) || list.length === 0) { //임시로 넣은 더미추천리스트
      setPlaces([
        { 
          placeId: 1,
          name: "데일리오아시스 분당 야탑점",
          facilityType: "카페",
          isOpen: true,
          address: "서울 강남구 강남대로 162길 18",
          images: [],
          bookmark: true,
        },
        { 
          placeId: 2,
          name: "유플러스 양식 어쩌고",
          facilityType: "식당",
          isOpen: false,
          address: "서울 강남구 강남대로 162길 18",
          images: [],
          bookmark: false,
        },
        { 
          placeId: 3,
          name: "유플러스 공원",
          facilityType: "공원",
          isOpen: true,
          address: "서울 강남구 강남대로 162길 18",
          images: [],
          bookmark: false,
        },
      ]);
    } else {
      setPlaces(list);
    }
  }, [list]);

  const toggleBookmark = (index) => {
    setPlaces((prevPlaces) =>
      prevPlaces.map((place, i) =>
        i === index ? { ...place, bookmark: !place.bookmark } : place
      )
    );
  };

  const handlePlaceClick = (placeId) => {
    navigate(`/search/${placeId}`);
  };

  return (
    <ListContainer>
      {places.map((place) => (
        <PlaceItem key={place.placeId} onClick={() => handlePlaceClick(place.placeId)}>
          <div className="header">
            <div className="place-name">{place.name}</div>
            <div className="facility-type">{place.facilityType || "시설 정보 없음"}</div>
          </div>
          <div className="details">
            <div className="status">{place.isOpen ? "영업중 |" : "영업 종료 |"}</div>
            <div className="address">{place.address || "주소 정보 없음"}</div>
          </div>
          <div className="images">
            {place.images.length > 0 ? (
              place.images.map((image, i) => (
                <img key={i} src={image} alt={`${place.name} 이미지`} />
              ))
            ) : (
              <div style={{ width: "108px", height:"130px", borderRadius:"10px", backgroundColor:"#b3b3b3"}}></div>
            )}
          </div>
          <img
            src={place.bookmark ? filledbookmarkIcon : bookmarkIcon}
            className="favorite"
            alt="즐겨찾기"
            onClick={() => toggleBookmark(place.placeId)}
          />
        </PlaceItem>
      ))}
    </ListContainer>
  );
};

SearchPlaceList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      facilityType: PropTypes.string,
      isOpen: PropTypes.bool,
      address: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      bookmark: PropTypes.bool, //임시추가
    })
  ),
};

// 기본값 정의
SearchPlaceList.defaultProps = {
  list: [],
};

export default SearchPlaceList;
