import React, { memo } from 'react';
import { Modal } from '@/shared/ui/common/Modal';

import { ConfirmCancelContentAsync as ConfirmCancelContent } from '../ConfirmCancelContent/ConfirmCancelContent.async';

interface ConfirmCancelModalProps {
    className?: string;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    text: string;
    cancelBtnText: string;
    confirmBtnText: string;
}

export const ConfirmCancelModal = memo((props: ConfirmCancelModalProps) => {
    const {
        className,
        isOpen,
        onCancel,
        onConfirm,
        text,
        confirmBtnText,
        cancelBtnText,
    } = props;

    return (
        <Modal className={className} isOpen={isOpen} onClose={onCancel} lazy>
            <ConfirmCancelContent
                onCancel={onCancel}
                onConfirm={onConfirm}
                text={text}
                confirmBtnText={confirmBtnText}
                cancelBtnText={cancelBtnText}
            />
        </Modal>
    );
});
