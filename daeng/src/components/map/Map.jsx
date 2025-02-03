import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import markerIcon from "../../assets/icons/marker.svg";
import bookmarkerIcon from "../../assets/icons/bookmarker.svg"
import BookMarker from "../commons/BookMarker";
import useGoogleMapsStore from "../../stores/useGoogleMapsStore";
import CustomOverlay from "./CustomOverlay";
import useLocationStore from "../../stores/useLocationStore";
import Loading from "../commons/Loading";
import { useNavigate } from "react-router-dom";
// import staticMap from "../../assets/icons/staticmap.png";

const Map = ({ data, removeUi, externalCenter, isLoading, onMapLoaded, isRecommend}) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const { isLoaded, loadGoogleMaps } = useGoogleMapsStore();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const userLocation = useLocationStore((state)=> state.userLocation);
  const setUserLocation = useLocationStore((state) => state.setUserLocation);
  const navigate = useNavigate();
  const [userInitiatedMove, setUserInitiatedMove] = useState(false);
  
  useEffect(() => {
    requestIdleCallback(() => {
      loadGoogleMaps();
    });
  }, []);

  useEffect(() => {
    if (isLoaded && !map) {
      const googleMap = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 15,
        disableDefaultUI: removeUi,
        mapTypeControl: !removeUi,
        fullscreenControl: !removeUi,
        zoomControl: true,
        gestureHandling: "greedy"
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
  
      if (userLocation.lat && userLocation.lng) {
        setCenter(userLocation);
        map.setCenter(userLocation);
  
        const initialLocationMarker = (
          <CustomOverlay
            key="initial-location"
            position={userLocation}
            map={map}
          >
            <BookMarker label="현재 위치" icon={markerIcon} />
          </CustomOverlay>
        );
        setCurrentLocation(initialLocationMarker);
      }
 
      if (navigator.geolocation) {
        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
        }
  
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: position.coords.accuracy,
            };

            if (
               location.accuracy < userLocation.accuracy &&
              (userLocation.lat !== location.lat || userLocation.lng !== location.lng)
            ) {
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
            }
          },
          (error) => {
            console.error("위치 추적 실패:", error.message);
          },
          {
            enableHighAccuracy: true,
          }
        );
      }
    }
  
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [map, isLoaded, setUserLocation]);
  
  useEffect(() => {
  if (isLoaded && map) {
    markers.forEach((marker) => marker.onRemove && marker.onRemove());
    
    setMarkers([]);
    if (data && data.length > 0) {
      setUserInitiatedMove(false);
      const newMarkers = data.map((location) => (
        <CustomOverlay
          key={location.placeId}
          position={{ lat: location.latitude, lng: location.longitude }}
          map={map}
        >
          <BookMarker label={location.name} icon={bookmarkerIcon} onClick={()=> navigate(`/search/${location.placeId}`)}/>
        </CustomOverlay>
      ));
      setMarkers(newMarkers);
    }
  }
}, [isLoaded, map, data]);

useEffect(() => {
  if (map && markers.length > 0 && !isRecommend && data && data.length > 0 && !userInitiatedMove) {
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
}, [map, markers, data, userInitiatedMove, isRecommend]);

useEffect(() => {
  if (map) {
    map.addListener("dragstart", () => setUserInitiatedMove(true));
  }
}, [map]);
  
const staticMap = "/staticmap.png";

  return (
    <MapContainer ref={mapRef} $data={data} $removeUi={removeUi}>
      {!isLoaded || isLoading ? (
        <LoadingWrapper>
          <LoadingImage src={staticMap} alt="로딩 중 지도"/>
          <LoadingText>지도를 불러오는 중...</LoadingText>
        </LoadingWrapper>  
      ):(
        <>
          {currentLocation}
          {markers}
        </>
      )}
      
    </MapContainer>
  );
};

const MapContainer = styled.div`
  width: 100%;
  height: ${({ $removeUi }) => ($removeUi ? "calc(100vh - 160px)" : "485px")};
  display: flex;
  @media (max-width: 554px) {
    height: ${({ $removeUi }) => ($removeUi ? "calc(100vh - 150px)" : "385px")};
  }
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: ${({ $removeUi }) => ($removeUi ? "calc(100vh - 160px)" : "485px")};
  display: flex;
  @media (max-width: 554px) {
    height: ${({ $removeUi }) => ($removeUi ? "calc(100vh - 150px)" : "385px")};
  }
`;

const LoadingImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LoadingText = styled.div`
  position: absolute;
  bottom: 20px;
  font-size: 16px;
  color: #333;
  background: rgba(255, 255, 255, 0.8);
  padding: 8px 12px;
  border-radius: 8px;
`;

export default Map;
