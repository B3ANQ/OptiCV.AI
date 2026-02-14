import React from 'react';
import Header from '../components/Header';

const Subscription: React.FC = () => {
    // TODO: Backend integration - Implement payment processing API calls
    // This function will handle the subscription purchase
    const handleSubscribe = async (planType: string) => {
        try {
            // TODO: Call backend API endpoint for payment processing
            // Example: POST /api/payments/create-checkout-session
            // const response = await fetch('/api/payments/create-checkout-session', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ planType })
            // });
            // const data = await response.json();
            // Redirect to payment gateway (Stripe, PayPal, etc.)
            console.log(`Subscribing to ${planType} plan`);
        } catch (error) {
            console.error('Payment error:', error);
        }
    };

    return (
        <>
            <Header />
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '10px' }}>Formules d'abonnement</h1>
                <p style={{ marginBottom: '40px', color: '#666' }}>
                    Choisissez un abonnement qui correspond à vos besoins.
                </p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '30px',
                    flexWrap: 'wrap',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {/* Plan Gratuit */}
                    <div style={{
                        border: '1px solid #e0e0e0',
                        borderRadius: '12px',
                        padding: '30px',
                        width: '300px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <h2 style={{ marginBottom: '10px' }}>Plan Gratuit</h2>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
                            0€<span style={{ fontSize: '16px', fontWeight: 'normal' }}>/mois</span>
                        </div>
                        <ul style={{ 
                            textAlign: 'left', 
                            listStyle: 'none', 
                            padding: 0,
                            marginBottom: '30px',
                            flexGrow: 1
                        }}>
                            <li style={{ marginBottom: '10px' }}>✓ 3 CV optimisations</li>
                            <li style={{ marginBottom: '10px' }}>✓ Analyse de base</li>
                            <li style={{ marginBottom: '10px' }}>✓ Export PDF</li>
                            <li style={{ marginBottom: '10px', color: '#999' }}>✗ Support prioritaire</li>
                        </ul>
                        <button
                            onClick={() => handleSubscribe('free')}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            Commencer Gratuitement
                        </button>
                    </div>

                    {/* Plan Plus */}
                    <div style={{
                        border: '2px solid #007bff',
                        borderRadius: '12px',
                        padding: '30px',
                        width: '300px',
                        boxShadow: '0 4px 16px rgba(0,123,255,0.2)',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative'
                    }}>
                        <span style={{
                            position: 'absolute',
                            top: '-12px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>
                            POPULAIRE
                        </span>
                        <h2 style={{ marginBottom: '10px' }}>Plan Plus</h2>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
                            9.99€<span style={{ fontSize: '16px', fontWeight: 'normal' }}>/mois</span>
                        </div>
                        <ul style={{ 
                            textAlign: 'left', 
                            listStyle: 'none', 
                            padding: 0,
                            marginBottom: '30px',
                            flexGrow: 1
                        }}>
                            <li style={{ marginBottom: '10px' }}>✓ 25 CV optimisations</li>
                            <li style={{ marginBottom: '10px' }}>✓ Analyse avancée AI</li>
                            <li style={{ marginBottom: '10px' }}>✓ Templates premium</li>
                            <li style={{ marginBottom: '10px' }}>✓ Support email</li>
                            <li style={{ marginBottom: '10px' }}>✓ Lettres de motivation</li>
                        </ul>
                        <button
                            onClick={() => handleSubscribe('plus')}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            {/* TODO: This button will redirect to payment gateway */}
                            S'abonner
                        </button>
                    </div>

                    {/* Plan Premium */}
                    <div style={{
                        border: '1px solid #ffc107',
                        borderRadius: '12px',
                        padding: '30px',
                        width: '300px',
                        boxShadow: '0 2px 8px rgba(255,193,7,0.2)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <h2 style={{ marginBottom: '10px' }}>Plan Premium</h2>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
                            19.99€<span style={{ fontSize: '16px', fontWeight: 'normal' }}>/mois</span>
                        </div>
                        <ul style={{ 
                            textAlign: 'left', 
                            listStyle: 'none', 
                            padding: 0,
                            marginBottom: '30px',
                            flexGrow: 1
                        }}>
                            <li style={{ marginBottom: '10px' }}>✓ CV optimisations illimitées</li>
                            <li style={{ marginBottom: '10px' }}>✓ Analyse AI expert</li>
                            <li style={{ marginBottom: '10px' }}>✓ Tous les templates</li>
                            <li style={{ marginBottom: '10px' }}>✓ Support prioritaire 24/7</li>
                            <li style={{ marginBottom: '10px' }}>✓ Coaching carrière mensuel</li>
                            <li style={{ marginBottom: '10px' }}>✓ LinkedIn optimization</li>
                        </ul>
                        <button
                            onClick={() => handleSubscribe('premium')}
                            style={{
                                padding: '12px 24px',
                                backgroundColor: '#ffc107',
                                color: '#000',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold'
                            }}
                        >
                            {/* TODO: This button will redirect to payment gateway */}
                            S'abonner Premium
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Subscription;