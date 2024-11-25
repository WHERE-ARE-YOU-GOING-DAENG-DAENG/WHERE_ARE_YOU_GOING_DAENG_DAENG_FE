import React from "react";
import FavoriteList from "../components/commons/FavoriteList";
import { action } from '@storybook/addon-actions';
import houseIcon from "../assets/icons/house.svg"

export default {
  title: "Components/FavoriteList",
  component: FavoriteList,
};

const Template = (args) => <FavoriteList {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "가평 트리하우스",
  icon: houseIcon,
  place: "경기 가평군 상면 수목원로 101-16",
  time: "영업시간 | 10:00 - 22:00",
  color: "#FF69A9",
  imgUrl: "https://via.placeholder.com/100x120", // 이미지 URL 추가
  onTitleClick: action("제목이 클릭되었습니다!"), // 제목 클릭 시 이벤트 핸들러
  onPlaceClick: action("주소가 클릭되었습니다!"), // 주소 클릭 시 이벤트 핸들러
  onDelete: action("삭제되었습니다!"), //삭제 클릭 시 이벤트 핸들러
};
