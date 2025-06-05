import { HTMLAttributeAnchorTarget, memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { LinkCardRedesigned } from './LinkCardRedesigned/LinkCardRedesigned';
import { LinkCardDeprecated } from './LinkCardDeprecated/LinkCardDeprecated';
import { Link } from '../../model/types/link';

export interface LinkCardProps {
    target?: HTMLAttributeAnchorTarget;
    deleteLink: (linkId: string) => Promise<any>;
    updateLink: (updatedLink: Link) => Promise<any>;
    index: number;
    link: Link;
}

export const LinkCard = memo((props: LinkCardProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<LinkCardRedesigned {...props} />}
            off={<LinkCardDeprecated {...props} />}
        />
    );
});
