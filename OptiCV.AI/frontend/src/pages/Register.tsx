import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';
import Header from '../components/Header';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await register({ email, password, firstName, lastName });
            navigate('/dashboard');
        } catch (err) {
            setError('L\'inscription a échoué. Veuillez réessayer.');
        }
    };

    return (
        <>
            <Header />
            <main>
                <div className="auth-container">
                    <div className="auth-card">
                        <h1>Inscription</h1>
                        <p className="auth-subtitle">Créez votre compte OptiCV.AI</p>

                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Prénom</label>
                                    <input
                                        type="text"
                                        placeholder="Votre prénom"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Nom</label>
                                    <input
                                        type="text"
                                        placeholder="Votre nom"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="Entrez votre email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Mot de passe</label>
                                <input
                                    type="password"
                                    placeholder="Choisissez un mot de passe sécurisé"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-submit">
                                Créer mon compte
                            </button>
                        </form>

                        <div className="auth-divider">
                            <span>Vous avez déjà un compte ?</span>
                        </div>

                        <Link to="/login" className="auth-link">
                            <button type="button" className="btn-secondary-auth">
                                Se connecter
                            </button>
                        </Link>

                        <p className="auth-footer">
                            <Link to="/">← Retour à l'accueil</Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Register;