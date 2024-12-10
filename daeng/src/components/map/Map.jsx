import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import markerIcon from "../../assets/icons/marker.svg";
import bookmarkerIcon from "../../assets/icons/bookmarker.svg"
import BookMarker from "../commons/BookMarker";
import useGoogleMapsStore from "../../stores/useGoogleMapsStore";
import CustomOverlay from "./CustomOverlay";
import AlertDialog from "../../components/commons/SweetAlert";
import useLocationStore from "../../stores/useLocationStore";
import Loading from "../commons/Loading";

const MapContainer = styled.div`
  width: 100%;
  height: ${({ $removeUi }) => ($removeUi ? "calc(100vh - 160px)" : "485px")};
  display: flex;
  @media (max-width: 554px) {
    height: ${({ $removeUi }) => ($removeUi ? "calc(100vh - 150px)" : "385px")};
  }
`;

const Map = ({ data, removeUi, externalCenter, isLoading, onMapLoaded }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const { isLoaded } = useGoogleMapsStore();
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
      onMapLoaded(true);
    }
  }, [isLoaded, map, center, removeUi]);

  useEffect(() => {
    if (map && externalCenter) {
      setCenter(externalCenter);
      map.setCenter(externalCenter);
    }
  }, [map, externalCenter]);

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
          (error) => {
            if (error.response) {
              AlertDialog({
                  mode: "alert",
                  title: "위치 추적 실패",
                  text: "현재 위치를 확인할 수 없습니다",
                  confirmText: "확인",
              });
            }
          }
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

 useEffect(() => {
  if (isLoaded && map) {
    markers.forEach((marker) => marker.onRemove && marker.onRemove());
    setMarkers([]);

    if (data && data.length > 0) {
      const newMarkers = data.map((location) => (
        <CustomOverlay
          key={location.placeId}
          position={{ lat: location.latitude, lng: location.longitude }}
          map={map}
        >
          <BookMarker label={location.name} icon={bookmarkerIcon} />
        </CustomOverlay>
      ));
      setMarkers(newMarkers);
    }
  }
}, [isLoaded, map, data]);

useEffect(() => {
  if (map && markers.length > 0 && data && data.length > 0) {
    const firstLocation = data[0];
    if (firstLocation.latitude && firstLocation.longitude) {
      const firstMarkerPosition = {
        lat: firstLocation.latitude,
        lng: firstLocation.longitude,
      };
      setCenter(firstMarkerPosition);
      map.setCenter(firstMarkerPosition);
    } else {
      console.warn("Invalid location data:", firstLocation);
    }
  }
}, [map, markers, data]);

  return (
    <MapContainer ref={mapRef} $data={data} $removeUi={removeUi}>
      {!isLoaded || isLoading ? (<Loading label={isLoaded ? "결과를 불러오는 중..." : "지도 로딩 중..."} />):(
        <>
          {currentLocation}
          {markers}
        </>
      )}
      
    </MapContainer>
  );
};

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
