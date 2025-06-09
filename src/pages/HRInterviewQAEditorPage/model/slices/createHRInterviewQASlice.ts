import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { User } from '@/entities/User';
import { CreateHRInterviewQASchema } from '../types/createHRInterviewQASchema';
import {
    HRInterviewQA,
    HRInterviewQABlock,
    HRInterviewQACategory,
    HRInterviewQACategoriesEng,
} from '@/entities/HRInterviewQA';

const defaultCategory: HRInterviewQACategory = HRInterviewQACategoriesEng[0];

const initialState: CreateHRInterviewQASchema = {
    form: {
        id: '',
        user: {} as User,
        title: '',
        createdAt: '',
        category: defaultCategory,
        blocks: [],
    },
    isEdit: false,
    hasChanges: false,
};

export const createHRInterviewQASlice = buildSlice({
    name: 'createHRInterviewQA',
    initialState,
    reducers: {
        updateCreateHRInterviewQAForm: (
            state,
            action: PayloadAction<Partial<HRInterviewQA>>,
        ) => {
            const data = {
                ...state.form,
                ...action.payload,
            };
            state.form = data as HRInterviewQA;
            state.hasChanges = true;
        },
        updateTitle(state, action) {
            state.form.title = action.payload;
            state.hasChanges = true;
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
            state.hasChanges = true;
        },
        updateBlocks(state, action: PayloadAction<HRInterviewQABlock>) {
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
            state.hasChanges = true;
        },

        deleteBlock(state, action: PayloadAction<string>) {
            state.form.blocks = state.form.blocks.filter(
                (block) => block.id !== action.payload,
            );
            state.hasChanges = true;
        },

        resetHRInterviewQA: (state) => {
            state.form = initialState.form;
            state.hasChanges = false;
        },
        setEditMode: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        },
        setHRInterviewQAData: (state, action: PayloadAction<HRInterviewQA>) => {
            state.form = action.payload;
        },
    },
});

export const {
    actions: createHRInterviewQAActions,
    reducer: createHRInterviewQAReducer,
    useActions: useCreateHRInterviewQAActions,
} = createHRInterviewQASlice;
