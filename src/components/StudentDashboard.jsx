// StudentDashboard.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentDashboard({ packages }) {
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Student Dashboard</h1>
            <div className="row">
                {packages.map((pkg, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="card mb-4">
                            <img src="/placeholder-package.jpg" className="card-img-top" alt="Package" />
                            <div className="card-body">
                                <h5 className="card-title">{pkg.name}</h5>
                                <p className="card-text">Phone: {pkg.phone}</p>
                                <p className="card-text">Date Delivered: {pkg.dateDelivered}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StudentDashboard;