import React from "react";
import ReviewKeywords from "../components/commons/reviewKeywords";

export default {
  title: "Components/ReviewKeywords",
  component: ReviewKeywords,
};

const Template = (args) => <ReviewKeywords {...args} />;

export const Default = Template.bind({});
Default.args = {
  label:'방문하고 싶어요'
};