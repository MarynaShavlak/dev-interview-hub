import { useHRInterviewQAFormState } from '../useHRInterviewQAFormState/useHRInterviewQAFormState';
import { useInterviewTableNavigation } from '@/entities/HRInterviewQA';

import { useEditorPageHeader } from '@/widgets/EditorPageHeader';

export const useHRInterviewQAEditorPageHeader = (
    onActions: {
        clear: () => void;
        save: () => Promise<string | null>;
        update: () => Promise<string | null>;
        cancel: () => void;
        delete: () => Promise<string | null>;
    },
    hasErrors: boolean,
) => {
    const { formData, hasChanges } = useHRInterviewQAFormState();
    const { onNavigateToInterviewTable } = useInterviewTableNavigation();

    return useEditorPageHeader({
        formData,
        hasChanges,
        hasErrors,
        onActions,
        navigationHandlers: {
            onSaveSuccess: () => onNavigateToInterviewTable(),
            onUpdateSuccess: () => onNavigateToInterviewTable(),
            onDeleteSuccess: () => onNavigateToInterviewTable(),
            onCancel: () => onNavigateToInterviewTable(),
        },
    });
};
