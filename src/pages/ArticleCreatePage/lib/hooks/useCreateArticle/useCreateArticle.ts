import { useCallback } from 'react';
import {
    useCreateArticleError,
    useCreateArticleForm,
    useCreateArticleIsLoading,
} from '../../../model/selectors/getCreateArticleSelectors';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useCreateArticleActions } from '../../../model/slices/createArticleSlice';
import { ArticleBlock } from '@/entities/Article';

export const useCreateArticle = () => {
    const formData = useCreateArticleForm();
    const isLoading = useCreateArticleIsLoading();
    const error = useCreateArticleError();
    // const readonly = useProfileReadonly();
    // const validateErrors = useProfileValidateErrors();
    const {
        updateCreateArticleForm,
        updateSubtitleText,
        updateSubtitleLink,
        updateCategory,
        updateBlocks,
        deleteBlock,
        setUploadedArticleImage,
    } = useCreateArticleActions();
    //
    const validConfig = useInputValidationConfig();
    const { title, subtitle } = formData || {};
    // console.log('titles', title, subtitle);

    // const { hasErrors } = useFormValidation(
    //     { username, firstname, lastname },
    //     validConfig,
    //     'profile',
    // );
    //
    const onFileUpload = useCallback(
        (file: File | null) => setUploadedArticleImage(file),
        [setUploadedArticleImage],
    );

    const onChangeTitle = useCallback(
        (value?: string) => {
            updateCreateArticleForm({ title: value || '' });
        },
        [updateCreateArticleForm],
    );

    const onChangeSubtitleText = useCallback(
        (value?: string) => {
            updateSubtitleText(value || '');
        },
        [updateSubtitleText],
    );

    const onChangeSubtitleLink = useCallback(
        (value?: string) => {
            updateSubtitleLink(value || '');
        },
        [updateSubtitleLink],
    );

    const onChangeHeroImage = useCallback(
        (value?: string) => {
            updateCreateArticleForm({ img: value || '' });
        },
        [updateCreateArticleForm],
    );

    const onChangeCategory = useCallback(
        (value?: string) => {
            updateCategory(value || '');
        },
        [updateCategory],
    );

    const onChangeBlocks = useCallback(
        (block: ArticleBlock) => {
            updateBlocks(block);
        },
        [updateBlocks],
    );

    const onDeleteBlock = useCallback(
        (id: string) => {
            deleteBlock(id);
        },
        [deleteBlock],
    );

    // const onFileUpload = useCallback(
    //     (file: File | null) => setUploadedArticleImage(file),
    //     [setUploadedArticleImage],
    // );

    return {
        formData,
        error,
        isLoading,
        onChangeTitle,
        onChangeSubtitleText,
        onChangeSubtitleLink,
        onChangeCategory,
        onChangeBlocks,
        onDeleteBlock,
        onChangeHeroImage,
        onFileUpload,
    };
};

// const onChangeSubtitleLink = useCallback(
//     (value?: string) => {
//         updateCreateArticleForm({
//             subtitle: {
//                 link: value || '', // Update only the text property
//             },
//         });
//     },
//     [updateCreateArticleForm],
// );
//
// const onChangeCity = useCallback(
//     (value?: string) => {
//         updateProfile({ city: value || '' });
//     },
//     [updateProfile],
// );
//
// const onChangeAge = useCallback(
//     (value?: string) => {
//         updateProfile({ age: value || '' });
//     },
//     [updateProfile],
// );
//
// const onChangeUsername = useCallback(
//     (value?: string) => {
//         updateProfile({ username: value || '' });
//     },
//     [updateProfile],
// );
//
// const onChangeAvatar = useCallback(
//     (value?: string) => {
//         updateProfile({ avatar: value || '' });
//     },
//     [updateProfile],
// );
//
// const onChangeCurrency = useCallback(
//     (currency: Currency) => {
//         updateProfile({ currency });
//     },
//     [updateProfile],
// );
//
// const onChangeCountry = useCallback(
//     (country: Country) => {
//         updateProfile({ country });
//     },
//     [updateProfile],
// );

// readonly,
// validateErrors,
// onChangeFirstname,
// onChangeLastname,
// onChangeUsername,
// onChangeAvatar,
// onChangeCountry,
// onChangeCurrency,
// onChangeAge,
// onChangeCity,
// hasErrors,
// onFileUpload,
