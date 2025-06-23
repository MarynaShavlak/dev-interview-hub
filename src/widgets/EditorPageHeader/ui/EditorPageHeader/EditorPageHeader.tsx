import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { ConfirmCancelModal } from '@/shared/ui/common/ConfirmCancelModal';
import { ConfirmDeleteModal } from '@/shared/ui/common/ConfirmDeleteModal';
import { HStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';

import { useEditorPageHeader } from '../../lib/hooks/useEditorPageHeader/useEditorPageHeader';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import cls from './EditorPageHeader.module.scss';
import { EditorPageHeaderButtons } from '../EditorPageHeaderButtons/EditorPageHeaderButtons';
import { EntityType } from '@/shared/types/entityType';

interface EditorPageHeaderProps {
    hasErrors: boolean;
    onActions: {
        clear: () => void;
        save: () => Promise<string | null>;
        update: () => Promise<string | null>;
        delete: () => Promise<string | null>;
        cancel: () => void;
    };
    isEditPage: boolean;
    isLoading: boolean;
    entityType: EntityType;
    useEditorPageHeader: (
        onActions: any,
        hasErrors: boolean,
    ) => ReturnType<typeof useEditorPageHeader>;
}
type TranslationKeys = {
    [key in EntityType]: {
        editTitle: string;
        createTitle: string;
        entityName: string;
        editing: string;
    };
};

export const EditorPageHeader = memo((props: EditorPageHeaderProps) => {
    const {
        hasErrors,
        onActions,
        isEditPage,
        isLoading,
        entityType,
        useEditorPageHeader,
    } = props;
    const { t } = useTranslation('articleDetails');

    const translationKeys: TranslationKeys = {
        article: {
            editTitle: 'Редагування статті',
            createTitle: 'Створення нової статті',
            entityName: 'статтю',
            editing: 'редагування статті',
        },
        hrInterviewQA: {
            editTitle: 'Редагування питання на HR співбесіді',
            createTitle: 'Створення нового питання на HR співбесіді',
            entityName: 'відповідь на питання',
            editing: 'редагування питання',
        },
        liveCode: {
            editTitle: 'Редагування live coding завдання',
            createTitle: 'Створення нового live coding завдання',
            entityName: 'завдання',
            editing: 'редагування завдання',
        },
    };

    const pageTitle = isEditPage
        ? t(translationKeys[entityType].editTitle)
        : t(translationKeys[entityType].createTitle);

    const {
        deleteModal,
        cancelEditing,
        handleSave,
        handleUpdate,
        handleDelete,
        handleCancel,
        canSave,
        entityTitle,
        cancelEdit,
    } = useEditorPageHeader(onActions, hasErrors);
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });
    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.pageTitleWrapRedesigned,
        off: () => cls.pageTitleWrap,
    });

    if (isLoading) {
        return <Skeleton width="100%" height="76px" border="16px" />;
    }

    return (
        <HStack justify="between" max className={mainClass}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text title={pageTitle} size="l" />}
                off={<TextDeprecated title={pageTitle} size={TextSize.L} />}
            />

            <EditorPageHeaderButtons
                isEditPage={isEditPage}
                canSave={canSave}
                onClear={onActions.clear}
                onCancelEdit={cancelEdit}
                onUpdate={handleUpdate}
                onSave={handleSave}
                onDelete={deleteModal.show}
            />

            {deleteModal.isVisible && (
                <ConfirmDeleteModal
                    isOpen={deleteModal.isVisible}
                    onCancel={deleteModal.hide}
                    text={`${t(translationKeys[entityType].entityName)} "${entityTitle}"`}
                    onConfirm={handleDelete}
                />
            )}
            {cancelEditing.isVisible && (
                <ConfirmCancelModal
                    isOpen={cancelEditing.isVisible}
                    text={t(translationKeys[entityType].editing)}
                    cancelBtnText={t('Продовжити редагування')}
                    confirmBtnText={t('Відмінити зміни')}
                    onCancel={cancelEditing.hide}
                    onConfirm={handleCancel}
                />
            )}
        </HStack>
    );
});
