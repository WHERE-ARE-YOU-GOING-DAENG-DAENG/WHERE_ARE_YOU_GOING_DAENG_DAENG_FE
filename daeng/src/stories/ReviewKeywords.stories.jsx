import React from "react";
import ReviewKeywords from "../components/commons/ReviewKeywords";
import joinIcon from "../assets/icons/join.svg"

export default {
  title: "Components/ReviewKeywords",
  component: ReviewKeywords,
};

const Template = (args) => <ReviewKeywords {...args} />;

// 기본 스토리 (아이콘 없는 버전)
export const Default = Template.bind({});
Default.args = {
  label: "방문하고 싶어요",
};

// 아이콘 있는 버전
export const WithIcon = Template.bind({});
WithIcon.args = {
  label: "방문하고 싶어요",
  icon: joinIcon,
};
