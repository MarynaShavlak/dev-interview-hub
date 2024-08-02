import {
    addCommentFormActions,
    addCommentFormReducer,
} from './addCommentFormSlice';
import { AddCommentFormSchema } from '../types/addCommentForm';

describe('addCommentFormSlice.test', () => {
    test('test set text', () => {
        const state: DeepPartial<AddCommentFormSchema> = { text: '' };

        expect(
            addCommentFormReducer(
                state as AddCommentFormSchema,
                addCommentFormActions.setText('New Comment'),
            ),
        ).toEqual({ text: 'New Comment' });
    });
});
