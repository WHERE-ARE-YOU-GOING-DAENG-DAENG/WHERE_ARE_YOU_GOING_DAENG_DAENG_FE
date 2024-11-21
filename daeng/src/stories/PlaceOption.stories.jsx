import React from "react";
import PlaceOption from "../components/commons/PlaceOption";
import inandout from "../assets/icons/indoorandoutdoor.svg"

export default {
  title: "Components/PlaceOption",
  component: PlaceOption,
};

const Template = (args) => <PlaceOption {...args} />;

export const Default = Template.bind({});
Default.args = {
  parking: "주차가능",
  space: "실내 · 실외공간",
  weightLimit: "~15kg",
  icon: inandout,
};