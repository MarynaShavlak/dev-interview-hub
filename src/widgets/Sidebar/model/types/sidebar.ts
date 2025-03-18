import React from 'react';

/**
 * Interface representing an item in the sidebar navigation.
 * @property {string} path - The path or URL that the sidebar item links to.
 * @property {string} text - The text label displayed for the sidebar item.
 * @property {React.VFC<React.SVGProps<SVGSVGElement>>} Icon - A functional component that returns an SVG icon associated with the sidebar item.
 * @property {boolean} [authOnly] - Optional. Indicates whether the sidebar item is restricted to authenticated users only.
 */

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
    target?: string;
}
