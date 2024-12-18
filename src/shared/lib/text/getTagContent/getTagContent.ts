export const getTagContent = (markupString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(markupString, 'text/html');

    if (doc.querySelector('p')) {
        return doc.querySelector('p')?.textContent?.trim();
    }
    if (doc.querySelector('ul')) {
        const listItems = doc.querySelectorAll('ul li');
        return {
            name: 'ul',
            items: Array.from(listItems).map((item) =>
                item?.textContent?.trim(),
            ),
        };
    }
    if (doc.querySelector('ol')) {
        const listItems = doc.querySelectorAll('ol li');
        return {
            name: 'ol',
            items: Array.from(listItems).map((item) =>
                item?.textContent?.trim(),
            ),
        };
    }

    return null;
};
