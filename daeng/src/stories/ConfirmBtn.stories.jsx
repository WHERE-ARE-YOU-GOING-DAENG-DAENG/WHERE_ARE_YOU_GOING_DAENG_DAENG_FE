import ConfirmBtn from "../components/commons/ConfirmBtn";

export default {
  title: "Components/ConfirmBtn", // Storybook에서 표시될 이름
  component: ConfirmBtn,
};

const Template = (args) => <ConfirmBtn {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "완료", // 버튼에 표시될 텍스트
};