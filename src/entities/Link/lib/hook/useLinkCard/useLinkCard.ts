import { useState, useCallback } from 'react';
import { Link } from '../../../model/types/link';

interface UseLinkCardProps {
    link: Link;
    deleteLink: (id: string) => void;
    updateLink: (question: Link) => Promise<void>;
}

export const useLinkCard = (props: UseLinkCardProps) => {
    const { link, updateLink, deleteLink } = props;
    const { id, text } = link;
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = useCallback(() => {
        setIsEditing(true);
    }, []);

    const handleDeleteClick = useCallback(() => {
        deleteLink(id);
    }, [deleteLink, id]);

    const handleCancelEditing = useCallback(() => {
        setIsEditing(false);
    }, []);

    const handleSave = useCallback(
        async (updatedLink: Link) => {
            await updateLink(updatedLink);
            setIsEditing(false);
        },
        [updateLink],
    );

    return {
        isEditing,
        handleEdit,
        handleDeleteClick,
        handleCancelEditing,
        handleSave,
    };
};
