import React from "react";
import SquareBtn from "../components/commons/SquareBtn";

// 스토리북 메타데이터
export default {
  title: "Components/SquareBtn", // 스토리북의 카테고리 및 이름
  component: SquareBtn, // 연결할 컴포넌트
  argTypes: {
    mode: {
      control: { type: "select" }, // 선택 가능한 값으로 표시
      options: ["visit", "review"], // mode 옵션
    },
  },
};

// 스토리 템플릿 생성
const Template = (args) => <SquareBtn {...args} />;

// 각 모드별 스토리
export const visit = Template.bind({});
visit.args = {
  mode: "visit",
};

export const review = Template.bind({});
review.args = {
  mode: "review",
};