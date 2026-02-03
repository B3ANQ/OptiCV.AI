import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <main>
      <div className="page-content">

        <div className="page-title">
          <h1>OptiCV.AI</h1>
          <p>Optimisez votre CV avec l'Intelligence Artificielle</p>
        </div>

        <section className="intro-section">
          <div className="container">
            <h2>Bienvenue sur OptiCV.AI</h2>
            <p style={{ fontSize: '18px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
              OptiCV.AI est une plateforme intelligente conçue pour transformer vos informations professionnelles en un CV optimisé qui passe les filtres ATS (Applicant Tracking System). Laissez l'IA faire le travail pendant que vous vous concentrez sur votre candidature.
            </p>
          </div>
        </section>

        <section className="how-it-works">
          <div className="container">
            <h2>Comment ça marche ?</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3>Remplissez vos informations</h3>
                <p>Entrez vos données personnelles, votre expérience professionnelle, vos compétences et votre formation dans notre formulaire intuitif.</p>
              </div>

              <div className="step-card">
                <div className="step-number">2</div>
                <h3>Collez l'offre de stage</h3>
                <p>Copiez l'offre d'emploi ou de stage qui vous intéresse et collez-la dans notre système. L'IA analysera les mots-clés importants.</p>
              </div>

              <div className="step-card">
                <div className="step-number">3</div>
                <h3>L'IA optimise votre CV</h3>
                <p>Notre algorithme avancé réorganise et reformule votre CV pour maximiser la pertinence face aux critères ATS et au poste visé.</p>
              </div>

              <div className="step-card">
                <div className="step-number">4</div>
                <h3>Téléchargez votre CV</h3>
                <p>Obtenez un CV professionnel en PDF prêt à envoyer aux recruteurs. Formaté pour passer tous les filtres de sélection automatisée.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <h2>Pourquoi choisir OptiCV.AI ?</h2>
            <div className="features-grid">
              <div className="feature-card card">
                <h3>Optimisation IA</h3>
                <p>Notre intelligence artificielle analyse les offres et adapte votre CV pour maximiser vos chances de passer les filtres ATS.</p>
              </div>

              <div className="feature-card card">
                <h3>Rapide & Efficace</h3>
                <p>Générez un CV optimisé en minutes, pas en heures. Pas besoin de connaissances techniques, tout est automatisé.</p>
              </div>

              <div className="feature-card card">
                <h3>Optimisation ATS</h3>
                <p>Nos CVs sont conçus pour passer les systèmes de suivi des candidatures (ATS) utilisés par 99% des grandes entreprises.</p>
              </div>

              <div className="feature-card card">
                <h3>Ciblage Précis</h3>
                <p>Chaque CV est adapté à l'offre spécifique que vous ciblez, augmentant vos chances d'être sélectionné.</p>
              </div>

              <div className="feature-card card">
                <h3>Format Professionnel</h3>
                <p>Obtenez un CV formaté professionnellement en PDF, prêt à envoyer immédiatement aux recruteurs.</p>
              </div>

              <div className="feature-card card">
                <h3>Données Sécurisées</h3>
                <p>Vos informations personnelles sont protégées et chiffrées. Aucun partage avec des tiers.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <h2>Prêt à optimiser votre CV ?</h2>
            <p>Rejoignez des milliers de candidats qui ont déjà augmenté leurs chances de réussite.</p>
            <div className="cta-buttons">
              <Link to="/cv-generator">
                <button className="btn-primary">Créer mon CV Optimisé</button>
              </Link>
              <Link to="/pricing">
                <button className="btn-secondary">Voir les tarifs</button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;