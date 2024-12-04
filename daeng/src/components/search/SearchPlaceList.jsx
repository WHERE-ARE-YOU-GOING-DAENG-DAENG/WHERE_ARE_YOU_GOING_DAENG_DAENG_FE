import styled from "styled-components";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import filledbookmarkIcon from "../../assets/icons/filledbookmark.svg"
import { useNavigate } from "react-router-dom";
import useFavoriteStore from "../../stores/useFavoriteStore";
import Loading from "../commons/Loading";
import SearchNoImage from "../../assets/icons/search_noimage.svg";

const SearchPlaceList = ({ places, setPlaces, isLoading }) => {
  const navigate = useNavigate();

  
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
      {isLoading ? (
        <Loading label="장소 데이터를 불러오는 중입니다.." />
      ) : places.length > 0 ? (
        places.map((place) => (
          <PlaceItem key={place.placeId}>
            <div onClick={() => handlePlaceClick(place.placeId)}>
              <div className="header">
                <div className="place-name">{place.name}</div>
                <div className="facility-type">{place.placeType || "시설 정보 없음"}</div>
              </div>
              <div className="details">
                <div className="status">
                  {place.startTime && place.endTime
                    ? `${place.startTime} - ${place.endTime}`
                    : "24시간 운영"}
                  {" | "}
                </div>
                <div className="address">{place.streetAddresses || "주소 정보 없음"}</div>
              </div>
              <div className="images">
              {place.imageurl ? (
                <img src={place.imageurl} alt={`${place.name} 이미지`} />
              ) : (
                <img src={SearchNoImage} alt="이미지 없음" />
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
        ))
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  padding : 81px 33px;
  padding-top: 0px;

  @media(max-width: 554px){
    padding: 81px 5%;
    padding-top: 0px;
  }

  p{
    font-weight: bold;
  }
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
      font-size: 18px;
      font-weight: bold;
      color: #ff4b98;

      @media(max-width:554px){
      font-size: 15px;
    }
    }

    .facility-type {
      margin-top: 3px;
      margin-left: 6px;
      font-size: 13px;
      color: #b3b3b3;

      @media(max-width:554px){
      font-size: 12px;
    }
    }
  }

  .details {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    text-align: left;
    word-break: break-word;
    white-space: normal;

    @media(max-width:554px){
      font-size: 12px;
    }
    .status{
      margin-left: 3px;
      word-break: keep-all;
    }

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

export default SearchPlaceList;
