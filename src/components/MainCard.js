import React from 'react'

function MainCard({map={map},data,index,handleCardClick,handleIconClick,handleFindClosestLocations,activeCardId,activeButtonId}) {
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
                <button
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
                </button>

            </div>
            {activeCardId === data.id && data.openType === "hub" && (
                <p>! Operational hours from 7 am - 11 pm</p> // This will toggle visibility
            )}
        </div>
    )
}

export default MainCard