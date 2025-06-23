import { buildSelector } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';

export const [useLiveCodeFormData, getLiveCodeFormData] = buildSelector(
    (state: StateSchema) => state.createLiveCode?.form,
);

export const [useHasLiveCodeChanges, getHasLiveCodeChanges] = buildSelector(
    (state: StateSchema) => state.createLiveCode?.hasChanges ?? false,
);
