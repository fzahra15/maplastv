import React from 'react'

function CardForAirport({map, data, index, handleCardClick, handleFindClosestLocations, shuttleData, activeButtonId }) {
    const handleIconClick = (coordinates) => {
        if (map) {
          map.flyTo({
            center: coordinates,
            zoom: 15,
            essential: true
          });
        }
      };
    
    return (
        <div className="card_main" key={index}>
            <div className="card" onClick={() => handleCardClick(data.id)}>
                <div className="card_inner">
                    <i
                        className="fa-solid fa-location-dot"
                        onClick={() => handleIconClick(data.coordinates)}
                        style={{ cursor: 'pointer' }}
                    ></i>
                    <h3>{data.name}</h3>
                </div>
                {/* <button
                    style={{
                        backgroundColor: activeButtonId === data.id ? '#016871' : 'transparent',
                        color: activeButtonId === data.id ? '#FFFFFF' : 'black',
                    }}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering card click event
                        handleFindClosestLocations(data, data.coordinates);
                    }}
                >
                    {data.openType === "hub" ? `Closest hotels` : "Closest hubs"}
                </button> */}


            </div>
            {
                shuttleData.map((data, index) => {
                    return (
                        <div key={index} className='shuttle_card'>
                            <div className="shuttle_card_inner">
                                <i
                                    className="fa-solid fa-location-dot"
                                    onClick={() => handleIconClick(data.coordinates)}
                                    style={{ cursor: 'pointer' }}
                                ></i>
                                <h3>{data.name}</h3>
                                {/* <p>{data.description}</p> */}
                            </div>
                            <p>{data.description}</p>
                        </div>
                    )
                })
            }

            <div className="time_table">
                <h4>Time table:</h4>
                <p>6 am - 11 pm (Frequency - every 25 mins)</p>
                <p>11 pm - 6 am (Frequency - every 45 mins)</p>
            </div>
        </div>
    )
}

export default CardForAirport