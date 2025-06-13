import { buildSelector } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';

export const [useHRInterviewQAFormData, getHRInterviewQAFormData] =
    buildSelector((state: StateSchema) => state.createHRInterviewQA?.form);

export const [useHasHRInterviewQAChanges, getHasHRInterviewQAChanges] =
    buildSelector(
        (state: StateSchema) => state.createHRInterviewQA?.hasChanges ?? false,
    );
