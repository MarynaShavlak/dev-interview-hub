import { memo } from 'react';
import { ArticlesPageRedesigned } from './ArticlesPageRedesigned/ArticlesPageRedesigned';
import { ArticlesPageDeprecated } from './ArticlesPageDeprecated/ArticlesPageDeprecated';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<ArticlesPageRedesigned className={className} />}
            off={<ArticlesPageDeprecated />}
        />
    );
};

export default memo(ArticlesPage);
