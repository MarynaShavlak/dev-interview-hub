import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { User } from '@/entities/User';
import { CreateArticleSchema } from '../types/createArticleSchema';
import { Article, ArticleBlock } from '@/entities/Article';

const initialState: CreateArticleSchema = {
    isLoading: false,
    error: undefined,
    form: {
        id: '',
        user: {} as User,
        title: '',
        subtitle: { text: '', link: undefined },
        img: undefined,
        views: 0,
        createdAt: '',
        category: [],
        blocks: [],
    },

    // uploadedProfilePhoto: undefined,
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

            // Ensure the category array exists
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
                // If the block exists, check for content to determine operation
                if (Object.keys(incomingBlock).length > 1) {
                    // Update block if it has additional properties
                    state.form.blocks[blockIndex] = {
                        ...state.form.blocks[blockIndex],
                        ...incomingBlock,
                    };
                } else {
                    // Delete block if only ID is provided
                    state.form.blocks.splice(blockIndex, 1);
                }
            } else {
                // Add new block if not found
                state.form.blocks.push(incomingBlock);
            }
        },
        // updateBlock(
        //     state,
        //     action: PayloadAction<{ id: string; data: Partial<ArticleBlock> }>,
        // ) {
        //     const { id, data } = action.payload;
        //     const blockIndex = state.form.blocks.findIndex(
        //         (block) => block.id === id,
        //     );
        //
        //     if (blockIndex !== -1) {
        //         state.form.blocks[blockIndex] = {
        //             ...state.form.blocks[blockIndex],
        //             ...data,
        //         };
        //     }
        // },
        deleteBlock(state, action: PayloadAction<string>) {
            state.form.blocks = state.form.blocks.filter(
                (block) => block.id !== action.payload,
            );
        },
    },
});

export const {
    actions: createArticleActions,
    reducer: createArticleReducer,
    useActions: useCreateArticleActions,
} = createArticleSlice;

// setReadonly: (state, action: PayloadAction<boolean>) => {
//     state.readonly = action.payload;
// },
// cancelEdit: (state) => {
//     state.readonly = true;
//     state.validateErrors = undefined;
//     state.form = state.data;
// },
// updateProfile: (state, action: PayloadAction<Partial<User>>) => {
//     const data = {
//         ...state.form,
//         ...action.payload,
//     };
//     state.form = data as User;
// },
// setUploadedProfilePhoto: (
//     state,
//     action: PayloadAction<File | null>,
// ) => {
//     state.uploadedProfilePhoto = action.payload;
// },
// },
// extraReducers: (builder) => {
//     builder
//         .addCase(getUserProfileThunk.pending, (state) => {
//             state.error = undefined;
//             state.isLoading = true;
//         })
//         .addCase(
//             getUserProfileThunk.fulfilled,
//             (state, action: PayloadAction<User>) => {
//                 state.isLoading = false;
//                 state.data = action.payload;
//                 state.form = action.payload;
//             },
//         )
//         .addCase(getUserProfileThunk.rejected, (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//         })
//         .addCase(updateUserProfileThunk.pending, (state) => {
//             state.validateErrors = undefined;
//             state.isLoading = true;
//         })
//         .addCase(
//             updateUserProfileThunk.fulfilled,
//             (state, action: PayloadAction<User>) => {
//                 state.isLoading = false;
//                 state.data = action.payload;
//                 state.form = action.payload;
//                 state.readonly = true;
//                 state.validateErrors = undefined;
//             },
//         )
//         .addCase(updateUserProfileThunk.rejected, (state, action) => {
//             state.isLoading = false;
//             state.validateErrors = action.payload;
//         });
// },
