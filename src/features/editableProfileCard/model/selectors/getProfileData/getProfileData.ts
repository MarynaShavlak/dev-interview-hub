import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useProfileData, getProfileData] = buildSelector(
    (state: StateSchema) => state.profile?.data,
);
