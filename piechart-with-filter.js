import { Line, Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.npoint.io/06efddd350d6174b2aac')
      .then(response => response.json())
      .then(data => setData(data))
  }, []);

  const [selectedYear, setSelectedYear] = useState('All');

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  }

  const filteredData = selectedYear === 'All' ? data : data.filter(item => item.year === selectedYear);

  return (
    <div className="App">
      <div>
        <label htmlFor="year-select">Select Year: </label>
        <select id="year-select" value={selectedYear} onChange={handleYearChange}>
          <option value="All">All</option>
          {data.map(item => (
            <option key={item.year} value={item.year}>{item.year}</option>
          ))}
        </select>
      </div>
      <ComposedChart width={800} height={400} data={filteredData}>
        <XAxis dataKey="year" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <CartesianGrid stroke="#f5f5f5" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="revenue" barSize={20} fill="#413ea0" />
        <Line yAxisId="right" type="monotone" dataKey="materialization" stroke="#8884d8" />
      </ComposedChart>
    </div>
  );
}

export default App;
