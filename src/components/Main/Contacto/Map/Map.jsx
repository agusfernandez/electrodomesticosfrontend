import React from 'react';
import Container from 'react-bootstrap/Container';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import '../styles/Map.css';

const Map = () => {
  const containerStyle = {
    width: '95%',
    height: '450px',
    position: 'relative',
    bottom: '0',
    margin: '10px',
    zIndex: '1000',
    className: 'ssdsda'
  };

  // Centro inicial del mapa
  const center = {
    lat: -34.603722,
    lng: -58.381592
  };

  const apiKey = 'AIzaSyDBxamkSMpwT5cBkdexPjWS64a-4iw8uDs'; // clave de API

  return (
    <>
      <Container className='googlemaps'>
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </Container>
    </>
  );
};

export default Map;