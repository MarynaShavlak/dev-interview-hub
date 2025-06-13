import { getDoc, updateDoc } from 'firebase/firestore';

import { assertExists } from '@/shared/lib/checks/assertExists/assertExists';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { Vocabulary } from '@/entities/Vocabulary';
import { ERROR_VOCABULARY_MESSAGES } from '../../../model/consts/errorVocabularyMessages';

export const updateVocabularyInFirestore = async (
    vocabId: string,
    updates: Partial<Vocabulary>,
) => {
    const vocabDocRef = await getDocRefByField<Vocabulary>(
        'vocabularies',
        'id',
        vocabId,
    );
    assertExists(
        vocabDocRef,
        ERROR_VOCABULARY_MESSAGES.VOCABULARY_NOT_FOUND(vocabId),
    );

    await updateDoc(vocabDocRef, updates);
    const updatedDoc = await getDoc(vocabDocRef);
    const updatedData = updatedDoc.data();
    assertExists(
        updatedData,
        ERROR_VOCABULARY_MESSAGES.UPDATED_DATA_RETRIEVAL_ERROR(vocabId),
    );

    return updatedData as Vocabulary;
};
