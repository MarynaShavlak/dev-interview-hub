import { useEditorPageHeader } from '@/widgets/EditorPageHeader';
import { useLiveCodeFormState } from '../useLiveCodeFormState/useLiveCodeFormState';
import { useLiveCodeTaskNavigation } from '@/entities/LiveCode';

export const useLiveCodeEditorPageHeader = (
    onActions: {
        clear: () => void;
        save: () => Promise<string | null>;
        update: () => Promise<string | null>;
        cancel: () => void;
        delete: () => Promise<string | null>;
    },
    hasErrors: boolean,
) => {
    const { formData, hasChanges } = useLiveCodeFormState();
    const { navigateToLiveCodeTask } = useLiveCodeTaskNavigation();

    return useEditorPageHeader({
        formData,
        hasChanges,
        hasErrors,
        onActions,
        navigationHandlers: {
            onSaveSuccess: (id: string) => navigateToLiveCodeTask(id),
            onUpdateSuccess: (id: string) => navigateToLiveCodeTask(id),
            onDeleteSuccess: (id: string) =>
                navigateToLiveCodeTask(`${id}-deleted`),
            onCancel: (id: string) => navigateToLiveCodeTask(id),
        },
    });
};
