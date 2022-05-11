import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import styles from './Chart.module.css';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, BarElement, BarController } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, BarElement, BarController);

const ChartData = ({data: {confirmed, deaths, recovered}, country}) => {

    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchMyAPI = async () => {
          const initialDailyData = await fetchDailyData();
    
          setDailyData(initialDailyData);
        };
        
        fetchMyAPI();
      }, []);
      
      const barChart = (
        confirmed ? (
          <Bar
            data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                  data: [confirmed.value, recovered.value, deaths.value],
                },
              ],
            }}
            options={{
              legend: { display: true },
              title: { display: true, text: `Current state in ${country}` },
            }}
          />
        ) : null
      );

      const lineChart = (
        dailyData[0] ? (
          <Line
            data={{
                labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                datasets: [{
                  label: 'Infected',
                  showLine: true,
                  data: dailyData.map(({ confirmed }) => confirmed ),
                  borderColor: '#3333ff',
                  fill: true,
                }, {
                  data: dailyData.map(({ deaths }) => deaths ),
                  label: 'Deaths',
                  showLine: true,
                  borderColor: 'red',
                  backgroundColor: 'rgba(255, 0, 0, 0.3)',
                  fill: true,
                },
                ],
              }}
          />
        ) : null
      );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default ChartData;
