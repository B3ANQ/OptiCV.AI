import React, { ChangeEvent, FormEvent } from 'react';

interface CVFormProps {
  cvData: {
    name: string;
    email: string;
    phone: string;
    education: string;
    experience: string;
    skills: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const CVGenerator: React.FC<CVFormProps> = ({ cvData, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="cv-form">
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={cvData.name}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={cvData.email}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={cvData.phone}
          onChange={onChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Education:</label>
        <textarea
          name="education"
          value={cvData.education}
          onChange={onChange}
          rows={4}
          required
        />
      </div>

      <div className="form-group">
        <label>Experience:</label>
        <textarea
          name="experience"
          value={cvData.experience}
          onChange={onChange}
          rows={4}
          required
        />
      </div>

      <div className="form-group">
        <label>Skills:</label>
        <textarea
          name="skills"
          value={cvData.skills}
          onChange={onChange}
          rows={3}
          required
        />
      </div>

      <button type="submit">Generate CV</button>
    </form>
  );
};

export default CVGenerator;