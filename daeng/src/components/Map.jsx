import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import markerIcon from "../assets/icons/marker.svg";

// Styled-components로 스타일 정의
const MapContainer = styled.div`
  width: 100%;
  height: 485px;
  margin-top: 17px;
  @media (max-width: 554px) {
    height: 385px;
  }
`;

const Map = ({ searchQuery, onResults }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [markers, setMarkers] = useState([]); // 마커 리스트 관리
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 }); // 초기 위치 (서울)

  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => console.error("구글 맵 로드에 실패하였습니다");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 지도 초기화
  useEffect(() => {
    if (isLoaded && !map) {
      const googleMap = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 15,
      });
      setMap(googleMap);

      // 현재 위치 가져오기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCenter(userLocation);
            googleMap.setCenter(userLocation);

            // 현재 위치에 마커 추가
            new window.google.maps.Marker({
              position: userLocation,
              map: googleMap,
              title: "현재 위치",
              icon: markerIcon,
            });
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      }
    }
  }, [isLoaded, map]);

  // 검색 결과 표시
  useEffect(() => {
    if (isLoaded && map && searchQuery) {
      const service = new window.google.maps.places.PlacesService(map);

      const request = {
        query: searchQuery,
        fields: ["name", "formatted_address", "geometry", "photos"],
      };

      // 이전 마커 제거
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]);

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          if (onResults) {
            onResults(results); // 부모 컴포넌트로 검색 결과 전달
          }

          const newMarkers = results.map((place) => {
            if (place.geometry && place.geometry.location) {
              const marker = new window.google.maps.Marker({
                position: place.geometry.location,
                map,
                title: place.name,
                icon: markerIcon,
              });
              return marker;
            }
            return null;
          }).filter(Boolean);

          // 새로운 마커 추가
          setMarkers(newMarkers);

          // 지도 중심 이동
          if (results[0] && results[0].geometry) {
            map.setCenter(results[0].geometry.location);
          }
        } else {
          console.error("검색 결과가 없습니다.");
        }
      });
    }
  }, [isLoaded, map, searchQuery]);

  return (
    <MapContainer ref={mapRef}>
      {!isLoaded && <div>구글 맵 로딩 중...</div>}
    </MapContainer>
  );
};

// PropTypes 정의
Map.propTypes = {
  searchQuery: PropTypes.string.isRequired, // 검색 쿼리는 필수
  onResults: PropTypes.func.isRequired,
};

export default Map;
