import React from 'react';
import Header from '../components/Header';

const Contact: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <div className="page-content">
          <div className="contact-container">
            <div className="contact-header">
              <h1>Contactez-nous</h1>
              <p>Nous sommes là pour vous aider. N'hésitez pas à nous contacter.</p>
            </div>

            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-icon">📧</div>
                <h3>Email</h3>
                <p className="contact-detail">contact@opticv.ai</p>
                <p className="contact-description">Réponse sous 24h</p>
              </div>

              <div className="contact-card">
                <div className="contact-icon">💬</div>
                <h3>Support</h3>
                <p className="contact-detail">support@opticv.ai</p>
                <p className="contact-description">Assistance technique</p>
              </div>

              <div className="contact-card">
                <div className="contact-icon">🌐</div>
                <h3>Réseaux sociaux</h3>
                <div className="social-links">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
                <p className="contact-description">Suivez notre actualité</p>
              </div>

              <div className="contact-card">
                <div className="contact-icon">📍</div>
                <h3>Adresse</h3>
                <p className="contact-detail">France</p>
                <p className="contact-description">Siège social</p>
              </div>
            </div>

            <div className="contact-form-section">
              <h2>Envoyez-nous un message</h2>
              <form className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nom complet</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Sujet</label>
                  <input type="text" id="subject" name="subject" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={6} required></textarea>
                </div>
                <button type="submit" className="btn-primary">Envoyer</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;