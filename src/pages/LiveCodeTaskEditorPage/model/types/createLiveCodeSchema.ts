import { LiveCode } from '@/entities/LiveCode';

export interface CreateLiveCodeSchema {
    form: LiveCode;
    isEdit: boolean;
    hasChanges: boolean;
}
