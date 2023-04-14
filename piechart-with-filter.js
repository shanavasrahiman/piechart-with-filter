import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

function App() {
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    fetch("https://api.npoint.io/337776b8c56f51424f0b")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF19A6"
  ];

  const filteredData =
    selectedType === "All" ? data : data.filter((d) => d.type === selectedType);

  const uniqueTypes = ["All", ...new Set(data.map((d) => d.type))];

  const colorMap = {};
  uniqueTypes.forEach((type, index) => {
    colorMap[type] = COLORS[index % COLORS.length];
  });

  return (
    <div className="App">
      <div>
        <label htmlFor="type">Filter by Type: </label>
        <select
          name="type"
          id="type"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <PieChart width={800} height={400}>
        <Pie
          dataKey="value"
          nameKey="type"
          isAnimationActive={false}
          data={filteredData}
          cx={400}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {filteredData.map((entry) => (
            <Cell
              key={`cell-${entry.type}`}
              fill={colorMap[entry.type]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default App;
