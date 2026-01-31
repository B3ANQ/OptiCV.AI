export interface Cv {
    id: string;
    personalInfo: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    skills: string[];
    experiences: {
        jobTitle: string;
        company: string;
        startDate: Date;
        endDate: Date;
        description: string;
    }[];
    education: {
        degree: string;
        institution: string;
        graduationYear: number;
    }[];
    styles: {
        font: string;
        colorScheme: string;
        layout: string;
    };
}