type ParseContentResult =
    | string
    | { name: 'unordered' | 'ordered'; items: string[] };

export const getTagContent = (markupString: string): ParseContentResult => {
    // const updatedHtmlString = fixNestedLists(markupString);
    console.log('markupString', markupString);
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

//-----------------------------------------------------------------------------

// /**
//  * Fixes improperly nested <ul> tags in an HTML string by wrapping them with <li>.
//  * @param {string} htmlString - The HTML string to fix.
//  * @returns {string} - The updated HTML string with properly nested lists.
//  */
// function fixNestedLists(htmlString: string) {
//     // Parse the HTML string into a DOM structure
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlString, 'text/html');
//
//     // Get all <ul> elements inside the main list
//     const ulElements = doc.querySelectorAll('ul ul');
//     if (!doc.body || !doc.body.firstElementChild) {
//         throw new Error('Invalid HTML: No root element found');
//     }
//
//     // Iterate over the <ul> elements to ensure they are wrapped in <li>
//     ulElements.forEach((ul) => {
//         // Check if the parent of the <ul> is <ul> instead of <li>
//         if (ul.parentElement?.tagName.toLowerCase() === 'ul') {
//             // Create a new <li> element
//             const wrapperLi = document.createElement('li');
//             // Move the current <ul> inside the new <li>
//             wrapperLi.appendChild(ul.cloneNode(true));
//             // Replace the original <ul> with the new <li> containing it
//             ul.parentElement.replaceChild(wrapperLi, ul);
//         }
//     });
//
//     // Serialize the modified DOM back to a string
//     const serializer = new XMLSerializer();
//     return serializer.serializeToString(doc.body.firstElementChild);
// }
//

//----------------------------------------
// export type ParseContentResult =
//     | string
//     | { name: 'unordered' | 'ordered'; items: (string | ParseContentResult)[] };
//
// /**
//  * Fixes improperly nested <ul> tags in an HTML string by wrapping them with <li>.
//  * @param {string} htmlString - The HTML string to fix.
//  * @returns {string} - The updated HTML string with properly nested lists.
//  */
// function fixNestedLists(htmlString: string): string {
//     // Parse the HTML string into a DOM structure
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlString, 'text/html');
//
//     // Ensure valid root
//     if (!doc.body || !doc.body.firstElementChild) {
//         throw new Error('Invalid HTML: No root element found');
//     }
//
//     // Wrap orphaned <ul> or <ol> with <li>
//     const fixOrphanLists = (parent: HTMLElement) => {
//         parent.childNodes.forEach((node) => {
//             if (node.nodeName === 'UL' || node.nodeName === 'OL') {
//                 const ulOrOl = node as HTMLElement;
//
//                 // Check if parent is a <ul> or <ol>
//                 if (
//                     ulOrOl.parentElement?.tagName.toLowerCase() === 'ul' ||
//                     ulOrOl.parentElement?.tagName.toLowerCase() === 'ol'
//                 ) {
//                     const wrapperLi = document.createElement('li');
//                     wrapperLi.appendChild(ulOrOl.cloneNode(true));
//                     ulOrOl.replaceWith(wrapperLi);
//                 }
//             }
//             if (node.nodeType === 1) {
//                 fixOrphanLists(node as HTMLElement); // Recursive fix
//             }
//         });
//     };
//
//     fixOrphanLists(doc.body);
//
//     // Serialize the fixed DOM back to a string
//     const serializer = new XMLSerializer();
//     return serializer.serializeToString(doc.body.firstElementChild);
// }
//
// /**
//  * Recursively parses the content of <ul> or <ol> lists into the desired data structure.
//  * @param {HTMLElement} element - The current list (ul/ol) being parsed.
//  * @param {'unordered' | 'ordered'} listType - The type of the list.
//  * @returns {ParseContentResult} - The parsed result containing nested items.
//  */
// function parseList(
//     element: HTMLElement,
//     listType: 'unordered' | 'ordered',
// ): ParseContentResult {
//     const items: (string | ParseContentResult)[] = [];
//
//     element.querySelectorAll(':scope > li').forEach((li) => {
//         const children = Array.from(li.childNodes);
//         let textContent = '';
//         let nestedList: ParseContentResult | null = null;
//
//         children.forEach((child) => {
//             if (child.nodeType === Node.TEXT_NODE) {
//                 textContent += child.textContent?.trim() || '';
//             } else if (child.nodeName === 'UL' || child.nodeName === 'OL') {
//                 nestedList = parseList(
//                     child as HTMLElement,
//                     child.nodeName === 'UL' ? 'unordered' : 'ordered',
//                 );
//             }
//         });
//
//         // Add text content if available
//         if (textContent) {
//             items.push(textContent);
//         }
//
//         // Add nested list if available
//         if (nestedList) {
//             items.push(nestedList);
//         }
//     });
//
//     return { name: listType, items };
// }
//
// /**
//  * Parses an HTML string to extract content and convert lists to structured data.
//  * @param {string} markupString - The input HTML markup.
//  * @returns {ParseContentResult} - The structured content with nested lists.
//  */
// export const getTagContent = (markupString: string): ParseContentResult => {
//     const updatedHtmlString = fixNestedLists(markupString);
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(updatedHtmlString, 'text/html');
//
//     if (doc.querySelector('p')) {
//         return doc.querySelector('p')?.innerHTML?.trim() || '';
//     }
//     if (doc.querySelector('ul')) {
//         return parseList(doc.querySelector('ul') as HTMLElement, 'unordered');
//     }
//     if (doc.querySelector('ol')) {
//         return parseList(doc.querySelector('ol') as HTMLElement, 'ordered');
//     }
//
//     return '';
// };

// //______________varinat 2 ________________
// type ParseContentResult = (string | ParseContentResult)[];
//
// /**
//  * Fixes improperly nested <ul> tags in an HTML string by wrapping them with <li>.
//  * @param {string} htmlString - The HTML string to fix.
//  * @returns {string} - The updated HTML string with properly nested lists.
//  */
// function fixNestedLists(htmlString: string): string {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlString, 'text/html');
//
//     if (!doc.body || !doc.body.firstElementChild) {
//         throw new Error('Invalid HTML: No root element found');
//     }
//
//     const fixOrphanLists = (parent: HTMLElement) => {
//         parent.childNodes.forEach((node) => {
//             if (node.nodeName === 'UL' || node.nodeName === 'OL') {
//                 const ulOrOl = node as HTMLElement;
//
//                 // Ensure the list is inside an <li> tag
//                 if (ulOrOl.parentElement?.tagName.toLowerCase() === 'ul') {
//                     const wrapperLi = document.createElement('li');
//                     wrapperLi.appendChild(ulOrOl.cloneNode(true));
//                     ulOrOl.replaceWith(wrapperLi);
//                 }
//             }
//
//             if (node.nodeType === 1) {
//                 fixOrphanLists(node as HTMLElement); // Recursive fix
//             }
//         });
//     };
//
//     fixOrphanLists(doc.body);
//
//     const serializer = new XMLSerializer();
//     return serializer.serializeToString(doc.body.firstElementChild);
// }
//
// /**
//  * Recursively parses the content of <ul> or <ol> lists into a simple nested array.
//  * @param {HTMLElement} element - The current list (ul/ol) being parsed.
//  * @returns {ParseContentResult} - A simple array of strings and nested arrays.
//  */
// function parseListToArray(element: HTMLElement): ParseContentResult {
//     const items: ParseContentResult = [];
//
//     element.querySelectorAll(':scope > li').forEach((li) => {
//         const children = Array.from(li.childNodes);
//         let textContent = '';
//         let nestedList: ParseContentResult | null = null;
//
//         children.forEach((child) => {
//             if (child.nodeType === Node.TEXT_NODE) {
//                 textContent += child.textContent?.trim() || '';
//             } else if (child.nodeName === 'UL' || child.nodeName === 'OL') {
//                 nestedList = parseListToArray(child as HTMLElement);
//             }
//         });
//
//         // Add text content or nested list
//         if (textContent) {
//             items.push(textContent);
//         }
//         if (nestedList) {
//             items.push(nestedList);
//         }
//     });
//
//     return items;
// }

/**
//  * Parses an HTML string to extract content and convert lists to a nested array.
//  * @param {string} markupString - The input HTML markup.
//  * @returns {ParseContentResult} - A nested array with strings and arrays.
//  */
// export const getTagContent = (markupString: string): ParseContentResult => {
//     const updatedHtmlString = fixNestedLists(markupString);
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(updatedHtmlString, 'text/html');
//
//     if (doc.querySelector('ul')) {
//         return parseListToArray(doc.querySelector('ul') as HTMLElement);
//     }
//
//     return [];
// };

// type ParseContentResult = {
//     name: 'unordered' | 'ordered';
//     items: (string | string[])[];
// };
//
// /**
//  * Fixes improperly nested <ul> tags in an HTML string by wrapping them with <li>.
//  * @param {string} htmlString - The HTML string to fix.
//  * @returns {string} - The updated HTML string with properly nested lists.
//  */
// function fixNestedLists(htmlString: string): string {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlString, 'text/html');
//
//     if (!doc.body || !doc.body.firstElementChild) {
//         throw new Error('Invalid HTML: No root element found');
//     }
//
//     const fixOrphanLists = (parent: HTMLElement) => {
//         parent.childNodes.forEach((node) => {
//             if (node.nodeName === 'UL' || node.nodeName === 'OL') {
//                 const ulOrOl = node as HTMLElement;
//
//                 // Ensure the list is inside an <li> tag
//                 if (ulOrOl.parentElement?.tagName.toLowerCase() === 'ul') {
//                     const wrapperLi = document.createElement('li');
//                     wrapperLi.appendChild(ulOrOl.cloneNode(true));
//                     ulOrOl.replaceWith(wrapperLi);
//                 }
//             }
//
//             if (node.nodeType === 1) {
//                 fixOrphanLists(node as HTMLElement); // Recursive fix
//             }
//         });
//     };
//
//     fixOrphanLists(doc.body);
//
//     const serializer = new XMLSerializer();
//     return serializer.serializeToString(doc.body.firstElementChild);
// }
//
// /**
//  * Recursively parses the content of <ul> or <ol> lists into a nested array structure.
//  * @param {HTMLElement} element - The current list (ul/ol) being parsed.
//  * @returns {(string | string[])[]} - A structured array containing strings and nested arrays.
//  */
// function parseListToArray(element: HTMLElement): (string | string[])[] {
//     const items: (string | string[])[] = [];
//
//     element.querySelectorAll(':scope > li').forEach((li) => {
//         const children = Array.from(li.childNodes);
//         let textContent = '';
//         let nestedList: string[] = [];
//
//         children.forEach((child) => {
//             if (child.nodeType === Node.TEXT_NODE) {
//                 textContent += child.textContent?.trim() || '';
//             } else if (child.nodeName === 'UL' || child.nodeName === 'OL') {
//                 nestedList = parseListToArray(child as HTMLElement) as string[];
//             }
//         });
//
//         // Add text content or nested list
//         if (textContent) {
//             items.push(textContent);
//         }
//         if (nestedList.length) {
//             items.push(nestedList);
//         }
//     });
//
//     return items;
// }
//
// /**
//  * Parses an HTML string to extract content and convert lists to a structured object.
//  * @param {string} markupString - The input HTML markup.
//  * @returns {ParseContentResult} - A structured object with name and items.
//  */
// export const getTagContent = (markupString: string): ParseContentResult => {
//     const updatedHtmlString = fixNestedLists(markupString);
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(updatedHtmlString, 'text/html');
//
//     if (doc.querySelector('ul') || doc.querySelector('ol')) {
//         const list = doc.querySelector('ul, ol') as HTMLElement;
//         const isOrdered = list.tagName.toLowerCase() === 'ol';
//
//         return {
//             name: isOrdered ? 'ordered' : 'unordered',
//             items: parseListToArray(list),
//         };
//     }
//
//     return { name: 'unordered', items: [] }; // Default empty response
// };
