import {
    addCommentFormActions,
    addCommentFormReducer,
} from './addCommentFormSlice';
import { AddCommentFormSchema } from '../types/addCommentForm';

describe('addCommentFormSlice.test', () => {
    const initialState: AddCommentFormSchema = {
        text: '',
    };
    test('should return the initial state', () => {
        expect(addCommentFormReducer(undefined, { type: '' })).toEqual(
            initialState,
        );
    });

    test('should handle setText action', () => {
        const newText = 'New comment text';
        const expectedState: AddCommentFormSchema = {
            text: newText,
        };

        expect(
            addCommentFormReducer(
                initialState,
                addCommentFormActions.setText(newText),
            ),
        ).toEqual(expectedState);
    });

    test('should handle setText action with empty text', () => {
        const newText = '';
        const expectedState: AddCommentFormSchema = {
            text: newText,
        };

        expect(
            addCommentFormReducer(
                { text: 'Some previous text' },
                addCommentFormActions.setText(newText),
            ),
        ).toEqual(expectedState);
    });

    test('should correctly handle multiple setText actions', () => {
        const state = { text: '' };

        const firstUpdate = addCommentFormReducer(
            state,
            addCommentFormActions.setText('First update'),
        );

        const secondUpdate = addCommentFormReducer(
            firstUpdate,
            addCommentFormActions.setText('Second update'),
        );

        expect(secondUpdate).toEqual({ text: 'Second update' });
    });

    test('should handle actions in sequence correctly', () => {
        const state = { text: 'Initial text' };

        const updatedState = addCommentFormReducer(
            state,
            addCommentFormActions.setText('Updated text'),
        );

        expect(updatedState).toEqual({ text: 'Updated text' });
    });
});
