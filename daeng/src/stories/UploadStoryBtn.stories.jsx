import UploadStoryBtn from "../components/commons/UploadStoryBtn";

export default {
  title: "Components/UploadStoryBtn",
  component: UploadStoryBtn,
  argTypes: {
    location: { control: "text" },
    description: { control: "text" },
    isPinkBorder: { control: "boolean" },
    imageSrc: { control: "text" },
  },
};

const Template = (args) => <UploadStoryBtn {...args} />;

export const PinkBorder = Template.bind({});
PinkBorder.args = {
  location: "서울 중구",
  description: "내가 짱",
  isPinkBorder: true,
  imageSrc: null, // 기본 이미지 사용
};

export const GrayBorder = Template.bind({});
GrayBorder.args = {
  location: "서울 강남구",
  description: "내가 짱",
  isPinkBorder: false,
  imageSrc: null, // 기본 이미지 사용
};

export const CustomImage = Template.bind({});
CustomImage.args = {
  location: "부산 해운대구",
  description: "댕댕이",
  isPinkBorder: true,
  imageSrc: "", // 커스텀 이미지
};
