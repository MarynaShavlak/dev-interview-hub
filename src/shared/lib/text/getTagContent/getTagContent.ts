type ParseContentResult =
    | string
    | { name: 'unordered' | 'ordered'; items: string[] };

export const getTagContent = (markupString: string): ParseContentResult => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(markupString, 'text/html');

    if (doc.querySelector('p')) {
        return doc.querySelector('p')?.innerHTML?.trim() || '';
    }
    if (doc.querySelector('ul')) {
        const listItems = doc.querySelectorAll('ul li');
        return {
            name: 'unordered',
            items: Array.from(listItems).map(
                (item) => item.innerHTML?.trim() || '',
            ),
        };
    }
    if (doc.querySelector('ol')) {
        const listItems = doc.querySelectorAll('ol li');
        return {
            name: 'ordered',
            items: Array.from(listItems).map(
                (item) => item.innerHTML?.trim() || '',
            ),
        };
    }

    return '';
};
