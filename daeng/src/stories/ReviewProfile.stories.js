import { action } from '@storybook/addon-actions';
import ReviewProfile from '../components/commons/ReviewProfile';
import user from "../assets/icons/user.svg"

export default {
  title: 'Components/ReviewProfile',
  component: ReviewProfile,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    profileImage: { control: 'select',
        options: [user]
    },
    nickname: { control: 'text' },
    pet: { control: 'text' },
    date: { control: 'text' },
    rating: { control: 'number' },
    isMyReview: { control:'boolean' },
  },
  args: {
    onDelete: action('삭제 버튼 클릭됨'),
    profileImage: user
  }
};

export const Default = {
  args: {
    profileImage: user,
    nickname: '내가진짜',
    petType: '시츄',
    date: '2024.10.11',
    rating: 5,
    isMyReview: true,
    onDelete: action('삭제 버튼 클릭됨'),
  },
};

export const AnotherUserReview = {
  args: {
    profileImage: user,
    nickname: '다른사용자',
    petType: '푸들',
    date: '2024.10.10',
    rating: 4,
    isMyReview: false,
  },
};

