import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import markerIcon from "../../assets/icons/marker.svg";
import bookmarkerIcon from "../../assets/icons/bookmarker.svg"
import BookMarker from "../commons/BookMarker";
import { useGoogleMapsLoader } from "../../hooks/useGoogleMapLoader";
import CustomOverlay from "./CustomOverlay";
import useLocationStore from "../../stores/LocationStore";
const MapContainer = styled.div`
  width: 100%;
  height: ${({ $removeUi }) => ($removeUi ? "calc(100vh - 172px)" : "485px")};

  @media (max-width: 554px) {
    height: ${({ $removeUi }) => ($removeUi ? "calc(100vh - 173px)" : "385px")};
  }
`;

const Map = ({ data, removeUi, externalCenter }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const isLoaded = useGoogleMapsLoader();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const setUserLocation = useLocationStore((state) => state.setUserLocation);

  useEffect(() => {
    if (isLoaded && !map) {
      const googleMap = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 15,
        disableDefaultUI: removeUi,
        mapTypeControl: !removeUi,
        fullscreenControl: !removeUi,
        zoomControl: true,
      });
      setMap(googleMap);
    }
  }, [isLoaded, map, center, removeUi]);

  // 외부에서 중심 좌표 업데이트
  useEffect(() => {
    if (map && externalCenter) {
      setCenter(externalCenter);
      map.setCenter(externalCenter);
    }
  }, [map, externalCenter]);

  // 현재 위치 실시간으로 추적 후 마커 추가
  const watchIdRef = useRef(null);

  useEffect(() => {
    if (isLoaded && map) {
      if (navigator.geolocation) {

        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
        }

        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            setCenter(location);
            map.setCenter(location);
            setUserLocation(location);
            console.log(location) //로그 삭제

            const currentLocationMarker = (
              <CustomOverlay
                key="current-location"
                position={location}
                map={map}
              >
                <BookMarker label="현재 위치" icon={markerIcon} />
              </CustomOverlay>
            );
            setCurrentLocation(currentLocationMarker);
          },
          (error) => console.error("Geolocation error:", error)
        );
      }
    };


  return () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };
}, [isLoaded, map, setUserLocation]);

 //다른 마커 표시
  useEffect(() => {
    if (isLoaded && map && data && data.length > 0) {

      setMarkers([]);

      const newMarkers = data.map((location) => (
        <CustomOverlay
          key={location.placeId}
          position={{ lat: location.latitude, lng: location.longitude }}
          map={map}
        >
          <BookMarker label={location.name} icon={bookmarkerIcon}/>
        </CustomOverlay>
      ));
      setMarkers(newMarkers);
    }else {
      // 데이터가 없으면 마커 비우기
      setMarkers([]);
    }
  }, [isLoaded, map, data])

  return (
    <MapContainer ref={mapRef} $data={data} $removeUi={removeUi}>
      {!isLoaded && <div>구글 맵 로딩 중...</div>}
      {currentLocation}
      {markers}
    </MapContainer>
  );
};

// PropTypes 정의
Map.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      favoriteId: PropTypes.number.isRequired,
      placeId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      streetAddresses: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      openHours: PropTypes.string.isRequired,
    })
  ),
  removeUi: PropTypes.bool,
};

export default Map;
