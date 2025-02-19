import { memo } from 'react';
import { ArticlesPageRedesigned } from './ArticlesPageRedesigned/ArticlesPageRedesigned';
import { ArticlesPageDeprecated } from './ArticlesPageDeprecated/ArticlesPageDeprecated';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

const ArticlesPage = () => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<ArticlesPageRedesigned />}
            off={<ArticlesPageDeprecated />}
        />
    );
};

export default memo(ArticlesPage);
