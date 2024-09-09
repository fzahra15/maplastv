import React, { useState } from 'react';
import Search from './Search';
import HubsVenuesHotels from './HubsVenuesHotels';

function SearchLocTypes({ locations, onShowRoute, startLocation, map }) {
  const [activeType, setActiveType] = useState(null);
  const [filteredLocations, setFilteredLocations] = useState(locations);

  const menuStyle = {
    left: startLocation == null ? '10%' : '120%', // Adjust to move into view or out of view
  };

  const handleTypeClick = (type) => {
    setActiveType((prevType) => (prevType === type ? null : type));
  };

  const handleSearchResults = (results) => {
    if (results.length === 0) {
      // Reset to original locations if search input is cleared
      setFilteredLocations(locations);
    } else {
      setFilteredLocations(results);
    }
  };

  const getButtonStyle = (type) => {
    return activeType === type
      ? { backgroundColor: '#016871', color: 'white' }
      : {};
  };

  const getTextStyle = (type) => {
    return activeType === type
      ? { color: 'white' }
      : {};
  };

  const getIconStyle = (type) => {
    return activeType === type
      ? { color: 'white' }
      : {};
  };




  const itemsToDisplay = activeType
    ? filteredLocations.filter((location) => location.openType === activeType.slice(0, -1))
    : filteredLocations;



  return (
    <div className="top_container">
      <div className="main_flex">
        {
          startLocation == null ? <Search locations={locations} onSearchResults={handleSearchResults} /> : ''
        }

        <div className="loc_type_style" style={menuStyle}>
          <nav className="loc_types">
            <button
              onClick={() => handleTypeClick('hubs')}
              className="loc_type_btns"
              style={getButtonStyle('hubs')}
            >
              <i className="fa-solid fa-location-dot hubIcon" style={getIconStyle('hubs')}></i>
              <h3 style={getTextStyle('hubs')}>Hubs</h3>
            </button>
            <button
              onClick={() => handleTypeClick('venues')}
              className="loc_type_btns"
              style={getButtonStyle('venues')}
            >
              <i className="fa-solid fa-location-dot" style={getIconStyle('venues')}></i>
              <h3 style={getTextStyle('venues')}>Venues</h3>
            </button>
            <button
              onClick={() => handleTypeClick('hotels')}
              className="loc_type_btns"
              style={getButtonStyle('hotels')}
            >
              <i className="fa-solid fa-hotel" style={getIconStyle('hotels')}></i>
              <h3 style={getTextStyle('hotels')}>Hotels</h3>
            </button>
          </nav>
        </div>
      </div>
      {activeType && <HubsVenuesHotels map={map} locations={locations} type={activeType} items={itemsToDisplay} onShowRoute={onShowRoute} />}
    </div>
  );
}

export default SearchLocTypes;
