import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



function ReceptionistDashboard() {

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Set to true if you want to use 12-hour format (AM/PM)
    };
  
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', options).replace(',', '');
  };
  

  const [newPackage, setNewPackage] = useState({
    name: '',
    phone: '',
    dateDelivered: '',
    image: null,  // Image file to be uploaded
  });
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle image file input change
  const handleFileChange = (e) => {
    setNewPackage({ ...newPackage, image: e.target.files[0] });
  };

  // Handle form submission to add a package
  const handleAddPackage = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the data as multipart/form-data
    const formData = new FormData();
    formData.append('name', newPackage.name);
    formData.append('phone', newPackage.phone);
    formData.append('dateDelivered', newPackage.dateDelivered);
    formData.append('image', newPackage.image);  // Append image file to formData

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/packages', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Ensure content type is set for file upload
        },
      });
      alert(response.data.message);  // Show response message
      setLoading(false);  // Reset loading state
    } catch (err) {
      setLoading(false);
      setError('Failed to add package');
      console.error(err);
    }
  };

  // Fetch all packages from the backend
  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/all-packages');
      setPackages(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Failed to fetch packages');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Receptionist Dashboard</h1>

      {/* Form to add a new package */}
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
            type="tel"
            className="form-control"
            pattern="[0-9]{10}"
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
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Package'}
        </button>
      </form>

      {/* View all packages */}
      <hr />
      <h2 className="mt-4">View All Packages</h2>
      <button className="btn btn-info" onClick={fetchPackages} disabled={loading}>
        {loading ? 'Loading Packages...' : 'Fetch Packages'}
      </button>

      {error && <p className="text-danger">{error}</p>}
      
      <div className="row mt-4">
        {packages.length > 0 ? (
          packages.map((pkg, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4">
                <img src={`http://localhost:5000${pkg.image}`} className="card-img-top" alt="Package" />
                <div className="card-body">
                  <h5 className="card-title">{pkg.name}</h5>
                  <p className="card-text">Phone: {pkg.phone}</p>
                  <p className="card-text">Date Delivered: {formatDate(pkg.dateDelivered)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No packages found.</p>
        )}
      </div>
    </div>
  );
}

export default ReceptionistDashboard;
