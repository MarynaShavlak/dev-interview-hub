import cls from './LiveCodeTaskDetails.module.scss';

import { SectionType } from '@/shared/types/sectionTypes';
import { LiveCodeBlock } from '../../model/types/liveCode';
import { CodeBlockComponent } from '@/shared/ui/common/CodeBlockComponent';
import { TextBlockComponent } from '@/shared/ui/common/TextBlockComponent';

export const renderLiveCodeTaskBlock = (block: LiveCodeBlock) => {
    switch (block.type) {
        case SectionType.CODE:
            return (
                <CodeBlockComponent
                    key={block.id}
                    title={block.title}
                    code={block.code}
                    className={cls.block}
                />
            );

        case SectionType.TEXT:
            return (
                <TextBlockComponent
                    key={block.id}
                    className={cls.block}
                    title={block.title}
                    paragraphs={block.paragraphs}
                    withTags={false}
                />
            );
        default:
            return null;
    }
};
