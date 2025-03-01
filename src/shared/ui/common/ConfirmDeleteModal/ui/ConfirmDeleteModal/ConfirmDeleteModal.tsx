import React, { memo } from 'react';
import { Modal } from '@/shared/ui/common/Modal';

import { ConfirmDeleteContentAsync as ConfirmDeleteContent } from '../ConfirmDeleteContent/ConfirmDeleteContent.async';

interface ConfirmDeleteModalProps {
    className?: string;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => Promise<void>;
    text: string;
}

export const ConfirmDeleteModal = memo((props: ConfirmDeleteModalProps) => {
    const { className, isOpen, onCancel, text, onConfirm } = props;

    return (
        <Modal className={className} isOpen={isOpen} onClose={onCancel} lazy>
            <ConfirmDeleteContent
                onCancel={onCancel}
                onConfirm={onConfirm}
                text={text}
            />
        </Modal>
    );
});
