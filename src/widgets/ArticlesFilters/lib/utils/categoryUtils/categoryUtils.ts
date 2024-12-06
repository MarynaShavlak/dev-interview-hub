export const getCategorySlug = (name: string) => {
    return name.split(' ').map(encodeURIComponent).join('-');
};

export const getCategoryName = (slug: string) => {
    return slug.split('-').map(decodeURIComponent).join(' ');
};
