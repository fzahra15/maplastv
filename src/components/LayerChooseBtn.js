import React, { useState } from 'react';

import img from "../img/images.jpeg"
import img2 from "../img/download.jpeg"
function LayerChooseBtn({ onStyleChange }) {  // Accept a prop to handle style changes
  const [isLayerMenuVisible, setIsLayerMenuVisible] = useState(false);

  const toggleLayerMenu = () => {
    setIsLayerMenuVisible(!isLayerMenuVisible);
  };

  return (
    <div className="layers">
      <button className="satelites" onClick={toggleLayerMenu}>
        <i className="fa-solid fa-layer-group"></i>
      </button>
      <div className="check_layer" style={{ display: isLayerMenuVisible ? 'flex' : 'none' }}>
        <div className="layer_cont">
          <button onClick={() => onStyleChange('mapbox://styles/mapbox/outdoors-v11')}>
            <img src={img2} alt="Outdoor" />
          </button>
          <h4>Outdoor</h4>
        </div>
        <div className="layer_cont">
          <button onClick={() => onStyleChange('mapbox://styles/fzara/clxsrqq0l004801pfhin6ff3a')}>
            <img src={img} alt="Map" />
          </button>
          <h4>Map</h4>
        </div>
      </div>
    </div>
  );
}

export default LayerChooseBtn;
