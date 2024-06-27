import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import {
    useAddCommentFormError,
    useAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/deprecated/Stack';
import {
    addCommentFormReducer,
    useAddCommentFormActions,
} from '../../model/slices/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation('article-details');
    const text = useAddCommentFormText();
    const error = useAddCommentFormError();
    const { setText } = useAddCommentFormActions();
    const onCommentTextChange = useCallback(
        (value: string) => {
            setText(value);
        },
        [setText],
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <HStack
                justify="between"
                max
                className={classNames(cls.AddCommentForm, {}, [className])}
            >
                <Input
                    className={cls.input}
                    placeholder={t('Введіть текст коментаря')}
                    value={text}
                    onChange={onCommentTextChange}
                />
                <Button theme={ButtonTheme.OUTLINE} onClick={onSendHandler}>
                    {t('Відправити')}
                </Button>
            </HStack>
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
