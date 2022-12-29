import React, { PureComponent } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
const data01 = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];
export default function ScChart({ data }) {
  //const skillName = 'Machine learning'

  return (
    <ScatterChart
      width={550}
      height={400}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      {/* <CartesianGrid /> */}
      <XAxis type="number" dataKey="x" name="team size" />
      <YAxis
        type="number"
        dataKey="y"
        name="nbr of publications"
        // label="nbr of publications"
      />
      <ZAxis
        type="number"
        dataKey="z"
        range={[60, 400]}
        name="revenue"
        unit="$"
      />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      {/* <Legend /> */}

      <Scatter name="A school" data={data01} fill="#EA580D" />
    </ScatterChart>
  );
}
