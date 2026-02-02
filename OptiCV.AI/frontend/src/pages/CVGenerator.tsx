import React, { useState } from 'react';
import CVForm from '../components/CVForm';

const CVGenerator: React.FC = () => {
    const [cvData, setCvData] = useState({
        name: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        skills: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCvData({ ...cvData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to handle CV submission goes here
        console.log('CV Data Submitted:', cvData);
    };

    return (
        <div className="cv-generator">
            <h1>Generate Your CV</h1>
            <CVForm cvData={cvData} onChange={handleChange} onSubmit={handleSubmit} />
        </div>
    );
};

export default CVGenerator;