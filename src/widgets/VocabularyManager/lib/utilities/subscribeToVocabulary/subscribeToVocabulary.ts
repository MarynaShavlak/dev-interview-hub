import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { Vocabulary } from '@/entities/Vocabulary';
import { subscribeToUserCollection } from '@/shared/lib/firestore';
import { ERROR_VOCABULARY_MESSAGES } from '../../../model/consts/errorVocabularyMessages';

export const subscribeToVocabulary = (
    updateCachedData: (
        updater: (draft: MaybeDrafted<Vocabulary[]>) => void,
    ) => void,
    userId: string,
): (() => void) | undefined => {
    return subscribeToUserCollection<Vocabulary>(
        'vocabularies',
        userId,
        updateCachedData,
        ERROR_VOCABULARY_MESSAGES.VOCABULARY_SNAPSHOT_FAIL,
    );
};
