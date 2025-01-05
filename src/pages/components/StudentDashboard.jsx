import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';  // Import axios
import './style/StudentDashboard.css'
import './style/Dashboard.css'

function StudentDashboard() {
    const [packages, setPackages] = useState([]);  // To store the fetched packages
    const [loading, setLoading] = useState(true);   // To manage loading state
    const [error, setError] = useState(null);       // To handle any errors

    useEffect(() => {
      
        const studentName = sessionStorage.getItem('studentName');  // assuming student name is stored in localStorage

        if (!studentName) {
            setError("Student name is not available.");
            setLoading(false);
            return;
        }

        // Fetch the packages for the student from your API
        axios
            .get(`http://localhost:5000/api/packages/${studentName}`)  // Replace with your actual API URL
            .then((response) => {
                setPackages(response.data);  // Update the packages state with the response data
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch packages.");
                setLoading(false);
            });
    }, []);   // Empty dependency array to run only on component mount

    return (
        <div className='dashboard-container'>
            <h1  >Package Dashboard</h1>

            {loading && <p>Loading...</p>}  {/* Show loading message while fetching data */}
            {error && <p>{error}</p>}      {/* Show error message if the API request fails */}

            <div className='package-card'>
                {packages.length > 0 ? (
                    packages.map((pkg, index) => (
                        <div   key={index}>
                            <div >
                                <img src={`http://localhost:5000${pkg.image} `|| '/placeholder-package.jpg'}   alt="Package" />
                                <div className="card-body">
                                    <h5  >{pkg.name}</h5>
                                    <p  >Phone: {pkg.phone}</p>
                                    <p  >Date Delivered: {pkg.dateDelivered.split("T")[0]}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No packages found.</p>   
                )};
            </div>
        </div>
    );
}

export default StudentDashboard;
