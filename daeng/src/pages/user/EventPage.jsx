import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/commons/Header';
import EventList from '../../components/Home/EventList';

function EventPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 가상의 JSON 데이터를 불러옴
    const fetchData = async () => {
      const data = {
        content: [
          {
            eventId: 1,
            eventImage: "https://example.com/image1.jpg",
            eventName: "2025 케이펫페어 수원 시즌1",
            placeName: "가든블루",
            placeAddress: "서울특별시 강남구 영동대로 513",
            eventDescription: "2025년 강아지 펫페어는 1월 17일부터 19일까지 서울 코엑스 Hall D에서 열리는 반려동물 박람회로, 반려동물과 함께하는 삶을 더욱 풍요롭게 할 다양한 제품과 서비스를 제공합니다. 최신 반려동물 용품, 건강 관리 서비스, 훈련 방법 등 다양한 부스가 마련되며, 반려견을 위한 패션쇼, 특별 이벤트, 전문 강연 등 가족과 함께 즐길 수 있는 프로그램도 준비되어 있습니다. 반려동물을 동반하지 않더라도 체험과 학습을 통해 반려동물에 대한 이해와 교감을 높일 수 있는 기회입니다. 이번 행사는 반려동물과의 행복한 삶의 가치를 되새길 수 있는 특별한 자리가 될 것입니다.",
            startDate: "2024-11-27",
            endDate: "2024-12-10",
          },
          {
            eventId: 2,
            eventImage: "https://example.com/image10.jpg",
            eventName: "2025 가낳지모 캣페어 winter",
            placeName: "강릉커피박물관",
            placeAddress: "주소2",
            eventDescription: "2025년 강아지 펫페어는 1월 17일부터 19일까지 서울 코엑스 Hall D에서 열리는 반려동물 박람회입니다. 최신 반려동물 용품, 건강 관리 서비스, 훈련 방법 등을 소개하며, 반려견 패션쇼와 전문 강연 같은 다양한 이벤트도 마련되어 있습니다. 가족과 함께 즐길 수 있는 이번 행사는 반려동물과의 삶을 더욱 풍요롭게 하고, 반려동물의 건강과 행복을 위한 정보와 체험을 제공합니다. ",
            startDate: "2024-11-04",
            endDate: "2025-11-05",
          },
          {
            eventId: 3,
            eventImage: "https://example.com/image10.jpg",
            eventName: "이벤트 15",
            placeName: "강릉공원",
            placeAddress: "주소3",
            eventDescription: "2025년 강아지 펫페어는 1월 17일부터 19일까지 서울 코엑스 Hall D에서 열리는 반려동물 박람회입니다. 최신 반려동물 용품, 건강 관리 서비스, 훈련 방법 등을 소개하며, 반려견 패션쇼와 전문 강연 같은 다양한 이벤트도 마련되어 있습니다. 가족과 함께 즐길 수 있는 이번 행사는 반려동물과의 삶을 더욱 풍요롭게 하고, 반려동물의 건강과 행복을 위한 정보와 체험을 제공합니다. ",
            startDate: "2024-11-04",
            endDate: "2025-11-05",
          },
          {
            eventId: 3,
            eventImage: "https://example.com/image10.jpg",
            eventName: "이벤트 15",
            placeName: "강릉공원",
            placeAddress: "주소3",
            eventDescription: "2025년 강아지 펫페어는 1월 17일부터 19일까지 서울 코엑스 Hall D에서 열리는 반려동물 박람회입니다. 최신 반려동물 용품, 건강 관리 서비스, 훈련 방법 등을 소개하며, 반려견 패션쇼와 전문 강연 같은 다양한 이벤트도 마련되어 있습니다. 가족과 함께 즐길 수 있는 이번 행사는 반려동물과의 삶을 더욱 풍요롭게 하고, 반려동물의 건강과 행복을 위한 정보와 체험을 제공합니다. ",
            startDate: "2024-11-04",
            endDate: "2025-11-05",
          },
        ],
      };
      setEvents(data.content);
    };

    fetchData();
  }, []);

  return (
    <EventContainer>
      <Header label="페스티벌 목록" />
      <EventList events={events} />
    </EventContainer>
  );
}

const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: auto;
`;

export default EventPage;
