export interface SignupSchema {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    isLoading: boolean;
    error?: string;
}
