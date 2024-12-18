import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../../components/commons/Header';
import EventList from '../../components/Home/EventList';

function EventPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await axios.get('https://dev.daengdaeng-where.link/api/v1/banners',{
          withCredentials : true,
        });

        if (responce.data && responce.data.data) {
          setEvents(responce.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
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
