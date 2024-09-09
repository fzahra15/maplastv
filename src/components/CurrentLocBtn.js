import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const CurrentLocBtn = ({ map, setCurrentLocation }) => {
  const [marker, setMarker] = useState(null); // State to keep track of the marker
  console.log(map);

  const handleButtonClick = () => {
    if (!map) {
      console.error("Map instance is not available.");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setCurrentLocation([longitude, latitude]);

          map.flyTo({
            center: [longitude, latitude],
            essential: true,
            zoom: 14,
          });

          // If a marker already exists, remove it
          if (marker) {
            marker.remove();
          }

          // Create a new marker for the current location
          const currentLocationMarker = document.createElement('div');
          currentLocationMarker.className = 'current-location-marker';
          currentLocationMarker.style.backgroundImage = 'url(https://png.pngtree.com/png-vector/20230413/ourmid/pngtree-3d-location-icon-clipart-in-transparent-background-vector-png-image_6704161.png)';
          currentLocationMarker.style.width = '62px';
          currentLocationMarker.style.height = '62px';
          currentLocationMarker.style.backgroundPosition = 'center';
          currentLocationMarker.style.backgroundSize = 'contain';

          const newMarker = new mapboxgl.Marker(currentLocationMarker)
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML('<h3>Current Location</h3>'))
            .addTo(map);
          // Save the new marker to state
          setMarker(newMarker);
        },
        (error) => {
          console.error("Error getting current location", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <button className="current_location" onClick={handleButtonClick}>
      <i className="fa-solid fa-location-crosshairs"></i>
    </button>
  );
};

export default CurrentLocBtn;
