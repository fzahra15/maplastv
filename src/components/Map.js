import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Ensure this line is present

const Map = ({ mapContainerRef }) => {
  return <div ref={mapContainerRef} className="map-container" style={{ height: '100vh' }} />;
};

export default Map;
