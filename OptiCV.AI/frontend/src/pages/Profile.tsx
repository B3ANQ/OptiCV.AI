import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../services/api';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        // Add other fields as necessary
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);
                setFormData({
                    name: userData.name,
                    email: userData.email,
                    // Populate other fields as necessary
                });
            } catch (err) {
                setError('Failed to load user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(formData);
            alert('Profile updated successfully');
        } catch (err) {
            setError('Failed to update profile');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Profile</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                {/* Add other fields as necessary */}
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;