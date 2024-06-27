import {
    ImgHTMLAttributes,
    memo,
    ReactElement,
    useLayoutEffect,
    useState,
} from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

/**
 * AppImage component to handle image loading and error states gracefully.
 * Extends the standard HTML <img> element with additional properties for custom fallbacks.
 *
 * @param {AppImageProps} props - The props for the component.
 * @param {string} [props.className] - CSS class for the image element.
 * @param {ReactElement} [props.fallback] - A React element to display while the image is loading.
 * @param {ReactElement} [props.errorFallback] - A React element to display if the image fails to load.
 * @returns {ReactElement} The rendered AppImage component.
 *
 * @example
 * import React from 'react';
 * import { AppImage } from './AppImage';
 *
 * const App = () => (
 *     <AppImage
 *         src="https://example.com/image.jpg"
 *         alt="Example Image"
 *         className="example-class"
 *         fallback={<div>Loading...</div>}
 *         errorFallback={<div>Error loading image</div>}
 *     />
 * );
 *
 * export default App;
 */

export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        src,
        alt = 'image',
        errorFallback,
        fallback,
        ...otherProps
    } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if (isLoading && fallback) {
        return fallback;
    }

    if (hasError && errorFallback) {
        return errorFallback;
    }

    return <img className={className} src={src} alt={alt} {...otherProps} />;
});
