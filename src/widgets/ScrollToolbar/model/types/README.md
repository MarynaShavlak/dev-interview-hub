[//]: # (# ScrollSchema types)

[//]: # ()
[//]: # (## 'ScrollSchema')

[//]: # ()
[//]: # (`ScrollSchema` is a TypeScript type that defines an object where each key is a string representing the name of a page, and the corresponding value is a number representing the scroll position &#40;in pixels&#41; from the top of the page.)

[//]: # (- **Type**: `Record<string, number>`)

[//]: # (- **Purpose**: To store the scroll position &#40;in pixels from the top of the page&#41; for each page.)

[//]: # (- **Keys**: Strings representing the name of the pages &#40;e.g., "articles", "profile", "about"&#41;.)

[//]: # (- **Values**: Numbers representing the scroll position for the corresponding page.)

[//]: # ()
[//]: # (```typescript)

[//]: # (export type ScrollSchema = Record<string, number>;)

[//]: # (```)

[//]: # ()
[//]: # (## 'UIScrollSchema')

[//]: # ()
[//]: # (`UIScrollSchema` is a TypeScript interface that contains a single property named `scroll`. )

[//]: # (This property is of type `ScrollSchema`, which stores the scroll positions for various pages.)

[//]: # ()
[//]: # (- **Type**: `interface`)

[//]: # (- **Properties**:)

[//]: # (  - **scroll**: `ScrollSchema`)

[//]: # (- **Purpose**: To provide a structured schema that includes the scroll positions for various pages in the user interface.)

[//]: # ()
[//]: # (```typescript)

[//]: # (export interface UIScrollSchema {)

[//]: # (    scroll: ScrollSchema;)

[//]: # (})

[//]: # (```)
