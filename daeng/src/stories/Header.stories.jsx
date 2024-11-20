import Header from '../components/commons/Header';

export default {
    title: 'Components/Header',
    component: Header,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        label : { control: 'text'},
    }
}

export const Default = {
    args: {
        label: '댕댕이 등록'
    }
}