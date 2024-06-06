import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const COLORS = ["#0088FE", "#00C49F"];

const CustomPieChart: React.FC<any> = ({ data }) => {
  function getRandomColor() {
    // Generate random numbers for red, green, and blue values (0-255)
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Convert values to hex string (optional)
    return `rgb(${r}, ${g}, ${b})`; // Or  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  const random = Math.floor(Math.random() * COLORS.length);
  console.log(random, COLORS[random]);

  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          //   label={renderCustomizedLabel}
          outerRadius={"100%"}
          innerRadius={"50%"}
          // fill={getRandomColor()}
          fill={COLORS[random]}
          dataKey="value"
        >
          {data?.map((entry: any, index: number) => (
            <Cell
              key={`cell-${index}`}
              // fill={entry.color || getRandomColor()}
              // fill={"rgb(0,0,255)"}
              fill={COLORS[random]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
