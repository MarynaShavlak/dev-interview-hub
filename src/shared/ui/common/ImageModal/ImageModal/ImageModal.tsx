import React, { memo } from 'react';
import { Modal } from '../../Modal';
import { ImageModalContentAsync as ImageModalContent } from '../ImageModalContent/ImageModalContent.async';

interface ImageModalProps {
    className?: string;
    isOpen: boolean;
    src: string;
    title: string;
    onClose: () => void;
}

export const ImageModal = memo((props: ImageModalProps) => {
    const { className, isOpen, onClose, src, title } = props;

    return (
        <Modal className={className} isOpen={isOpen} lazy onClose={onClose}>
            <ImageModalContent src={src} title={title} />
        </Modal>
    );
});
