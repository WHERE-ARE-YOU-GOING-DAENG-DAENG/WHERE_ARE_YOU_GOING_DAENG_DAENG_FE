import PropTypes from "prop-types";
import {
  Wrapper,
  Title,
  Container,
  PlaceWrapper,
  ImageBox,
  PlaceImage,
  PlaceName,
} from "./PlacesSection.styles";

function PlacesSection({ title, icon, places, onItemClick }) {
  return (
    <Wrapper>
      <Title>
        {title}
        {icon && <img src={icon} alt="section icon" />}
      </Title>
      <Container>
        {places.map((place) => (
          <PlaceWrapper key={place.id}>
            <ImageBox onClick={() => onItemClick(place.id)}>
              <PlaceImage src={place.image} alt={place.name || "이미지 없음"} />
            </ImageBox>
            <PlaceName>{place.name}</PlaceName>
          </PlaceWrapper>
        ))}
      </Container>
    </Wrapper>
  );
}

PlacesSection.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  places: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

PlacesSection.defaultProps = {
  icon: null,
};

export default PlacesSection;
