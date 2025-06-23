type BaseBlockOptions = {
    insertTextBlock: () => void;
};

type ArticleBlockOptions = BaseBlockOptions & {
    insertCodeBlock: () => void;
    insertImageBlock: () => void;
};

type LiveCodeBlockOptions = BaseBlockOptions & {
    insertCodeBlock: () => void;
};

type HrInterviewQABlockOptions = BaseBlockOptions;

export type UseBlockConfigOptions =
    | { entityType: 'article'; blockActions: ArticleBlockOptions }
    | { entityType: 'liveCode'; blockActions: LiveCodeBlockOptions }
    | { entityType: 'hrInterviewQA'; blockActions: HrInterviewQABlockOptions };
