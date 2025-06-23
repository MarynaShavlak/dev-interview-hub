import { useTranslation } from 'react-i18next';
import { BlockButtonConfig } from '../../../model/types/btnConfig';
import { UseBlockConfigOptions } from '../../../model/types/blockOptions';

export const useFormConfig = (options: UseBlockConfigOptions) => {
    const { t } = useTranslation('articleDetails');
    const { entityType, blockActions } = options;

    const getTitle = () => {
        switch (entityType) {
            case 'article':
                return t('Блоки статті');
            case 'hrInterviewQA':
                return t('Блоки відповіді на питання');
            case 'liveCode':
                return t('Блоки завдання на live coding');
            default: {
                const exhaustiveCheck: never = entityType;
                throw new Error(`Unhandled entity case: ${exhaustiveCheck}`);
            }
        }
    };

    const getButtons = (): BlockButtonConfig[] => {
        const baseButtons: BlockButtonConfig[] = [
            {
                type: 'text',
                onClick: blockActions.insertTextBlock,
                translationKey: 'тексту',
            },
        ];

        switch (entityType) {
            case 'article':
                return [
                    ...baseButtons,
                    {
                        type: 'code',
                        onClick: blockActions.insertCodeBlock,
                        translationKey: 'коду',
                    },
                    {
                        type: 'image',
                        onClick: blockActions.insertImageBlock,
                        translationKey: 'зображення',
                    },
                ];
            case 'hrInterviewQA':
                return baseButtons;
            case 'liveCode':
                return [
                    ...baseButtons,
                    {
                        type: 'code',
                        onClick: blockActions.insertCodeBlock,
                        translationKey: 'коду',
                    },
                ];
            default: {
                const exhaustiveCheck: never = entityType;
                throw new Error(`Unhandled entity case: ${exhaustiveCheck}`);
            }
        }
    };

    return {
        title: getTitle(),
        buttons: getButtons(),
    };
};
