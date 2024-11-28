import { ArticleComment } from './model/types/articleComment';

export { articleCommentsReducer } from './model/slices/articleCommentsSlice';

export const testCommentsData: ArticleComment[] = [
    {
        id: '1',
        articleId: 'gkhgks',
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
        articleId: 'gkhgks',
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
