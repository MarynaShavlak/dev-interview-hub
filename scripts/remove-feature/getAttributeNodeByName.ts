import { JsxAttribute } from 'ts-morph';

export const getAttributeNodeByName = (
    jsxAttributes: JsxAttribute[],
    name: string,
) => {
    return jsxAttributes.find((node) => node.getName() === name);
};
