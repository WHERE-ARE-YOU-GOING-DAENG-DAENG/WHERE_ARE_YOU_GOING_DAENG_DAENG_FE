import BookMarker from '../components/commons/BookMarker';
import bookmarker from '../assets/icons/bookmarker.svg'
import marker from "../assets/icons/marker.svg"
import { action } from '@storybook/addon-actions';
export default {
    title: 'Components/BookMarker',
    component: BookMarker,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        label : { control: 'text'},
        icon : { control: Selection,
            options: [bookmarker]
        }
    }
}

export const Default = {
    args: {
        label: '내 위치',
        icon: marker,
    }
}

export const Bookmark = {
    args: {
        label: '스페이스인사이트',
        icon: bookmarker,
        onClick: action("클릭액션")
    }
}