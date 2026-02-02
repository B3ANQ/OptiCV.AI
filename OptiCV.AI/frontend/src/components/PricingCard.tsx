import React from 'react';

interface PricingCardProps {
    title: string;
    price: string;
    features: string[];
    onSubscribe: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, onSubscribe }) => {
    return (
        <div className="pricing-card">
            <h2>{title}</h2>
            <p className="price">{price}</p>
            <ul>
                {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <button onClick={onSubscribe}>Subscribe</button>
        </div>
    );
};

export default PricingCard;