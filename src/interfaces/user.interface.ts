export interface IUser {
    id: number;
    email: string;
    status: string;
    password: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
    isRegistrationCompleted: boolean;
    role: string;
}

export interface ISelect {
    value: string;
    label: string;
}