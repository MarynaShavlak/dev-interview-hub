import cls from './Text.module.scss';

export const getStyleConfig = (
    bold?: boolean,
    italic?: boolean,
    isOnlyTitleOrText?: boolean,
) => {
    if (isOnlyTitleOrText) {
        return {
            bothStyles: { [cls.bold]: bold, [cls.italic]: italic },
            singleElementStyles: {},
        };
    }
    return {
        bothStyles: {},
        singleElementStyles: { [cls.bold]: bold, [cls.italic]: italic },
    };
};
