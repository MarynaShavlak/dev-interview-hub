/**
 * Extracts full HTML strings from <p>, <ul>, and <ol> tags in the provided markup.
 *
 * @param {string} markup - The input HTML markup string.
 * @returns {string[]} An array of full HTML strings including the tags.
 */
export const extractHtmlStrings = (markup: string): string[] => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(markup, 'text/html');

    const elements = doc.querySelectorAll('p, ul, ol');

    return Array.from(elements)
        .filter((element) => element.innerHTML.trim().length > 0)
        .map((element) => element.outerHTML.trim());
};
