import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { User } from '@/entities/User';
import { CreateArticleSchema } from '../types/createArticleSchema';
import { Article, ArticleBlock } from '@/entities/Article';

const initialState: CreateArticleSchema = {
    uploadedArticleImage: null,
    form: {
        id: '',
        user: {} as User,
        title: '',
        subtitle: { text: '', link: '' },
        img: '',
        views: 0,
        createdAt: '',
        category: [],
        blocks: [],
    },
};

export const createArticleSlice = buildSlice({
    name: 'createArticle',
    initialState,
    reducers: {
        updateCreateArticleForm: (
            state,
            action: PayloadAction<Partial<Article>>,
        ) => {
            const data = {
                ...state.form,
                ...action.payload,
            };
            state.form = data as Article;
        },
        updateSubtitleLink(state, action) {
            state.form.subtitle.link = action.payload;
        },
        updateSubtitleText(state, action) {
            state.form.subtitle.text = action.payload;
        },
        updateCategory(state, action) {
            const categoryToAdd = action.payload;

            if (state.form.category && Array.isArray(state.form.category)) {
                const index = state.form.category.indexOf(categoryToAdd);

                if (index === -1) {
                    state.form.category.push(categoryToAdd);
                } else {
                    state.form.category.splice(index, 1);
                }
            }
        },
        updateBlocks(state, action: PayloadAction<ArticleBlock>) {
            const incomingBlock = action.payload;
            const blockIndex = state.form.blocks.findIndex(
                (block) => block.id === incomingBlock.id,
            );

            if (blockIndex !== -1) {
                state.form.blocks[blockIndex] = {
                    ...state.form.blocks[blockIndex],
                    ...incomingBlock,
                };
            } else {
                state.form.blocks.push(incomingBlock);
            }
        },

        deleteBlock(state, action: PayloadAction<string>) {
            state.form.blocks = state.form.blocks.filter(
                (block) => block.id !== action.payload,
            );
        },
        deleteAllBlocks(state) {
            state.form.blocks = [];
        },
        setUploadedArticleImage: (
            state,
            action: PayloadAction<File | null>,
        ) => {
            state.uploadedArticleImage = action.payload;
        },
        resetArticle: (state) => {
            state.uploadedArticleImage = initialState.uploadedArticleImage;
        },
    },
});

export const {
    actions: createArticleActions,
    reducer: createArticleReducer,
    useActions: useCreateArticleActions,
} = createArticleSlice;
