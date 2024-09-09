import React, { useState, useRef, useEffect } from 'react';
import Map from './Map';
import CurrentLocBtn from './CurrentLocBtn';
import SearchLocTypes from './SearchLocTypes';
import LayerChooseBtn from './LayerChooseBtn';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import MapboxDirections, { coordEach } from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

mapboxgl.accessToken = 'pk.eyJ1IjoiZnphcmEiLCJhIjoiY2x5Nzd5Mm52MDM0MDJpcXdvbGFrcG45eCJ9.J2QTwmCgMTwrRYu6Wti1RQ';
const locations = [
    {
        id: 1,
        name: "Badamdar Load Zone",
        coordinates: [49.804728222556598, 40.3543160914111],
        type: "loadzone",
        icon: "",
        route: "Badamdar - Main Hub",
        openType: "hub"
    },
    {
        id: 2,
        name: "SHIKHOV HUB",
        coordinates: [49.773346395934198, 40.303880869482001],
        type: "hub",
        openType: "hub"
    },
    {
        id: 3,
        name: "Pick up - Crescent",
        coordinates: [49.797729308417701, 40.306957810588202],
        type: "pickup",
        openType: "hub"
    },
    {
        id: 4,
        name: "Pick up - Bibi Heybat",
        coordinates: [49.820045800512197, 40.308406476223198],
        type: "pickup",
        openType: "hub"
    },
    {
        id: 5,
        name: "Pick up - Aquatic",
        coordinates: [49.833189461062702, 40.337230474009303],
        type: "pickup",
        openType: "hub"
    },
    {
        id: 6,
        name: "Pick up - Flag Square",
        coordinates: [49.842613933836702, 40.344450751304997],
        type: "pickup",
        openType: "hub"
    },
    {
        id: 7,
        name: "Pick up - Bayil",
        coordinates: [49.834618353110301, 40.352942423131203],
        type: "pickup",
        openType: "hub"
    },
    {
        id: 8,
        name: "Pick Up Azneft",
        coordinates: [49.835882205756498, 40.362458854512397],
        type: "pickup",
        openType: "hub"
    },


    {
        id: 9,
        name: "Drop off - Crescent",
        coordinates: [49.797968379274003, 40.307292484853498],
        type: "dropoff",
        openType: "hub"
    },
    {
        id: 10,
        name: "Drop off - Bibi Heybat",
        coordinates: [49.819627828037703, 40.308136104597303],
        type: "dropoff",
        openType: "hub"
    },
    {
        id: 11,
        name: "Drop off - Aquatic",
        coordinates: [49.830729930916398, 40.338132983096898],
        type: "dropoff",
        openType: "hub"
    },
    {
        id: 12,
        name: "Drop off - Flag Square",
        coordinates: [49.841792865122201, 40.344343118633802],
        type: "dropoff",
        openType: "hub"
    },
    {
        id: 13,
        name: "Drop Off - Bayil",
        coordinates: [49.834103744154497, 40.351870760133501],
        type: "dropoff",
        openType: "hub"
    },
    {
        id: 14,
        name: "Drop Off Azneft",
        coordinates: [49.835015785004302, 40.361914933388498],
        type: "dropoff",
        openType: "hub"
    },
    {
        id: 15,
        name: "WINTER PARK HUB",
        coordinates: [49.842267693748603, 40.377953335390103],
        type: "hub",
        openType: "hub"
    },
    {
        id: 16,
        name: "Port Baku Hub",
        coordinates: [49.8658768425841, 40.374828000736201],
        type: "hub",
        openType: "hub"
    },
    {
        id: 17,
        name: "Pick up - Middle East",
        coordinates: [49.866796422168797, 40.386719442454996],
        type: "pickup",
        openType: "hub"
    },
    {
        id: 18,
        name: "Drop Off - Middle East",
        coordinates: [49.866240728457598, 40.387142603376198],
        type: "dropoff",
        openType: "hub"
    },
    {
        id: 19,
        name: "Load Zone - Khatai",
        coordinates: [49.873463204950397, 40.382697479420997],
        type: "loadzone",
        openType: "hub"
    },
    {
        id: 20,
        name: "Load Zone - White City 2",
        coordinates: [49.887972952892397, 40.383308899582801],
        type: "loadzone",
        openType: "hub"
    },
    {
        id: 21,
        name: "Pick up - White City 1",
        coordinates: [49.881028729712398, 40.3812377719388],
        type: "pickup",
        openType: "hub"
    },
    {
        id: 22,
        name: "Drop off - White City 1",
        coordinates: [49.880339374795199, 40.382363721322001],
        type: "dropoff",
        openType: "hub"
    },
    {
        id: 23,
        name: "BOULEVARD HUB",
        coordinates: [49.883666692121501, 40.376198431747198],
        type: "hub",
        openType: "hub"
    },
    {
        id: 24,
        name: "CONGRESS HUB",
        coordinates: [49.866776966882803, 40.397347641426897],
        type: "hub",
        openType: "hub"
    },
    {
        id: 25,
        name: "Pick Up - Ganjlik",
        coordinates: [49.852497270358597, 40.400858482144699],
        type: "pickup",
        openType: "hub"
    },
    {
        id: 26,
        name: "Drop Off - Ganjlik",
        coordinates: [49.8520410084991, 40.400349593708803],
        type: "dropoff",
        openType: "hub"
    },
    {
        id: 27,
        name: "NARIMANOV HUB",
        coordinates: [49.862886241506601, 40.407173005114601],
        type: "hub",
        openType: "hub"
    },
    {
        id: 28,
        name: "Drop Off - City Life Residence",
        coordinates: [49.830747548444798, 40.381664661666498],
        type: "dropoff",
        openType: "hub"
    },
    {
        id: 29,
        name: "Pick Up - City Life Residence",
        coordinates: [49.829695443678801, 40.3815999882016],
        type: "pickup",
        openType: "hub"
    },
    {
        id: 30,
        name: "IZMIR HUB",
        coordinates: [49.823788432045497, 40.388349985437401],
        type: "hub",
        openType: "hub"
    },
    {
        id: 31,
        name: "YASAMAL HUB",
        coordinates: [49.789411091686198, 40.3856638602877],
        type: "hub",
        openType: "hub"
    },
    {
        id: 32,
        name: "Pick Up Flame Towers",
        coordinates: [49.826411263496503, 40.358507199437597],
        type: "pickup",
        openType: "hub"
    },
    {
        id: 33,
        name: "Pick Up Badamdar",
        coordinates: [49.804567423847402, 40.354127079630601],
        type: "pickup",
        openType: "hub"
    },
    {
        id: 34,
        name: "Drop Off Flame Towers",
        coordinates: [49.826468231405002, 40.358899824459698],
        type: "dropoff",
        openType: "hub"
    },
    {
        id: 35,
        name: "Drop Off Badamdar",
        coordinates: [49.8045647512145, 40.354276924380898],
        type: "dropoff",
        openType: "hub"
    },
    {
        id: 36,
        name: "Express Airport Shuttle 2",
        coordinates: [49.918469965151097, 40.420016226333402],
        type: "shuttle",
        openType: "venues",
        description: "Time table:\n6 am - 11 pm (Frequency - every 25 mins)\n\n11 pm - 6 am (Frequency - every 45 mins) \n\n\nNOTE: this location is from AIRPORT to the CITY"
    },
    {
        id: 37,
        name: "28 May Express Airport Shutlle",
        coordinates: [49.850814969055897, 40.379432887147097],
        type: "shuttle",
        openType: "venues",
        description: "Time table:\n6 am - 11 pm (Frequency - every 25 mins)\n\n11 pm - 6 am (Frequency - every 45 mins)"
    },
    {
        id: 38,
        name: "Express Airport Shuttle 2",
        coordinates: [49.916739227595599, 40.422430433446699],
        type: "shuttle",
        openType: "venues",
        description: "Time table:\n6 am - 11 pm (Frequency - every 25 mins)\n\n11 pm - 6 am (Frequency - every 45 mins) \n\n\nNOTE: this location is from CITY to the AIRPORT"
    },
    {
        id: 39,
        name: "GOSHA GALA HUB",
        coordinates: [49.835980455439604, 40.369132403325096],
        type: "hub",
        openType: "hub"
    },
    {
        id: 40,
        name: "SEA BREEZE HUB 1",
        coordinates: [49.987372282520901, 40.591310835262597],
        type: "hub",
        openType: "hub"
    },
    {
        id: 41,
        name: "SEA BREEZE HUB 2",
        coordinates: [49.937322131743102, 40.578409171633098],
        type: "hub",
        openType: "hub"
    },
    {
        id: 42,
        name: "KHAZRI HUB",
        coordinates: [50.078941736772201, 40.5618773517024],
        type: "hub",
        openType: "hub"
    },
    {
        id: 43,
        name: "Load Zone - Bilgah",
        coordinates: [50.062489932201103, 40.575027588421101],
        type: "loadzone",
        openType: "hub"
    },
    {
        id: 44,
        name: "Load Zone Koroghlu",
        coordinates: [49.915903636700499, 40.423235348255801],
        type: "loadzone",
        openType: "hub"
    },
    {
        id: 45,
        name: "Dreamland HUB",
        coordinates: [50.096950254403303, 40.396286749153703],
        type: "hub",
        openType: "hub"
    },
    {
        id: 46,
        name: "Load Zone - MIDA",
        coordinates: [50.071287656735699, 40.388334576239302],
        type: "loadzone",
        openType: "hub"
    },
    {
        id: 47,
        name: "GERB ULDUZU HUB",
        coordinates: [49.8578808877661, 40.423647404950003],
        type: "hub",
        openType: "hub"
    },
    {
        id: 48,
        name: "BLUE ZONE",
        coordinates: [49.918422582896, 40.433511768811201],
        type: "additional",
        openType: "bluezone"
    },
    {
        id: 49,
        name: "GREEN ZONE HUB",
        coordinates: [49.926972190510497, 40.434017633018897],
        type: "additional",
        openType: "greenzone"
    },


    // Metro
    {
        id: 50,
        name: "Hazi Aslanov m/s",
        coordinates: [49.953859918209325, 40.37378927259947],
        openType: "metro"
    },
    {
        id: 51,
        name: "Ahmadli m/s",
        coordinates: [49.95454619566374, 40.38587641070564],
        openType: "metro"
    },
    {
        id: 52,
        name: "Khalglar Dostlugu m/s",
        coordinates: [49.95125435285459, 40.39901687075005],
        openType: "metro"
    },
    {
        id: 53,
        name: "Neftchilar m/s",
        coordinates: [49.94327398753259, 40.41067162071465],
        openType: "metro"
    },
    {
        id: 54,
        name: "Gara Garayev m/s",
        coordinates: [49.932213370046156, 40.41792733650996],
        openType: "metro"
    },
    {
        id: 55,
        name: "Ulduz",
        coordinates: [49.892842981302906, 40.415359269116784],
        openType: "metro"
    },
    {
        id: 56,
        name: "Nariman Narimanov m/s",
        coordinates: [49.87122676764417, 40.40300134282488],
        openType: "metro"
    },
    {
        id: 57,
        name: "Ganjlik m/s",
        coordinates: [49.85162852771651, 40.40064610810623],
        openType: "metro"
    },
    {
        id: 58,
        name: "28 May m/s",
        coordinates: [49.85645852586715, 40.379132673976216],
        openType: "metro"
    },
    {
        id: 59,
        name: "Nizami m/s",
        coordinates: [49.83009521607079, 40.37917877649939],
        openType: "metro"
    },
    {
        id: 60,
        name: "Elmler Akademiyasi m/s",
        coordinates: [49.81467347559057, 40.37512296694931],
        openType: "metro"
    },
    {
        id: 61,
        name: "Inshaatchilar m/s",
        coordinates: [49.802673668196356, 40.390433646456636],
        openType: "metro"
    },
    {
        id: 62,
        name: "20 January m/s",
        coordinates: [49.80787303444507, 40.40423938038653],
        openType: "metro"
    },
    {
        id: 63,
        name: "Memar Ajami m/s",
        coordinates: [49.81412611607198, 40.41068592740101],
        openType: "metro"
    },
    {
        id: 64,
        name: "Nasimi m/s",
        coordinates: [49.82512766819762, 40.424584252889225],
        openType: "metro"
    },
    {
        id: 65,
        name: "Azadliq Prospekti m/s",
        coordinates: [49.842334796480515, 40.425275766713106],
        openType: "metro"
    },
    {
        id: 66,
        name: "Darnagul m/s",
        coordinates: [49.86204570073042, 40.42550718341862],
        openType: "metro"
    },
    {
        id: 67,
        name: "Shah Ismayil Khatai m/s",
        coordinates: [49.87208274305799, 40.3832575931401],
        openType: "metro"
    },
    {
        id: 68,
        name: "Jafar Jabbarli",
        coordinates: [49.84918792346552, 40.37972528056725],
        openType: "metro"
    },
    {
        id: 69,
        name: "Sahil m/s",
        coordinates: [49.8441566767737, 40.371967172674275],
        openType: "metro"
    },
    {
        id: 70,
        name: "Icherisheher m/s",
        coordinates: [49.83169673989378, 40.365964330889035],
        openType: "metro"
    },

    // Landmarks
    {
        id: 71,
        name: "Heydar Aliyev Center",
        coordinates: [49.86822279278203, 40.39598825147724],
        openType: "landmark",
        icon: ""
    },
    {
        id: 72,
        name: "Flame Towers",
        coordinates: [49.82733247318849, 40.35962587665838],
        openType: "landmark",
        icon: ""
    },
    {
        id: 73,
        name: "Baku Crystal Hall",
        coordinates: [49.85035489887881, 40.34437356061561],
        openType: "landmark",
        icon: ""
    },
    {
        id: 74,
        name: "Gosha Gala Square",
        coordinates: [49.83656481723334, 40.36806395269224],
        openType: "landmark",
        icon: ""
    },
    {
        id: 75,
        name: "Ateshag",
        coordinates: [50.00879400257882, 40.415442228731315],
        openType: "landmark",
        icon: ""
    },
    {
        id: 76,
        name: "Heydar Aliyev Mosque",
        coordinates: [49.82422685470438, 40.42889800829781],
        openType: "landmark",
        icon: ""
    },
    {
        id: 77,
        name: "Carpet museum",
        coordinates: [49.83600677984006, 40.360346076252526],
        openType: "landmark",
        icon: ""
    },
    {
        id: 78,
        name: "Dom sovet",
        coordinates: [49.85308179887987, 40.373936316887644],
        openType: "landmark",
        icon: ""
    },

    // Venues
    {
        id: 79,
        name: "Heydar Aliyev Airport",
        coordinates: [50.04990997239218, 40.46275448123965],
        openType: "venue",
        icon: ""
    },
    {
        id: 80,
        name: "Baku Stadium",
        coordinates: [49.92038520202662, 40.43012947365772],
        openType: "venue",
        icon: ""
    },
    {
        id: 81,
        name: "Addison Hotel",
        coordinates: [49.838149297032366, 40.40160586540806],
        openType: "hotel",
    },
    {
        id: 82,
        name: "Admiral Hotel",
        coordinates: [49.842954054703505, 40.40658625513088],
        openType: "hotel"
    },
    {
        id: 83,
        name: "Aksent Hotel",
        coordinates: [49.84305211052496, 40.37992319314914],
        openType: "hotel"
    },
    {
        id: 84,
        name: "Alba Hotel",
        coordinates: [49.85960919518387, 40.41044251634229],
        openType: "hotel"
    },
    {
        id: 85,
        name: "Alfa Hotel ",
        coordinates: [49.85960919518387, 40.41044251634229],
        openType: "hotel"
    },
    {
        id: 86,
        name: "Alp İnn Hotel",
        coordinates: [49.84722645470335, 40.401776873534615],
        openType: "hotel"
    },
    {
        id: 87,
        name: "Altus Hotel",
        coordinates: [49.86098779812701, 40.41104113310372],
        openType: "hotel"
    },
    {
        id: 88,
        name: "Ammar Grand Hotel ",
        coordinates: [49.86062675470376, 40.41190994414427],
        openType: "hotel"
    },
    {
        id: 89,
        name: "Anatolia Hotel",
        coordinates: [49.845206954703436, 40.404376718963526],
        openType: "hotel"
    },
    {
        id: 90,
        name: "Arion Hotel Baku ",
        coordinates: [49.86005609703266, 40.41243025665399],
        openType: "hotel"
    },
    {
        id: 91,
        name: "Art Club Hotel",
        coordinates: [49.8337702816888, 40.364535191350235],
        openType: "hotel"
    },
    {
        id: 92,
        name: "Askar Hotel",
        coordinates: [49.870567624019365, 40.40638433420152],
        openType: "hotel"
    },
    {
        id: 93,
        name: "Atlas Hotel",
        coordinates: [49.861090027716834, 40.41014046304734],
        openType: "hotel"
    },
    {
        id: 94,
        name: "Atropat Hotel",
        coordinates: [49.83521199703108, 40.36740193353222],
        openType: "hotel"
    },
    {
        id: 95,
        name: "Auroom Boutique Hotel",
        coordinates: [49.83044506066022, 40.38836662573254],
        openType: "hotel"
    },
    {
        id: 96,
        name: "Alba Hotel",
        coordinates: [49.85960919518387, 40.41044251634229],
        openType: "hotel"
    },
    {
        id: 97,
        name: "Austin Hotel",
        coordinates: [49.84061269887982, 40.372878672122106],
        openType: "hotel"
    },
    {
        id: 98,
        name: "Avenue Hotel Baku",
        coordinates: [49.89804078353915, 40.41190427516503],
        openType: "hotel"
    },
    {
        id: 99,
        name: "Azalea",
        coordinates: [49.847625559622465, 40.414929518946074],
        openType: "hotel"
    },
    {
        id: 100,
        name: "Azcot Hotel",
        coordinates: [49.835363033084136, 40.37152835827698],
        openType: "hotel"
    },
    {
        id: 101,
        name: "Badam D'Art Boutique Hotel",
        coordinates: [49.821298710523976, 40.35210364374572],
        openType: "hotel"
    },
    {
        id: 102,
        name: "Badamdar Hotel and Residence",
        coordinates: [49.80479267004361, 40.35447571069379],
        openType: "hotel"
    },
    {
        id: 103,
        name: "Baku Marriott Hotel Boulevard",
        coordinates: [49.88361456819584, 40.37510722815325],
        openType: "hotel"
    },
    {
        id: 104,
        name: "Bəy Hotel",
        coordinates: [49.83015066634589, 40.337696785228076],
        openType: "hotel"
    },
    {
        id: 105,
        name: "Boutique Hotel Baku",
        coordinates: [49.84188383751155, 40.37527848690881],
        openType: "hotel"
    },
    {
        id: 106,
        name: "Calisto Hotel",
        coordinates: [49.846782370044465, 40.376386237341634],
        openType: "hotel"
    },
    {
        id: 107,
        name: "Capitol Hotel",
        coordinates: [49.844234985387736, 40.40504787726557],
        openType: "hotel"
    },

    {
        id: 108,
        name: "Caspian Business Hotel",
        coordinates: [49.877928125868515, 40.42056016217344],
        openType: "hotel"
    },
    {
        id: 109,
        name: "Central Park Hotel",
        coordinates: [49.84118118353799, 40.379259195163016],
        openType: "hotel"
    },
    {
        id: 110,
        name: "Cinema Plaza",
        coordinates: [49.83172383936122, 40.40042335669763],
        openType: "hotel"
    },
    {
        id: 111,
        name: "Central Park Hotel",
        coordinates: [49.84118118353799, 40.379259195163016],
        openType: "hotel"
    },
    {
        id: 112,
        name: "Cinema Plaza",
        coordinates: [49.83172383936122, 40.40042335669763],
        openType: "hotel"
    },
    {
        id: 113,
        name: "City Park Hotel ",
        coordinates: [49.83371745310075, 40.37452962551282],
        openType: "hotel"
    },
    {
        id: 114,
        name: "Citymax Hotel",
        coordinates: [49.83415179518259, 40.37511499969172],
        openType: "hotel"
    },
    {
        id: 115,
        name: "Clock Tower Hotel",
        coordinates: [49.83102673936085, 40.39055817345939],
        openType: "hotel"
    },
    {
        id: 116,
        name: "Co Pilot",
        coordinates: [49.83473325470225, 40.37322970289355],
        openType: "hotel"
    },
    {
        id: 117,
        name: "Crescent Beach Hotel",
        coordinates: [49.800597222634025, 40.307085470058084],
        openType: "hotel"
    },
    {
        id: 118,
        name: "Deluxe City Hotel",
        coordinates: [49.856431483537946, 40.37572773893927],
        openType: "hotel"
    },
    {
        id: 119,
        name: "Diamond Hotel",
        coordinates: [49.86159264121021, 40.41152522822493],
        openType: "hotel"
    },
    {
        id: 120,
        name: "Dinamo Hotel Baku",
        coordinates: [49.84840349703128, 40.3723434947416],
        openType: "hotel"
    },
    {
        id: 121,
        name: "Diplomat Hotel",
        coordinates: [49.84306123936043, 40.379873855998596],
        openType: "hotel"
    },
    {
        id: 122,
        name: "Dondar Hotel",
        coordinates: [49.85414762586684, 40.375539225570414],
        openType: "hotel"
    },
    {
        id: 123,
        name: "East Legend Hotel",
        coordinates: [49.83554649703023, 40.34773180684372],
        openType: "hotel"
    },
    {
        id: 124,
        name: "Egoist Hotel",
        coordinates: [49.840968983538204, 40.38403139783888],
        openType: "hotel"
    },
    {
        id: 125,
        name: "Excelsior Hotel",
        coordinates: [49.86841253936089, 40.39197422810264],
        openType: "hotel"
    },
    {
        id: 126,
        name: "Eleven Hotel",
        coordinates: [49.835247412373356, 40.37196774806142],
        openType: "hotel"
    },
    {
        id: 127,
        name: "Emerald Suite Hotel",
        coordinates: [49.86038493936159, 40.40873301195009],
        openType: "hotel"
    },
    {
        id: 128,
        name: "Essam Deluxe Hotel",
        coordinates: [49.86125983936162, 40.41012436340116],
        openType: "hotel"
    },
    {
        id: 129,
        name: "Etro Hotel",
        coordinates: [49.861411881690366, 40.40901379684551],
        openType: "hotel"
    },
    {
        id: 130,
        name: "Fairmont Hotel Baku",
        coordinates: [49.82617982586628, 40.360375724720726],
        openType: "hotel"
    },
    {
        id: 131,
        name: "Fly Inn Baku",
        coordinates: [50.05413358169238, 40.46063981738127],
        openType: "hotel"
    },
    {
        id: 132,
        name: "Four Seasons Hotel Baku",
        coordinates: [49.83504841422177, 40.36335984477592],
        openType: "hotel"
    },
    {
        id: 133,
        name: "Gəncəli Plaza Hotel",
        coordinates: [49.855559212373464, 40.37555482554583],
        openType: "hotel"
    },
    {
        id: 134,
        name: "Golden City Hotel",
        coordinates: [49.872069252854885, 40.40728279730587],
        openType: "hotel"
    },
    {
        id: 135,
        name: "Golden Coast Hotel",
        coordinates: [49.8384629528525, 40.34660630191764],
        openType: "hotel"
    },
    {
        id: 136,
        name: "Golden Horn Apart",
        coordinates: [49.84805934121013, 40.41031452418267],
        openType: "hotel"
    },
    {
        id: 137,
        name: "Graaf Hotel",
        coordinates: [49.86286755470333, 40.40228146401402],
        openType: "hotel"
    },
    {
        id: 138,
        name: "Grand Hotel Central Baku",
        coordinates: [49.83124417004449, 40.37576585184082],
        openType: "hotel"
    },
    {
        id: 139,
        name: "Grand Inn Hotel",
        coordinates: [49.86919425415056, 40.3982199604415],
        openType: "hotel"
    },
    {
        id: 140,
        name: "Green City Hotel",
        coordinates: [49.77737718538404, 40.30497683012398],
        openType: "hotel"
    },
    {
        id: 141,
        name: "Hillmond Hotel",
        coordinates: [49.855559212373464, 40.37555482554583],
        openType: "hotel"
    },
    {
        id: 142,
        name: "Hilton",
        coordinates: [49.84967769703115, 40.37227544731501],
        openType: "hotel"
    },
    {
        id: 143,
        name: "Holiday Inn",
        coordinates: [49.85880557189329, 40.37602279814987],
        openType: "hotel"
    },

    {
        id: 144,
        name: "Home Suites Baku- Halal Hotel",
        coordinates: [49.83485492401727, 40.34867826792082],
        openType: "hotel"
    },
    {
        id: 145,
        name: "HomeBridge Hotel Apartments",
        coordinates: [49.77326041237088, 40.30495577444971],
        openType: "hotel"
    },
    {
        id: 146,
        name: "Hyatt Regency Baku",
        coordinates: [49.82439759703187, 40.38794363739534],
        openType: "hotel"
    },
    {
        id: 147,
        name: "İbis Hotel",
        coordinates: [49.87510206819616, 40.38294733895164],
        openType: "hotel"
    },
    {
        id: 148,
        name: "İnterContinental Baku",
        coordinates: [49.84548281237335, 40.37155522295316],
        openType: "hotel"
    },
    {
        id: 149,
        name: "İris Hotel",
        coordinates: [49.84831999703163, 40.382944766447515],
        openType: "hotel"
    },
    {
        id: 150,
        name: "İstanbul Gold Hotel",
        coordinates: [49.84119699703207, 40.39795498499894],
        openType: "hotel"
    },
    {
        id: 151,
        name: "İvy Garden Hotel",
        coordinates: [49.83051441052531, 40.38689727199531],
        openType: "hotel"
    },
    {
        id: 152,
        name: "Joyy Hotel",
        coordinates: [49.93255675470339, 40.40519948081565],
        openType: "hotel"
    },
    {
        id: 153,
        name: "JW Marriott Absheron Baku",
        coordinates: [49.85670135285365, 40.37491113486195],
        openType: "hotel"
    },

    {
        id: 154,
        name: "Karat Inn",
        coordinates: [49.84244789703138, 40.37964350234833],
        openType: "hotel"
    },
    {
        id: 155,
        name: "Kristal Inn",
        coordinates: [49.83820178353857, 40.39589120282671],
        openType: "hotel"
    },
    {
        id: 156,
        name: "Krone Hotel",
        coordinates: [49.86561634148637, 40.40381107167394],
        openType: "hotel"
    },
    {
        id: 157,
        name: "Qəsr Hotel",
        coordinates: [49.81077346449754, 40.34787316002721],
        openType: "hotel"
    },
    {
        id: 158,
        name: "Landmark Hotel Baku",
        coordinates: [49.85147025045218, 40.37614243793322],
        openType: "hotel"
    },
    {
        id: 159,
        name: "Maajid Hotel & Restaurant",
        coordinates: [49.832758852853296, 40.36574484101545],
        openType: "hotel"
    },
    {
        id: 160,
        name: "Marine Inn Hotel",
        coordinates: [49.85718923936021, 40.37356611242888],
        openType: "hotel"
    },
    {
        id: 161,
        name: "Marriott Courtyard",
        coordinates: [49.835010821616905, 40.376627210032616],
        openType: "hotel"
    },
    {
        id: 162,
        name: "Mercure Hotel",
        coordinates: [49.82002093936012, 40.37572023895739],
        openType: "hotel"
    },
    {
        id: 163,
        name: "Merida Hotel",
        coordinates: [49.846431863946925, 40.40704555004505],
        openType: "hotel"
    },
    {
        id: 164,
        name: "Midtown Hotel",
        coordinates: [49.8385141816894, 40.38226628754526],
        openType: "hotel"
    },
    {
        id: 165,
        name: "Mildom Hotel",
        coordinates: [49.84448522586737, 40.38800485294035],
        openType: "hotel"
    },
    {
        id: 166,
        name: "Miraj Hotel",
        coordinates: [49.846431863946925, 40.40704555004505],
        openType: "hotel"
    },
    {
        id: 167,
        name: "Molokan Inn Hotel",
        coordinates: [49.84104629703122, 40.37185942217828],
        openType: "hotel"
    },
    {
        id: 168,
        name: "Moss Art Boutique Hotel",
        coordinates: [49.83523649093265, 40.37288571449201],
        openType: "hotel"
    },
    {
        id: 169,
        name: "My Music Hotel",
        coordinates: [49.83357504860252, 40.33859205018067],
        openType: "hotel"
    },
    {
        id: 170,
        name: "Modern Hotel",
        coordinates: [49.83980532346641, 40.402839013334855],
        openType: "hotel"
    },
    {
        id: 171,
        name: "Nardin Hotel",
        coordinates: [49.86154441182196, 40.41063956165391],
        openType: "hotel"
    },
    {
        id: 172,
        name: "Nemi Hotel",
        coordinates: [49.8358067620969, 40.372731878563336],
        openType: "hotel"
    },
    {
        id: 173,
        name: "Nobel Hotel",
        coordinates: [49.86990433511022, 40.37756958564613],
        openType: "hotel"
    },
    {
        id: 174,
        name: "Old Street Boutique Hotel",
        coordinates: [49.8359388105243, 40.367582807445444],
        openType: "hotel"
    },
    {
        id: 175,
        name: "Olf Hotel",
        coordinates: [49.83629196819576, 40.374434000848304],
        openType: "hotel"
    },
    {
        id: 176,
        name: "Opera Hotel",
        coordinates: [49.862677673743065, 40.41004614021062],
        openType: "hotel"
    },
    {
        id: 177,
        name: "Parallel Hotel",
        coordinates: [49.826224081689574, 40.38346958239255],
        openType: "hotel"
    },
    {
        id: 178,
        name: "Radisson Hotel Baku",
        coordinates: [49.8489324970312, 40.371681774880486],
        openType: "hotel"
    },
    {
        id: 179,
        name: "Parkside Hotel",
        coordinates: [49.85231992151918, 40.37952976254763],
        openType: "hotel"
    },
    {
        id: 180,
        name: "Parkway Inn",
        coordinates: [49.829528539360574, 40.38215277814183],
        openType: "hotel"
    },
    {
        id: 181,
        name: "Passage Hotel",
        coordinates: [49.833592741208804, 40.37144634932628],
        openType: "hotel"
    },
    {
        id: 182,
        name: "Perron Hotel",
        coordinates: [49.83811301237341, 40.37030890017082],
        openType: "hotel"
    },
    {
        id: 183,
        name: "Piano Hotel",
        coordinates: [49.86012516819715, 40.40979567926084],
        openType: "hotel"
    },
    {
        id: 184,
        name: "Port Rivoli Baku",
        coordinates: [49.857891625867026, 40.380369027677936],
        openType: "hotel"
    },
    {
        id: 185,
        name: "Porto Hotel",
        coordinates: [49.86101370627583, 40.40932428017659],
        openType: "hotel"
    },
    {
        id: 186,
        name: "Premier Old Gates",
        coordinates: [49.833648139359916, 40.364194666917456],
        openType: "hotel"
    },
    {
        id: 187,
        name: "Premier Palace Hotel",
        coordinates: [49.825705725867685, 40.39710293312505],
        openType: "hotel"
    },
    {
        id: 188,
        name: "Premium Park Hotel",
        coordinates: [49.857918712373746, 40.38034439080973],
        openType: "hotel"
    },
    {
        id: 189,
        name: "Ramada by Wydham",
        coordinates: [49.80258957189057, 40.306614251269146],
        openType: "hotel"
    },
    {
        id: 190,
        name: "Regal İnn Badamdar",
        coordinates: [49.81047765470138, 40.34935966240605],
        openType: "hotel"
    },
    {
        id: 191,
        name: "Regnum Hotel",
        coordinates: [49.710256285117694, 40.57629415032925],
        openType: "hotel"
    },
    {
        id: 192,
        name: "The Ritz-Carlton Hotel",
        coordinates: [49.8673637880958, 40.38930263065653],
        openType: "hotel"
    },
    {
        id: 193,
        name: "Riviera Hotel",
        coordinates: [49.835073379839564, 40.349826083531504],
        openType: "hotel"
    },
    {
        id: 194,
        name: "Pure Boutique Hotel",
        coordinates: [49.86163422586803, 40.40946050353604],
        openType: "hotel"
    },
    {
        id: 195,
        name: "Rose İnn Hotel",
        coordinates: [49.8452443988811, 40.40671583715392],
        openType: "hotel"
    },
    {
        id: 196,
        name: "Rosemary İnn",
        coordinates: [49.85680348538661, 40.37595949825746],
        openType: "hotel"
    },
    {
        id: 197,
        name: "Royal Hotel",
        coordinates: [49.86270226986062, 40.410150089280855],
        openType: "hotel"
    },
    {
        id: 198,
        name: "Royal Saphire",
        coordinates: [49.81009892401705, 40.341193714345124],
        openType: "hotel"
    },
    {
        id: 199,
        name: "Russel Park Hotel",
        coordinates: [49.871345895183445, 40.397461632472016],
        openType: "hotel"
    },
    {
        id: 200,
        name: "Safran Hotel",
        coordinates: [49.84092853936128, 40.40346135153508],
        openType: "hotel"
    },
    {
        id: 201,
        name: "Sahil Hotel Baku",
        coordinates: [49.88089131976828, 40.38073578123638],
        openType: "hotel"
    },
    {
        id: 202,
        name: "SAV Hotel",
        coordinates: [49.832770683538925, 40.399139105405396],
        openType: "hotel"
    },
    {
        id: 203,
        name: "Sebail İnn Hotel",
        coordinates: [49.80956721422103, 40.345972842090895],
        openType: "hotel"
    },
    {
        id: 204,
        name: "Shah Palace Hotel",
        coordinates: [49.836315868195584, 40.36819735720805],
        openType: "hotel"
    },
    {
        id: 205,
        name: "Sheraton Baku İntourist",
        coordinates: [49.83345245285288, 40.354334266812046],
        openType: "hotel"
    },
    {
        id: 206,
        name: "Smith Hotel",
        coordinates: [49.859361368196645, 40.39897533535313],
        openType: "hotel"
    },
    {
        id: 207,
        name: "Spring Hotel",
        coordinates: [49.77459559703856, 40.57361211799156],
        openType: "hotel"
    },
    {
        id: 208,
        name: "Sultan Inn Hotel",
        coordinates: [49.83642052771524, 40.366379489039254],
        openType: "hotel"
    },
    {
        id: 209,
        name: "Sunday Hotel",
        coordinates: [49.83506972586661, 40.367297982614716],
        openType: "hotel"
    },
    {
        id: 210,
        name: "The Merchant Baku",
        coordinates: [49.837825097030986, 40.368079908870975],
        openType: "hotel"
    },
    {
        id: 211,
        name: "Theatrum Hotel",
        coordinates: [49.84065138353785, 40.37248617792829],
        openType: "hotel"
    },
    {
        id: 212,
        name: "Vegas Hotel",
        coordinates: [49.85613096819724, 40.41444851364336],
        openType: "hotel"
    },
    {
        id: 213,
        name: "Volga Hotel Baku",
        coordinates: [49.901140041210574, 40.41664963961256],
        openType: "hotel"
    },
    {
        id: 214,
        name: "West Inn Hotel",
        coordinates: [49.83579358353753, 40.36604183699655],
        openType: "hotel"
    },
    {
        id: 215,
        name: "West Shine Hotel",
        coordinates: [49.86166675655238, 40.409076680657364],
        openType: "hotel"
    },
    {
        id: 216,
        name: "Winter Park",
        coordinates: [49.83714528314129, 40.375850104744224],
        openType: "hotel"
    },
    {
        id: 217,
        name: "Wyndham Garden Baku",
        coordinates: [49.92401967928926, 40.413224916762886],
        openType: "hotel"
    },
    {
        id: 218,
        name: "Shirvanshah Hotel",
        coordinates: [49.83334598538619, 40.365322664181576],
        openType: "hotel"
    },
    {
        id: 219,
        name: "Teatro  boutique hotel",
        coordinates: [49.862391168196964, 40.409773425562086],
        openType: "hotel"
    },
    {
        id: 220,
        name: "Wyndham Hotel",
        coordinates: [49.87798977951823, 40.419684241643075],
        openType: "hotel"
    },
    {
        id: 221,
        name: "Sumqayit plaza hotel",
        coordinates: [49.666033485394316, 40.58567187141741],
        openType: "hotel"
    },
    {
        id: 222,
        name: "Grand hotel Europe",
        coordinates: [49.822388552854335, 40.39304166820881],
        openType: "hotel"
    },
    {
        id: 223,
        name: "Paradise hotel",
        coordinates: [49.86062653751296, 40.410370362405395],
        openType: "hotel"
    },
    {
        id: 224,
        name: "Olimpic Novkhani hotel & resort",
        coordinates: [49.7801828277221, 40.54994577657574],
        openType: "hotel"
    },
    {
        id: 225,
        name: "Corniche hotel",
        coordinates: [49.880905097031345, 40.378878931293535],
        openType: "hotel"
    },
    {
        id: 226,
        name: "Aysberq hotel",
        coordinates: [49.79352209887752, 40.30565268132758],
        openType: "hotel"
    },
    {
        id: 216,
        name: "Sky hotel",
        coordinates: [49.86415262586807, 40.40956740321158],
        openType: "hotel"
    },
    {
        id: 217,
        name: "La corne hotel",
        coordinates: [49.86106677189453, 40.41144662845374],
        openType: "hotel"
    },
    {
        id: 218,
        name: "Dreamland Hotel",
        coordinates: [50.09667785655208, 40.40074920032468],
        openType: "hotel"
    },
    {
        id: 219,
        name: "Sea Breeze Resort &Residences",
        coordinates: [49.98357581813349, 40.59707403215068],
        openType: "hotel"
    },
    {
        id: 220,
        name: "Athletes Village",
        coordinates: [49.913247110574765, 40.42291293471092],
        openType: "hotel"
    },
    {
        id: 221,
        name: "Reges Park Apartment",
        coordinates: [49.886728482044404, 40.38503874051751],
        openType: "hotel"
    },
    {
        id: 222,
        name: "Park&Ride",
        coordinates: [49.91556961247558, 40.43760945957492],
        openType: "parknride"
    },
    {
        id: 223,
        name: "Shuttle Bus to Blue Zone",
        coordinates: [49.916857072738544, 40.43832805082944],
        openType: "bluebus"
    },
    {
        id: 224,
        name: "Shuttle Bus to Green Zone",
        coordinates: [49.91621334260706, 40.439471248359766],
        openType: "greenbus"
    },
    {
        id: 225,
        name: "Shuttle Bus to Park and Ride",
        coordinates: [49.926427193605,40.433199754167305],
        openType: "greenbus"
    },
    {
        id: 226,
        name: "Shuttle Bus to Park & Ride",
        coordinates: [49.916256257478416,40.433101757301344],
        openType: "bluebus"
    },
    {
        id: 227,
        name: "Shuttle Busses to Blue & Green zones",
        coordinates: [49.91601551077218,40.42339140510875],
        openType: "redbus"
    }
]

function MainComponent() {
    const [currentLocation, setCurrentLocation] = useState(null);
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [mapStyle, setMapStyle] = useState('mapbox://styles/fzara/clztmd15w00gc01pi25ql5gln');
    const [mapLoaded, setMapLoaded] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState(locations);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: mapStyle,
            center: [49.895077, 40.37767], // Center on Baku
            zoom: 11,
        });

        mapRef.current = map;

        map.on('load', () => {
            setMapLoaded(true);
            const language = new MapboxLanguage({ defaultLanguage: 'en' });
            map.addControl(language);
            initializeMarkers(map);
        });

        return () => {
            map.remove();
        };
    }, [mapStyle]);

    const initializeMarkers = (map) => {
        locations.forEach((location) => {
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundSize = '100%';
            el.style.width = '34px';
            el.style.height = '34px';

            switch (location.openType) {
                case 'hotel':
                    el.style.backgroundImage = 'url(http://localhost:3000/img/hotel.png)';
                    break;
                case 'hub':
                    el.style.backgroundImage = 'url(http://localhost:3000/img/hub.png)';
                    break;
                case 'airport':
                    el.style.backgroundImage = 'url(http://localhost:3000/img/airport.png)';
                    el.style.width = '64px';
                    el.style.height = '64px';
                    break;
                case 'HAcenter':
                    el.style.backgroundImage = 'url(http://localhost:3000/img/hac-1-removebg-preview.png)';
                    el.style.backgroundRepeat = 'no-repeat'
                    el.style.width = '164px';
                    el.style.height = '164px';
                    break;
                case 'metro':
                    el.style.backgroundImage = 'url(http://localhost:3000/img/icons3.png)';
                    break;
                default:
                    el.style.backgroundImage = 'url(http://localhost:3000/img/default.png)';
            }

            const marker = new mapboxgl.Marker(el)
                .setLngLat(location.coordinates)
                .addTo(map);

            marker.getElement().addEventListener('mouseenter', () => {
                const popup = new mapboxgl.Popup({ offset: 25 })
                    .setLngLat(location.coordinates)
                    .setHTML(`<h3 style="margin: 0; font-size: 18px; color: #006A74; font-weight: 300;">${location.name}</h3>`)
                    .addTo(map);

                marker.getElement().addEventListener('mouseleave', () => {
                    popup.remove();
                });
            });

            if (location.openType === 'hotel' || location.openType === "landmark" || location.openType === "metro") {
                marker.getElement().style.display = 'none';
                map.on('zoomend', () => {
                    const currentZoom = map.getZoom();
                    marker.getElement().style.display = currentZoom >= 14 ? 'block' : 'none';
                });
            }
        });
    };

    const handleStyleChange = (newStyle) => {
        setMapStyle(newStyle);
    };

    const handleSearchResults = (results) => {
        setFilteredLocations(results);
    };

    return (
        <div className="map_main_container">
            <SearchLocTypes
                map={mapRef.current}
                locations={locations}
                onSearchResults={handleSearchResults}
            />
            <LayerChooseBtn onStyleChange={handleStyleChange} />
            {mapLoaded && (
                <CurrentLocBtn map={mapRef.current} setCurrentLocation={setCurrentLocation} />
            )}
            <Map mapContainerRef={mapContainerRef} />
        </div>
    );
}

export default MainComponent;