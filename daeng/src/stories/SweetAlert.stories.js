import { action } from '@storybook/addon-actions';
import SweetAlert from '../components/SweetAlert';


export default {
    title: 'Components/SweetAlert',
    component: SweetAlert,
    parameters: {
        layout: 'centered',
    },
    args: {
        onClick: action("버튼클릭"),
    },
};


export const AlertMode = {
    args: {
        mode: 'alert',
        title: '로그아웃',
        text: '로그아웃 되었습니다!',
        confirmText: '닫기',
        onConfirm: action('Confirmed!'),
    }
};

export const ConfirmMode = {
    args: {
        mode: 'confirm',
        title: '회원탈퇴',
        text: '정말 회원을 탈퇴하시겠습니까?',
        confirmText: '탈퇴하기',
        cancelText: '취소',
        onConfirm: action('Confirmed!'),
        onCancel: action('Cancelled!'),
    }
};


