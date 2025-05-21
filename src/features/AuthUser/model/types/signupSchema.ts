import { ErrorCode } from '../../lib/hooks/useErrorText/useErrorText';

export interface SignupSchema {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    isLoading: boolean;
    error?: ErrorCode;
}
