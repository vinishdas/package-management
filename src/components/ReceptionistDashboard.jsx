// ReceptionistDashboard.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ReceptionistDashboard({ onAddPackage, onFilterPackages }) {
    const [newPackage, setNewPackage] = useState({ name: '', phone: '', dateDelivered: '' });
    const [filterDate, setFilterDate] = useState('');

    const handleAddPackage = (e) => {
        e.preventDefault();
        onAddPackage(newPackage);
        setNewPackage({ name: '', phone: '', dateDelivered: '' });
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Receptionist Dashboard</h1>

            {/* Add New Package Form */}
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Add New Package</h5>
                    <form onSubmit={handleAddPackage}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newPackage.name}
                                onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newPackage.phone}
                                onChange={(e) => setNewPackage({ ...newPackage, phone: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Date Delivered</label>
                            <input
                                type="date"
                                className="form-control"
                                value={newPackage.dateDelivered}
                                onChange={(e) => setNewPackage({ ...newPackage, dateDelivered: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Package</button>
                    </form>
                </div>
            </div>

            {/* Filter and Display Buttons */}
            <div className="d-flex justify-content-between mb-4">
                <button className="btn btn-secondary" onClick={() => onFilterPackages('undelivered')}>List All Undelivered Packages</button>
                <div>
                    <input
                        type="date"
                        className="form-control d-inline-block me-2"
                        style={{ width: 'auto' }}
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                    <button
                        className="btn btn-secondary"
                        onClick={() => onFilterPackages('delivered', filterDate)}
                    >
                        Display Delivered Packages by Date
                    </button>
                </div>
            </div>

            {/* Package Cards */}
            <div className="row">
                {/* Example card - Replace with dynamic packages later */}
                <div className="col-md-4">
                    <div className="card mb-4">
                        <img src="/placeholder-package.jpg" className="card-img-top" alt="Package" />
                        <div className="card-body">
                            <h5 className="card-title">Package Name</h5>
                            <p className="card-text">Phone: 1234567890</p>
                            <p className="card-text">Date Delivered: 2024-12-18</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReceptionistDashboard;