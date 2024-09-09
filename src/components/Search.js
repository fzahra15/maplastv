import React, { useState } from 'react';
import img from '../img/Дизайн без названия (4).png';

function Search({ locations, onSearchResults }) {
  const [query, setQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]); // State to store filtered locations
  const [visible, setVisible] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.trim() === '') {
      // If input is empty, clear the filtered locations and hide results
      setFilteredLocations([]);
      onSearchResults([]); // Clear the results in the parent component
      setVisible(false);
      return;
    }

    // Filter locations based on the query matching either the name or the type (hotel or hub)
    const filtered = locations.filter(location => {
      const name = location.name ? location.name.toLowerCase() : ''; // Check if name exists
      const type = location.openType ? location.openType.toLowerCase() : ''; // Check if openType exists

      const matchesName = name.includes(value);
      const matchesType = type.includes(value);
      return matchesName || matchesType;
    });

    console.log("Filtered Locations:", filtered); // Debugging log

    setFilteredLocations(filtered); // Update the state with filtered locations
    onSearchResults(filtered); // Pass filtered locations back to the parent component
    setVisible(filtered.length > 0); // Show results only if there are any
  };

  return (
    <div className="search_div">
      <div className="search">
        <img src={img} alt="Search Icon" />
        <input
          type="search"
          value={query}
          onChange={handleInputChange}
          placeholder="Search locations..."
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      {visible && (
        <div className="searched_data">
          {filteredLocations.map((location, index) => (
            <div key={index} className="searched_card">
              <div className="card_left">
                <i className="fa-solid fa-location-dot"></i>
                <h5>{location.name}</h5> {/* Display the location name */}
              </div>
              <button className="card_right">
                <i class="fa-solid fa-route"></i>
                {/* // <p>Get directions</p> */}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
// import React, { useState, useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

// mapboxgl.accessToken = 'your-mapbox-access-token'; // Replace with your Mapbox token

// function Search({ locations, map }) {
//   const [startLocation, setStartLocation] = useState(null); // To store the start location
//   const [endLocation, setEndLocation] = useState(''); // To store user input for the end location
//   const [endLocationCoordinates, setEndLocationCoordinates] = useState(null); // End location coordinates
//   const [filteredEndLocations, setFilteredEndLocations] = useState([]); // Filtered locations for end location
//   const directionsRef = useRef(null);
//   const [directionsInitialized, setDirectionsInitialized] = useState(false);

//   // Initialize the directions control when the map loads
//   useEffect(() => {
//     if (map && !directionsRef.current) {
//       directionsRef.current = new MapboxDirections({
//         accessToken: mapboxgl.accessToken,
//         unit: 'metric',
//         profile: 'mapbox/driving',
//         alternatives: false,
//         geometries: 'geojson',
//       });
//       map.addControl(directionsRef.current, 'top-left');
//       setDirectionsInitialized(true); // Set state to indicate initialization
//     }
//   }, [map]);

//   const checkDirectionsInitialized = () => {
//     if (!directionsInitialized) {
//       console.error('Directions control is not initialized yet.');
//       return false;
//     }
//     return true;
//   };

//   // Handle click for start location (click the icon)
//   const handleStartLocationClick = (location) => {
//     if (checkDirectionsInitialized()) {
//       setStartLocation(location);
//       directionsRef.current.setOrigin(location.coordinates); // Set clicked location as start
//       new mapboxgl.Marker({ color: 'green' })
//         .setLngLat(location.coordinates)
//         .addTo(map); // Show marker on start location
//     }
//   };

//   // Handle the input change for the end location
//   const handleEndLocationInput = (e) => {
//     const value = e.target.value.toLowerCase();
//     setEndLocation(value);

//     if (value.trim() === '') {
//       setFilteredEndLocations([]); // Clear if input is empty
//       return;
//     }

//     // Filter locations by name or type
//     const filtered = locations.filter((location) => {
//       const name = location.name ? location.name.toLowerCase() : '';
//       const type = location.openType ? location.openType.toLowerCase() : '';
//       return name.includes(value) || type.includes(value);
//     });

//     setFilteredEndLocations(filtered);
//   };

//   // Handle selection of an end location from filtered results
//   const handleEndLocationSelect = (location) => {
//     setEndLocationCoordinates(location.coordinates); // Set coordinates for the end location
//     setEndLocation(location.name); // Set input value to the selected location's name
//   };

//   // Handle "Get Directions" click
//   const handleGetDirections = () => {
//     if (!startLocation || !endLocationCoordinates) {
//       alert('Please select both a start and an end location.');
//       return;
//     }

//     if (checkDirectionsInitialized()) {
//       directionsRef.current.setDestination(endLocationCoordinates); // Set end location
//       new mapboxgl.Marker({ color: 'red' })
//         .setLngLat(endLocationCoordinates)
//         .addTo(map); // Show marker on end location
//     }
//   };

//   return (
//     <div className="search-component">
//       <div className="search">
//         <h4>Find Route</h4>
//         <button
//           onClick={() => {
//             if (navigator.geolocation) {
//               navigator.geolocation.getCurrentPosition((position) => {
//                 const { latitude, longitude } = position.coords;
//                 const currentLocation = {
//                   coordinates: [longitude, latitude],
//                   name: 'Current Location',
//                 };
//                 handleStartLocationClick(currentLocation); // Set current location as start
//               });
//             }
//           }}
//         >
//           Use Current Location
//         </button>

//         <div className="start-location">
//           <label>Start Location:</label>
//           <input
//             type="text"
//             value={startLocation ? startLocation.name : 'Select start location'}
//             readOnly
//           />
//         </div>

//         <div className="end-location">
//           <label>End Location:</label>
//           <input
//             type="text"
//             value={endLocation}
//             onChange={handleEndLocationInput}
//             placeholder="Enter end location"
//           />
//           {filteredEndLocations.length > 0 && (
//             <div className="filtered-locations">
//               {filteredEndLocations.map((location, index) => (
//                 <div
//                   key={index}
//                   className="location-option"
//                   onClick={() => handleEndLocationSelect(location)}
//                 >
//                   {location.name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <button onClick={handleGetDirections}>Get Directions</button>
//       </div>

//       <div className="location-list">
//         {locations.map((location) => (
//           <div key={location.id} className="location-item">
//             <span>{location.name}</span>
//             <button onClick={() => handleStartLocationClick(location)}>
//               Set as Start Location
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Search;
