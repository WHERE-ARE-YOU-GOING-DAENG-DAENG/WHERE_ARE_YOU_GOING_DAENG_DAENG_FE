import React from "react";
import FilterBtn from "../components/FilterBtn";

export default {
  title: "Components/FilterBtn",
  component: FilterBtn,
};
const Template = (args) => <FilterBtn {...args} />;
export const Default = Template.bind({});
Default.args = {
  label: "Filter",
};