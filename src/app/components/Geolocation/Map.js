import React from 'react';
import {Gmaps, Marker, Circle} from 'react-gmaps';

// Get you're API Key here: https://developers.google.com/maps/documentation/javascript/get-api-key
// You can hard code the key as a string if you are not using an environment variable.
const params = {
    v: '3.exp',
    key: process.env.REACT_APP_GOOGLE_PLACES_KEY
};

const Map = ({lat, lng, radius}) => (
    <Gmaps
      className="Map"
      height="400px"
      lat={lat}
      lng={lng}
      zoom={12}
      loadingMessage="Map is loading"
      params={params}
    >
        <Marker
          lat={lat}
          lng={lng}
        />
        {radius !== 0 ?
            <Circle
              lat={lat}
              lng={lng}
              radius={radius * 1000}
            />
         : null}
    </Gmaps>
);

export default Map;
