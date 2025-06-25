import { memo } from 'react';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

import cls from '../LiveCodeCard.module.scss';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteLiveCodeTaskDetails } from '@/shared/const/router/router';
import { SectionType } from '@/shared/types/sectionTypes';
import { LiveCodeCardProps } from '../LiveCodeCard';
import { CodeBlock } from '../../../model/types/liveCode';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { CodeBlockComponent } from '@/shared/ui/common/CodeBlockComponent';

export const LiveCodeCardRedesigned = memo((props: LiveCodeCardProps) => {
    const { className, liveCodeTask, target, handleClick } = props;
    const { title, id, blocks } = liveCodeTask;
    const codeBlock = blocks.find(
        (block) => block.type === SectionType.CODE,
    ) as CodeBlock;
    const additionalClasses = getFlexClasses({ vStack: true, gap: '16' });

    return (
        <AppLink
            target={target}
            to={getRouteLiveCodeTaskDetails(id)}
            className={classNames(cls.LiveCodeItemRedesigned, {}, [className])}
            onClick={handleClick}
        >
            <Card
                className={classNames('', {}, additionalClasses)}
                padding="16"
                max
            >
                <Text title={title} bold size="s" />
                <CodeBlockComponent code={codeBlock.code} />
            </Card>
        </AppLink>
    );
});
