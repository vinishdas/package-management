import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';  // Import axios

function StudentDashboard() {
    const [packages, setPackages] = useState([]);  // To store the fetched packages
    const [loading, setLoading] = useState(true);   // To manage loading state
    const [error, setError] = useState(null);       // To handle any errors

    useEffect(() => {
        // Get the student's name from localStorage (this can be changed based on your logic)
        const studentName = localStorage.getItem('studentName'); // assuming student name is stored in localStorage

        if (!studentName) {
            setError("Student name is not available.");
            setLoading(false);
            return;
        }

        // Fetch the packages for the student from your API (adjust the URL based on your backend)
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
    }, []);  // Empty dependency array to run only on component mount

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Student Dashboard</h1>

            {loading && <p>Loading...</p>}  {/* Show loading message while fetching data */}
            {error && <p>{error}</p>}      {/* Show error message if the API request fails */}

            <div className="row">
                {packages.length > 0 ? (
                    packages.map((pkg, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card mb-4">
                                <img src={pkg.image || '/placeholder-package.jpg'} className="card-img-top" alt="Package" />
                                <div className="card-body">
                                    <h5 className="card-title">{pkg.name}</h5>
                                    <p className="card-text">Phone: {pkg.phone}</p>
                                    <p className="card-text">Date Delivered: {pkg.dateDelivered}</p>
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
