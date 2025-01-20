import React, { memo } from 'react';
import { ArticleMetaForm } from '../ArticleMetaForm/ArticleMetaForm';
import { AddCategoryForm } from '../AddCategoryForm/AddCategoryForm';
import { AddBlocksForm } from '../AddBlocksForm/AddBlocksForm';
import { AddHeroForm } from '../AddHeroForm/AddHeroForm';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { UseArticleEditorReturn } from '../../lib/hooks/useArticleEditor/useArticleEditor';

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

        if (isLoading) {
            return (
                <Skeleton
                    width="100%"
                    height="calc(100vh - 64px)"
                    border="40px"
                />
            );
        }

        return (
            <>
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
            </>
        );
    },
);
