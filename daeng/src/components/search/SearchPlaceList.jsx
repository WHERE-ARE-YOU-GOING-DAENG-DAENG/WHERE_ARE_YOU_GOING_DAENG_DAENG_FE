import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import filledbookmarkIcon from "../../assets/icons/filledbookmark.svg"
import { useNavigate } from "react-router-dom";

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
          placeType: "카페",
          start_time : "09:00",
          end_time : "20:00",
          streetAddresses: "서울 강남구 강남대로 162길 18",
          img_path: [],
          isFavorite: true,
        },
        { 
          placeId: 2,
          name: "유플러스 양식 어쩌고",
          placeType: "식당",
          start_time : "09:00",
          end_time : "20:00",
          streetAddresses: "서울 강남구 강남대로 162길 18",
          img_path: [],
          isFavorite: false,
        },
        { 
          placeId: 3,
          name: "유플러스 공원",
          placeType: "공원",
          start_time : "09:00",
          end_time : "20:00",
          streetAddresses: "서울 강남구 강남대로 162길 18",
          img_path:[],
          isFavorite: false,
        },
      ]);
    } else {
      setPlaces(list);
    }
  }, [list]);

  //즐겨찾기 토글
  const toggleBookmark = (id) => {
    setPlaces((prevPlaces) =>
      prevPlaces.map((place) =>
        place.placeId === id ? { ...place, isFavorite: !place.isFavorite } : place
      )
    );
  };

  const handlePlaceClick = (placeId) => {
    navigate(`/search/${placeId}`);
  };

  return (
    <ListContainer>
      {places.map((place) => (
        <PlaceItem key={place.placeId}>
          <div onClick={() => handlePlaceClick(place.placeId)}>
            <div className="header">
              <div className="place-name">{place.name}</div>
              <div className="facility-type">{place.placeType || "시설 정보 없음"}</div>
            </div>
            <div className="details">
              <div className="status">{place.start_time} - {place.end_time} |</div>
              <div className="address">{place.streetAddresses || "주소 정보 없음"}</div>
            </div>
            <div className="images">
              {place.img_path.length > 0 ? (
                place.images.map((image, i) => (
                  <img key={i} src={image} alt={`${place.name} 이미지`} />
                ))
              ) : (
                <div style={{ width: "108px", height:"130px", borderRadius:"10px", backgroundColor:"#b3b3b3"}}></div>
              )}
            </div>
          </div>
          <img
            src={place.isFavorite ? filledbookmarkIcon : bookmarkIcon}
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
