/**
 * Extracts full HTML strings from <p>, <ul>, and <ol> tags in the provided markup.
 *
 * @param {string} markup - The input HTML markup string.
 * @returns {string[]} An array of full HTML strings including the tags.
 */

function removeSubstringStrings(arr: string[]) {
    return arr.filter(
        (str, index, self) =>
            !self.some(
                (otherStr, otherIndex) =>
                    index !== otherIndex && otherStr.includes(str),
            ),
    );
}

export const extractHtmlStrings = (markup: string): string[] => {
    const parser = new DOMParser();
    // console.log('markup', markup);
    const doc = parser.parseFromString(markup, 'text/html');
    //
    const elements = doc.querySelectorAll('p, ul, ol');
    // console.log(elements);

    const result = Array.from(elements)
        .filter((element) => {
            const content = element.innerHTML.replace(/&nbsp;/g, '').trim();

            return content.length > 0;
        })
        .map((element) => element.outerHTML.trim());

    return removeSubstringStrings(result);
};
