export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    subscriptionStatus: 'active' | 'inactive' | 'pending';
    createdAt: Date;
    updatedAt: Date;
}