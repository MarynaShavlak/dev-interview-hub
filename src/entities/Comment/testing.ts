import { Comment } from './model/types/comment';

export { addCommentFormReducer } from './model/slices/addCommentFormSlice';

export const testCommentsData: Comment[] = [
    {
        id: '1',
        text: 'Text of comment 1',
        user: {
            id: '123',
            username: 'testUsername',
        },
    },
    {
        id: '2',
        text: 'Text of comment 2',
        user: {
            id: '123',
            username: 'testUsername',
        },
    },
];
