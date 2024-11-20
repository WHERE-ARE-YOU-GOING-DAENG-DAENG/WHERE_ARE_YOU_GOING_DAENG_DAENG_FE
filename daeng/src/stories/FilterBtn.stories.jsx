import FilterBtn from '../components/FilterBtn';
import filter from '../assets/icons/filter.svg'
import park from '../assets/icons/park.svg';

export default {
  title: 'Components/FilterBtn',
  component: FilterBtn,
};

const Template = (args) => <FilterBtn {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Filter',
  icon: filter
};


export const Small = Template.bind({});
Small.args = {
  label: '공원',
  size: 'small',
  icon: park,
};

