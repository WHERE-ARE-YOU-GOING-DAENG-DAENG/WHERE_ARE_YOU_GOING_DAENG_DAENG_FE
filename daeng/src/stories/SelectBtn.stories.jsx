import SelectBtn from "../components/commons/SelectBtn";

export default {
    title: "Components/SelectBtn",
    component: SelectBtn,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        label: { control: "text" },
    },
};

export const Default = {
    args: {
        label: "소형견(3 ~ 7kg 이하)",
    },
};
