import { useState, useEffect } from "react";
import styled from "styled-components";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import filledbookmarkIcon from "../../assets/icons/filledbookmark.svg"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLocationStore from "../../stores/LocationStore";
import useFavoriteStore from "../../stores/useFavoriteStore";

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
  const userLocation = useLocationStore((state) => state.userLocation);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!Array.isArray(list) || list.length === 0) { //추천리스트
      // fetchNearestPlaces();
      setPlaces([
        {
            "placeId": 185,
            "name": "경성대학교박물관",
            "city": "부산",
            "cityDetail": "남구",
            "township": "대연동",
            "latitude": 35.13843836,
            "longitude": 129.100099,
            "streetAddresses": "부산광역시 남구 수영로 309",
            "telNumber": "051-663-4114",
            "url": "http://www.ks.ac.kr/ksmuseum",
            "placeType": "박물관",
            "description": "해당없음 박물관",
            "parking": true,
            "indoor": true,
            "outdoor": false,
            "distance": 0.2761599773174494,
            "isFavorite": true,
            "startTime": "9:00",
            "endTime": "18:00",
            "favoriteCount": 0,
            "placeScore": 4.7
        },
        {
            "placeId": 184,
            "name": "경성대학교 미술관",
            "city": "부산",
            "cityDetail": "남구",
            "township": "대연동",
            "latitude": 35.13843836,
            "longitude": 129.100099,
            "streetAddresses": "부산광역시 남구 수영로 309",
            "telNumber": "051-663-5361",
            "url": "https://cms1.ks.ac.kr/culture",
            "placeType": "미술관",
            "description": "해당없음 미술관",
            "parking": true,
            "indoor": true,
            "outdoor": true,
            "distance": 0.2761599773174494,
            "isFavorite": false,
            "startTime": "10:00",
            "endTime": "18:00",
            "favoriteCount": 0,
            "placeScore": 4.7
        },
        {
            "placeId": 1278,
            "name": "부경대학교박물관",
            "city": "부산",
            "cityDetail": "남구",
            "township": "대연동",
            "latitude": 35.13117521,
            "longitude": 129.104866,
            "streetAddresses": "부산광역시 남구 용소로 45",
            "telNumber": "051-629-6771",
            "url": "http://cms.pknu.ac.kr/museum",
            "placeType": "박물관",
            "description": "해당없음 박물관",
            "parking": true,
            "indoor": true,
            "outdoor": false,
            "distance": 0.7868715140598589,
            "isFavorite": false,
            "startTime": "10:00",
            "endTime": "17:00",
            "favoriteCount": 0,
            "placeScore": 5
        },])
    } else {
      setPlaces(list);
    }
  }, [list]);

  //가까운순 추천장소 30개
  const fetchNearestPlaces = async () => {
    const payload = {
      latitude: userLocation.lat,
      longitude: userLocation.lng,
    }
    console.log(payload)
    try{
      const response = await axios.post("https://www.daengdaeng-where.link/api/v1/places/nearest",payload,{
        withCredentials: true,
      });
      console.log(response.data.data); //로그 삭제
      setPlaces(response.data.data);
    }catch (error){
      console.error("Error fetching nearest places:", error);
    }
  }

  //즐겨찾기 토글
  const toggleBookmark = async (placeId, isFavorite) => {
    const favoriteStore = useFavoriteStore.getState();
    
    try {
      if (isFavorite) {
        const favoriteId = favoriteStore.getFavoriteId(placeId);
        if (favoriteId) {
          await favoriteStore.removeFavorite(favoriteId);
        } else {
          console.warn(`Favorite ID not found for placeId: ${placeId}`);
        }
      } else {
        await favoriteStore.addFavorite(placeId);
      }
      setPlaces((prevPlaces) =>
        prevPlaces.map((p) =>
          p.placeId === placeId ? { ...p, isFavorite: !isFavorite } : p
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
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
              <div className="status">{place.startTime} - {place.endTime} |</div>
              <div className="address">{place.streetAddresses || "주소 정보 없음"}</div>
            </div>
            <div className="images">
              {Array.isArray(place.img_path) && place.img_path.length > 0 ? (
                place.img_path.map((image, i) => (
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
            onClick={() => toggleBookmark(place.placeId, place.isFavorite)}
          />
        </PlaceItem>
      ))}
    </ListContainer>
  );
};

// 기본값 정의
SearchPlaceList.defaultProps = {
  list: [],
};

export default SearchPlaceList;
