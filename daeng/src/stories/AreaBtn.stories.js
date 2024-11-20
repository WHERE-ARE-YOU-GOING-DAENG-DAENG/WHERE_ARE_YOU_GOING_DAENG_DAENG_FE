import AreaBtn from '../components/commons/AreaBtn';  

export default {
  title: 'Components/AreaBtn',  
  component: AreaBtn,          
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['area', 'keyword'],
    },
    label: { control: 'text' },
    onClick: {
      action: 'onClick',
    },
  },
};

export const Default = {
  args: {
    mode: 'area',
    label: '남원/임실/순창/무주/진안/장수',
  },
};

export const keyword = {
  args: {
    mode: 'keyword',
    label: '남원/임실/순창/무주/진안/장수',
    isSelected: true,
  },
};
