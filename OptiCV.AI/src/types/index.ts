export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    subscriptionStatus: string;
}

export interface CV {
    id: string;
    userId: string;
    personalInfo: PersonalInfo;
    skills: string[];
    experiences: Experience[];
    styles: string[];
}

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    summary: string;
}

export interface Experience {
    jobTitle: string;
    company: string;
    startDate: Date;
    endDate: Date;
    description: string;
}

export interface Subscription {
    id: string;
    name: string;
    price: number;
    duration: string;
    features: string[];
}

export interface Payment {
    id: string;
    userId: string;
    amount: number;
    status: string;
    transactionId: string;
    createdAt: Date;
}