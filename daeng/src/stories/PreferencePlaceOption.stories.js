import { fn } from '@storybook/test';
import PreferencePlaceOption from '../components/PreferencePlaceOption';
import restaurantIcon from '../assets/icons/restaurant.svg'
import cafeIcon from '../assets/icons/cafe.svg'
import hotelIcon from '../assets/icons/hotel.svg'
import kindergartenIcon from '../assets/icons/kindergarten.svg'
import parkIcon from '../assets/icons/park.svg'
import playgroundIcon from '../assets/icons/playground.svg'

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
      options: [ restaurantIcon, cafeIcon, hotelIcon, kindergartenIcon, parkIcon, playgroundIcon]
    },
  },
  args: {
    onClick: fn(),
    icon: restaurantIcon,
  },
};


export const Default = {
  args: {
    isSelected: false,
    label: 'Restaurant',
    icon: restaurantIcon
  },
};

export const Selected = {
  args: {
    isSelected: true,
    label: 'Restaurant',
    icon: restaurantIcon
  },
};
