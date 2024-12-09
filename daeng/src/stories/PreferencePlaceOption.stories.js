import { fn } from '@storybook/test';
import PreferencePlaceOption from '../components/commons/PreferencePlaceOption';
// import restaurantIcon from '../assets/icons/restaurant.svg'
// import cafeIcon from '../assets/icons/cafe.svg'
// import hotelIcon from '../assets/icons/hotel.svg'
// import kindergartenIcon from '../assets/icons/kindergarten.svg'
// import parkIcon from '../assets/icons/park.svg'
// import playgroundIcon from '../assets/icons/playground.svg'
import star from '../assets/icons/star.svg'

export default {
  title: 'Components/PreferencePlaceOption',
  component: PreferencePlaceOption,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isSelected: { control: 'boolean' },
    label: { control: 'text' },
    icon: { control: 'select',
      options: [star]
      // options: [ restaurantIcon, cafeIcon, hotelIcon, kindergartenIcon, parkIcon, playgroundIcon]
    },
  },
  args: {
    onClick: fn(),
    icon: star,
  },
};


export const Default = {
  args: {
    isSelected: false,
    label: 'Restaurant',
    icon: star
  },
};

export const Selected = {
  args: {
    isSelected: true,
    label: 'Restaurant',
    icon: star
  },
};
