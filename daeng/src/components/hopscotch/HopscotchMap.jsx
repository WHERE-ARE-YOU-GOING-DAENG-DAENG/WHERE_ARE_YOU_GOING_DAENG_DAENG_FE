import { useEffect, useRef, useState } from 'react';
import { createRoot } from "react-dom/client";
import Loading from "../commons/Loading";
import styled from "styled-components";
import geojson from "../../data/sig.json";
import useGoogleMapsStore from '../../stores/useGoogleMapsStore';
import useLocationStore from '../../stores/useLocationStore';
import LandOwnerProfile from "./LandOwnerProfile";
import CustomOverlay from "../../components/map/CustomOverlay";
import markerIcon from "../../assets/icons/marker.svg";
import axios from "axios";

const MapContainer = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
`;

const HopscotchMap = ({ removeUi, setSelectedArea }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const { isLoaded } = useGoogleMapsStore();
    const userLocation = useLocationStore((state) => state.userLocation);
    const [overlayContent, setOverlayContent] = useState(null);
    const [ownerList, setOwnerList] = useState({ visitInfo: {} });
    const [isOwnerListLoaded, setIsOwnerListLoaded] = useState(false);
    const [markers, setMarkers] = useState([]);

    useEffect(()=>{
      fetchOwnerData();
    },[])

    const fetchOwnerData = async() => {
      try{
        const response = await axios.get("https://dev.daengdaeng-where.link/api/v2/region/owners",{
          withCredentials: true
        });
        setOwnerList(response.data.data);
        setIsOwnerListLoaded(true);
      }catch(error){
        console.error("땅 주인 목록을 조회할 수 없습니다",error)
      }
    };

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
      if (isLoaded && map && isOwnerListLoaded) {
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
    
        // subregion 별로 가장 큰 폴리곤 저장
        const subRegionLargestPolygons = {};
    
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
    
            const region = feature.properties.CTP_KOR_NM;
            const subRegion = feature.properties.SIG_KOR_NM;
    
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
    
            
            const area = window.google.maps.geometry.spherical.computeArea(
              polygon.getPath()
            );
    
            
            const key = `${region}-${subRegion}`;
            if (!subRegionLargestPolygons[key] || subRegionLargestPolygons[key].area < area) {
              subRegionLargestPolygons[key] = { polygon, coordinates, area };
            }
          });
        });
    
          Object.keys(subRegionLargestPolygons).forEach((key) => {
          const { polygon, coordinates } = subRegionLargestPolygons[key];
          const [region, subRegion] = key.split("-");

          const calculatePolygonCenter = (paths) => {
            const bounds = new window.google.maps.LatLngBounds();
            paths.forEach((path) => {
              bounds.extend(new window.google.maps.LatLng(path.lat, path.lng));
            });
            return bounds.getCenter();
          };

          const center = calculatePolygonCenter(coordinates);
    
          const owner = ownerList.visitInfo?.[region]?.[subRegion] || null;
    
          if (owner) {
            const marker = new window.google.maps.Marker({
              position: center,
              map,
              icon: markerIcon,
            });
            setMarkers((prev) => [...prev, { marker, region, subRegion }]);
          }
    
          polygon.addListener("mouseover", () => {
            polygon.setOptions({ fillColor: "#FF69A9" });
            infoWindow.setContent(
              `<div style="font-size:14px; margin-left:5px;">${region} ${subRegion}</div>`
            );
            infoWindow.setPosition({ lat: center.lat(), lng: center.lng() });
    
            infoWindow.open(map);
          });
    
          polygon.addListener("mouseout", () => {
            polygon.setOptions({ fillColor: "#fff" });
            infoWindow.close();
          });
    
          polygon.addListener("click", () => {
            infoWindow.close();
            map.panTo(center);
    
            const regionOwner =
              ownerList.visitInfo?.[region]?.[subRegion] || null;
    
            const ownerInfo = regionOwner
              ? {
                  nickname: regionOwner.nickname,
                  hops: regionOwner.count,
                  pets: regionOwner.pets,
                }
              : {
                  nickname: null,
                  hops: 0,
                  pets: [],
                };
    
            setSelectedArea([region, subRegion, regionOwner?.count]);
            setOverlayContent(null);
    
            setTimeout(() => {
              setOverlayContent({
                position: { lat: center.lat(), lng: center.lng() },
                component: (
                  <LandOwnerProfile
                    area={`${region} ${subRegion}`}
                    nickname={ownerInfo.nickname}
                    hops={ownerInfo.hops}
                    pets={ownerInfo.pets}
                  />
                ),
                offset: ownerInfo.nickname ? { x: 0, y: -80 } : { x: 0, y: -40 },
              });
            }, 0);
          });
        });
    
        return () => {
          polygons.forEach((polygon) => polygon.setMap(null));
        };
      }
    }, [map, isLoaded, isOwnerListLoaded]);
      
  
    return (
      <MapContainer ref={mapRef} $removeUi={removeUi}>
        {!isLoaded && <Loading label="지도 로딩 중..." />}
        {map && overlayContent && (
        <CustomOverlay
          map={map}
          position={overlayContent.position}
          offset={overlayContent.offset}
        >
          {overlayContent.component}
        </CustomOverlay>
      )}
      </MapContainer>
    );
};

export default HopscotchMap;
