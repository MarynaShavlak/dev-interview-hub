import React, { memo } from 'react';
import { ArticleMetaForm } from '../ArticleMetaForm/ArticleMetaForm';
import { AddCategoryForm } from '../AddCategoryForm/AddCategoryForm';
import { AddBlocksForm } from '../AddBlocksForm/AddBlocksForm';
import { AddHeroForm } from '../AddHeroForm/AddHeroForm';
import { UseArticleEditorReturn } from '../../lib/hooks/useArticleEditor/useArticleEditor';
import { VStack } from '@/shared/ui/common/Stack';

import { ContentSkeleton } from './ContentSkeleton/ContentSkeleton';

interface ArticleEditorPageProps {
    metadata: UseArticleEditorReturn['metadata'];
    validation: UseArticleEditorReturn['validation'];
    blockActions: UseArticleEditorReturn['blockActions'];
    heroImage: UseArticleEditorReturn['heroImage'];
}

export const ArticleEditorPageContent = memo(
    (props: ArticleEditorPageProps) => {
        const { heroImage, validation, blockActions, metadata } = props;
        const {
            preview,
            avatarSrc,
            fileTypeError,
            handleImageChange,
            resetImage,
        } = heroImage;
        const { blocks, isLoading } = metadata;
        console.log('avatarSrc', avatarSrc);
        console.log('previews', preview);
        if (isLoading) {
            return <ContentSkeleton />;
        }

        return (
            <VStack gap="24">
                <ArticleMetaForm
                    titleIndex={1}
                    subtitleIndex={2}
                    errors={validation}
                />
                <AddHeroForm
                    index={3}
                    error={fileTypeError}
                    handleImageChange={handleImageChange}
                    resetImage={resetImage}
                    imagePreview={avatarSrc || preview}
                />
                <AddCategoryForm index={4} />
                <AddBlocksForm
                    index={5}
                    blocks={blocks}
                    blockActions={blockActions}
                />
            </VStack>
        );
    },
);
