import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { User } from '@/entities/User';
import { CreateLiveCodeSchema } from '../types/createLiveCodeSchema';
import { LiveCode, LiveCodeBlock, LiveCodeCategory } from '@/entities/LiveCode';

const defaultCategory: LiveCodeCategory = 'codeReview';

const initialState: CreateLiveCodeSchema = {
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

export const createLiveCodeSlice = buildSlice({
    name: 'createLiveCode',
    initialState,
    reducers: {
        updateCreateLiveCodeTaskForm: (
            state,
            action: PayloadAction<Partial<LiveCode>>,
        ) => {
            const data = {
                ...state.form,
                ...action.payload,
            };
            state.form = data as LiveCode;
            state.hasChanges = true;
        },
        updateTitle(state, action) {
            state.form.title = action.payload;
            state.hasChanges = true;
        },
        updateCategory(state, action) {
            state.form.category = action.payload;
            state.hasChanges = true;
        },
        updateBlocks(state, action: PayloadAction<LiveCodeBlock>) {
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

        resetLiveCodeTask: (state) => {
            state.form = initialState.form;
            state.hasChanges = false;
        },
        setEditMode: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        },
        setLiveCodeTaskData: (state, action: PayloadAction<LiveCode>) => {
            state.form = action.payload;
        },
    },
});

export const {
    actions: createLiveCodeTaskActions,
    reducer: createLiveCodeTaskReducer,
    useActions: useCreateLiveCodeTaskActions,
} = createLiveCodeSlice;
