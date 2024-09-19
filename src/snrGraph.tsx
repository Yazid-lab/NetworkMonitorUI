import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const SNRMarginGraph: React.FC = () => {
    const {id} = useParams<{id:string}>()
  const [data, setData] = useState<{ time: string; snrMargin: number }[]>([]);

  useEffect(() => {
/*     // Simulate real-time data updates
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString();
      const newSNRMargin = Math.floor(Math.random() * 10) + 10; // Simulated value

      setData((prevData) => [
        ...prevData,
        { time: newTime, snrMargin: newSNRMargin }
      ].slice(-6)); // Keep only the last 10 data points
    }, 6000);

    return () => clearInterval(interval); */
    const fetchSNRMargin = async () => {
        try {
          const ipAddress = `192.168.10.2${id}`;
          const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:8080/api/snmp/snrMargin",
            headers: {
              "Content-type": "text/plain",
            },
            data: ipAddress,
          };
          const response = await axios(config);
            `http://localhost:8080/api/snmp/snrMargin`
            console.log(response.data)
          const newTime = new Date().toLocaleTimeString();
          const newSNRMargin = response.data; // Adjust based on your API response

          setData((prevData) =>
            [...prevData, { time: newTime, snrMargin: newSNRMargin }].slice(-10)
          ); // Keep only the last 10 data points
        } catch (error) {
          console.error('Error fetching SNR margin:', error);
        }
      };
  
      fetchSNRMargin(); // Fetch once immediately
  
      const interval = setInterval(fetchSNRMargin, 6000); // Fetch every 6 seconds
  
      return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    
    <ResponsiveContainer width="50%" height={500}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" label={{ value: 'Time', position: 'insideBottomRight', offset: -5 }} reversed />
        <YAxis label={{ value: 'SNR Margin', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Line type="linear" dataKey="snrMargin" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SNRMarginGraph;
