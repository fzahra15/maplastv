// import React from 'react';
// import img from '../img/437517806_122127168494234711_4997038554708139286_n-removebg-preview.png';

// function HubsVenuesHotels({ items }) {
//     // Function to calculate distance using Haversine formula
//     const calculateDistance = (lat1, lon1, lat2, lon2) => {
//         const R = 6371; // Radius of the Earth in km
//         const dLat = (lat2 - lat1) * (Math.PI / 180);
//         const dLon = (lon2 - lon1) * (Math.PI / 180);
//         const a =
//             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos(lat1 * (Math.PI / 180)) *
//             Math.cos(lat2 * (Math.PI / 180)) *
//             Math.sin(dLon / 2) * Math.sin(dLon / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         return R * c; // Distance in km
//     };

//     // Function to find closest locations
//     const findClosestLocations = (location) => {
//         const radius = 2; // 2 km radius
//         const closestLocations = items.filter(item => {
//             if (location.openType === 'hub' && item.openType === 'hotel') {
//                 // Calculate distance between a hub and a hotel
//                 const distance = calculateDistance(
//                     location.coordinates[1], location.coordinates[0], // Location coordinates (lat, lon)
//                     item.coordinates[1], item.coordinates[0]          // Item coordinates (lat, lon)
//                 );
//                 console.log(`Distance from ${location.name} to ${item.name}: ${distance.toFixed(2)} km`);
//                 return distance <= radius;
//             } else if (location.openType === 'hotel' && item.openType === 'hub') {
//                 // Calculate distance between a hotel and a hub
//                 const distance = calculateDistance(
//                     location.coordinates[1], location.coordinates[0], // Location coordinates (lat, lon)
//                     item.coordinates[1], item.coordinates[0]          // Item coordinates (lat, lon)
//                 );
//                 console.log(`Distance from ${location.name} to ${item.name}: ${distance.toFixed(2)} km`);
//                 return distance <= radius;
//             }
//             return false;
//         });

//         console.log('Closest Locations:', closestLocations); // Log the closest locations
//         return closestLocations;
//     };

//     return (
//         <div className="hubs_venues_hotels">
//             {items.map((data, index) => (
//                 <div key={index} className="card">
//                     <div className="card_inner">
//                         <i className="fa-solid fa-location-dot"></i>
//                         <h3>{data.name}</h3>
//                         <p></p>
//                     </div>
//                     <button onClick={() => {
//                         const closestLocations = findClosestLocations(data);
//                         console.log(closestLocations); // Display closest locations in the console or use another method to show on UI
//                     }}>
//                         {data.openType === "hub" ? `Closest hotels` : "Closest hubs"}
//                     </button>
//                     {/* <img src={img} alt="" /> */}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default HubsVenuesHotels;


// // 
// import React from 'react';
// import img from '../img/437517806_122127168494234711_4997038554708139286_n-removebg-preview.png';

// function HubsVenuesHotels({ items }) {
//     // Function to calculate distance using Haversine formula
//     const calculateDistance = (lat1, lon1, lat2, lon2) => {
//         const R = 6371; // Radius of the Earth in km
//         const dLat = (lat2 - lat1) * (Math.PI / 180);
//         const dLon = (lon2 - lon1) * (Math.PI / 180);
//         const a =
//             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos(lat1 * (Math.PI / 180)) *
//             Math.cos(lat2 * (Math.PI / 180)) *
//             Math.sin(dLon / 2) * Math.sin(dLon / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         return R * c; // Distance in km
//     };

//     // Function to find closest locations
//     const findClosestLocations = (location) => {
//         const radius = 2; // 2 km radius
//         return items.filter(item => {
//             if (location.openType === 'hub' && item.openType === 'hotel') {
//                 const distance = calculateDistance(location.coordinates[1], location.coordinates[0], item.coordinates[1], item.coordinates[0]);
//                 console.log(`Distance from ${location.name} to ${item.name}: ${distance} km`);
//                 return distance <= radius;
//             } else if (location.openType === 'hotel' && item.openType === 'hub') {
//                 const distance = calculateDistance(location.coordinates[1], location.coordinates[0], item.coordinates[1], item.coordinates[0]);
//                 console.log(`Distance from ${location.name} to ${item.name}: ${distance} km`);
//                 return distance <= radius;
//             }
//             return false;
//         });
//     };

//     return (
//         <div className="hubs_venues_hotels">
//             {items.map((data, index) => (
//                 <div key={index} className="card">
//                     <div className="card_inner">
//                         <i className="fa-solid fa-location-dot"></i>
//                         <h3>{data.name}</h3>
//                         <p></p>
//                     </div>
//                     <button onClick={() => {
//                         const closestLocations = findClosestLocations(data);
//                         console.log('Closest Locations:', closestLocations); // Display closest locations in the console
//                     }}>
//                         {data.openType === "hub" ? `Closest hotels` : "Closest hubs"}
//                     </button>
//                     {/* <img src={img} alt="" /> */}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default HubsVenuesHotels;
