import Loading from "../components/commons/Loading";

export default {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <Loading {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "로딩 중"
};
