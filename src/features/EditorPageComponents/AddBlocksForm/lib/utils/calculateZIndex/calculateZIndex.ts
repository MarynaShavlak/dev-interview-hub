export const calculateZIndex = (
    notificationsZ: number,
    avatarDropdownZ: number,
) => {
    if (notificationsZ === 0 || avatarDropdownZ === 0) {
        return 0;
    }
    return notificationsZ;
};
