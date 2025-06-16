import React, { memo, useCallback } from 'react';

import { VStack } from '@/shared/ui/common/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { useUserAuthData } from '@/entities/User';

import { deleteVocabularyThunk } from '../../model/services/deleteVocabularyThunk/deleteVocabularyThunk';
import { AddVocabularyForm } from '@/entities/Vocabulary';
import { addVocabularyThunk } from '../../model/services/addVocabularyThunk/addVocabularyThunk';
import { UserVocabularyTable } from '../UserVocabularyTable/UserVocabularyTable';

export const VocabularyManager = memo(() => {
    const dispatch = useAppDispatch();
    const user = useUserAuthData();

    const onAddVocabulary = useCallback(
        (text: string, meaning: string, translation: string) => {
            dispatch(addVocabularyThunk({ text, meaning, translation }));
        },
        [dispatch],
    );

    const handleDeleteVocabulary = async (vocabId: string) => {
        try {
            const deletedId = await dispatch(
                deleteVocabularyThunk(vocabId),
            ).unwrap();
            return deletedId;
        } catch (error) {
            console.error('Error deleting vocabulary:', error);
            return null;
        }
    };

    return (
        <VStack gap="16" max>
            <AddVocabularyForm onAddVocabulary={onAddVocabulary} />
            <UserVocabularyTable onDeleteVocabulary={handleDeleteVocabulary} />
        </VStack>
    );
});

// {error ? (
//     <LinksList
//         isLoading={false}
//         links={undefined}
//         error={error as string}
//         deleteLink={handleDeleteLink}
//         updateLink={handleUpdateLink}
//     />
// ) : (
//     <LinksList
//         links={links}
//         isLoading={isLoading}
//         error={error as string}
//         deleteLink={handleDeleteLink}
//         updateLink={handleUpdateLink}
//     />
// )}
