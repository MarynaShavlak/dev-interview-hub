# toggleFeatures Function

The `toggleFeatures` function is a utility designed to facilitate feature flag management in a React application. This function enables conditional rendering and behavior adjustments based on feature flag states. It is particularly useful for maintaining a clean codebase while implementing new features or deprecating old ones.

## Purpose
The primary purpose of the `toggleFeatures` function is to provide a streamlined way to toggle between different implementations or behaviors depending on whether a specific feature flag is enabled or not. By abstracting this logic, the function promotes cleaner, more maintainable code and allows developers to easily manage feature flags throughout the application.

## Importance
- **Clean Code Management**: Simplifies conditional rendering and logic based on feature flags.
- **Easy Feature Toggling**: Allows seamless switching between feature implementations.
- **Code Maintainability**: Reduces code duplication and complexity by centralizing feature flag logic.

## Role
The `toggleFeatures` function plays a critical role in feature flag management by encapsulating the conditional logic required to toggle features. It checks the state of a feature flag and executes the appropriate function (`on` or `off`) based on whether the flag is enabled or not.

## Parameters:
**Note:** All parameters are required.

| Parameter | Type     | Description                                     |
|-----------|----------|-------------------------------------------------|
| `name`    | `keyof FeatureFlags` | The name of the feature flag to toggle.  |
| `on`      | `() => T` | A function returning the value when the feature flag is enabled. |
| `off`     | `() => T` | A function returning the value when the feature flag is disabled. |

## Returns:
- The result of either the `on()` or `off()` function based on the current state of the feature flag specified by `name`.

## Usage Examples

### Example 1: Conditional Rendering of Components
```typescript jsx
import { memo } from 'react';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';

export interface CommentCardSkeletonProps {
    className?: string;
}

export const CommentCardSkeleton = memo((props: CommentCardSkeletonProps) => {
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    return (
        <Skeleton
            width={30}
            height={30}
            border="50%"
        />
    );
});
```

### Example 2: Conditional Styling in a Component
```typescript jsx
import { memo } from 'react';
import { toggleFeatures } from '@/shared/lib/features';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import cls from '../../ArticleListItem/ArticleListItem.module.scss';

export const ListViewSkeleton = memo(() => {
    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.ArticleListItemRedesigned,
        off: () => cls.ArticleListItem,
    });

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    const imgSkeletonHeight = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => 320,
        off: () => 200,
    });

    return (
        <div className={classNames(mainClass, {}, [cls.LIST])}>
            <Skeleton height={imgSkeletonHeight} />
        </div>
    );
});
```
### Example 3: Conditional Wrapper Ref in a Component
```typescript jsx
import { MutableRefObject, ReactNode, useRef } from 'react';
import { toggleFeatures } from '@/shared/lib/features';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

interface PageProps {
    children: ReactNode;
    onScrollEnd?: () => void;
    className?: string;
}

export const Page = (props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        triggerRef,
        wrapperRef: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => undefined,
            off: () => wrapperRef,
        }),
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        // Set initial scroll position
    });

    const onScroll = ()=> {
        // logic for update scroll position in Redux store
    };
    
    return (
        <main
            ref={wrapperRef}
            onScroll={onScroll}
        >
            {children}
            {onScrollEnd && <div ref={triggerRef} />}
        </main>
    );
};
```
## Conclusion 
The `toggleFeatures` function is an essential utility for managing feature flags in React applications, offering a centralized method to switch between different implementations based on feature flag states. 
It enhances code maintainability by abstracting complex feature flag logic, reduces code duplication by consolidating conditional logic, and improves flexibility by enabling seamless feature variations and gradual rollouts.
Whether you're handling conditional rendering, dynamic styling, or adjusting component behavior based on feature flags, `toggleFeatures` provides a consistent approach to managing these variations. 
Its ability to encapsulate conditional logic into a single utility function makes it a valuable tool for enhancing both the development and maintenance phases of a React application.
