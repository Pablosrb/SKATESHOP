import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Importante: Estilos del mapa
import '../styles/SkateparksPage.css';

// --- ARREGLO PARA ICONOS DE LEAFLET EN REACT ---
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;
// -----------------------------------------------

// Datos de ejemplo (Skateparks en Málaga)
const skateparks = [
    { id: 1, name: "Skatepark Málaga (Rubén Alcántara)", coords: [36.7385, -4.4534], desc: "El mejor park de la ciudad. Bowl increíble." },
    { id: 2, name: "Skatepark Rincón de la Victoria", coords: [36.7171, -4.2753], desc: "Pequeño pero divertido, frente al mar." },
    { id: 3, name: "Skatepark Fuengirola", coords: [36.5363, -4.6226], desc: "Mucha calle y módulos variados." },
];

const SkateparksPage: React.FC = () => {
  // Coordenadas iniciales (Centro de Málaga)
  const defaultCenter: [number, number] = [36.7213, -4.4214];

  return (
    <div className="skateparks-container">
      <div className="text-content">
        <h1>📍 Encuentra tu Spot</h1>
        <p>Explora los mejores skateparks de la zona. Haz clic en los marcadores para ver más info.</p>
        <p className="subtitle">¿Conoces algún spot secreto? ¡Escríbenos para añadirlo!</p>
      </div>

      <div className="map-wrapper">
        <MapContainer center={defaultCenter} zoom={11} scrollWheelZoom={true} className="leaflet-map">
          {/* Capa del mapa (El diseño visual) */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marcadores */}
          {skateparks.map(park => (
            <Marker key={park.id} position={park.coords as [number, number]}>
              <Popup>
                <strong>{park.name}</strong> <br /> 
                {park.desc}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default SkateparksPage;