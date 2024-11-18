import PushAlerts from '../components/PushAlerts';

export default {
    title: 'Components/PushAlerts', // Storybook 내의 컴포넌트 경로
    component: PushAlerts, // 사용할 컴포넌트
    parameters: {
        layout: 'centered', // Storybook 레이아웃 설정
    },
};

export const Default = {
    args: {
        message: '뽀삐가 유레카 공원에 참여해요', // 기본 메시지
        dateTime: '2024.10.30 | 7:30', // 기본 날짜와 시간
    },
};

export const Custom = {
    args: {
        message: '강아지가 공원에서 산책해요', // 커스텀 메시지
        dateTime: '2024.11.01 | 6:00', // 커스텀 날짜와 시간
    },
};
