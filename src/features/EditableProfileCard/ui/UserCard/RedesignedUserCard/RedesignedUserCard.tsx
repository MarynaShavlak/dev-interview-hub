import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { UserCardProps } from '../UserCard';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import cls from '../UserCard.module.scss';
import EditIcon from '@/shared/assets/icons/edit.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Box } from '@/shared/ui/common/Box';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions } from '../../../model/slices/profileSlice';
import { Button } from '@/shared/ui/redesigned/Button';
import { useImageUploader } from '@/shared/lib/hooks/useImageUploader/useImageUploader';

// const imageMimeType = /image\/(png|jpg|jpeg)/i;

const imageMimeType = /^image\//i;

interface ImageUploaderProps {
    avatar: string;
    readonly?: boolean;
}

const ImageUploader = ({ avatar, readonly }: ImageUploaderProps) => {
    const { t } = useTranslation('profile');
    const errorMessage = t('Некоректний тип файлу');
    const { setUploadedProfilePhoto } = profileActions;
    const uploadLabelClasses = getFlexClasses({
        vStack: true,
        align: 'center',
        justify: 'center',
    });
    const dispatch = useAppDispatch();

    const onFileUpload = useCallback(
        (file: File | null) => dispatch(setUploadedProfilePhoto(file)),
        [dispatch, setUploadedProfilePhoto],
    );

    const { avatarSrc, imagePreview, error, handleImageChange, resetImage } =
        useImageUploader({
            initialAvatar: avatar,
            onFileUpload,
            errorMessage,
        });

    return (
        <VStack justify="center" align="center" max>
            {readonly && (
                <Avatar size={128} src={avatar} alt={t('Аватар користувача')} />
            )}
            {!readonly && (
                <>
                    <div className={cls.avatarWrap}>
                        {imagePreview && (
                            <Avatar
                                size={128}
                                src={imagePreview}
                                alt={t('Аватар користувача')}
                            />
                        )}

                        {!imagePreview && (
                            <Avatar
                                size={128}
                                src={avatarSrc}
                                alt={t('Аватар користувача')}
                            />
                        )}

                        <Box className={cls.uploadFileWrapper}>
                            <label
                                htmlFor="file-input"
                                className={classNames(
                                    cls.uploadLabel,
                                    {},
                                    uploadLabelClasses,
                                )}
                            >
                                <Icon
                                    Svg={EditIcon}
                                    className={cls.photoIcon}
                                    width={18}
                                    height={18}
                                />
                            </label>
                            <input
                                type="file"
                                id="file-input"
                                className={cls.uploadInput}
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Box>
                    </div>
                    <Button variant="cancel" onClick={resetImage} size="s">
                        {t('Видалити зображення')}
                    </Button>

                    {error && <Text text={error} variant="error" />}
                </>
            )}
        </VStack>
    );
};

export const RedesignedUserCard = memo((props: UserCardProps) => {
    const {
        className,
        data,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    } = props;
    const { t } = useTranslation('profile');
    const additionalClasses = getFlexClasses({ vStack: true, gap: '32' });

    const validConfig = useInputValidationConfig();
    const { username = '', firstname = '', lastname = '' } = data || {};

    const { lastnameErrors, usernameErrors, firstnameErrors } =
        useFormValidation(
            { username, firstname, lastname },
            validConfig,
            'profile',
        );

    return (
        <Card
            padding="24"
            max
            className={classNames(className ?? '', {}, additionalClasses)}
        >
            <ImageUploader avatar={data?.avatar || ''} readonly={readonly} />

            <HStack gap="24" max align="start">
                <VStack gap="16" max>
                    <Input
                        value={data?.email}
                        label={`${t('Email')}:`}
                        readonly
                        disabled
                        data-testid="UserCard.email"
                    />
                    <Input
                        value={data?.firstname}
                        label={`${t("Ім'я")}:`}
                        onChange={onChangeFirstname}
                        readonly={readonly}
                        disabled={readonly}
                        data-testid="UserCard.firstname"
                        validations={validConfig.firstname}
                        errors={firstnameErrors}
                    />
                    <Input
                        value={data?.lastname}
                        label={`${t('Прізвище')}:`}
                        onChange={onChangeLastname}
                        readonly={readonly}
                        disabled={readonly}
                        data-testid="UserCard.lastname"
                        validations={validConfig.lastname}
                        errors={lastnameErrors}
                    />

                    <Input
                        value={data?.age || ''}
                        label={`${t('Вік')}:`}
                        onChange={onChangeAge}
                        readonly={readonly}
                        disabled={readonly}
                        digitsOnly
                        data-testid="UserCard.age"
                    />
                </VStack>
                <VStack gap="16" max>
                    <Input
                        value={data?.username}
                        label={`${t("Ім'я користувача")}:`}
                        onChange={onChangeUsername}
                        readonly={readonly}
                        disabled={readonly}
                        data-testid="UserCard.username"
                        validations={validConfig.lastname}
                        errors={usernameErrors}
                    />

                    <CurrencySelect
                        value={data?.currency}
                        onChange={onChangeCurrency}
                        readonly={readonly}
                    />
                    <CountrySelect
                        value={data?.country}
                        onChange={onChangeCountry}
                        readonly={readonly}
                    />
                    <Input
                        value={data?.city || ''}
                        label={`${t('Місто')}:`}
                        onChange={onChangeCity}
                        readonly={readonly}
                        disabled={readonly}
                        data-testid="UserCard.city"
                    />
                </VStack>
            </HStack>
        </Card>
    );
});

// const ImageUploader = ({ avatar, readonly }: ImageUploaderProps) => {
//     // const [selectedImage, setSelectedImage] = useState<File | null>(null);
//     // const [imagePreview, setImagePreview] = useState<string | null>(null);
//     // const [error, setError] = useState<string | null>(null);
//     // const [avatarSrc, setAvatarSrc] = useState<string>(avatar || '');
//     const { t } = useTranslation('profile');
//     const { setUploadedProfilePhoto } = profileActions;
//     const uploadLabelClasses = getFlexClasses({
//         vStack: true,
//         align: 'center',
//         justify: 'center',
//     });
//     const dispatch = useAppDispatch();
//
//     const { avatarSrc, imagePreview, error, handleImageChange, resetImage } =
//         useImageUploader({
//             initialAvatar: avatar,
//             onFileUpload: (file) => dispatch(setUploadedProfilePhoto(file)),
//             errorMessage: t('Некоректний тип файлу'),
//         });
//
//     // useEffect(() => {
//     //     let previewUrl: string | null = null;
//     //
//     //     if (selectedImage) {
//     //         previewUrl = window.URL.createObjectURL(selectedImage);
//     //         setImagePreview(previewUrl);
//     //         setAvatarSrc(previewUrl);
//     //     }
//     //
//     //     return () => {
//     //         if (previewUrl) {
//     //             window.URL.revokeObjectURL(previewUrl);
//     //         }
//     //     };
//     // }, [selectedImage]);
//     //
//     // const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
//     //     const file = event.target.files?.[0];
//     //     if (!file) return;
//     //     if (!file.type.match(imageMimeType)) {
//     //         setError(t('Некоректний тип файлу'));
//     //         setSelectedImage(null);
//     //         setImagePreview(null);
//     //         setAvatarSrc('');
//     //         dispatch(setUploadedProfilePhoto(null));
//     //         return;
//     //     }
//     //
//     //     setError(null);
//     //     setSelectedImage(file);
//     //     dispatch(setUploadedProfilePhoto(file));
//     // };
//     //
//     // const handleRemoveImage = (): void => {
//     //     setSelectedImage(null);
//     //     setImagePreview(null);
//     //     setAvatarSrc('');
//     //     dispatch(setUploadedProfilePhoto(null));
//     // };
//
//     return (
//         <VStack justify="center" align="center" max>
//             {readonly && (
//                 <Avatar size={128} src={avatar} alt={t('Аватар користувача')} />
//             )}
//             {!readonly && (
//                 <>
//                     <div className={cls.avatarWrap}>
//                         {imagePreview && (
//                             <Avatar
//                                 size={128}
//                                 src={imagePreview}
//                                 alt={t('Аватар користувача')}
//                             />
//                         )}
//
//                         {!imagePreview && (
//                             <Avatar
//                                 size={128}
//                                 src={avatarSrc}
//                                 alt={t('Аватар користувача')}
//                             />
//                         )}
//
//                         <Box className={cls.uploadFileWrapper}>
//                             <label
//                                 htmlFor="file-input"
//                                 className={classNames(
//                                     cls.uploadLabel,
//                                     {},
//                                     uploadLabelClasses,
//                                 )}
//                             >
//                                 <Icon
//                                     Svg={EditIcon}
//                                     className={cls.photoIcon}
//                                     width={18}
//                                     height={18}
//                                 />
//                             </label>
//                             <input
//                                 type="file"
//                                 id="file-input"
//                                 className={cls.uploadInput}
//                                 accept="image/*"
//                                 onChange={handleImageChange}
//                             />
//                         </Box>
//                     </div>
//                     <Button variant="cancel" onClick={resetImage} size="s">
//                         {t('Видалити зображення')}
//                     </Button>
//
//                     {error && <Text text={error} variant="error" />}
//                 </>
//             )}
//         </VStack>
//     );
// };
