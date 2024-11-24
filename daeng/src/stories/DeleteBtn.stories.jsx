import DeleteBtn from "../components/commons/DeleteBtn";
import { action } from '@storybook/addon-actions';

export default {
    title: "Components/DeleteBtn",
    component: DeleteBtn,
};

const Template = (args) => <DeleteBtn {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: "삭제",
    onClick: action("삭제되었습니다.")
};