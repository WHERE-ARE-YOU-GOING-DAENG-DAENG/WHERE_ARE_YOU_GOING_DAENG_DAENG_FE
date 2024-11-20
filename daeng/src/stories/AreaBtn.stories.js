import AreaBtn from '../components/commons/AreaBtn';  

export default {
  title: 'Components/AreaBtn',  
  component: AreaBtn,          
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },  
  },
};

export const Default = {
  args: {
    label: '남원/임실/순창/무주/진안/장수',
  },
};
