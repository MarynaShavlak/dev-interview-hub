import { memo } from 'react';
import { Modal } from '@/shared/ui/common/Modal';
import { AuthFormAsync as AuthForm } from '../AuthForm/AuthForm.async';

interface AuthModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal = memo(
    ({ className, isOpen, onClose }: AuthModalProps) => (
        <Modal className={className} isOpen={isOpen} onClose={onClose} lazy>
            <AuthForm onSuccess={onClose} />
        </Modal>
    ),
);
