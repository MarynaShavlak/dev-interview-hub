import { ChangeEvent, memo, useEffect, useState } from 'react';
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
import { UserCardProps } from '../UserCard/UserCard';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import cls from '../UserCard/UserCard.module.scss';
import EditIcon from '@/shared/assets/icons/edit.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Box } from '@/shared/ui/common/Box';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { uploadImageThunk } from '../../model/services/uploadImageThunk/uploadImageThunk';

const imageMimeType = /image\/(png|jpg|jpeg)/i;

interface ImageUploaderProps {
    avatar: string;
    readonly?: boolean;
}

const ImageUploader = ({ avatar, readonly }: ImageUploaderProps) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation('profile');
    const uploadLabelClasses = getFlexClasses({
        vStack: true,
        align: 'center',
        justify: 'center',
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        let fileReader: FileReader | null = null;
        let isCancelled = false;

        if (selectedImage) {
            fileReader = new FileReader();
            fileReader.onloadend = (e) => {
                if (!isCancelled) {
                    setImagePreview(e.target?.result as string);
                }
            };
            fileReader.readAsDataURL(selectedImage);
        }

        return () => {
            isCancelled = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        };
    }, [selectedImage]);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!file.type.match(imageMimeType)) {
            setError(t('Некоректний тип файлу'));
            setSelectedImage(null);
            setImagePreview(null);
            return;
        }

        // Clear error and set the file
        setError(null);
        setSelectedImage(file);
    };

    const uploadImage = async () => {
        if (!selectedImage) return;
        try {
            const url = await dispatch(
                uploadImageThunk(selectedImage),
            ).unwrap();
            console.log('url', url);
            setError(null);
        } catch (e) {
            console.log('Error on upload avatar:');
            setError(t('Не вдалося завантажити зображення'));
        }
    };

    const handleRemoveImage = (): void => {
        setSelectedImage(null);
        setImagePreview(null);
    };

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
                                src={avatar}
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
                    <span onClick={uploadImage}>click to upload image</span>
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
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    } = props;
    const { t } = useTranslation('profile');
    const additionalClasses = getFlexClasses({ vStack: true, gap: '32' });

    const validConfig = useInputValidationConfig();
    const { username = '', firstname = '', lastname = '' } = data || {};

    const { hasErrors, lastnameErrors, usernameErrors, firstnameErrors } =
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
                    {/* <Input */}
                    {/*    value={data?.avatar} */}
                    {/*    label={`${t('Посилання на аватар')}:`} */}
                    {/*    onChange={onChangeAvatar} */}
                    {/*    readonly={readonly} */}
                    {/*    disabled={readonly} */}
                    {/*    data-testid="UserCard.avatar" */}
                    {/* /> */}
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
