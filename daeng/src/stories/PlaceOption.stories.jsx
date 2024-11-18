import React from "react";
import PlaceOption from "../components/PlaceOption";

export default {
  title: "Components/PlaceOption",
  component: PlaceOption,
};

const Template = (args) => <PlaceOption {...args} />;

export const Default = Template.bind({});
Default.args = {
  parking: "주차가능",
  space: "실내 · 실외 공간",
  weightLimit: "~15kg",
};