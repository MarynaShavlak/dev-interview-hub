export interface BlockButtonConfig {
    type: 'text' | 'code' | 'image';
    onClick: () => void;
    translationKey: string;
}
