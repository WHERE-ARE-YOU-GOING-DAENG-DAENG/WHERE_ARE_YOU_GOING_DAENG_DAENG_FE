import ConfirmBtn from "../components/commons/ConfirmBtn";

export default {
  title: "Components/ConfirmBtn", 
  component: ConfirmBtn,
};

const Template = (args) => <ConfirmBtn {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "완료", 
};