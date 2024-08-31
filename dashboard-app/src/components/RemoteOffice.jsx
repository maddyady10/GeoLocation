import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles/RemoteOffice.css'; // Optional: Create a CSS file for styling
import Layout from './Layout';

function RemoteOffice() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        remoteOfficeName: '',
        latitude: '',
        longitude: '',
        radius: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        // Handle form submission here
        console.log('Form data submitted:', formData);
        navigate('/remote-access'); // Navigate back to RemoteAccess after submission
    };

    return (
        <Layout>
            <div className="remote-office">
                <h2>Add Remote Office</h2>
                <form>
                    <label>
                        Remote Office Name:
                        <input
                            type="text"
                            name="remoteOfficeName"
                            value={formData.remoteOfficeName}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Latitude:
                        <input
                            type="number"
                            step="0.0001"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Longitude:
                        <input
                            type="number"
                            step="0.0001"
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Radius (meters):
                        <input
                            type="number"
                            name="radius"
                            value={formData.radius}
                            onChange={handleChange}
                        />
                    </label>
                    <div className="form-buttons">
                        <button type="button" onClick={handleSubmit}>Add</button>
                        <button type="button" onClick={() => navigate('/remote-access')}>Cancel</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default RemoteOffice;
