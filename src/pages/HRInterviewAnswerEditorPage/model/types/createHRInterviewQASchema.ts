import { HRInterviewQA } from '@/entities/HRInterviewQA';

export interface CreateHRInterviewQASchema {
    form: HRInterviewQA;
    isEdit: boolean;
    hasChanges: boolean;
}
