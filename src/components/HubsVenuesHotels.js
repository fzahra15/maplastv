import React, { useState, useEffect } from 'react';
import CloseLocContainer from './CloseLocContainer';
import mapboxgl from 'mapbox-gl';
import MainCard from './MainCard';
import CardForAirport from './CardForAirport';
import CardForStadium from './CardForStadium';

function HubsVenuesHotels({ items, type, onShowRoute, map, locations }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [closestLocations, setClosestLocations] = useState([]);
  const [hubFilterTypes, setHubFilterTypes] = useState([]);
  const [closeLocActive, setCloseLocActive] = useState(null);
  const [activeButtonId, setActiveButtonId] = useState(null); // Track which "Closest hotels" button is active
  const [activeCardId, setActiveCardId] = useState(null); // Track the active card ID
  const [showClosestLocations, setShowClosestLocations] = useState(null); // Track which closest locations container is active
  const [airportClick, setAirportClick] = useState(null)

  const shuttleData = [
    {
      id: 33,
      name: "Express Airport Shuttle 2",
      coordinates: [49.918469965151097, 40.420016226333402],
      type: "shuttle",
      openType: "venues",
      description:
        "This location is from AIRPORT to the CITY",
    },
    {
      id: 34,
      name: "28 May Express Airport Shutlle",
      coordinates: [49.850814969055897, 40.379432887147097],
      type: "shuttle",
      openType: "venues",
      description:
        "This location is from CITY to the AIRPORT",
    },
    {
      id: 35,
      name: "Express Airport Shuttle 2",
      coordinates: [49.916739227595599, 40.422430433446699],
      type: "shuttle",
      openType: "venues",
      description:
        "This location is from CITY to the AIRPORT",
    },
  ];

  useEffect(() => {
    if (map) {
      map.on('zoom', () => {
        const currentZoom = map.getZoom();
        if (currentZoom > 14) {
          showLocationNames(true); // Show names when zoomed in
        } else {
          showLocationNames(false); // Hide names when zoomed out
        }
      });
    }

    return () => {
      if (map) {
        map.off('zoom');
      }
    };
  }, [map]);

  const showLocationNames = (show) => {
    locations.forEach(location => {
      if (typeof location.id === 'string' && map.getLayer(location.id)) {
        map.setLayoutProperty(location.id, 'visibility', show ? 'visible' : 'none');
      }
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const findClosestLocations = (location) => {
    const radius = 1; // 1 km radius
    const [lat1, lon1] = location.coordinates;

    const closest = locations
      .filter(item => {
        if ((location.openType === 'hub' && item.openType === 'hotel') ||
          (location.openType === 'hotel' && item.openType === 'hub')) {
          const [lat2, lon2] = item.coordinates;
          const distance = calculateDistance(lat1, lon1, lat2, lon2);
          return distance <= radius;
        }
        return false;
      })
      .map(item => {
        const [lat2, lon2] = item.coordinates;
        const distance = calculateDistance(lat1, lon1, lat2, lon2);
        return { ...item, distance }; // Add distance to each item
      });

    return closest;
  };

  const handleIconClick = (coordinates) => {
    if (map) {
      map.flyTo({
        center: coordinates,
        zoom: 15,
        essential: true
      });
    }
  };

  const handleFindClosestLocations = (location, coordinates) => {
    // Toggle the closest locations container
    if (showClosestLocations === location.id) {
      setShowClosestLocations(null); // Close the container if clicked again
      setCloseLocActive(false); // Close the side container
    } else {
      setSelectedLocation(location);
      setActiveButtonId(location.id);
      const closest = findClosestLocations(location);
      setClosestLocations(closest);
      setShowClosestLocations(location.id); // Open the container for the clicked location
      setCloseLocActive(true); // Open the side container

      if (map) {
        // Zoom to clicked location
        map.flyTo({
          center: coordinates,
          zoom: 15,
          essential: true
        });

        // Create popup for clicked location
        new mapboxgl.Popup({ offset: 25 })
          .setLngLat(location.coordinates)
          .setHTML(`<h3 style="margin: 0; font-size: 18px; color: #006A74; font-weight: 300;">${location.name}</h3>`)
          .addTo(map);

        // Create popups for closest locations
        closest.forEach(closestLocation => {
          new mapboxgl.Popup({ offset: 25 })
            .setLngLat(closestLocation.coordinates)
            .setHTML(`<h3 style="margin: 0; font-size: 18px; color: #006A74; font-weight: 300;">${closestLocation.name}</h3>`)
            .addTo(map);
        });
      }
    }
  };

  const handleFilterClick = (filterType) => {
    setHubFilterTypes(prevTypes =>
      prevTypes.includes(filterType)
        ? prevTypes.filter(type => type !== filterType)
        : [...prevTypes, filterType]
    );
  };

  // Toggle card active state on click
  const handleCardClick = (id) => {
    if (showClosestLocations === id) {
      // Prevent operational hours from toggling when closest locations are active
      return;
    }
    setActiveCardId(prevActiveId => (prevActiveId === id ? null : id)); // Toggle card visibility
  };


  const filteredItems = hubFilterTypes.length > 0
    ? items.filter(data => data.openType === type.slice(0, -1) && hubFilterTypes.includes(data.type))
    : items.filter(data => data.openType === type.slice(0, -1));

  return (
    <div className="main-container">
      <div className="hubs_venues_hotels">
        {type === "hubs" && (
          <div className="hub_venues_hotels_filter_buttons">
            {['hub', 'loadzone', 'pickup', 'dropoff'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => handleFilterClick(filterType)}
                style={{
                  backgroundColor: hubFilterTypes.includes(filterType) ? '#016871' : 'transparent',
                  color: hubFilterTypes.includes(filterType) ? '#FFFFFF' : 'black'
                }}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1).replace('_', ' ')}
              </button>
            ))}
          </div>
        )}

        {filteredItems.map((data, index) => {
          if (data.id == 79) {
            return (
              <CardForAirport key={index} map={map} data={data} index={index}
                handleCardClick={handleCardClick}
                handleIconClick={handleIconClick}
                handleFindClosestLocations={handleFindClosestLocations}
                activeCardId={activeCardId}
                activeButtonId={activeButtonId}
                shuttleData={shuttleData} />
            )
          } else if (data.id == 80) {
            return (
              <CardForStadium key={index}
                data={data}
                handleCardClick={handleCardClick}
                handleIconClick={handleIconClick}
                handleFindClosestLocations={handleFindClosestLocations}
                activeCardId={activeCardId}
                activeButtonId={activeButtonId}
              />
            )
          } else {
            return (
              <MainCard map={map} data={data} index={index}
                handleCardClick={handleCardClick}
                handleIconClick={handleIconClick}
                handleFindClosestLocations={handleFindClosestLocations}
                activeCardId={activeCardId}
                activeButtonId={activeButtonId} />
            )
          }


        })}
      </div>

      {closeLocActive && (
        <div className="side-by-side-container">
          <div className="selected_location_container">
            {/* Additional details or components can be added here */}
          </div>
          <div className="close_loc_container_wrapper">
            <CloseLocContainer
              handleIconClick={handleIconClick}
              closestLocations={closestLocations}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HubsVenuesHotels;
