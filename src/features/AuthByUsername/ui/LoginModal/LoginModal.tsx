import { memo } from 'react';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { LoginFormAsync as LoginForm } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = memo(
    ({ className, isOpen, onClose }: LoginModalProps) => (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <LoginForm onSuccess={onClose} />
        </Modal>
    ),
);
