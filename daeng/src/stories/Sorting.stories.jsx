import Sorting from "../components/Sorting";

export default {
  title: 'Components/Sorting',
  component: Sorting,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['list', 'review'],
    },
    label: { 
      control: 'text',
    },
    sortingOptions: {
      control: 'array',
    },
    activeIndex: {
      control: 'number',
    },
    rating: {
      control: 'number',
    },
    totalReviews: {
      control: 'number',
    },
    onSortChange: {
      action: 'onSortChange',
    },
  },
  args: {
    mode: 'list',
    label: '보호자님께 추천하는 장소!',
    sortingOptions: ['가까운순', '별점 높은순'],
    activeIndex: 0,
    rating: 4.8,
    totalReviews: 12,
  },
};

export const ListMode = {
  args: {
    mode: 'list',
    activeIndex: 0,
  },
};

export const ReviewMode = {
  args: {
    mode: 'review',
    activeIndex: 0,
    rating: 4.8,
    totalReviews: 12,
    sortingOptions: ['최신순', '별점 높은순', '별점 낮은 순'],
  },
};
