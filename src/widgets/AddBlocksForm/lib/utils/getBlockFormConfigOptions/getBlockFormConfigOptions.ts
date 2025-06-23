import { AddBlocksFormProps } from '../../../ui/AddBlocksForm/AddBlocksForm';

export const getBlockFormConfigOptions = <T extends { id: string }>(
    props: AddBlocksFormProps<T>,
) => {
    const { entityType, blockActions } = props;

    switch (entityType) {
        case 'article':
            return {
                entityType,
                blockActions: {
                    insertTextBlock: blockActions.insertTextBlock,
                    insertCodeBlock: blockActions.insertCodeBlock,
                    insertImageBlock: blockActions.insertImageBlock,
                },
            };
        case 'liveCode':
            return {
                entityType,
                blockActions: {
                    insertTextBlock: blockActions.insertTextBlock,
                    insertCodeBlock: blockActions.insertCodeBlock,
                },
            };
        case 'hrInterviewQA':
            return {
                entityType,
                blockActions: {
                    insertTextBlock: blockActions.insertTextBlock,
                },
            };
        default: {
            const exhaustiveCheck: never = entityType;
            throw new Error(`Unhandled entity case: ${exhaustiveCheck}`);
        }
    }
};
