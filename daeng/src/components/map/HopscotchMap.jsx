import { useEffect, useRef, useState } from 'react';
import { createRoot } from "react-dom/client";
import Loading from "../commons/Loading";
import styled from "styled-components";
import geojson from "../../data/sig.json";
import useGoogleMapsStore from '../../stores/useGoogleMapsStore';
import useLocationStore from '../../stores/useLocationStore';
import LandOwnerProfile from "../../components/map/LandOwnerProfile";
import CustomOverlay from "./CustomOverlay";

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
    const [overlayContent, setOverlayContent] = useState(null);

    useEffect(() => {
      if (isLoaded && !map) {
        const center =
        userLocation.lat === 0.0 && userLocation.lng === 0.0
          ? { lat: 37.5665, lng: 126.978 } // 서울 중심
          : userLocation;

        const googleMap = new window.google.maps.Map(mapRef.current, {
          center,
          zoom: 12,
          disableDefaultUI: removeUi,
        });
        setMap(googleMap);
      }
    }, [isLoaded, map, removeUi]);
  
    useEffect(() => {
      if (map && isLoaded) {
        const polygons = [];
        const infoWindow = new window.google.maps.InfoWindow({
          pixelOffset: new window.google.maps.Size(0, -10),
        });

        const observer = new MutationObserver(() => {
          const closeButton = document.querySelector(".gm-ui-hover-effect");
          if (closeButton) {
            closeButton.style.display = "none";
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });

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
              strokeColor: "#FF69A9",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#fff",
              fillOpacity: 0.7,
            });
    
            polygon.setMap(map);
            polygons.push(polygon);
    
            // 다각형에 마우스 오버 이벤트 추가
            polygon.addListener("mouseover", () => {
              polygon.setOptions({ fillColor: "#FF69A9" });
              // InfoWindow에 지역 이름 표시
              infoWindow.setContent(`<div style="font-size:14px; margin-left:5px;">${name}</div>`); // 지역 이름 설정
              infoWindow.setPosition({ lat: center.lat(), lng: center.lng() }); // 마우스 위치에 표시
              
              infoWindow.open(map);
              
            });
    
            polygon.addListener("mouseout", () => {
              polygon.setOptions({ fillColor: "#fff" });
              infoWindow.close();
            });
            
            const calculatePolygonCenter = (paths) => {
              const bounds = new window.google.maps.LatLngBounds();
              paths.forEach((path) => bounds.extend(path));
              return bounds.getCenter();
            };
            const center = calculatePolygonCenter(coordinates);
            
            polygon.addListener("click", () => {
              infoWindow.close();
              setOverlayContent(null);
              setTimeout(() => {
                setOverlayContent({
                  position: { lat: center.lat(), lng: center.lng() },
                  component: <LandOwnerProfile area={name} nickname="내가 진짜" pets={[
                    { id: 1, name: '강아지1'},
                    { id: 2, name: '고양이1'},
                    { id: 3, name: '강아지1'},
                  ]} />,
                });
              }, 0);
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
        {map && overlayContent && (
        <CustomOverlay
          map={map}
          position={overlayContent.position}
          offset={{ x: 0, y: -80 }}
        >
          {overlayContent.component}
        </CustomOverlay>
      )}
      </MapContainer>
    );
};

export default HopscotchMap;
