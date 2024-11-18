import BookMarker from '../components/BookMarker';

export default {
    title: 'Components/BookMarker',
    component: BookMarker,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        label : { control: 'text'},
    }
}

export const Default = {
    args: {
        label: '스페이스인사이트'
    }
}