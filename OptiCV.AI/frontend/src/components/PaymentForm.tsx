import React, { useState } from 'react';

const PaymentForm: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [cardDetails, setCardDetails] = useState<{ number: string; expiry: string; cvc: string }>({
        number: '',
        expiry: '',
        cvc: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'amount') {
            setAmount(Number(value));
        } else {
            setCardDetails({ ...cardDetails, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            // Call the payment processing API here
            // await processPayment(amount, cardDetails);
            setSuccess(true);
        } catch (err) {
            setError('Payment processing failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Payment Form</h2>
            <div>
                <label>
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={handleInputChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Card Number:
                    <input
                        type="text"
                        name="number"
                        value={cardDetails.number}
                        onChange={handleInputChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Expiry Date:
                    <input
                        type="text"
                        name="expiry"
                        value={cardDetails.expiry}
                        onChange={handleInputChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    CVC:
                    <input
                        type="text"
                        name="cvc"
                        value={cardDetails.cvc}
                        onChange={handleInputChange}
                        required
                    />
                </label>
            </div>
            <button type="submit">Pay</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Payment successful!</p>}
        </form>
    );
};

export default PaymentForm;