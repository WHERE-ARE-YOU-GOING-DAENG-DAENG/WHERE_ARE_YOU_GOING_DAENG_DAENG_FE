import { useState } from 'react';
import styled from 'styled-components';
import EventModal from './EventModal';
import PropTypes from 'prop-types';

function EventList({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <>
      {events.map((event) => (
        <EventListContainer key={event.eventId}>
          <EventInfoContainer>
            <EventName>{event.eventName}</EventName>
            <EventPlace>위치 | {event.placeName}</EventPlace>
            <EventAddress>주소 | {event.placeAddress}</EventAddress>
            <EventDescriptionRow>
              <EventDescription>설명 |</EventDescription>
              <EventDetailButton onClick={() => setSelectedEvent(event)}>
                자세히보기
              </EventDetailButton>
            </EventDescriptionRow>
            <EventDate>
              기간 | {event.startDate} ~ {event.endDate}
            </EventDate>
          </EventInfoContainer>
          <EventListPicture imgUrl={event.eventImage} />
        </EventListContainer>
      ))}

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}

EventList.propTypes = {
    events: PropTypes.arrayOf(
      PropTypes.shape({
        eventId: PropTypes.number.isRequired,
        eventName: PropTypes.string.isRequired,
        placeName: PropTypes.string.isRequired,
        placeAddress: PropTypes.string.isRequired,
        eventImage: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

const EventListContainer = styled.div`
  width: 90%;
  max-width: 470px;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin: 15px auto;
`;

const EventInfoContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  padding-right: 15px;
  padding-left: 10px;
  padding-top: 15px;
`;

const EventListPicture = styled.div`
  flex: 1;
  width: 120px;
  height: 170px;
  border-radius: 10px;
  background-color: #e0e0e0;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 554px) {
    width: 100px;
    height: 150px;
    margin: 0 auto;
  }
`;

const EventName = styled.h3`
  font-size: 21px;
  font-weight: bold;
  color: #ff69a9;
  margin: 0 0 6px;

  @media (max-width: 554px) {
    font-size: 16.5px; 
  }
`;

const EventPlace = styled.p`
  font-size: 14.5px;
  color: #808080;
  margin: 6px 0;

  @media (max-width: 554px) {
    font-size: 13px;
  }
`;

const EventAddress = styled.p`
  font-size: 14.5px;
  color: #808080;
  margin: 6px 0;

  @media (max-width: 554px) {
    font-size: 13px;
  }
`;

const EventDescriptionRow = styled.div`
  font-size: 14.5px;
  color: #808080;
  margin: 6px 0;
  display: flex;
  align-items: center;

  @media (max-width: 554px) {
    font-size: 13px;
  }
`;

const EventDescription = styled.span`
  font-size: 14.5px;
  color: #808080;

  @media (max-width: 554px) {
    font-size: 13px;
  }
`;

const EventDetailButton = styled.span`
  font-size: 14.5px;
  color: #808080;
  cursor: pointer;
  text-decoration: underline;
  margin-left: 5px;

  @media (max-width: 554px) {
    font-size: 13px;
  }
`;

const EventDate = styled.p`
  font-size: 15px;
  color: black;
  margin: 6px 0;

  @media (max-width: 554px) {
    font-size: 13px;
  }
`;

export default EventList;
