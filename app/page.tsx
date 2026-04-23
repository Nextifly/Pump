'use client';

import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const TIME_RANGES = ['1 мин', '15 мин', '30 мин', '1 ч', '4 ч', '12 ч', '1 д', '1 нед'];

export default function ResourceChart() {
  const [activeRange, setActiveRange] = useState('1 мин');

  const labels = ["18:52", "21:17", "23:42", "02:07", "04:32", "06:57", "09:22", "11:47", "14:12", "16:37", "19:02", "21:27", "23:52", "02:17"];
  
  // Данные (для примера)
  const amortizationData = labels.map(() => 85 + Math.random() * 5);
  const resourceData = labels.map(() => 150 + Math.random() * 30);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Амортизация (%)',
        data: amortizationData,
        borderColor: 'rgba(20, 160, 130, 1)',
        backgroundColor: 'rgba(20, 160, 130, 0.4)',
        fill: 'origin',
        yAxisID: 'yPercentage',
        tension: 0,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'resource (ч)',
        data: resourceData,
        borderColor: 'rgba(120, 40, 100, 1)',
        backgroundColor: 'rgba(120, 40, 100, 0.4)',
        fill: 'origin',
        yAxisID: 'yHours',
        tension: 0,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: '#aaa', boxWidth: 40, padding: 20 },
      },
    },
    scales: {
      x: {
        grid: { color: '#333' },
        ticks: { color: '#aaa', maxRotation: 45, minRotation: 45 },
      },
      yPercentage: {
        type: 'linear' as const,
        position: 'left' as const,
        min: 0,
        max: 100,
        ticks: { color: '#aaa', stepSize: 7, callback: (val: any) => val + '%' },
        grid: { color: '#333' },
      },
      yHours: {
        type: 'linear' as const,
        position: 'right' as const,
        min: 0,
        max: 1708,
        ticks: { color: '#aaa', stepSize: 122, callback: (val: any) => val + ' ч' },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div style={{ 
      background: '#1a1a1a', 
      padding: '20px', 
      borderRadius: '8px', 
      height: '500px', 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: "296px"
    }}>
      {/* Контейнер графика */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <Line data={data} options={options} />
      </div>

      {/* Панель кнопок */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: '20px', 
        background: '#121212', 
        padding: '10px', 
        borderRadius: '8px'
      }}>
        {TIME_RANGES.map((range) => (
          <button
            key={range}
            onClick={() => setActiveRange(range)}
            style={{
              padding: '10px 20px',
              border: 'none',
              background: activeRange === range ? '#333' : 'transparent',
              color: activeRange === range ? '#fff' : '#888',
              cursor: 'pointer',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: activeRange === range ? 'bold' : 'normal',
              transition: 'all 0.2s'
            }}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
}