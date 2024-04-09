"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const App = () => {
  const [xdata, setxData] = useState([]);
  const [ydata, setyData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const xresponse = await axios.get('https://retoolapi.dev/gDa8uC/data');
        setxData(xresponse.data); // Assuming your API returns an array of data
        const yresponse = await axios.get('https://retoolapi.dev/gDa8uC/data');
        setyData(yresponse.data); // Assuming your API returns an array of data

        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const xValues = xdata.sort((a: any,b: any)=> a.id - b.id).slice(0, 50).map((entry: any) => entry.RandomNumber);
  const yValues = ydata.sort((a: any,b: any)=> a.id - b.id).slice(0, 50).map((entry: any) => entry.RandomNumber);
  const xLabels = xdata.sort((a: any,b: any)=> a.id - b.id).slice(0, 50).map((entry: any) => entry.Label)
  const yLabels = ydata.sort((a: any,b: any)=> a.id - b.id).slice(0, 50).map((entry: any) => entry.Label)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: 'Plotter Y vs X',
      },
    },
  };
  const chartData = {
    labels: xLabels,
    datasets: [
      {
        label: 'Y vs X',
        data: yValues,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };
  

  return (
    <div className="App">
      <h1>Coordinate Plotter</h1>
      <Line className='graph' data={chartData} options={options} updateMode='resize' style={{width: '70vw', height: '60vh'}} />
    </div>
  );
};

export default App;
