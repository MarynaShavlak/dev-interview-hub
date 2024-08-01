import { memo, useCallback } from 'react';
import { RedesignedAddCommentForm } from './RedesignedAddCommentForm/RedesignedAddCommentForm';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { DeprecatedAddCommentForm } from './DeprecatedAddCommentForm/DeprecatedAddCommentForm';
import {
    useAddCommentFormError,
    useAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    addCommentFormReducer,
    useAddCommentFormActions,
} from '../../model/slices/addCommentFormSlice';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
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
    if (error) return null;
    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <RedesignedAddCommentForm
                        text={text}
                        onCommentTextChange={onCommentTextChange}
                        onSendHandler={onSendHandler}
                    />
                }
                off={
                    <DeprecatedAddCommentForm
                        text={text}
                        onCommentTextChange={onCommentTextChange}
                        onSendHandler={onSendHandler}
                    />
                }
            />
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
