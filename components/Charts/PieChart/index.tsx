import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomPieChart: React.FC<any> = ({ data }) => {
  function getRandomColor() {
    // Generate random numbers for red, green, and blue values (0-255)
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Convert values to hex string (optional)
    return `rgb(${r}, ${g}, ${b})`; // Or  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

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
          fill={getRandomColor()}
          dataKey="value"
        >
          {data?.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={getRandomColor()} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
