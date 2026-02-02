export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CV {
    id: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Subscription {
    id: string;
    userId: string;
    plan: string;
    startDate: Date;
    endDate: Date;
    status: 'active' | 'inactive';
}

export interface Payment {
    id: string;
    userId: string;
    amount: number;
    date: Date;
    status: 'completed' | 'pending' | 'failed';
}