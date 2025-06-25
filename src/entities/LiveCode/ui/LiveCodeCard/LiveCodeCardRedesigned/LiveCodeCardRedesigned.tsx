import { memo } from 'react';
import { useTranslation } from 'react-i18next';
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
import { Button } from '@/shared/ui/redesigned/Button';

export const LiveCodeCardRedesigned = memo((props: LiveCodeCardProps) => {
    const { className, liveCodeTask, target, handleClick } = props;
    const { t } = useTranslation();
    const { title, id, blocks } = liveCodeTask;
    const codeBlock = blocks.find(
        (block) => block.type === SectionType.CODE,
    ) as CodeBlock;
    const additionalClasses = getFlexClasses({ vStack: true, gap: '16' });

    return (
        <Card
            className={classNames('', {}, [...additionalClasses, className])}
            padding="16"
            max
        >
            <Text title={title} bold size="s" />
            <CodeBlockComponent code={codeBlock.code} />
            <AppLink
                to={getRouteLiveCodeTaskDetails(id)}
                className={cls.readBtn}
                target={target}
            >
                <Button variant="outline" onClick={handleClick} size="s">
                    {t('Читати відповідь')}
                </Button>
            </AppLink>
        </Card>
    );
});
