import { useEffect, useRef, useState } from 'react';
import Loading from "../commons/Loading";
import styled from "styled-components";
import geojson from "../../data/sig.json";
import useGoogleMapsStore from '../../stores/useGoogleMapsStore';
import useLocationStore from '../../stores/useLocationStore';

const MapContainer = styled.div`
  width: 100%;
  height: ${({ $removeUi }) => ($removeUi ? "calc(100vh - 160px)" : "485px")};
  display: flex;
  @media (max-width: 554px) {
    height: ${({ $removeUi }) => ($removeUi ? "calc(100vh - 150px)" : "385px")};
  }
`;

const HopscotchMap = ({ removeUi }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const { isLoaded } = useGoogleMapsStore();
    const userLocation = useLocationStore((state) => state.userLocation);
    
    useEffect(() => {
      if (isLoaded && !map) {
        const center =
        userLocation.lat === 0.0 && userLocation.lng === 0.0
          ? { lat: 37.5665, lng: 126.978 } // 서울 중심
          : userLocation;

        const googleMap = new window.google.maps.Map(mapRef.current, {
          center, // 서울 중심
          zoom: 12,
          disableDefaultUI: removeUi,
        });
        setMap(googleMap);
      }
    }, [isLoaded, map, removeUi]);
  
    useEffect(() => {
      if (map && isLoaded) {
        const polygons = []; // 생성된 다각형들을 저장
    
        geojson.features.forEach((feature) => {
          const geometryType = feature.geometry.type;
          const coordinatesList =
            geometryType === "MultiPolygon"
              ? feature.geometry.coordinates
              : [feature.geometry.coordinates];
    
          coordinatesList.forEach((polygonCoordinates) => {
            const coordinates = polygonCoordinates[0].map((coord) => ({
              lat: coord[1],
              lng: coord[0],
            }));
    
            const name = feature.properties.SIG_KOR_NM;
    
            // 다각형 생성
            const polygon = new window.google.maps.Polygon({
              paths: coordinates,
              strokeColor: "#55D4FF",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#fff",
              fillOpacity: 0.7,
            });
    
            polygon.setMap(map);
            polygons.push(polygon);
    
            // 다각형에 마우스 오버 이벤트 추가
            polygon.addListener("mouseover", () => {
              polygon.setOptions({ fillColor: "#55D4FF" });
            });
    
            polygon.addListener("mouseout", () => {
              polygon.setOptions({ fillColor: "#fff" });
            });
    
            // 클릭 시 인포윈도우 표시
            polygon.addListener("click", (event) => {
              const infoWindow = new window.google.maps.InfoWindow({
                position: event.latLng,
                content: `<div><strong>${name}</strong></div>`,
              });
              infoWindow.open(map);
            });
          });
        });
    
        return () => {
          // 컴포넌트 언마운트 시 다각형 제거
          polygons.forEach((polygon) => polygon.setMap(null));
        };
      }
    }, [map, isLoaded]);    
  
    return (
      <MapContainer ref={mapRef} $removeUi={removeUi}>
        {!isLoaded && <Loading label="지도 로딩 중..." />}
      </MapContainer>
    );
};

export default HopscotchMap;
