import { useState } from "react";
import styled from "styled-components";
import joinIcon from "../../assets/icons/join.svg"
import ReviewKeywords from "../../components/commons/ReviewKeywords";
import bookmarkIcon from "../../assets/icons/bookmark.svg";
import filledbookmarkIcon from "../../assets/icons/filledbookmark.svg";
import starIcon from "../../assets/icons/star.svg"
import { useNavigate } from "react-router-dom";
// import useFavoriteStore from "../../stores/useFavoriteStore";

const Container = styled.div`
  padding: 0px 44px;
`

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 20px;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 0px;
  }

`;

const SubTitleSection = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 10px;

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

const PlaceTitle = ({ data }) => {
    const [isFavorite, setIsFavorite] = useState(data.isFavorite);
    // const { getFavoriteId } = useFavoriteStore();
    // const favoriteId = getFavoriteId(data.placeId);
    const navigate = useNavigate();
    
    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
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
                <p className="detail-reviewcnt">({data.total})</p>
                <img
                    src={isFavorite ? filledbookmarkIcon : bookmarkIcon}
                    alt="Favorite"
                    className="favorite-button"
                    onClick={toggleFavorite}
                />
            </SubTitleSection>
        </Container>
    )
}

export default PlaceTitle;