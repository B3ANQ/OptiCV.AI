import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { getUserProfile, updateUserProfile } from '../services/api';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                setUser(response.user);
                setFormData({
                    firstName: response.user.firstName,
                    lastName: response.user.lastName,
                    email: response.user.email,
                });
            } catch (err) {
                setError('Failed to load user profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await updateUserProfile(formData);
            alert('Profile updated successfully');
        } catch (err) {
            setError('Failed to update profile');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;