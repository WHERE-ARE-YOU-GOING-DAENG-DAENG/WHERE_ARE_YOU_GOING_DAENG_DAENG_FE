import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const CustomOverlay = ({ position, map, children }) => {
  const overlayRef = useRef(null);
  const containerRef = useRef(document.createElement("div"));

  useEffect(() => {
    if (!map || !window.google || !window.google.maps) return;

    const overlayView = new window.google.maps.OverlayView();

    overlayView.onAdd = () => {
      const panes = overlayView.getPanes();
      if (panes) {
        panes.overlayLayer.appendChild(containerRef.current);
      }
    };

    overlayView.draw = () => {
      const projection = overlayView.getProjection();
      if (!projection) return;

      const point = projection.fromLatLngToDivPixel(
        new window.google.maps.LatLng(position.lat, position.lng)
      );

      const container = containerRef.current;

      if (point && container) {   
        container.style.position = "absolute";
        container.style.left = `${point.x}px`;
        container.style.top = `${point.y}px`;
        container.style.transform = "translate(-50%, -50%)";
        container.style.display = "block";
      }
    };

    overlayView.onRemove = () => {
      if (containerRef.current) {
        const parentNode = containerRef.current.parentNode;
        if (parentNode && parentNode.contains(containerRef.current)) {
          parentNode.removeChild(containerRef.current);
        }
        containerRef.current = null;
      }
    };

    overlayView.setMap(map);
    overlayRef.current = overlayView;

    return () => {
      overlayView.setMap(null);
    };
  }, [map, position]);

  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.draw();
    }
  }, [position]);

  return map ? (
    <div ref={containerRef} style={{ display: "none" }}>
      {children}
    </div>
  ) : null;
};

CustomOverlay.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  map: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomOverlay;
