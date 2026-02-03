import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import Header from '../components/Header';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login({ email, password });
            navigate('/dashboard');
        } catch (err) {
            setError('Email ou mot de passe invalide');
        }
    };

    return (
        <>
            <Header />
            <main>
                <div className="auth-container">
                    <div className="auth-card">
                        <h1>Connexion</h1>
                        <p className="auth-subtitle">Accédez à votre espace OptiCV.AI</p>

                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleSubmit} className="auth-form">
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
                                    placeholder="Entrez votre mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-submit">
                                Se connecter
                            </button>
                        </form>

                        <div className="auth-divider">
                            <span>Pas encore de compte ?</span>
                        </div>

                        <Link to="/register" className="auth-link">
                            <button type="button" className="btn-secondary-auth">
                                Créer un compte
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

export default Login;