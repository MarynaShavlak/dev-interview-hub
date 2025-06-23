export interface AddBlocksFormProps<T> {
    index: number;
    blocks: T[];
    blockActions: {
        insertTextBlock: () => void;
        insertCodeBlock: () => void;
        insertImageBlock: () => void;
        addBlock: (block: T) => void;
        updateBlock: (updatedBlock: T) => void;
        removeBlock: (id: string) => void;
        clearBlocks: () => void;
    };
}
