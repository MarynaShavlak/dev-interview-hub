import { ArticleComment } from './model/types/articleComment';

export const testComment: ArticleComment = {
    id: '1',
    articleId: '1',
    text: 'Text of comment 1',
    createdAt: new Date().toISOString(),
    user: {
        id: '123',
        email: '',
        firstname: '',
        lastname: '',
        username: 'testUsername',
        avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
    },
};

export const testCommentsData: ArticleComment[] = [
    {
        id: '1',
        articleId: 'gkhgks',
        text: 'Text of comment 1',
        createdAt: new Date().toISOString(),
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
        createdAt: new Date().toISOString(),
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
