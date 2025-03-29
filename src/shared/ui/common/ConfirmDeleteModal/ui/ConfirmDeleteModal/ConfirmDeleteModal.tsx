import React, { memo } from 'react';
import { Modal } from '../../../Modal';

import { ConfirmDeleteContentAsync as ConfirmDeleteContent } from '../ConfirmDeleteContent/ConfirmDeleteContent.async';

export interface ConfirmDeleteModalProps {
    className?: string;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => Promise<void>;
    text: string;
}

const ConfirmDeleteModal = memo((props: ConfirmDeleteModalProps) => {
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

export default ConfirmDeleteModal;
