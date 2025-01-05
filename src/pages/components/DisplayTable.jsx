import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/DisplayTable.css'

function DisplayTable({ tableName }) {
  const [data, setData] = useState([]);  // Store the fetched table data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  // Fetch data based on the tableName prop
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;

        // Set the API URL based on the tableName
        if (tableName === 'student-table') {
          url = 'http://localhost:5000/api/admin/student-table';
        } else if (tableName === 'teacher-table') {
          url = 'http://localhost:5000/api/admin/teacher-table';
        } else if (tableName === 'receptionist-table') {
          url = 'http://localhost:5000/api/admin/receptionist-table';
        } else {
          throw new Error('Invalid table name');
        }

        // Send the API request to the backend
        const response = await axios.get(url);
        
        // Update state with the fetched data
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
        console.error(err);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [tableName]);  // Depend on tableName to refetch when the table changes

  // Render the loading, error, or table data
  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Render the table based on the data
  return (
    <div className='fancy-table-container'>
      <h2>{tableName.replace('-', ' ').toUpperCase()} Data</h2>
      <table className='fancy-table'>
        <thead>
          <tr>
            {/* Render headers based on the table data structure */}
            {data.length > 0 && Object.keys(data[0]).map((key) => (
              <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render each row based on the data */}
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayTable;
