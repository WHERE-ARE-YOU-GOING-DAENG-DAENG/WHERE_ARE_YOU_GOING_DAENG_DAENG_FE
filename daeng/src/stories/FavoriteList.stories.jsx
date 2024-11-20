import React from "react";
import FavoriteList from "../components/commons/FavoriteList";

export default {
  title: "Components/FavoriteList",
  component: FavoriteList,
};

const Template = (args) => <FavoriteList {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "가평 트리하우스",
  place: "경기 가평군 상면 수목원로 101-16",
  time: "영업시간 | 10:00 - 22:00",
  color: "#FF69A9",
};