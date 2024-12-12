import React from 'react';
import LandOwnerProfile from '../components/map/LandOwnerProfile';

export default {
  title: 'Components/LandOwnerProfile', // Storybook에서 보일 컴포넌트 경로
  component: LandOwnerProfile,          // 스토리에서 사용할 컴포넌트
};

const Template = (args) => <LandOwnerProfile {...args} />;

// 기본 상태의 스토리
export const Default = Template.bind({});
Default.args = {
  area: '서울 강남구',
  nickname: '내가진짜',
  hops: 6,
  pets: [
    { id: 1, name: '바둑이', img: 'https://via.placeholder.com/50?text=Dog' },
    { id: 2, name: '나비', img: 'https://via.placeholder.com/50?text=Cat' },
  ],
};

// 반려동물이 없는 경우
export const NoPets = Template.bind({});
NoPets.args = {
  area: '부산 진구',
  nickname: '영희',
  pets: [],
  hops: 3,
};

// 반려동물이 많은 경우
export const ManyPets = Template.bind({});
ManyPets.args = {
  area: '대구 중구',
  nickname: '민수',
  pets: [
    { id: 1, name: '강아지1', img: 'https://via.placeholder.com/50?text=Dog1' },
    { id: 2, name: '고양이1', img: 'https://via.placeholder.com/50?text=Cat1' },
    { id: 3, name: '햄스터1', img: 'https://via.placeholder.com/50?text=Hamster1' },
    { id: 4, name: '강아지2', img: 'https://via.placeholder.com/50?text=Dog2' },
    { id: 5, name: '고양이2', img: 'https://via.placeholder.com/50?text=Cat2' },
  ],
  hops: 5,
};
