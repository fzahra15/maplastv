import React from 'react';

function CloseLocContainer({ closestLocations, handleIconClick }) {
  return (
    <div className="close_loc_container">
      {closestLocations.length > 0 ? (
        closestLocations.map((data, index) => (
          <div key={index} className="card">
            <div className="card_inner">
              <i
                className="fa-solid fa-location-dot"
                onClick={() => handleIconClick(data.coordinates)} // Zoom to location on click
                style={{ cursor: 'pointer' }} // Change cursor to pointer to indicate it's clickable
              ></i>
              <h3>{data.name}</h3>
              <p>{`${data.distance.toFixed(2)} km`}</p> {/* Display distance if needed */}
            </div>
          </div>
        ))
      ) : (
        <p>No closest locations found.</p> // Message when no locations are found
      )}
    </div>
  );
}

export default CloseLocContainer;
