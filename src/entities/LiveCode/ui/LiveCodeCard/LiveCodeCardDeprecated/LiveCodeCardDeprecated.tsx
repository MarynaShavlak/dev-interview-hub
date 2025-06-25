import { memo } from 'react';
import { useTranslation } from 'react-i18next';
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
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';

export const LiveCodeCardDeprecated = memo((props: LiveCodeCardProps) => {
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
            <Text title={title} bold size={TextSize.S} />
            <CodeBlockComponent code={codeBlock.code} />
            <AppLink
                to={getRouteLiveCodeTaskDetails(id)}
                className={cls.readBtn}
                target={target}
            >
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={handleClick}
                    size={ButtonSize.S}
                >
                    {t('Читати відповідь')}
                </Button>
            </AppLink>
        </Card>
    );
});
