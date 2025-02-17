import ConfirmBtn from "../components/commons/ConfirmBtn";

export default {
  title: "Components/ConfirmBtn",
  component: ConfirmBtn,
  argTypes: {
    isLoading: { control: "boolean" },
  },
};

const Template = (args) => <ConfirmBtn {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "완료",
  isLoading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  label: "완료",
  isLoading: true,
};
