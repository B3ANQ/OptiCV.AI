export interface Subscription {
    id: string;
    name: string;
    price: number;
    duration: 'monthly' | 'yearly';
    features: string[];
    createdAt: Date;
    updatedAt: Date;
}