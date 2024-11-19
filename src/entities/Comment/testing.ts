import { Comment } from './model/types/comment';

export { addCommentFormReducer } from './model/slices/addCommentFormSlice';

export const testCommentsData: Comment[] = [
    {
        id: '1',
        text: 'Text of comment 1',
        user: {
            id: '123',
            email: '',
            firstname: '',
            lastname: '',
            username: 'testUsername',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
    },
    {
        id: '2',
        text: 'Text of comment 2',
        user: {
            id: '123',
            email: '',
            firstname: '',
            lastname: '',
            username: 'testUsername',
            avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
        },
    },
];

export const testCommentData: Comment = {
    id: '1',
    text: 'Text of comment 1',
    user: {
        id: '123',
        email: '',
        firstname: '',
        lastname: '',
        username: 'testUsername',
        avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
    },
};

export const testCommentNoUserAvatarData: Comment = {
    id: '1',
    text: 'Text of comment 1',
    user: {
        id: '123',
        email: '',
        firstname: '',
        lastname: '',
        username: 'testUsername',
    },
};
