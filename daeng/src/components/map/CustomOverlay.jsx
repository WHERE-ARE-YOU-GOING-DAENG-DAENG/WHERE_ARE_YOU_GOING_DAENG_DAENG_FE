import ReactDOM from "react-dom/client";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const CustomOverlay = ({ position, map, children }) => {
  const overlayRef = useRef(null);
  const containerRef = useRef(document.createElement("div"));
  const rootRef = useRef(null);

  useEffect(() => {
    if (!map || !window.google || !window.google.maps) return;

    const overlayView = new window.google.maps.OverlayView();

    overlayView.onAdd = () => {
      const panes = overlayView.getPanes();
      if (panes) {
        panes.overlayMouseTarget.appendChild(containerRef.current);
      }

      if (!rootRef.current) {
        rootRef.current = ReactDOM.createRoot(containerRef.current);
      }
      rootRef.current.render(children);
    };

    overlayView.draw = () => {
      const projection = overlayView.getProjection();
      if (!projection) return;

      const point = projection.fromLatLngToDivPixel(
        new window.google.maps.LatLng(position.lat, position.lng)
      );

      if (point) {
        const container = containerRef.current;
        container.style.position = "absolute";
        container.style.left = `${point.x}px`;
        container.style.top = `${point.y}px`;
        container.style.transform = "translate(-50%, -50%)";
        container.style.display = "block";
      }
    };

    overlayView.onRemove = () => {
      if (rootRef.current) {
        setTimeout(() => {
          rootRef.current.unmount();
          rootRef.current = null;
        }, 0);
      }
    
      if (
        containerRef.current &&
        containerRef.current.parentNode &&
        containerRef.current.parentNode.contains(containerRef.current)
      ) {
        containerRef.current.parentNode.removeChild(containerRef.current);
      }
    };

    overlayView.setMap(map);
    overlayRef.current = overlayView;

    return () => {
      overlayView.setMap(null);
    };
  }, [map, position, children]);

  return null;
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
