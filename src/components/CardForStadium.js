import React from 'react'

function CardForStadium({ data, index, handleCardClick, handleIconClick }) {
  const stadiumData = [
    {
      id: 1,
      name: "BLUE ZONE",
      coordinates: [49.918422582896, 40.433511768811201],
      type: "additional",
      openType: "bluezone"
    },
    {
      id: 2,
      name: "GREEN ZONE HUB",
      coordinates: [49.926972190510497, 40.434017633018897],
      type: "additional",
      openType: "greenzone"
    },
    {
      id: 3,
      name: "Park&Ride",
      coordinates: [49.91556961247558, 40.43760945957492],
      openType: "parknride"
    },
  ]
  return (<div className="card_main" key={index}>
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
      stadiumData.map((data, index) => {
        return (
          <div className="shuttle_card">
            <div className="shuttle_card_inner">
              <i
                className="fa-solid fa-location-dot"
                onClick={() => handleIconClick(data.coordinates)}
                style={{ cursor: 'pointer' }}
              ></i>
              <h3>{data.name}</h3>

            </div>
          </div>
        )
      })
    }


    {/* <div className="time_table">
      <h4>Time table:</h4>
      <p>6 am - 11 pm (Frequency - every 25 mins)</p>
      <p>11 pm - 6 am (Frequency - every 45 mins)</p>
    </div> */}
  </div>
  )
}

export default CardForStadium