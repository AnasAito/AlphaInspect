import React, { useEffect, useState } from 'react';
// import { csv } from "d3-fetch";
import { scaleLinear } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup,
  Marker,
} from 'react-simple-maps';

const geoUrl = '/features.json';

const colorScale = scaleLinear().domain([0, 30]).range(['#ffedea', '#ff5233']);
const markers = [
  {
    markerOffset: -15,
    name: 'Buenos Aires',
    coordinates: [-58.3816, -34.6037],
  },
  { markerOffset: -15, name: 'La Paz', coordinates: [-68.1193, -16.4897] },
  { markerOffset: 25, name: 'Brasilia', coordinates: [-47.8825, -15.7942] },
  { markerOffset: 25, name: 'Santiago', coordinates: [-70.6693, -33.4489] },
  { markerOffset: 25, name: 'Bogota', coordinates: [-74.0721, 4.711] },
  { markerOffset: 25, name: 'Quito', coordinates: [-78.4678, -0.1807] },
  { markerOffset: -15, name: 'Georgetown', coordinates: [-58.1551, 6.8013] },
  { markerOffset: -15, name: 'Asuncion', coordinates: [-57.5759, -25.2637] },
  { markerOffset: 25, name: 'Paramaribo', coordinates: [-55.2038, 5.852] },
  { markerOffset: 25, name: 'Montevideo', coordinates: [-56.1645, -34.9011] },
  { markerOffset: -15, name: 'Caracas', coordinates: [-66.9036, 10.4806] },
  { markerOffset: 15, name: 'Lima', coordinates: [-77.0428, -12.0464] },
  //43.52625162025763, 5.451652403792723
  // {
  //   markerOffset: -15,
  //   name: 'Aix-en-Provence',
  //   coordinates: [5.451652403792723, 43.52625162025763],
  // },
  //43.2964994458051, 5.369992924724782
  {
    markerOffset: -15,
    name: 'Marseille',
    coordinates: [5.369992924724782, 43.2964994458051],
  },
  //45.771488825074925, 4.836601733112306
  {
    markerOffset: -15,
    name: 'Lyon',
    coordinates: [4.836601733112306, 45.771488825074925],
  },
];
const data_dummy = [
  { count: 2, ISO3: 'DZA', name: 'Algeria' },
  { count: 5, ISO3: 'AGO', name: 'Angola' },
  { count: 39, ISO3: 'FRA', name: 'France' },
  { count: 19, ISO3: 'USA', name: 'USA' },
  { count: 10, ISO3: 'ITA', name: 'Italy' },
  { count: 3, ISO3: 'JPN', name: 'Japan' },
  { count: 10, ISO3: 'CHN', name: 'China' },
];
const Map = ({ setTooltipContent }) => {
  const [data, setData] = useState(data_dummy);
  const [scaleFactor, setScaleFactor] = useState(1);

  //   useEffect(() => {
  //     csv(`/vulnerability.csv`).then((data) => {
  //       setData(data);

  //     });
  //   }, []);

  return (
    <div>
      <ComposableMap
        data-tip=""
        className="bg-indigo-100 rounded-md shadow-lg"
        //   projectionConfig={{
        //     rotate: [-10, 0, 0],
        //     scale: 147,
        //   }}
      >
        {/* <Sphere stroke="#E4E5E6" strokeWidth={0.5} /> */}
        {/* <Graticule stroke="#E4E5E6" strokeWidth={0.5} /> */}
        {data.length > 0 && (
          <ZoomableGroup
            onMove={({ zoom }) => {
              setScaleFactor(zoom);
              console.log(scaleFactor);
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const d = data.find((s) => s.ISO3 === geo.id);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltipContent(
                          d ? `${d['name']}:  ${d['count']} targets ` : ''
                        );
                      }}
                      onMouseLeave={() => {
                        setTooltipContent('');
                      }}
                      style={{
                        default: {
                          fill: d ? colorScale(d['count']) : '#fff',
                          outline: 'none',
                        },
                        hover: {
                          fill: '#F53',
                          outline: 'none',
                        },
                        pressed: {
                          fill: '#E42',
                          outline: 'none',
                        },
                      }}
                      // fill={d ? colorScale(d['2017']) : '#fff'}
                    />
                  );
                })
              }
            </Geographies>
            {markers.map(({ name, coordinates, markerOffset }) => (
              <Marker key={name} coordinates={coordinates}>
                <circle r={1} fill="#F00" stroke="#fff" />
                <text
                  textAnchor="middle"
                  // y={parseInt(markerOffset / scaleFactor)}
                  style={{
                    fontSize: `${Math.min(parseInt(1 * scaleFactor), 2)}px`,
                    fill: '#5D5A6D',
                  }}
                >
                  {name}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        )}
      </ComposableMap>
    </div>
  );
};

const MapChart = () => {
  // const [data, setData] = useState(data_dummy);
  const [content, setContent] = useState('');
  //   useEffect(() => {
  //     csv(`/vulnerability.csv`).then((data) => {
  //       setData(data);

  //     });
  //   }, []);

  return (
    <div>
      <Map setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
};

export default MapChart;
