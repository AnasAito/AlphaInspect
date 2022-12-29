import React, { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function ArChart({ data }) {
  //const skillName = 'Machine learning'
  console.log('ts data - ', data);
  return (
    <AreaChart
      width={500}
      height={400}
      data={data}
      // margin={{
      //   top: 10,
      //   right: 30,
      //   left: 0,
      //   bottom: 0,
      // }}
    >
      <XAxis dataKey="year" />
      <YAxis type="number" domain={['dataMin - 1', 'dataMax + 1']} />
      <Tooltip />

      <defs>
        <linearGradient id="num_of_publications" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#EA580D" stopOpacity={0.5} />
          <stop offset="95%" stopColor="#EA580D" stopOpacity={0} />
        </linearGradient>
      </defs>

      <Area
        // type="monotone"
        strokeWidth={3}
        dataKey="num_of_publications"
        stroke="#EA580D"
        fillOpacity={1}
        fill="url(#num_of_publications)"
      />
    </AreaChart>
  );
}
