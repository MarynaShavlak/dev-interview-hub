import { buildSelector } from '@/shared/lib/store';
import { StateSchema } from '@/app/providers/StoreProvider';

export const [useUploadedProfilePhoto, getUploadedProfilePhoto] = buildSelector(
    (state: StateSchema) => state.profile?.uploadedProfilePhoto,
);
