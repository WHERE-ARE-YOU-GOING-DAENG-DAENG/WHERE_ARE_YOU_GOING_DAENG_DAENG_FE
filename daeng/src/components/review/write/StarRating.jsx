import React from "react";
import star from "../../../assets/icons/star.svg";
import notfillstar from "../../../assets/icons/notfillstar.svg";
import { StarContainer, StyleStar } from "./WriteStyleComponent";

const StarRating = ({ ratings, onStarClick }) => {
  return (
    <StarContainer>
      {[...Array(5)].map((_, index) => (
        <StyleStar
          key={index}
          src={ratings[index] ? star : notfillstar}
          alt="별점"
          onClick={() => onStarClick(index)}
        />
      ))}
    </StarContainer>
  );
};

export default StarRating;
