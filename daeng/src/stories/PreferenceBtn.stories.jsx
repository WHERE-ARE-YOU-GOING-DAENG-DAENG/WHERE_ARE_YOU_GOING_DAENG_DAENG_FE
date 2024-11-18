import React from "react";
import PreferenceFavoriteOption from "../components/preferenceFavoriteOption";

export default {
  title: "Components/PreferenceFavoriteOption",
  component: PreferenceFavoriteOption,
};
const Template = (args) => <PreferenceFavoriteOption {...args} />;
export const Default = Template.bind({});
Default.args = {
  label: "뛰어놀기 좋아요",
};