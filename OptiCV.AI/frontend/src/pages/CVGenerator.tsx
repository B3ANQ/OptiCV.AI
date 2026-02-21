import React, { useState, ChangeEvent, FormEvent } from 'react';
import { createCV } from '../services/api';
import Header from '../components/Header';

const CVGenerator: React.FC = () => {
  const [cvData, setCvData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '', // Ville, Code postal
    linkedin: '',
    github: '',
    education: '',
    projects: '', // NOUVEAU: Projets scolaires/personnels
    experience: '',
    hardSkills: '', // Compétences techniques
    softSkills: '', // Compétences comportementales
    languages: '', // Langues avec niveau CECRL
    drivingLicenses: [] as string[], // Permis de conduire
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCvData({ ...cvData, [name]: value });
  };

  const handleDrivingLicenseChange = (license: string) => {
    setCvData(prev => ({
      ...prev,
      drivingLicenses: prev.drivingLicenses.includes(license)
        ? prev.drivingLicenses.filter(l => l !== license)
        : [...prev.drivingLicenses, license]
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validation du fichier
      if (!file.type.startsWith('image/')) {
        setError('Veuillez sélectionner une image valide');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB max
        setError('La taille de l\'image ne doit pas dépasser 5MB');
        return;
      }

      setProfilePicture(file);
      
      // Créer une preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
    setProfilePicturePreview(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      // TODO: Créer un FormData pour envoyer les données du CV + la photo
      const formData = new FormData();
      formData.append('name', cvData.name);
      formData.append('email', cvData.email);
      formData.append('phone', cvData.phone);
      formData.append('location', cvData.location);
      formData.append('linkedin', cvData.linkedin);
      formData.append('github', cvData.github);
      formData.append('education', cvData.education);
      formData.append('projects', cvData.projects);
      formData.append('experience', cvData.experience);
      formData.append('hard_skills', cvData.hardSkills);
      formData.append('soft_skills', cvData.softSkills);
      formData.append('languages', cvData.languages);
      formData.append('driving_licenses', JSON.stringify(cvData.drivingLicenses));
      
      if (profilePicture) {
        formData.append('profile_picture', profilePicture);
      }

      // TODO: Modifier la fonction createCV dans api.ts pour accepter FormData
      // await createCV(formData);
      await createCV(cvData); // Temporaire - à remplacer par la ligne ci-dessus

      setSuccess(true);
      // Reset form
      setCvData({
        name: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        education: '',
        projects: '',
        experience: '',
        hardSkills: '',
        softSkills: '',
        languages: '',
        drivingLicenses: [],
      });
      setProfilePicture(null);
      setProfilePicturePreview(null);
    } catch (err) {
      setError('Erreur lors de la génération du CV. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="page-content">
          <div className="contact-container">
            <div className="contact-header">
              <h1>Générateur de CV</h1>
              <p>Remplissez le formulaire ci-dessous pour générer votre CV optimisé</p>
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && (
              <div className="success-message">
                CV généré avec succès !
              </div>
            )}

            <div className="contact-form-section">
              <form onSubmit={handleSubmit} className="contact-form">
                {/* Photo de profil */}
                <div className="form-group photo-upload-section">
                  <label>Photo de profil (optionnelle)</label>
                  <div className="photo-upload-container">
                    {profilePicturePreview ? (
                      <div className="photo-preview">
                        <img src={profilePicturePreview} alt="Aperçu photo de profil" />
                        <button 
                          type="button" 
                          onClick={removeProfilePicture}
                          className="remove-photo-btn"
                          aria-label="Supprimer la photo"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <label htmlFor="profile-picture" className="photo-upload-box">
                        <div className="upload-icon">📷</div>
                        <p>Cliquez pour ajouter une photo</p>
                        <span className="upload-hint">PNG, JPG jusqu'à 5MB</span>
                      </label>
                    )}
                    <input
                      type="file"
                      id="profile-picture"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>

                {/* Informations personnelles */}
                <div className="form-section">
                  <h3 className="form-section-title">Informations personnelles</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Nom complet *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={cvData.name}
                        onChange={handleChange}
                        required
                        placeholder="Jean Dupont"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={cvData.email}
                        onChange={handleChange}
                        required
                        placeholder="jean.dupont@email.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Téléphone *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={cvData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="location">Localisation *</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={cvData.location}
                        onChange={handleChange}
                        required
                        placeholder="Lyon, 69000"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="linkedin">LinkedIn</label>
                      <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        value={cvData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/votre-profil"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="github">GitHub</label>
                      <input
                        type="url"
                        id="github"
                        name="github"
                        value={cvData.github}
                        onChange={handleChange}
                        placeholder="https://github.com/votre-username"
                      />
                    </div>
                  </div>

                  {/* Permis de conduire */}
                  <div className="form-group">
                    <label>Permis de conduire</label>
                    <div className="checkbox-group">
                      {['A', 'A1', 'A2', 'B', 'BE', 'C', 'CE', 'D'].map(license => (
                        <label key={license} className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={cvData.drivingLicenses.includes(license)}
                            onChange={() => handleDrivingLicenseChange(license)}
                          />
                          <span>Permis {license}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Formation */}
                <div className="form-section">
                  <h3 className="form-section-title">Formation</h3>
                  <div className="form-group">
                    <label htmlFor="education">Parcours académique *</label>
                    <textarea
                      id="education"
                      name="education"
                      value={cvData.education}
                      onChange={handleChange}
                      rows={4}
                      required
                      placeholder="Exemple:&#10;2020-2023 : Master en Informatique - Université de Lyon&#10;2017-2020 : Licence Informatique - Université de Lyon"
                    />
                  </div>
                </div>

                {/* Projets */}
                <div className="form-section">
                  <h3 className="form-section-title">Projets</h3>
                  <div className="form-group">
                    <label htmlFor="projects">Projets scolaires ou personnels</label>
                    <textarea
                      id="projects"
                      name="projects"
                      value={cvData.projects}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Exemple:&#10;Application mobile de gestion de budget (React Native, Firebase)&#10;- Développement d'une app iOS/Android&#10;- 5000+ téléchargements&#10;&#10;Site e-commerce (Next.js, Stripe)&#10;- Création d'une boutique en ligne complète&#10;- Intégration de paiement sécurisé"
                    />
                  </div>
                </div>

                {/* Expérience professionnelle */}
                <div className="form-section">
                  <h3 className="form-section-title">Expérience professionnelle</h3>
                  <div className="form-group">
                    <label htmlFor="experience">Expériences *</label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={cvData.experience}
                      onChange={handleChange}
                      rows={5}
                      required
                      placeholder="Exemple:&#10;Sept 2023 - Présent : Développeur Full Stack - TechCorp, Lyon&#10;- Développement d'applications web avec React et Node.js&#10;- Collaboration avec une équipe de 5 développeurs&#10;- Amélioration des performances de 40%"
                    />
                  </div>
                </div>

                {/* Compétences */}
                <div className="form-section">
                  <h3 className="form-section-title">Compétences</h3>
                  
                  <div className="form-group">
                    <label htmlFor="hardSkills">Hard Skills (Compétences techniques) *</label>
                    <textarea
                      id="hardSkills"
                      name="hardSkills"
                      value={cvData.hardSkills}
                      onChange={handleChange}
                      rows={3}
                      required
                      placeholder="Exemple: JavaScript, React, Node.js, Python, SQL, Docker, Git, AWS"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="softSkills">Soft Skills (Compétences comportementales) *</label>
                    <textarea
                      id="softSkills"
                      name="softSkills"
                      value={cvData.softSkills}
                      onChange={handleChange}
                      rows={3}
                      required
                      placeholder="Exemple: Travail d'équipe, Communication, Résolution de problèmes, Gestion du temps, Adaptabilité"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="languages">Langues (avec niveau CECRL) *</label>
                    <textarea
                      id="languages"
                      name="languages"
                      value={cvData.languages}
                      onChange={handleChange}
                      rows={3}
                      required
                      placeholder="Exemple:&#10;Français - Natif&#10;Anglais - C1 (Avancé)&#10;Espagnol - B2 (Intermédiaire avancé)&#10;Allemand - A2 (Élémentaire)"
                    />
                    <small className="form-hint">
                      Niveaux CECRL : A1-A2 (Débutant), B1-B2 (Intermédiaire), C1-C2 (Avancé)
                    </small>
                  </div>
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Génération en cours...' : 'Générer mon CV'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CVGenerator;