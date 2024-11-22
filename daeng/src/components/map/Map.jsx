import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import markerIcon from "../../assets/icons/marker.svg";
import bookmarkerIcon from "../../assets/icons/bookmarker.svg"
import BookMarker from "../commons/BookMarker";
import { useGoogleMapsLoader } from "../../hooks/useGoogleMapLoader";
import CustomOverlay from "./CustomOverlay";

const MapContainer = styled.div`
  width: 100%;
  height: ${({ $data }) => ($data && $data.length > 0 ? "100vh" : "485px")};

  @media (max-width: 554px) {
    height: ${({ $data }) => ($data && $data.length > 0 ? "100vh" : "385px")};
  }
`;

const Map = ({ searchQuery, onResults, data }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const isLoaded = useGoogleMapsLoader();
  const [markers, setMarkers] = useState([]); // 마커 리스트 관리
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 }); // 초기 위치 (서울)

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

            const currentLocationMarker = (
              <CustomOverlay
                key="current-location"
                position={userLocation}
                map={googleMap}
              >
                <BookMarker label="현재 위치" icon={markerIcon} />
              </CustomOverlay>
            );
      
            // 기존 마커에 현재 위치 추가
            setMarkers((prevMarkers) => [...prevMarkers, currentLocationMarker]);
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      }
    }
  }, [isLoaded]);

  // 검색 결과 표시 -> API 연결시 어차피 바꿔야해서 주석처리 해놓겠습니다
  useEffect(() => {
    // if (isLoaded && map && searchQuery) {
    //   const service = new window.google.maps.places.PlacesService(map);

    //   const request = {
    //     query: searchQuery,
    //     fields: ["name", "formatted_address", "geometry", "photos"],
    //   };

    //   // 이전 마커 제거
    //   markers.forEach((marker) => marker.setMap(null));
    //   setMarkers([]); 

    //   service.textSearch(request, (results, status) => {
    //     if (status === window.google.maps.places.PlacesServiceStatus.OK) {
    //       if (onResults) {
    //         onResults(results); // 부모 컴포넌트로 검색 결과 전달
    //       }

    //       const newMarkers = results.map((place, index) => {
    //         if (place.geometry && place.geometry.location) {
    //           const position = {
    //             lat: place.geometry.location.lat(),
    //             lng: place.geometry.location.lng(),
    //           };
    //           console.log(position)
    //           return (
    //             <CustomOverlay
    //               key={`search-result-${index}`}
    //               position={position}
    //               map={map}
    //             >
    //               <BookMarker label={place.name} icon={markerIcon} />
    //             </CustomOverlay>
    //           );
    //         }
    //         return null;
    //       });

    //       setMarkers(newMarkers);

    //       // 지도 중심 이동
    //       if (results[0] && results[0].geometry) {
    //         map.setCenter(results[0].geometry.location);
    //       }
    //     } else {
    //       console.error("검색 결과가 없습니다.");
    //     }
    //   });
    // }
  }, [isLoaded, map, searchQuery]);

  // bookMark 데이터를 기반으로 마커 추가, 검색도 나중에 이거 쓰면될듯
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
    <MapContainer ref={mapRef} $data={data}>
      {!isLoaded && <div>구글 맵 로딩 중...</div>}
      {markers}
    </MapContainer>
  );
};

// PropTypes 정의
Map.propTypes = {
  searchQuery: PropTypes.string,
  onResults: PropTypes.func,
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
};

export default Map;
