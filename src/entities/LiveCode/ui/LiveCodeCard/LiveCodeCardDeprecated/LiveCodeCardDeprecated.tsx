import { memo } from 'react';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

import cls from '../LiveCodeCard.module.scss';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteLiveCodeTaskDetails } from '@/shared/const/router/router';
import { SectionType } from '@/shared/types/sectionTypes';
import { LiveCodeCardProps } from '../LiveCodeCard';
import { CodeBlock } from '../../../model/types/liveCode';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { CodeBlockComponent } from '@/shared/ui/common/CodeBlockComponent';

export const LiveCodeCardDeprecated = memo((props: LiveCodeCardProps) => {
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
                <Text title={title} bold size={TextSize.S} />
                <CodeBlockComponent code={codeBlock.code} />
            </Card>
        </AppLink>
    );
});
