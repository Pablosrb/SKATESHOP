import React, { useState } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import '@/styles/SkateparksPage.css';

const skateparks = [
    { 
        id: 1, 
        name: "Skatepark Málaga (Rubén Alcántara)", 
        anchor: [36.7385, -4.4534] as [number, number], 
        desc: "El templo. Bowl de competición y zona street pro." 
    },
    { 
        id: 2, 
        name: "Skatepark Rincón de la Victoria", 
        anchor: [36.7171, -4.2753] as [number, number], 
        desc: "Pequeño, frente al mar. Vistas increíbles." 
    },
    { 
        id: 3, 
        name: "Skatepark Torre del Mar", 
        anchor: [36.7397, -4.0934] as [number, number], 
        desc: "Módulos variados y bastante amplio." 
    },
    { 
        id: 4, 
        name: "Skatepark Fuengirola", 
        anchor: [36.5363, -4.6226] as [number, number], 
        desc: "Ignacio Echeverría. Muy completo y céntrico." 
    },
    { 
        id: 5, 
        name: "Skatepark Marbella (Trapiche)", 
        anchor: [36.5178, -4.8805] as [number, number], 
        desc: "Renovado y con buenas líneas." 
    },
    { 
        id: 6, 
        name: "Skatepark Alhaurín de la Torre", 
        anchor: [36.6668, -4.5598] as [number, number], 
        desc: "Diseño moderno y muy divertido." 
    },
    { 
        id: 7, 
        name: "Skatepark San Rafael", 
        anchor: [36.7078, -4.4515] as [number, number], 
        desc: "Spot local en Cruz de Humilladero. Módulos de calle y ambiente urbano." 
    }
];

const SkateparksPage: React.FC = () => {
  const [center, setCenter] = useState<[number, number]>([36.6500, -4.5000]); 
  const [zoom, setZoom] = useState(10);

  return (
    <div className="skateparks-container">
      <div className="text-content">
        <h1>Mapa de Spots</h1>
        <p>Descubre los mejores skateparks de la Costa del Sol.</p>
      </div>

      <div className="map-wrapper">
        <Map 
            height={550} 
            center={center} 
            zoom={zoom} 
            onBoundsChanged={({ center, zoom }) => { 
                setCenter(center); 
                setZoom(zoom); 
            }}
        >
          {skateparks.map(park => (
             <Marker 
                key={park.id} 
                width={40} 
                anchor={park.anchor} 
                color="#ff4d00" 
                onClick={() => alert(`${park.name}\n\n${park.desc}`)}
             />
          ))}

          
          {skateparks.map(park => (
            <Overlay key={'ov-' + park.id} anchor={park.anchor} offset={[0, 30]}>
              <div className="map-label" style={{
                  background: 'white', 
                  padding: '3px 6px', 
                  borderRadius: '4px', 
                  fontSize: '11px', 
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: '1px solid #ddd'
              }}>
                {park.name}
              </div>
            </Overlay>
          ))}
        </Map>
      </div>
    </div>
  );
};

export default SkateparksPage;