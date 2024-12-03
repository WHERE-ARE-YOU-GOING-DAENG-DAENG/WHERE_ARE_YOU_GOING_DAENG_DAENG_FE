import { useState } from "react";
import styled from "styled-components";
import joinIcon from "../../assets/icons/join.svg"
import ReviewKeywords from "../../components/commons/ReviewKeywords";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import filledbookmarkIcon from "../../assets/icons/filledbookmark.svg";
import starIcon from "../../assets/icons/star.svg"
import { useNavigate } from "react-router-dom";
import useFavoriteStore from "../../stores/useFavoriteStore";

const Container = styled.div`
  padding: 0px 44px;
`

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 20px;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 3px;

    @media(max-width: 554px){
    font-size: 20px;
  }

`;

const SubTitleSection = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 12px;

  .detail-category{
    color: #FF69A9;
    margin-right: 5px;
  }

  img{
    margin: 0 5px;
  }

  .detail-reviewcnt{
    margin-left: 2px;
    color: #808080;
    font-weight: normal;
  }
`

const PlaceTitle = ({ data, setData }) => {
    const navigate = useNavigate();
    
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
    
        setData((prevData) => ({
          ...prevData,
          isFavorite: !isFavorite,
        }));
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    };
  
    return(
        <Container>
            <TitleSection>
                <h1>{data.name}</h1>
                <ReviewKeywords label="방문하고 싶어요" icon={joinIcon} onClick={()=> navigate(`/visit-list/${data.placeId}`)}/>
            </TitleSection>
            <SubTitleSection>
                <p className="detail-category">{data.placeType}</p>
                <p>| 평점</p>
                <img src={starIcon} alt="평점" />
                <p>{data.score}</p>
                <p className="detail-reviewcnt" onClick={()=>navigate(`/total-review/${data.placeId}`)}>({data.total})</p>
                <img
                    src={data.isFavorite ? filledbookmarkIcon : bookmarkIcon}
                    alt="Favorite"
                    className="favorite-button"
                    onClick={()=>toggleBookmark(data.placeId, data.isFavorite)}
                />
            </SubTitleSection>
        </Container>
    )
}

export default PlaceTitle;