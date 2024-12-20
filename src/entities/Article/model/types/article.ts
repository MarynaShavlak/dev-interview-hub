import type { User } from '@/entities/User';
import { ArticleSection, ArticleCategory } from '../consts/articleConsts';

/**
 * Base interface for different types of article blocks.
 *
 * @property {string} id - Unique identifier for the article block.
 * @property {ArticleSection} type - The type of the article block.
 */
export interface ArticleBlockBase {
    id: string;
    type: ArticleSection;
}

/**
 * Interface for a code block in an article.
 *
 * @property {ArticleSection} type - The type of the article block, set to CODE.
 * @property {string} code - The code content of the block.
 */
export interface ArticleCodeBlock extends ArticleBlockBase {
    type: ArticleSection.CODE;
    code: string;
    // title?: string;
    description?: string;
}

/**
 * Interface for an image block in an article.
 *
 * @property {ArticleSection} type - The type of the article block, set to IMAGE.
 * @property {string} src - The source URL of the image.
 * @property {string} title - The title or caption of the image.
 */
export interface ArticleImageBlock extends ArticleBlockBase {
    type: ArticleSection.IMAGE;
    src: string;
    title: string;
}

/**
 * Interface for a text block in an article.
 *
 * @property {ArticleSection} type - The type of the article block, set to TEXT.
 * @property {string[]} paragraphs - Array of paragraphs in the text block.
 * @property {string} [title] - The title of the text block. Optional.
 */

export interface ArticleTextBlock extends ArticleBlockBase {
    type: ArticleSection.TEXT;
    paragraphs: string[];
    title?: string;
}

/**
 * Union type representing the different types of article blocks.
 */

export type ArticleBlock =
    | ArticleCodeBlock
    | ArticleImageBlock
    | ArticleTextBlock;

interface ArticleSubtitle {
    text: string;
    link?: string;
}

/**
 * Interface representing an article.
 *
 * @property {string} id - Unique identifier for the article.
 * @property {User} user - The user who created the article.
 * @property {string} title - The title of the article.
 * @property {string} subtitle - The subtitle of the article.
 * @property {string} img - The URL of the article's cover image.
 * @property {number} views - The number of views the article has received.
 * @property {string} createdAt - The creation date of the article.
 * @property {ArticleCategory[]} category - Array of categories the article belongs to.
 * @property {ArticleBlock[]} blocks - Array of content blocks within the article.
 */

export interface Article {
    id: string;
    user: User;
    title: string;
    subtitle: ArticleSubtitle;
    img?: string;
    views: number;
    createdAt: string;
    category: ArticleCategory[];
    blocks: ArticleBlock[];
}

// const articles: Article[] = [
//     {
//         id: '1',
//         title: 'Для чого потрібний Virtual DOM у React?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/faq-internals.html',
//         },
//         img: 'https://example.com/virtual-dom.jpg',
//         views: 1560,
//         createdAt: '10.04.2024',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке Virtual DOM?',
//                 paragraphs: [
//                     "Virtual DOM (віртуальний DOM) — це абстрактне подання реального DOM. У React це один із ключових механізмів, який дозволяє оптимізувати рендеринг компонентів. Реальний DOM є об'єктною моделлю документів, яка представляє структуру сторінки в браузері. Однак робота з реальним DOM може бути досить повільною, оскільки кожен раз, коли ви змінюєте DOM, браузер проводить повторний рендеринг, що потребує значних ресурсів.",
//                     "Щоб уникнути цієї проблеми, в React використовують Virtual DOM. Це копія реального DOM, яка зберігається в пам'яті. Коли стан компонентів змінюється, React спочатку оновлює Virtual DOM, а потім порівнює його з попереднім станом, знаходячи відмінності (diffing). Після цього ці зміни застосовуються до реального DOM. Це дозволяє мінімізувати кількість змін і, як наслідок, значно прискорює роботу додатку.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Переваги використання Virtual DOM',
//                 paragraphs: [
//                     'Однією з основних переваг Virtual DOM є ефективність. Завдяки йому, React проводить рендеринг компонентів набагато швидше, порівняно з прямим маніпулюванням реальним DOM. Окрім цього, Virtual DOM дозволяє зберігати стан компонентів між рендерами та забезпечує зручну обробку оновлень.',
//                     'Ось основні переваги використання Virtual DOM у React:',
//                     '1. Швидкість: Оновлення відбувається швидше за рахунок того, що тільки необхідні зміни застосовуються до реального DOM.',
//                     "2. Оптимізація ресурсів: Мінімізується кількість оновлень, що знижує навантаження на процесор та пам'ять.",
//                     '3. Простота роботи з компонентами: Програмісти можуть легко управляти станом додатку, не турбуючись про оптимізацію кожного оновлення вручну.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання Virtual DOM',
//                 code: "const element = <h1>Hello, world!</h1>;\nReactDOM.render(element, document.getElementById('root'));\n\n// Це не реальний DOM, це його віртуальне представлення,\n// яке зберігається у пам'яті та оновлюється тільки коли потрібно.",
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/virtual-dom-flow.png',
//                 title: 'Схема роботи Virtual DOM',
//             },
//             {
//                 id: '5',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Як працює diffing алгоритм у Virtual DOM?',
//                 paragraphs: [
//                     'Diffing алгоритм — це основний механізм, який дозволяє React визначати, які частини DOM потребують оновлення. Коли стан компонента змінюється, React створює нову версію Virtual DOM і порівнює її з попередньою. Алгоритм визначає мінімальні зміни, які потрібно внести, і оновлює лише ті елементи реального DOM, які змінилися.',
//                     'Такий підхід дозволяє зменшити кількість зайвих операцій та підвищує продуктивність. React проводить це порівняння за допомогою рекурсивної перевірки кожного вузла дерева, що робить цей процес ефективним навіть для великих та складних інтерфейсів.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '2',
//         title: 'Яка різниця між Virtual DOM та Shadow DOM?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/faq-internals.html',
//         },
//         img: 'https://example.com/virtual-vs-shadow-dom.jpg',
//         views: 860,
//         createdAt: '15.08.2023',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке Shadow DOM?',
//                 paragraphs: [
//                     'Shadow DOM — це технологія веб-компонентів, яка дозволяє створювати ізольовані від основного DOM компоненти. За допомогою Shadow DOM можна створювати інкапсульовані елементи зі своїм стилем та логікою, які не впливають на інші частини документа.',
//                     'Основна ідея Shadow DOM полягає в тому, що це дерево компонентів, яке приховане від зовнішнього DOM. Це означає, що ви можете створювати елементи зі своїм власним стилем та поведінкою, не турбуючись про конфлікти з іншими стилями на сторінці. Наприклад, це дуже корисно при створенні віджетів або повторно використовуваних UI-елементів.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Різниця між Virtual DOM та Shadow DOM',
//                 paragraphs: [
//                     'Попри те, що і Virtual DOM, і Shadow DOM працюють з DOM, їхні завдання і підхід суттєво відрізняються:',
//                     "1. **Virtual DOM** використовується для оптимізації рендерингу. Це абстрактне подання реального DOM, яке оновлюється в пам'яті перед тим, як внести зміни в браузер.",
//                     '2. **Shadow DOM** використовується для інкапсуляції компонентів. Це окреме дерево DOM, яке існує окремо від основного і може мати свої стилі та скрипти. Воно не впливає на зовнішній DOM і не піддається його впливу.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/shadow-dom-diagram.png',
//                 title: 'Схема роботи Shadow DOM',
//             },
//             {
//                 id: '4',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад створення Shadow DOM',
//                 code: "const shadowRoot = document.getElementById('my-element').attachShadow({ mode: 'open' });\nshadowRoot.innerHTML = `<style> h1 { color: red; } </style><h1>Привіт, світ!</h1>`;\n// Цей стиль та контент інкапсульовані та не впливають на зовнішній DOM.",
//             },
//             {
//                 id: '5',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     'Якщо Virtual DOM призначений для оптимізації роботи з DOM у рамках рендерингу, то Shadow DOM забезпечує інкапсуляцію і дозволяє створювати незалежні компоненти. Вони можуть використовуватись окремо або разом у сучасних веб-додатках, залежно від потреби у оптимізації або структурі компонентів.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '3',
//         title: 'Яка різниця між state та props?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/faq-state.html',
//         },
//         img: 'https://example.com/state-vs-props.jpg',
//         views: 1120,
//         createdAt: '22.06.2023',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//             email: 'mainUser@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке state у React?',
//                 paragraphs: [
//                     "State (стан) у React — це об'єкт, який зберігає внутрішній стан компонента. Кожен компонент може мати свій власний стан, який може змінюватися впродовж життєвого циклу компонента. Стан управляється всередині компонента і впливає на те, як він рендериться та реагує на зміни.",
//                     'State є особливо важливим для динамічних компонентів, які повинні реагувати на дії користувача або зміни даних. Оновлення state відбувається за допомогою спеціальної функції setState, яка викликає повторний рендер компонента.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке props у React?',
//                 paragraphs: [
//                     'Props (властивості) — це дані, які передаються компоненту ззовні. Вони є незмінними всередині компонента і використовуються для налаштування зовнішнього вигляду або поведінки компонентів. Props можуть передавати інформацію з батьківського компонента до дочірнього, що дозволяє створювати модульні та багаторазово використовувані компоненти.',
//                     'На відміну від state, props не можуть бути змінені компонентом, який їх отримує. Це забезпечує передбачуваність і полегшує відстеження того, як компоненти взаємодіють один з одним.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання state та props',
//                 code: "class Welcome extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { name: ArticleCategory.REACT };\n  }\n\n  render() {\n    return <h1>Hello, {this.props.greeting} {this.state.name}!</h1>;\n  }\n}\n\nReactDOM.render(<Welcome greeting='World' />, document.getElementById('root'));\n// props передає 'World', а state управляє ArticleCategory.REACT.",
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основні відмінності між state та props',
//                 paragraphs: [
//                     '1. **State**: змінюється всередині компонента за допомогою setState, відповідає за динамічний контент.',
//                     '2. **Props**: передаються зовні та не можуть бути змінені всередині компонента. Вони забезпечують передачу даних між компонентами.',
//                     '3. **Взаємодія**: state використовується для керування внутрішнім станом компонента, тоді як props — для передачі даних між компонентами.',
//                 ],
//             },
//             {
//                 id: '5',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/state-vs-props-diagram.png',
//                 title: 'Схема роботи state та props',
//             },
//         ],
//     },
//     {
//         id: '4',
//         title: 'Які методи життєвого циклу є в React?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/react-component.html',
//         },
//         img: 'https://example.com/react-lifecycle.jpg',
//         views: 780,
//         createdAt: '10.05.2023',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Життєвий цикл компонентів у React',
//                 paragraphs: [
//                     'Компоненти у React проходять кілька стадій свого життєвого циклу: монтування (mounting), оновлення (updating) та демонтування (unmounting). React забезпечує серію методів, які називаються методами життєвого циклу, і вони дозволяють розробнику взаємодіяти з компонентами на різних етапах їх життєвого циклу.',
//                     'Ці методи дозволяють виконувати різні дії, такі як ініціалізація стану, оновлення компонентів після зміни props чи state, а також очищення ресурсів при видаленні компонента з DOM.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основні методи життєвого циклу',
//                 paragraphs: [
//                     '1. **componentDidMount**: Викликається після того, як компонент було вмонтовано в DOM. Часто використовується для ініціалізації даних з серверу або інтеграції з сторонніми бібліотеками.',
//                     '2. **shouldComponentUpdate**: Використовується для оптимізації рендерингу. Повертає булеве значення, яке визначає, чи повинен компонент перерендеритись після зміни props чи state.',
//                     '3. **componentDidUpdate**: Викликається після оновлення компонента. Це гарний момент для синхронізації з зовнішніми системами або виконання пост-рендерної логіки.',
//                     '4. **componentWillUnmount**: Викликається перед тим, як компонент буде видалено з DOM. Використовується для очищення ресурсів або завершення процесів, таких як таймери чи підписки.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/react-lifecycle-methods.png',
//                 title: 'Життєвий цикл компонентів у React',
//             },
//             {
//                 id: '4',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання методів життєвого циклу',
//                 code: "class MyComponent extends React.Component {\n  componentDidMount() {\n    console.log('Компонент змонтовано');\n  }\n\n  shouldComponentUpdate(nextProps, nextState) {\n    return nextProps.someValue !== this.props.someValue;\n  }\n\n  componentDidUpdate(prevProps) {\n    if (prevProps.someValue !== this.props.someValue) {\n      console.log('Оновлення компонента');\n    }\n  }\n\n  componentWillUnmount() {\n    console.log('Компонент буде видалено');\n  }\n\n  render() {\n    return <div>{this.props.someValue}</div>;\n  }\n}\n\nReactDOM.render(<MyComponent someValue={10} />, document.getElementById('root'));\n// Логіка використання різних методів життєвого циклу в класовому компоненті.",
//             },
//         ],
//     },
//     {
//         id: '5',
//         title: 'Яка різниця між класовим та функціональним компонентом?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/components-and-props.html',
//         },
//         img: 'https://example.com/class-vs-functional.jpg',
//         views: 920,
//         createdAt: '30.09.2023',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке класовий компонент?',
//                 paragraphs: [
//                     'Класові компоненти — це компоненти, створені за допомогою класів у JavaScript. Вони використовують синтаксис класів ES6 і дозволяють створювати компоненти з власним станом та методами життєвого циклу. Класовий компонент містить метод `render()`, який відповідає за рендеринг JSX елементів.',
//                     'Класові компоненти надають більше можливостей, зокрема, роботу з життєвими циклами та локальним станом, але їх синтаксис є більш складним порівняно з функціональними компонентами.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке функціональний компонент?',
//                 paragraphs: [
//                     'Функціональні компоненти — це простіші компоненти, які описуються за допомогою функцій. До виходу хуків у React (версія 16.8), вони не могли мати власний стан або методи життєвого циклу, але з використанням хуків (таких як `useState`, `useEffect`), функціональні компоненти можуть виконувати ті самі завдання, що й класові.',
//                     'Функціональні компоненти є легшими для читання та тестування, і їхній синтаксис більш компактний. Вони стали основним способом написання компонентів у сучасному React.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад класового та функціонального компонента',
//                 code: '// Класовий компонент\nclass Welcome extends React.Component {\n  render() {\n    return <h1>Hello, {this.props.name}</h1>;\n  }\n}\n\n// Функціональний компонент\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}',
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основні відмінності',
//                 paragraphs: [
//                     '1. **Синтаксис**: класові компоненти використовують класовий синтаксис, тоді як функціональні компоненти описуються за допомогою функцій.',
//                     '2. **Життєвий цикл**: класові компоненти використовують методи життєвого циклу (наприклад, `componentDidMount`), тоді як функціональні компоненти з хуками використовують `useEffect` для виконання схожих завдань.',
//                     '3. **Простота**: функціональні компоненти є простішими для розуміння та використання, особливо з хуками.',
//                 ],
//             },
//             {
//                 id: '5',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/class-vs-functional-diagram.png',
//                 title: 'Порівняння класового та функціонального компонентів',
//             },
//         ],
//     },
//     {
//         id: '6',
//         title: 'Як оновити state у класовому компоненті?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/state-and-lifecycle.html',
//         },
//         img: 'https://example.com/update-state.jpg',
//         views: 680,
//         createdAt: '12.05.2023',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке state у класовому компоненті?',
//                 paragraphs: [
//                     "State — це об'єкт, який зберігає динамічні дані компонента і може змінюватися в процесі його роботи. У класових компонентах state управляється всередині класу і може бути змінений за допомогою методу `setState`.",
//                     'Кожного разу, коли викликається метод `setState`, React планує повторний рендер компонента з оновленим станом, що робить цей процес автоматизованим і передбачуваним.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Як працює метод setState?',
//                 paragraphs: [
//                     "`setState` є основним механізмом для оновлення стану у класових компонентах. Коли ви викликаєте `setState`, React об'єднує новий стан із поточним і запускає повторний рендер компонента. Це дозволяє компоненту відобразити нові дані.",
//                     "Метод `setState` приймає або об'єкт із новими значеннями, або функцію, яка повертає новий стан на основі попереднього. Цей підхід з функцією є корисним, коли новий стан залежить від попереднього.",
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад оновлення state у класовому компоненті',
//                 code: "class Counter extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { count: 0 };\n  }\n\n  increment = () => {\n    this.setState({ count: this.state.count + 1 });\n  };\n\n  render() {\n    return (\n      <div>\n        <p>Count: {this.state.count}</p>\n        <button onClick={this.increment}>Increment</button>\n      </div>\n    );\n  }\n}\n\nReactDOM.render(<Counter />, document.getElementById('root'));\n// Кнопка збільшує значення count на 1 кожного разу, коли натискається.",
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Поради щодо використання setState',
//                 paragraphs: [
//                     '1. **Не змінюйте state напряму**: Використовуйте тільки `setState` для оновлення стану. Прямі зміни state (наприклад, `this.state.count = 10`) не призведуть до рендерингу компонента.',
//                     "2. **Функціональний синтаксис**: Якщо новий стан залежить від попереднього, використовуйте функцію замість об'єкта у `setState`. Це дозволить уникнути проблем із асинхронністю.",
//                     "3. **Об'єднання стану**: `setState` об'єднує новий стан із поточним. Якщо ви передаєте частковий стан, тільки ті ключі, які ви вказали, будуть оновлені.",
//                 ],
//             },
//             {
//                 id: '5',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/set-state-flow.png',
//                 title: 'Процес оновлення state у React',
//             },
//         ],
//     },
//     {
//         id: '7',
//         title: 'Чому setState асинхронна функція?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/state-and-lifecycle.html',
//         },
//         img: 'https://example.com/async-setstate.jpg',
//         views: 740,
//         createdAt: '21.09.2023',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке setState у React?',
//                 paragraphs: [
//                     '`setState` — це метод у класових компонентах React, який дозволяє оновлювати стан компонента. Виклик цього методу викликає повторний рендер компоненту з оновленим станом, але важливо розуміти, що цей процес не є синхронним.',
//                     "Асинхронність `setState` полягає у тому, що React об'єднує кілька викликів `setState` для оптимізації продуктивності та запобігання зайвим рендерингам.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Причина асинхронності',
//                 paragraphs: [
//                     'Асинхронна природа `setState` дозволяє React виконувати пакетне оновлення стану для підвищення продуктивності. Коли ви викликаєте `setState`, React не оновлює state негайно, а ставить це оновлення в чергу, дозволяючи іншим змінам виконуватись спільно перед рендерингом.',
//                     'Це гарантує, що не відбудеться зайвих рендерингів, і компонент буде оновлюватися лише тоді, коли всі зміни завершено. Такий підхід робить додатки швидшими і зменшує навантаження на браузер.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад поведінки setState',
//                 code: "class Counter extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { count: 0 };\n  }\n\n  increment = () => {\n    this.setState({ count: this.state.count + 1 });\n    console.log(this.state.count); // Може показати старе значення через асинхронність\n  };\n\n  render() {\n    return (\n      <div>\n        <p>Count: {this.state.count}</p>\n        <button onClick={this.increment}>Increment</button>\n      </div>\n    );\n  }\n}\n\nReactDOM.render(<Counter />, document.getElementById('root'));\n// Лог при кліку може відобразити старий стан через асинхронність setState.",
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Як працювати з асинхронним setState?',
//                 paragraphs: [
//                     '1. **Функціональне оновлення**: Для точного оновлення стану, яке залежить від попереднього, використовуйте функціональний підхід у `setState`.',
//                     '2. **Операції після оновлення**: Якщо потрібно виконати дію після оновлення стану, можна передати другий аргумент у `setState` — функцію зворотного виклику.',
//                 ],
//             },
//             {
//                 id: '5',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/async-state-diagram.png',
//                 title: 'Схема асинхронної роботи setState',
//             },
//         ],
//     },
//     {
//         id: '8',
//         title: 'Що потрібно зробити, щоб компонент оновився?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/state-and-lifecycle.html',
//         },
//         img: 'https://example.com/component-update.jpg',
//         views: 580,
//         createdAt: '01.06.2023',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Коли компонент оновлюється у React?',
//                 paragraphs: [
//                     'Компонент у React оновлюється кожного разу, коли змінюється його стан або пропси. Коли компонент отримує нові пропси, React автоматично викликає процес повторного рендерингу, щоб відобразити зміни на сторінці.',
//                     'Якщо компонент використовує state, виклик методу `setState` призведе до оновлення компонента, оскільки змінюється його внутрішній стан, що запускає повторний рендер.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Життєвий цикл оновлення компоненту',
//                 paragraphs: [
//                     'У класових компонентах React процес оновлення можна відслідковувати через життєві методи, такі як `componentDidUpdate`. Цей метод викликається після кожного рендеру, коли компонент отримує нові пропси або оновлюється стан.',
//                     'У функціональних компонентах це можна реалізувати через хук `useEffect`, який викликається після кожного рендеру.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Оновлення компоненту через пропси та state',
//                 code: "// Приклад оновлення через пропси\nfunction Greeting(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}\n\nReactDOM.render(<Greeting name=\"John\" />, document.getElementById('root'));\n\n// Оновлення через state\nclass Counter extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { count: 0 };\n  }\n  increment = () => {\n    this.setState({ count: this.state.count + 1 });\n  }\n  render() {\n    return (\n      <div>\n        <p>Count: {this.state.count}</p>\n        <button onClick={this.increment}>Increment</button>\n      </div>\n    );\n  }\n}\n\nReactDOM.render(<Counter />, document.getElementById('root'));\n",
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/component-update-diagram.png',
//                 title: 'Схема процесу оновлення компоненту',
//             },
//         ],
//     },
//     {
//         id: '9',
//         title: 'Як запобігти зайвому оновленню компонента?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/optimizing-performance.html',
//         },
//         img: 'https://example.com/prevent-re-renders.jpg',
//         views: 430,
//         createdAt: '03.04.2023',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке зайве оновлення?',
//                 paragraphs: [
//                     'Зайве оновлення компонента відбувається, коли компонент рендериться знову, хоча його стан або пропси не змінилися. Це може призвести до непотрібного споживання ресурсів і погіршення продуктивності додатку.',
//                     'Щоб уникнути зайвих рендерингів, у React існують різні підходи, такі як використання `shouldComponentUpdate` у класових компонентах або хуків, як `React.memo` і `useMemo` у функціональних.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Методи запобігання зайвому оновленню',
//                 paragraphs: [
//                     '1. **shouldComponentUpdate**: У класових компонентах ви можете контролювати процес рендерингу, використовуючи цей метод. Він дозволяє визначати, чи потрібно компоненту рендеритися при отриманні нових пропсів або зміні стану.',
//                     '2. **React.memo**: Для функціональних компонентів можна використовувати `React.memo`, щоб обгорнути компонент і запобігти його повторному рендеру, якщо пропси не змінилися.',
//                     "3. **useMemo та useCallback**: Ці хуки допомагають запам'ятовувати значення або функції, якщо залежності не змінилися, що запобігає непотрібним обчисленням і рендерингам.",
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання React.memo',
//                 code: '// Приклад компонента з React.memo\nconst MyComponent = React.memo(function MyComponent(props) {\n  return <div>{props.name}</div>;\n});\n\nReactDOM.render(<MyComponent name="John" />, document.getElementById(\'root\'));\n// Компонент буде рендеритися лише тоді, коли зміняться пропси',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/react-memo-usage.png',
//                 title: 'Приклад використання React.memo',
//             },
//         ],
//     },
//     {
//         id: '10',
//         title: 'Що таке refs?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/refs-and-the-dom.html',
//         },
//         img: 'https://example.com/react-refs.jpg',
//         views: 510,
//         createdAt: '07.05.2023',
//         user: {
//             id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
//             username: 'markUser',
//             firstname: 'Mark',
//             lastname: 'Smith',
//             email: 'markUser@gmail.com',
//             avatar: 'https://example.com/avatar6.png',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке refs у React?',
//                 paragraphs: [
//                     '`Refs` у React дозволяють вам безпосередньо доступати до елементів DOM або елементів класових компонентів. Зазвичай ви працюєте з пропсами та станом для оновлення інтерфейсу, але інколи необхідний доступ до нижчого рівня DOM для більш тонкого контролю.',
//                     'Наприклад, ви можете використовувати refs для фокусування на елементі, виконання анімацій або інтеграції зі сторонніми бібліотеками.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Як використовувати refs?',
//                 paragraphs: [
//                     "У класових компонентах refs створюються за допомогою методу `React.createRef()`, і їх можна прив'язати до елементів через атрибут `ref`. У функціональних компонентах для цього використовують хук `useRef`.",
//                     'Щоб отримати доступ до DOM-елемента, достатньо викликати референс і взаємодіяти з ним, наприклад, встановлювати фокус на інпут.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання refs',
//                 code: '// Класовий компонент із refs\nclass MyComponent extends React.Component {\n  constructor(props) {\n    super(props);\n    this.myRef = React.createRef();\n  }\n  componentDidMount() {\n    this.myRef.current.focus(); // Встановити фокус на input\n  }\n  render() {\n    return <input ref={this.myRef} />;\n  }\n}\n\n// Функціональний компонент із useRef\nfunction MyFunctionalComponent() {\n  const inputRef = useRef(null);\n  useEffect(() => {\n    inputRef.current.focus(); // Встановити фокус\n  }, []);\n  return <input ref={inputRef} />;\n}\n',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/react-refs-diagram.png',
//                 title: 'Схема роботи refs у React',
//             },
//         ],
//     },
//     {
//         id: '11',
//         title: 'Що таке HOCs (Higher Order Components)?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/higher-order-components.html',
//         },
//         img: 'https://example.com/hocs-react.jpg',
//         views: 600,
//         createdAt: '09.06.2023',
//         user: {
//             id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
//             username: 'markUser',
//             firstname: 'Mark',
//             lastname: 'Smith',
//             email: 'markUser@gmail.com',
//             avatar: 'https://example.com/avatar6.png',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення HOCs',
//                 paragraphs: [
//                     'HOCs (Higher Order Components) — це техніка в React, яка дозволяє додавати додаткову функціональність до компонентів. Вони працюють як обгортки над іншими компонентами, змінюючи їхню поведінку або додаючи нові можливості.',
//                     'HOC — це функція, яка приймає компонент як аргумент і повертає новий компонент. Це дозволяє повторно використовувати логіку і не дублювати код між компонентами.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклади використання HOCs',
//                 paragraphs: [
//                     'Наприклад, якщо вам потрібно додати функцію авторизації для кількох компонентів, можна створити HOC, який буде перевіряти наявність авторизації і відображати компонент тільки для авторизованих користувачів.',
//                     'HOCs є важливим інструментом для компонентного підходу у React, дозволяючи вам створювати більш гнучкі та реюзабельні компоненти.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад реалізації HOC',
//                 code: "// Простий HOC для авторизації\nfunction withAuth(Component) {\n  return function AuthComponent(props) {\n    const isAuthenticated = // логіка авторизації\n    return isAuthenticated ? <Component {...props} /> : <p>Access Denied</p>;\n  };\n}\n\nconst Dashboard = withAuth(MyDashboardComponent);\nReactDOM.render(<Dashboard />, document.getElementById('root'));\n",
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/hocs-diagram.png',
//                 title: 'Схема роботи HOCs',
//             },
//         ],
//     },
//     {
//         id: '12',
//         title: 'Яка особливість PureComponent?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/purecomponent.html',
//         },
//         img: 'https://example.com/purecomponent.jpg',
//         views: 350,
//         createdAt: '11.05.2023',
//         user: {
//             id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
//             username: 'katyaAdmin',
//             firstname: 'Katya',
//             lastname: 'Ivanova',
//             email: 'katyaAdmin@gmail.com',
//             avatar: 'https://example.com/avatar7.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке PureComponent?',
//                 paragraphs: [
//                     'PureComponent — це спеціальний тип класового компонента в React, який реалізує метод `shouldComponentUpdate` з простою логікою перевірки. Це дозволяє автоматично перевіряти пропси та стан, щоб визначити, чи потрібно повторно рендерити компонент.',
//                     'Основна мета використання PureComponent полягає в підвищенні продуктивності шляхом запобігання зайвим рендерингам при однакових пропсах і стані.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Як працює PureComponent?',
//                 paragraphs: [
//                     'PureComponent використовує поверхневу перевірку для виявлення змін у пропсах і стані. Якщо значення пропсів або стану не змінилися, компонент не буде перерендерено.',
//                     'Цей механізм особливо корисний для великих додатків, де рендеринг може бути витратним з точки зору продуктивності.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання PureComponent',
//                 code: 'class MyComponent extends React.PureComponent {\n  render() {\n    return <div>{this.props.value}</div>;\n  }\n}\n\n// Використання компонента\n<Status value="Active" /> // рендериться, якщо value змінюється',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/purecomponent-diagram.png',
//                 title: 'Схема роботи PureComponent',
//             },
//         ],
//     },
//     {
//         id: '13',
//         title: 'Для чого потрібні key?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/lists-and-keys.html',
//         },
//         img: 'https://example.com/react-keys.jpg',
//         views: 420,
//         createdAt: '03.06.2023',
//         user: {
//             id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
//             username: 'katyaAdmin',
//             firstname: 'Katya',
//             lastname: 'Ivanova',
//             email: 'katyaAdmin@gmail.com',
//             avatar: 'https://example.com/avatar7.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке key у React?',
//                 paragraphs: [
//                     'Атрибут `key` використовується в React для ідентифікації елементів у списках. Він допомагає React відслідковувати, які елементи змінилися, були додані або видалені, що значно підвищує продуктивність.',
//                     'Кожен елемент списку повинен мати унікальний ключ, щоб React міг правильно управляти змінами у DOM.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Чому важливі ключі?',
//                 paragraphs: [
//                     'Без ключів React не зможе правильно оптимізувати рендеринг, що може призвести до помилок або непередбачуваного поведінки інтерфейсу. Це особливо важливо при динамічному додаванні та видаленні елементів списку.',
//                     'Якщо ключі не унікальні, React не зможе точно відстежити зміни, що може призвести до проблем з продуктивністю та точністю відображення даних.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання ключів у списках',
//                 code: "const items = ['apple', 'banana', 'orange'];\n\nconst listItems = items.map((item, index) => (\n  <li key={index}>{item}</li>\n));\n\n<ul>{listItems}</ul>",
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/react-keys-diagram.png',
//                 title: 'Схема використання ключів у списках',
//             },
//         ],
//     },
//     {
//         id: '14',
//         title: 'Для чого потрібний компонент Fragment?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/fragments.html',
//         },
//         img: 'https://example.com/fragment.jpg',
//         views: 390,
//         createdAt: '05.04.2023',
//         user: {
//             id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
//             username: 'johnManager',
//             firstname: 'John',
//             lastname: 'Doe',
//             email: 'johnManager@gmail.com',
//             avatar: 'https://example.com/avatar8.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке Fragment у React?',
//                 paragraphs: [
//                     'Fragment — це компонент у React, який дозволяє групувати кілька дочірніх елементів без додавання додаткових вузлів до DOM. Це зручно, коли потрібно повернути кілька елементів з компонента, не використовуючи обгортку.',
//                     'Використання Fragment дозволяє зберегти чистоту структури HTML і зменшити глибину DOM.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклад використання Fragment',
//                 paragraphs: [
//                     'Замість того, щоб використовувати `<div>` як контейнер, можна просто використати Fragment, як показано в прикладі:',
//                     "Це може бути особливо корисно у великих компонентах, де потрібно об'єднати кілька частин, не створюючи зайвих елементів.",
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання Fragment',
//                 code: 'import React from ArticleCategory.REACT;\n\nfunction MyComponent() {\n  return (\n    <>\n      <h1>Hello!</h1>\n      <p>This is a fragment example.</p>\n    </>\n  );\n}\n\nexport default MyComponent;',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/fragment-diagram.png',
//                 title: 'Схема використання Fragment',
//             },
//         ],
//     },
//     {
//         id: '15',
//         title: 'Для чого потрібні портали?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/portals.html',
//         },
//         img: 'https://example.com/portals.jpg',
//         views: 300,
//         createdAt: '07.05.2023',
//         user: {
//             id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
//             username: 'johnManager',
//             firstname: 'John',
//             lastname: 'Doe',
//             email: 'johnManager@gmail.com',
//             avatar: 'https://example.com/avatar8.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке портали у React?',
//                 paragraphs: [
//                     'Портали дозволяють рендерити дочірні компоненти у вузлі DOM, який знаходиться поза ієрархією рендерингу батьківського компонента. Це корисно для модальних вікон, спливаючих меню та інших компонентів, які мають бути відображені на верхньому рівні DOM.',
//                     'Портали підтримують ті ж самі методи життєвого циклу, що й звичайні компоненти.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Коли використовувати портали?',
//                 paragraphs: [
//                     'Портали часто використовуються, коли потрібно обійти обмеження стилів CSS або домогтися контролю над компонентами, які не повинні бути обмежені обгорткою, такою як `<div>`. Вони дозволяють вам рендерити компоненти на різних рівнях DOM без порушення структури.',
//                     'Наприклад, модальні вікна можуть бути рендерені за межами основного контейнера додатку, але все ще залишаються частиною React дерева.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання порталу',
//                 code: "import ReactDOM from 'react-dom';\n\nfunction Modal({ children }) {\n  return ReactDOM.createPortal(\n    <div className='modal'>\n      {children}\n    </div>,\n    document.getElementById('modal-root')\n  );\n}\n\n// Використання Modal\n<Modal>Hello from Portal!</Modal>",
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/portals-diagram.png',
//                 title: 'Схема роботи порталів',
//             },
//         ],
//     },
//     {
//         id: '16',
//         title: 'Що таке context?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/context.html',
//         },
//         img: 'https://example.com/context.jpg',
//         views: 480,
//         createdAt: '10.04.2023',
//         user: {
//             id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
//             username: 'annaUser',
//             firstname: 'Anna',
//             lastname: 'Koval',
//
//             email: 'annaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar9.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке Context у React?',
//                 paragraphs: [
//                     'Context — це механізм в React, який дозволяє передавати дані через дерево компонентів без необхідності передавати їх через кожен компонент як пропси. Це особливо корисно для глобальних даних, таких як дані авторизації, налаштування теми або мови.',
//                     "Context забезпечує більш простий спосіб передачі даних, уникнувши проблем з 'props drilling' — ситуації, коли пропси передаються через багато рівнів компонентів.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Як використовувати Context?',
//                 paragraphs: [
//                     'Для використання Context потрібно створити контекст за допомогою `React.createContext()`, а потім використовувати `Provider` для надання значення контексту дочірнім компонентам.',
//                     'Компоненти можуть отримувати доступ до контексту за допомогою `Context.Consumer` або хуків, таких як `useContext`.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання Context',
//                 code: 'const MyContext = React.createContext();\n\nfunction MyProvider({ children }) {\n  const value = { /* ваші дані */ };\n  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;\n}\n\n// Використання контексту\nconst MyComponent = () => {\n  const context = useContext(MyContext);\n  return <div>{context.value}</div>;\n};',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/context-diagram.png',
//                 title: 'Схема роботи контексту',
//             },
//         ],
//     },
//     {
//         id: '17',
//         title: 'Для чого потрібні render props?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/render-props.html',
//         },
//         img: 'https://example.com/render-props.jpg',
//         views: 440,
//         createdAt: '12.06.2023',
//         user: {
//             id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
//             username: 'annaUser',
//             firstname: 'Anna',
//             lastname: 'Koval',
//
//             email: 'annaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar9.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке render props?',
//                 paragraphs: [
//                     'Render props — це паттерн, який дозволяє передавати функцію як пропс для компонента, яка повертає React-елемент. Це дає змогу створювати гнучкі компоненти, які можуть адаптуватися до різних контекстів.',
//                     'Цей паттерн особливо корисний для повторного використання логіки між компонентами.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Коли використовувати render props?',
//                 paragraphs: [
//                     'Render props підходять для ситуацій, коли вам потрібно передати специфічну логіку від батьківського компонента до дочірнього, не залежачи від конкретної реалізації.',
//                     'Цей підхід дозволяє створювати більш загальні компоненти, які можуть використовуватися в різних частинах додатку.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання render props',
//                 code: 'function DataFetcher({ render }) {\n  const data = // отримати дані\n  return render(data);\n}\n\n// Використання компонента\n<DataFetcher render={data => <div>{data}</div>} />',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/render-props-diagram.png',
//                 title: 'Схема роботи render props',
//             },
//         ],
//     },
//     {
//         id: '18',
//         title: 'Як реалізувати компонент запобіжника (Error Boundary)?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/error-boundaries.html',
//         },
//         img: 'https://example.com/error-boundary.jpg',
//         views: 600,
//         createdAt: '15.02.2024',
//         user: {
//             id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
//             username: 'lucyAdmin',
//             firstname: 'Lucy',
//             lastname: 'Brown',
//
//             email: 'lucyAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar10.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке Error Boundary?',
//                 paragraphs: [
//                     'Error Boundary — це компонент, який ловить JavaScript-помилки в своїх дочірніх компонентах, логуючи їх і відображаючи запасний UI замість аварійного стану.',
//                     'Вони дозволяють вам контролювати, як додаток реагує на помилки, не зриваючи всю його роботу.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Як реалізувати Error Boundary?',
//                 paragraphs: [
//                     'Щоб створити Error Boundary, потрібно створити класовий компонент, який реалізує методи `static getDerivedStateFromError()` та `componentDidCatch()`.',
//                     'Ці методи дозволяють вам оновити стан компонента на основі помилки та логувати помилки для подальшого аналізу.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад реалізації Error Boundary',
//                 code: 'class ErrorBoundary extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { hasError: false };\n  }\n\n  static getDerivedStateFromError(error) {\n    return { hasError: true };\n  }\n\n  componentDidCatch(error, errorInfo) {\n    console.error(error, errorInfo);\n  }\n\n  render() {\n    if (this.state.hasError) {\n      return <h1>Something went wrong.</h1>;\n    }\n    return this.props.children;\n  }\n}\n',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/error-boundary-diagram.png',
//                 title: 'Схема роботи Error Boundary',
//             },
//         ],
//     },
//     {
//         id: '19',
//         title: 'Які можливості надають хуки?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/hooks-intro.html',
//         },
//         img: 'https://example.com/hooks.jpg',
//         views: 720,
//         createdAt: '17.02.2024',
//         user: {
//             id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
//             username: 'lucyAdmin',
//             firstname: 'Lucy',
//             lastname: 'Brown',
//
//             email: 'lucyAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar10.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке хуки у React?',
//                 paragraphs: [
//                     'Хуки — це функції, які дозволяють використовувати стан і інші можливості React у функціональних компонентах. Вони допомагають спростити код та покращити повторне використання логіки.',
//                     'З використанням хуків, таких як `useState` і `useEffect`, ви можете управляти станом і виконувати побічні ефекти в функціональних компонентах.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Популярні хуки',
//                 paragraphs: [
//                     'Деякі з найпоширеніших хуків включають:\n - `useState` для управління локальним станом;\n - `useEffect` для обробки побічних ефектів;\n - `useContext` для доступу до контексту;\n - `useReducer` для управління складним станом.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання хуків',
//                 code: 'import React, { useState, useEffect } from ArticleCategory.REACT;\n\nfunction ExampleComponent() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = `You clicked ${count} times`;\n  });\n\n  return <button onClick={() => setCount(count + 1)}>Click me</button>;\n}',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/hooks-diagram.png',
//                 title: 'Схема роботи хуків',
//             },
//         ],
//     },
//     {
//         id: '20',
//         title: 'Які правила використання хуків?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/hooks-rules.html',
//         },
//         img: 'https://example.com/hooks-rules.jpg',
//         views: 550,
//         createdAt: '20.02.2024',
//         user: {
//             id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
//             username: 'alexManager',
//             firstname: 'Alex',
//             lastname: 'Johnson',
//             email: 'alexManager@gmail.com',
//             avatar: 'https://example.com/avatar11.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основні правила використання хуків',
//                 paragraphs: [
//                     'Існує кілька основних правил, яких потрібно дотримуватися при використанні хуків у React:',
//                     '- Використовуйте хуки лише в функціональних компонентах або у власних хуках.',
//                     '- Не викликайте хуки всередині циклів, умовних операторів або вкладених функцій.',
//                     '- Використовуйте хуки в одному й тому ж порядку при кожному рендерингу компонента.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Чому важливо дотримуватися правил?',
//                 paragraphs: [
//                     'Дотримання цих правил дозволяє React коректно управляти станом і виконувати побічні ефекти. Якщо ви порушите ці правила, це може призвести до некоректної роботи компонентів та помилок у вашому коді.',
//                     'Ці правила створені для забезпечення стабільності і передбачуваності поведінки хуків.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад порушення правил використання хуків',
//                 code: 'function MyComponent() {\n  if (someCondition) {\n    useState(); // Порушення правила\n  }\n  // ...\n}',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/hooks-rules-diagram.png',
//                 title: 'Схема використання правил хуків',
//             },
//         ],
//     },
//     {
//         id: '21',
//         title: 'Для чого потрібний useEffect?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/hooks-effect.html',
//         },
//         img: 'https://example.com/use-effect.jpg',
//         views: 800,
//         createdAt: '23.02.2024',
//         user: {
//             id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
//             username: 'alexManager',
//             firstname: 'Alex',
//             lastname: 'Johnson',
//
//             email: 'alexManager@gmail.com',
//
//             avatar: 'https://example.com/avatar11.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке useEffect?',
//                 paragraphs: [
//                     'Хук `useEffect` дозволяє виконувати побічні ефекти у функціональних компонентах. Це може бути, наприклад, API-запит, підписка на події, або зміна заголовка документа.',
//                     'Хук `useEffect` виконується після рендерингу компонента, що дозволяє вам оновити DOM або виконати інші дії після того, як компоненти були відображені.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Синтаксис useEffect',
//                 paragraphs: [
//                     'Синтаксис хука `useEffect` виглядає так:\n`useEffect(() => {\n  // код, який потрібно виконати\n}, [dependencies]);`\n\n`dependencies` — це масив значень, при зміні яких хук буде викликаний знову.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання useEffect',
//                 code: "import React, { useEffect } from ArticleCategory.REACT;\n\nfunction ExampleComponent() {\n  useEffect(() => {\n    document.title = 'New Title';\n  }, []);\n\n  return <div>Hello!</div>;\n}",
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/use-effect-diagram.png',
//                 title: 'Схема роботи useEffect',
//             },
//         ],
//     },
//     {
//         id: '22',
//         title: 'Чим відрізняється useEffect від useLayoutEffect?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/hooks-reference.html#uselayouteffect',
//         },
//         img: 'https://example.com/effect-comparison.jpg',
//         views: 640,
//         createdAt: '01.03.2024',
//         user: {
//             id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
//             username: 'alexManager',
//             firstname: 'Alex',
//             lastname: 'Johnson',
//
//             email: 'alexManager@gmail.com',
//
//             avatar: 'https://example.com/avatar11.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'useEffect vs useLayoutEffect',
//                 paragraphs: [
//                     'Оба хуки, `useEffect` та `useLayoutEffect`, служать для виконання побічних ефектів, але є суттєві відмінності в їхній поведінці.',
//                     '`useEffect` виконується асинхронно після того, як браузер відобразить зміни в DOM, що робить його ідеальним для обробки побічних ефектів, які не потребують миттєвого оновлення UI.',
//                     'Водночас, `useLayoutEffect` виконується синхронно після змін в DOM, але перед тим, як браузер намалює вміст на екрані, що робить його корисним для синхронного оновлення UI.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Коли використовувати?',
//                 paragraphs: [
//                     '`useEffect` слід використовувати для таких ефектів, як запити API, підписка на події та маніпуляції з DOM, які не потребують миттєвого оновлення.',
//                     'Натомість, `useLayoutEffect` рекомендується використовувати для вимірювання розмірів елементів або для здійснення змін, які потрібно виконати перед рендером.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання useLayoutEffect',
//                 code: 'import React, { useLayoutEffect } from ArticleCategory.REACT;\n\nfunction Example() {\n  useLayoutEffect(() => {\n    const rect = elementRef.current.getBoundingClientRect();\n    // логіка, що потребує миттєвого доступу до DOM\n  }, []);\n\n  return <div ref={elementRef}>Hello!</div>;\n}',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/effect-flow.jpg',
//                 title: 'Схема виклику useEffect та useLayoutEffect',
//             },
//         ],
//     },
//     {
//         id: '23',
//         title: 'Що таке лінива ініціалізація стану в useState та useReducer?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/hooks-state.html#lazy-initial-state',
//         },
//         img: 'https://example.com/lazy-initialization.jpg',
//         views: 500,
//         createdAt: '03.03.2024',
//         user: {
//             id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
//             username: 'alexManager',
//             firstname: 'Alex',
//             lastname: 'Johnson',
//
//             email: 'alexManager@gmail.com',
//
//             avatar: 'https://example.com/avatar11.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Лінива ініціалізація стану',
//                 paragraphs: [
//                     'Лінива ініціалізація стану дозволяє вам відкласти обчислення початкового стану до моменту, коли компонент буде вперше змонтований. Це корисно, коли початковий стан є складним для обчислення.',
//                     'У хуках `useState` та `useReducer` ви можете передати функцію в якості початкового значення, і ця функція буде викликана лише один раз — під час початкового рендеру.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Переваги лінивого ініціалізатора',
//                 paragraphs: [
//                     'Використання лінивої ініціалізації може зменшити навантаження на продуктивність, оскільки обчислення початкового стану буде виконуватись лише один раз.',
//                     'Це особливо корисно, якщо ініціалізація потребує значних ресурсів або часу.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад лінивої ініціалізації в useState',
//                 code: 'const [state, setState] = useState(() => {\n  // складна логіка для ініціалізації\n  return initialState;\n});',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/lazy-initialization-diagram.jpg',
//                 title: 'Схема лінивої ініціалізації стану',
//             },
//         ],
//     },
//     {
//         id: '24',
//         title: 'Чим useRef відрізняється від createRef?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components',
//         },
//         img: 'https://example.com/ref-comparison.jpg',
//         views: 450,
//         createdAt: '05.03.2024',
//         user: {
//             id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
//             username: 'leoUser',
//             firstname: 'Leo',
//             lastname: 'Mikhailov',
//
//             email: 'leoUser@gmail.com',
//
//             avatar: 'https://example.com/avatar12.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення useRef та createRef',
//                 paragraphs: [
//                     '`useRef` та `createRef` — це механізми для створення рефів у React, але вони мають різні характеристики та використання.',
//                     '`createRef` створює новий реф при кожному рендерингу компонента, що може призводити до проблем із управлінням станом.',
//                     "Натомість, `useRef` зберігає одне та те ж посилання на об'єкт протягом усього життя компонента.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Коли використовувати?',
//                 paragraphs: [
//                     '`createRef` найчастіше використовується в класових компонентах, тоді як `useRef` більше підходить для функціональних компонентів.',
//                     'Якщо вам потрібно зберігати посилання на DOM-елементи або зберігати значення, які не викликають повторний рендер, використовуйте `useRef`.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання useRef',
//                 code: 'import React, { useRef } from ArticleCategory.REACT;\n\nfunction MyComponent() {\n  const inputRef = useRef(null);\n\n  const focusInput = () => {\n    inputRef.current.focus();\n  };\n\n  return <input ref={inputRef} />;\n}',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/ref-diagram.jpg',
//                 title: 'Схема роботи useRef та createRef',
//             },
//         ],
//     },
//     {
//         id: '25',
//         title: 'Для чого потрібні useMemo та useCallback?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/hooks-reference.html#usememo',
//         },
//         img: 'https://example.com/memo-callback.jpg',
//         views: 480,
//         createdAt: '07.03.2024',
//         user: {
//             id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
//             username: 'leoUser',
//             firstname: 'Leo',
//             lastname: 'Mikhailov',
//
//             email: 'leoUser@gmail.com',
//
//             avatar: 'https://example.com/avatar12.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке useMemo та useCallback?',
//                 paragraphs: [
//                     '`useMemo` та `useCallback` — це хуки, які допомагають оптимізувати продуктивність React-додатків.',
//                     "`useMemo` запам'ятовує обчислене значення, а `useCallback` запам'ятовує функцію, щоб уникнути її перевизначення при кожному рендері.",
//                     'Ці хуки особливо корисні при передачі функцій та значень в дочірні компоненти, щоб уникнути непотрібних повторних рендерів.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Коли використовувати?',
//                 paragraphs: [
//                     'Використовуйте `useMemo`, коли ви маєте обчислення, яке потребує значних витрат ресурсів.',
//                     'Використовуйте `useCallback`, коли ви передаєте функції в дочірні компоненти, щоб уникнути їх повторного створення.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання useMemo',
//                 code: 'const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/memo-callback-diagram.jpg',
//                 title: 'Схема використання useMemo та useCallback',
//             },
//         ],
//     },
//     {
//         id: '26',
//         title: 'Що таке FLUX- архітектура?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://redux.js.org/introduction/flux',
//         },
//         img: 'https://example.com/flux-architecture.jpg',
//         views: 520,
//         createdAt: '10.03.2024',
//         user: {
//             id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
//             username: 'janeAdmin',
//             firstname: 'Jane',
//             lastname: 'Williams',
//
//             email: 'janeAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar13.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке FLUX?',
//                 paragraphs: [
//                     'FLUX — це архітектурний патерн для управління даними у веб-додатках. Його головна мета — забезпечити однобічний потік даних.',
//                     'FLUX складається з чотирьох основних компонентів: дії (Actions), диспетчер (Dispatcher), сховище (Store) та представлення (View).',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основні компоненти FLUX',
//                 paragraphs: [
//                     "1. **Дії (Actions)**: це об'єкти, які описують події в додатку.\n2. **Диспетчер (Dispatcher)**: централізований механізм, який отримує дії та передає їх до сховища.\n3. **Сховище (Store)**: містить дані, на які можуть підписуватися компоненти.\n4. **Представлення (View)**: компоненти, які відображають дані з сховища.",
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад дій у FLUX',
//                 code: "const addAction = { type: 'ADD_ITEM', payload: item };",
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/flux-diagram.jpg',
//                 title: 'Схема FLUX-архітектури',
//             },
//         ],
//     },
//     {
//         id: '27',
//         title: 'Для чого потрібний redux?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://redux.js.org/introduction/getting-started',
//         },
//         img: 'https://example.com/redux-intro.jpg',
//         views: 600,
//         createdAt: '12.03.2024',
//         user: {
//             id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
//             username: 'janeAdmin',
//             firstname: 'Jane',
//             lastname: 'Williams',
//
//             email: 'janeAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar13.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке Redux?',
//                 paragraphs: [
//                     'Redux — це бібліотека для управління станом у JavaScript-додатках. Вона забезпечує централізоване зберігання стану, що дозволяє легше відслідковувати зміни стану і їх причини.',
//                     'Redux реалізує концепцію однобічного потоку даних, що робить код більш передбачуваним і простим для тестування.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Переваги використання Redux',
//                 paragraphs: [
//                     '1. **Централізоване управління станом**: всі дані зберігаються в одному місці.\n2. **Простота тестування**: зменшує складність компонентів, спрощуючи тестування.\n3. **Можливість моніторингу**: легко відстежувати, як і коли змінюється стан.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад створення Redux store',
//                 code: "import { createStore } from 'redux';\nconst store = createStore(reducer);",
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/redux-diagram.jpg',
//                 title: 'Схема Redux',
//             },
//         ],
//     },
//     {
//         id: '28',
//         title: 'Порівняйте хуки, контекст та Redux',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://redux.js.org/introduction/what-is-redux',
//         },
//         img: 'https://example.com/hooks-context-redux.jpg',
//         views: 670,
//         createdAt: '15.03.2024',
//         user: {
//             id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
//             username: 'peterManager',
//             firstname: 'Peter',
//             lastname: 'Muller',
//
//             email: 'peterManager@gmail.com',
//
//             avatar: 'https://example.com/avatar14.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Введення',
//                 paragraphs: [
//                     'В React існує кілька способів управління станом: хуки, контекст і Redux. Кожен з них має свої переваги та недоліки.',
//                     'Хуків та контекст використовуються для локального управління станом, тоді як Redux пропонує централізоване зберігання.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Хуки',
//                 paragraphs: [
//                     'Хуків, такі як `useState` та `useReducer`, дозволяють вам управляти станом у функціональних компонентах. Вони є легшими у використанні, але не завжди підходять для великих додатків.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Контекст',
//                 paragraphs: [
//                     'Контекст використовується для передачі даних через дерево компонентів без необхідності пропускати пропси на всіх рівнях. Це зручно, але може призвести до повторних рендерів, якщо не використовується обережно.',
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Redux',
//                 paragraphs: [
//                     'Redux забезпечує централізоване управління станом з простими API для обробки дій і змін стану. Він особливо корисний для великих додатків з численними компонентами, які потребують доступу до одного й того ж стану.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '29',
//         title: 'Що таке redux middleware?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://redux.js.org/advanced/middleware',
//         },
//         img: 'https://example.com/redux-middleware.jpg',
//         views: 500,
//         createdAt: '17.03.2024',
//         user: {
//             id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
//             username: 'peterManager',
//             firstname: 'Peter',
//             lastname: 'Muller',
//
//             email: 'peterManager@gmail.com',
//
//             avatar: 'https://example.com/avatar14.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення Redux Middleware',
//                 paragraphs: [
//                     'Redux middleware — це механізми, які дозволяють вам розширити функціональність Redux, перехоплюючи дії перед їх обробкою редюсером.',
//                     'Це корисно для обробки асинхронних дій, логування, управління помилками та багато іншого.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклади Middleware',
//                 paragraphs: [
//                     'Деякі з популярних middleware включають:\n- **redux-thunk**: дозволяє вам писати асинхронні дії.\n- **redux-saga**: використовує генератори для обробки асинхронних дій.\n- **redux-logger**: веде журнал дій, які проходять через ваш store.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад налаштування middleware',
//                 code: "import { createStore, applyMiddleware } from 'redux';\nimport thunk from 'redux-thunk';\n\nconst store = createStore(reducer, applyMiddleware(thunk));",
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/middleware-diagram.jpg',
//                 title: 'Схема роботи Redux Middleware',
//             },
//         ],
//     },
//     {
//         id: '30',
//         title: 'Де потрібно робити side effects в redux?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://redux.js.org/advanced/middleware',
//         },
//         img: 'https://example.com/side-effects-redux.jpg',
//         views: 450,
//         createdAt: '20.03.2024',
//         user: {
//     id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
//         username: 'mariaUser',
//         firstname: 'Maria',
//         lastname: 'Petrova',
//
//         email: 'mariaUser@gmail.com',
//
//         avatar: 'https://example.com/avatar15.jpg',
// },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення side effects',
//                 paragraphs: [
//                     'Side effects в Redux — це операції, які змінюють стан або зовнішні ресурси. Це можуть бути асинхронні запити, таймери або доступ до локального сховища.',
//                     'Вони не повинні відбуватися безпосередньо в редюсерах, оскільки це може призвести до непередбачуваної поведінки.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Кращі практики для side effects',
//                 paragraphs: [
//                     '1. **Використовуйте middleware**: Такі бібліотеки, як redux-thunk або redux-saga, ідеально підходять для управління side effects.',
//                     '2. **Плануйте асинхронні запити**: Використовуйте action creators для створення асинхронних дій.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад асинхронної дії з redux-thunk',
//                 code: "const fetchData = () => {\n  return (dispatch) => {\n    fetch('/api/data')\n      .then(response => response.json())\n      .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }));\n  };\n};",
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/side-effects-diagram.jpg',
//                 title: 'Схема side effects в Redux',
//             },
//         ],
//     },
//     {
//         id: '31',
//         title: 'Що таке next() функція в redux middleware?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://redux.js.org/advanced/middleware#the-next-function',
//         },
//         img: 'https://example.com/next-function.jpg',
//         views: 470,
//         createdAt: '22.03.2024',
//         user: {
//             id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
//             username: 'mariaUser',
//             firstname: 'Maria',
//             lastname: 'Petrova',
//
//             email: 'mariaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar15.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення next()',
//                 paragraphs: [
//                     'Функція `next()` в Redux middleware є важливим елементом механізму обробки дій. Вона передає дію до наступного middleware в ланцюжку або до редюсера, якщо це останнє middleware.',
//                     'Це дозволяє створити ланцюжок функцій для обробки дій, таких як логування або асинхронні запити.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклад використання next()',
//                 paragraphs: [
//                     'В middleware ви можете перехопити дію, виконати певну логіку, а потім передати цю дію далі за допомогою `next()`.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад middleware з next()',
//                 code: "const loggerMiddleware = store => next => action => {\n  console.log('Dispatching:', action);\n  return next(action);\n};",
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/next-function-diagram.jpg',
//                 title: 'Схема роботи функції next() в Redux middleware',
//             },
//         ],
//     },
//     {
//         id: '32',
//         title: 'Для чого потрібні redux селектори?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://redux.js.org/recipes/computing-derived-data',
//         },
//         img: 'https://example.com/redux-selectors.jpg',
//         views: 550,
//         createdAt: '25.03.2024',
//         user: {
//             id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
//             username: 'maxAdmin',
//             firstname: 'Max',
//             lastname: 'Gordon',
//
//             email: 'maxAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar16.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке селектори?',
//                 paragraphs: [
//                     'Селектори в Redux — це функції, які вибирають частини стану з Redux store. Вони дозволяють вам абстрагувати доступ до стану та оптимізувати його використання.',
//                     'Селектори також можуть обчислювати похідні дані, що зменшує повторні обчислення.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Переваги використання селекторів',
//                 paragraphs: [
//                     '1. **Оптимізація продуктивності**: селектори зберігають обчислені значення для уникнення повторних рендерів.\n2. **Код стає чистішим**: дозволяють зосередитись на логіці вибору даних, а не на структурі стану.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад селектора',
//                 code: 'const selectVisibleTodos = state => state.todos.filter(todo => !todo.completed);',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/selectors-diagram.jpg',
//                 title: 'Схема роботи селекторів у Redux',
//             },
//         ],
//     },
//     {
//         id: '33',
//         title: 'Чим відрізняється action від action creator?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://redux.js.org/basics/actions',
//         },
//         img: 'https://example.com/action-action-creator.jpg',
//         views: 600,
//         createdAt: '28.03.2024',
//         user: {
//             id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
//             username: 'maxAdmin',
//             firstname: 'Max',
//             lastname: 'Gordon',
//
//             email: 'maxAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar16.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення action та action creator',
//                 paragraphs: [
//                     "Action — це об'єкт, що містить тип дії та (необов'язково) додаткові дані. Він є основним способом опису змін, які відбуваються в Redux.",
//                     'Action creator — це функція, яка створює і повертає action. Вона дозволяє вам інкапсулювати логіку створення action.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклад action та action creator',
//                 paragraphs: [
//                     "Action може виглядати так: `{ type: 'ADD_TODO', payload: { text: 'Новий Todo' } }`.",
//                     "Action creator для цього action буде такою функцією: `const addTodo = text => ({ type: 'ADD_TODO', payload: { text } });`.",
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад action creator',
//                 code: "const addTodo = text => ({ type: 'ADD_TODO', payload: { text } });",
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/action-creator-diagram.jpg',
//                 title: 'Схема роботи action та action creator',
//             },
//         ],
//     },
//     {
//         id: '34',
//         title: 'Що таке React?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/',
//         },
//         img: 'https://example.com/what-is-react.jpg',
//         views: 700,
//         createdAt: '02.12.2023',
//         user: {
//             id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
//             username: 'nickManager',
//             firstname: 'Nick',
//             lastname: 'Garcia',
//
//             email: 'nickManager@gmail.com',
//
//             avatar: 'https://example.com/avatar17.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення React',
//                 paragraphs: [
//                     'React — це бібліотека для створення інтерфейсів користувача. Вона дозволяє розробникам будувати складні інтерфейси з використанням компонентів, які повторно використовуються.',
//                     'React використовує декларативний підхід, що спрощує управління станом та рендеринг компонентів.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основні концепції',
//                 paragraphs: [
//                     "1. **Компоненти**: основна будівельна одиниця React.\n2. **JSX**: розширення синтаксису JavaScript, що дозволяє писати HTML-подібний код в JavaScript.\n3. **Стан**: об'єкт, що зберігає дані компоненту.",
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад компонента',
//                 code: 'const MyComponent = () => <div>Hello, React!</div>;',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/react-diagram.jpg',
//                 title: 'Схема React',
//             },
//         ],
//     },
//     {
//         id: '35',
//         title: 'В чому різниця між React та Vue?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/faq-structure.html#what-is-the-difference-between-react-and-vue',
//         },
//         img: 'https://example.com/react-vue-comparison.jpg',
//         views: 800,
//         createdAt: '05.12.2023',
//         user: {
//             id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
//             username: 'nickManager',
//             firstname: 'Nick',
//             lastname: 'Garcia',
//
//             email: 'nickManager@gmail.com',
//
//             avatar: 'https://example.com/avatar17.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Введення',
//                 paragraphs: [
//                     'React та Vue — це популярні бібліотеки для побудови інтерфейсів, але вони мають різні підходи та архітектури.',
//                     'React є бібліотекою, тоді як Vue є прогресивним фреймворком.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Схема роботи',
//                 paragraphs: [
//                     '1. **React**: використовує компонентний підхід, де кожен компонент є функцією.\n2. **Vue**: підтримує компонентний підхід, але також надає можливість використовувати шаблони.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Управління станом',
//                 paragraphs: [
//                     '1. **React**: використовує хуки та контекст для управління станом.\n2. **Vue**: має вбудовану реактивність для управління станом.',
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Підсумок',
//                 paragraphs: [
//                     'Обидві бібліотеки мають свої переваги. Вибір між ними залежить від потреб проекту.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '36',
//         title: 'Що таке компоненти в React?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/components-and-props.html',
//         },
//         img: 'https://example.com/react-components.jpg',
//         views: 600,
//         createdAt: '10.12.2023',
//         user: {
//             id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
//             username: 'claraUser',
//             firstname: 'Clara',
//             lastname: 'Santos',
//
//             email: 'claraUser@gmail.com',
//
//             avatar: 'https://example.com/avatar18.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення компонентів',
//                 paragraphs: [
//                     'Компоненти в React — це незалежні, повторно використовувані частини інтерфейсу. Вони можуть бути класовими або функціональними.',
//                     'Кожен компонент може мати свій стан та властивості, що дозволяє створювати динамічні інтерфейси.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Типи компонентів',
//                 paragraphs: [
//                     '1. **Класові компоненти**: компоненти, створені на основі класів, які мають доступ до методів життєвого циклу.\n2. **Функціональні компоненти**: прості функції, які повертають JSX без власного стану.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад функціонального компонента',
//                 code: 'const MyComponent = () => <div>Hello, World!</div>;',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/component-diagram.jpg',
//                 title: 'Схема компонентів в React',
//             },
//         ],
//     },
//     {
//         id: '37',
//         title: 'Як працює JSX?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/introducing-jsx.html',
//         },
//         img: 'https://example.com/jsx-explained.jpg',
//         views: 750,
//         createdAt: '12.12.2023',
//         user: {
//             id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
//             username: 'claraUser',
//             firstname: 'Clara',
//             lastname: 'Santos',
//
//             email: 'claraUser@gmail.com',
//
//             avatar: 'https://example.com/avatar18.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке JSX?',
//                 paragraphs: [
//                     'JSX — це синтаксичне розширення для JavaScript, яке дозволяє вам писати HTML-подібний код у JavaScript.',
//                     'Використання JSX робить код легшим для читання та зрозумілим.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклад JSX',
//                 paragraphs: [
//                     'Приклад JSX виглядає так: `<h1>Hello, JSX!</h1>`. React автоматично перетворює JSX в JavaScript.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад коду з JSX',
//                 code: 'const element = <h1>Hello, world!</h1>;',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/jsx-diagram.jpg',
//                 title: 'Схема роботи JSX',
//             },
//         ],
//     },
//     {
//         id: '38',
//         title: 'Що таке state в React?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/state-and-lifecycle.html',
//         },
//         img: 'https://example.com/react-state.jpg',
//         views: 700,
//         createdAt: '15.12.2023',
//         user: {
//             id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
//             username: 'tomAdmin',
//             firstname: 'Tom',
//             lastname: 'Anderson',
//
//             email: 'tomAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar19.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення state',
//                 paragraphs: [
//                     "State — це об'єкт, що зберігає дані про компонент, які можуть змінюватися з часом.",
//                     'State дозволяє компонентам реагувати на дії користувача та оновлювати інтерфейс.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклад state',
//                 paragraphs: [
//                     'Приклад state у класовому компоненті: `this.state = { count: 0 };`. У функціональному компоненті state можна створити з хуком `useState`.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання useState',
//                 code: 'const [count, setCount] = useState(0);',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/state-diagram.jpg',
//                 title: 'Схема роботи state в React',
//             },
//         ],
//     },
//     {
//         id: '39',
//         title: 'Що таке props в React?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/components-and-props.html',
//         },
//         img: 'https://example.com/react-props.jpg',
//         views: 800,
//         createdAt: '20.12.2023',
//         user: {
//             id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
//             username: 'tomAdmin',
//             firstname: 'Tom',
//             lastname: 'Anderson',
//
//             email: 'tomAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar19.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення props',
//                 paragraphs: [
//                     'Props (сокращення від properties) — це параметри, які передаються в компоненти. Вони дозволяють передавати дані від батьківських компонентів до дочірніх.',
//                     "Props є невід'ємною частиною компонентів, оскільки дозволяють налаштовувати їх поведінку та вигляд.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклад props',
//                 paragraphs: [
//                     "Наприклад, якщо ви передаєте дані в компонент: `<MyComponent title='Hello' />`, ви можете отримати ці дані в компоненті через `this.props.title` або `props.title`.",
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання props',
//                 code: 'const MyComponent = (props) => <h1>{props.title}</h1>;',
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/props-diagram.jpg',
//                 title: 'Схема роботи props в React',
//             },
//         ],
//     },
//     {
//         id: '40',
//         title: 'Що таке React Router?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactrouter.com/',
//         },
//         img: 'https://example.com/react-router.jpg',
//         views: 500,
//         createdAt: '01.01.2024',
//         user: {
//             id: 'qkcVyIbnjYeEbaYVKGhtZrny7GC3',
//             username: 'sarahManager',
//             firstname: 'Sarah',
//             lastname: 'Cooper',
//
//             email: 'sarahManager@gmail.com',
//
//             avatar: 'https://example.com/avatar20.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення React Router',
//                 paragraphs: [
//                     'React Router — це бібліотека для управління маршрутизацією в додатках React. Вона дозволяє створювати односторінкові додатки (SPA) з можливістю навігації між різними компонентами.',
//                     'React Router забезпечує динамічну навігацію без перезавантаження сторінки.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основні компоненти',
//                 paragraphs: [
//                     '1. **BrowserRouter**: обгортка для маршрутизації на основі HTML5 History API.\n2. **Route**: визначає маршрут для компонента.\n3. **Link**: елемент для навігації між маршрутами.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання React Router',
//                 code: "import { BrowserRouter as Router, Route, Link } from 'react-router-dom';\n\n<Router>\n  <Link to='/about'>Про нас</Link>\n  <Route path='/about' component={About} />\n</Router>;",
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/react-router-diagram.jpg',
//                 title: 'Схема роботи React Router',
//             },
//         ],
//     },
//     {
//         id: '41',
//         title: 'Що таке Redux Toolkit?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://redux-toolkit.js.org/',
//         },
//         img: 'https://example.com/redux-toolkit.jpg',
//         views: 650,
//         createdAt: '05.04.2024',
//         user: {
//             id: 'qkcVyIbnjYeEbaYVKGhtZrny7GC3',
//             username: 'sarahManager',
//             firstname: 'Sarah',
//             lastname: 'Cooper',
//
//             email: 'sarahManager@gmail.com',
//
//             avatar: 'https://example.com/avatar20.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення Redux Toolkit',
//                 paragraphs: [
//                     'Redux Toolkit — це офіційний набір інструментів для ефективного управління станом у додатках на базі Redux. Він спрощує процес налаштування та використання Redux, зменшуючи потребу в написанні шаблонного коду.',
//                     'Redux Toolkit включає такі функції, як `createSlice`, `createAsyncThunk` та `configureStore`.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Переваги використання Redux Toolkit',
//                 paragraphs: [
//                     '1. **Менше шаблонного коду**: швидше налаштування проектів.\n2. **Легша робота з асинхронними запитами**: вбудовані функції для роботи з асинхронністю.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання Redux Toolkit',
//                 code: "import { configureStore, createSlice } from '@reduxjs/toolkit';\n\nconst slice = createSlice({\n  name: 'counter',\n  initialState: 0,\n  reducers: {\n    increment: state => state + 1,\n  },\n});\n\nconst store = configureStore({ reducer: slice.reducer });",
//             },
//             {
//                 id: '4',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/redux-toolkit-diagram.jpg',
//                 title: 'Схема роботи Redux Toolkit',
//             },
//         ],
//     },
//     {
//         id: '42',
//         title: 'Що таке Featured Slice Design?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://redux-toolkit.js.org/tutorials/advanced#slice-design',
//         },
//         img: 'https://example.com/featured-slice-design.jpg',
//         views: 550,
//         createdAt: '10.10.2024',
//         user: {
//             id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
//             username: 'leoUser',
//             firstname: 'Leo',
//             lastname: 'Mikhailov',
//
//             email: 'leoUser@gmail.com',
//
//             avatar: 'https://example.com/avatar12.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення Featured Slice Design',
//                 paragraphs: [
//                     'Featured Slice Design — це підхід до проектування в Redux Toolkit, що дозволяє структурувати управління станом у великих додатках, покращуючи організацію коду і підвищуючи його читабельність. Цей підхід полягає в розподілі стану на "слайси" (slices), кожен з яких відповідає за конкретну частину додатку.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основні концепції Featured Slice Design',
//                 paragraphs: [
//                     '1. Слайси (Slices): Кожен слайс відповідає за управління певною частиною стану. Це дозволяє уникнути великої кількості редюсерів та дій у одному файлі, що спрощує їх підтримку.',
//                     '2. Редюсери (Reducers): Внутрішні функції слайсів, які відповідають за зміну стану. Вони описують, як частина стану повинна змінюватися у відповідь на дії.',
//                     '3. Дії (Actions): Слайси автоматично генерують дії на основі редюсерів, що зменшує обсяг коду, який потрібно писати вручну.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклад реалізації Featured Slice Design',
//                 paragraphs: [
//                     'Для демонстрації використання Featured Slice Design розглянемо простий приклад, де ми реалізуємо лічильник.',
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: "import { createSlice, configureStore } from '@reduxjs/toolkit';\n\n// Створення слайсу\nconst counterSlice = createSlice({\n  name: 'counter',\n  initialState: { value: 0 },\n  reducers: {\n    increment: (state) => {\n      state.value += 1;\n    },\n    decrement: (state) => {\n      state.value -= 1;\n    },\n    reset: (state) => {\n      state.value = 0;\n    },\n  },\n});\n\n// Експорт дій\nexport const { increment, decrement, reset } = counterSlice.actions;\n\n// Налаштування магазину\nconst store = configureStore({\n  reducer: {\n    counter: counterSlice.reducer,\n  },\n});\n\n// Використання\nstore.dispatch(increment());\nconsole.log(store.getState()); // { counter: { value: 1 } }",
//             },
//             {
//                 id: '5',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Переваги Featured Slice Design',
//                 paragraphs: [
//                     'Легкість у підтримці: Завдяки розподілу на слайси, простіше орієнтуватися в структурі коду.',
//                     'Покращена читаємість: Кожен слайс має чітку відповідальність, що спрощує розуміння логіки програми.',
//                     'Масштабованість: Зручний підхід для великих проектів, де кількість станів і редюсерів може значно зрости.',
//                 ],
//             },
//             {
//                 id: '6',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     'Featured Slice Design є потужним інструментом для розробників, які прагнуть організувати свій код в Redux Toolkit. Використання слайсів дозволяє створювати більш структуровані, легкі у підтримці додатки, що особливо важливо при роботі над великими проектами.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '43',
//         title: 'Для чого потрібно вказувати DOCTYPE?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://www.w3schools.com/tags/tag_doctype.asp',
//         },
//         img: 'https://example.com/doctype.jpg',
//         views: 250,
//         createdAt: '05.05.2024',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення DOCTYPE',
//                 paragraphs: [
//                     'DOCTYPE, або декларація типу документа, вказує браузеру, який стандарт HTML використовується на веб-сторінці. Це важливо для коректного рендерингу.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Чому це важливо?',
//                 paragraphs: [
//                     'Вказівка DOCTYPE є необхідною для правильного рендерингу сторінки. Якщо DOCTYPE не зазначений, браузер може перейти в режим сумісності, що призведе до непередбачуваних результатів.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: '<!DOCTYPE html>',
//                 description: 'Це основна декларація DOCTYPE для HTML5.',
//             },
//         ],
//     },
//     {
//         id: '44',
//         title: 'Що буде, якщо не вказати DOCTYPE на початку документа?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Quirks_Mode',
//         },
//         img: 'https://example.com/quirks_mode.jpg',
//         views: 300,
//         createdAt: '23.07.2024',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Відсутність DOCTYPE',
//                 paragraphs: [
//                     'Якщо DOCTYPE не вказаний, браузер може перейти в режим Quirks, що може викликати проблеми з відображенням елементів.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Наслідки',
//                 paragraphs: [
//                     'В режимі Quirks браузер може інтерпретувати CSS і HTML по-іншому, що може призвести до відображення сторінки, що відрізняється від задуму розробника.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '45',
//         title: 'Для чого потрібні мета-теги?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta',
//         },
//         img: 'https://example.com/meta_tags.jpg',
//         views: 280,
//         createdAt: '11.08.2024',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Значення мета-тегів',
//                 paragraphs: [
//                     'Мета-теги надають метадані про HTML-документ, такі як опис, ключові слова, авторство та налаштування перегляду.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: '<meta name="description" content="Опис сторінки">',
//                 description: 'Приклад мета-тегу для опису.',
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Важливість SEO',
//                 paragraphs: [
//                     'Мета-теги також використовуються для оптимізації пошукових систем, адже вони допомагають пошуковим системам зрозуміти вміст вашої сторінки.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '46',
//         title: 'Чим відрізняється блоковий елемент від рядкового?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Block_and_Inline_elements',
//         },
//         img: 'https://example.com/block_inline.jpg',
//         views: 310,
//         createdAt: '04.03.2024',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Блокові елементи',
//                 paragraphs: [
//                     'Блокові елементи, такі як <div> та <p>, займають всю ширину доступного простору і починають новий рядок.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Рядкові елементи',
//                 paragraphs: [
//                     'Рядкові елементи, такі як <span> та <a>, займають лише простір, необхідний для їх вмісту, і не починають новий рядок.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: '<div>Цей текст в блоковому елементі</div>\n<span>Цей текст в рядковому елементі</span>',
//                 description:
//                     'Приклад використання блокового та рядкового елементів.',
//             },
//         ],
//     },
//     {
//         id: '47',
//         title: 'Чому деякі символи можуть відображатися у вигляді квадратів?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://www.w3schools.com/html/html_symbols.asp',
//         },
//         img: 'https://example.com/symbols.jpg',
//         views: 270,
//         createdAt: '05.09.2023',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Неправильне кодування',
//                 paragraphs: [
//                     'Символи можуть відображатися у вигляді квадратів через неправильне кодування тексту. Наприклад, якщо документ закодований в UTF-8, а браузер спробує відобразити його як ISO-8859-1.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Використання HTML-сутностей',
//                 paragraphs: [
//                     'Використання HTML-сутностей, таких як &nbsp; або &lt;, може допомогти уникнути проблем з відображенням спеціальних символів.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '48',
//         title: 'Які типи заголовків є в HTML?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/heading_group',
//         },
//         img: 'https://example.com/headers.jpg',
//         views: 250,
//         createdAt: '06.02.2023',
//         user: {
//             id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
//             username: 'markUser',
//             firstname: 'Mark',
//             lastname: 'Smith',
//             email: 'markUser@gmail.com',
//             avatar: 'https://example.com/avatar6.png',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Типи заголовків',
//                 paragraphs: [
//                     'HTML має шість рівнів заголовків, від <h1> до <h6>. <h1> — це заголовок найвищого рівня, а <h6> — найнижчого.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: '<h1>Заголовок 1 рівня</h1>\n<h2>Заголовок 2 рівня</h2>',
//                 description: 'Приклад заголовків у HTML.',
//             },
//         ],
//     },
//     {
//         id: '49',
//         title: 'Що таке семантична верстка?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics',
//         },
//         img: 'https://example.com/semantic_markup.jpg',
//         views: 290,
//         createdAt: '07.03.2024',
//         user: {
//             id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
//             username: 'katyaAdmin',
//             firstname: 'Katya',
//             lastname: 'Ivanova',
//             email: 'katyaAdmin@gmail.com',
//             avatar: 'https://example.com/avatar7.jpg',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Семантична верстка',
//                 paragraphs: [
//                     'Семантична верстка передбачає використання HTML-тегів, які мають конкретне значення. Це покращує доступність і SEO.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: '<article>Стаття</article>\n<section>Розділ</section>',
//                 description: 'Приклад семантичних тегів.',
//             },
//         ],
//     },
//     {
//         id: '50',
//         title: 'Що таке потік HTML-документа?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://www.w3schools.com/html/html_flow.asp',
//         },
//         img: 'https://example.com/html_flow.jpg',
//         views: 260,
//         createdAt: '08.10.2024',
//         user: {
//             id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
//             username: 'johnManager',
//             firstname: 'John',
//             lastname: 'Doe',
//             email: 'johnManager@gmail.com',
//             avatar: 'https://example.com/avatar8.jpg',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Потік документа',
//                 paragraphs: [
//                     'Потік HTML-документа описує, як браузер інтерпретує і відображає елементи на сторінці, враховуючи їх порядок, стилі та властивості.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Важливість потоку',
//                 paragraphs: [
//                     'Правильне структурування HTML-документа допомагає уникнути проблем з відображенням та робить код більш зрозумілим.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '51',
//         title: 'Як підключити JavaScript до сторінки?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction',
//         },
//         img: 'https://example.com/connect_js.jpg',
//         views: 310,
//         createdAt: '09.09.2024',
//         user: {
//             id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
//             username: 'annaUser',
//             firstname: 'Anna',
//             lastname: 'Koval',
//
//             email: 'annaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar9.jpg',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Методи підключення',
//                 paragraphs: [
//                     'JavaScript можна підключити до HTML-документа кількома способами: через тег <script> в голові або в кінці тіла документа.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: '<script src="script.js"></script>',
//                 description:
//                     'Приклад підключення зовнішнього файлу JavaScript.',
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Важливість порядку',
//                 paragraphs: [
//                     'Рекомендується підключати JavaScript в кінці документа, щоб уникнути блокування завантаження сторінки.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '52',
//         title: 'Яка різниця між <script>, <script async> та <script defer>?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script',
//         },
//         img: 'https://example.com/script_attributes.jpg',
//         views: 320,
//         createdAt: '10.03.2024',
//         user: {
//             id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
//             username: 'lucyAdmin',
//             firstname: 'Lucy',
//             lastname: 'Brown',
//
//             email: 'lucyAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar10.jpg',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Тег <script>',
//                 paragraphs: [
//                     'Тег <script> використовується для підключення JavaScript до HTML-документа. Відсутність атрибутів завантажує скрипт синхронно.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Атрибут async',
//                 paragraphs: [
//                     'Атрибут async завантажує скрипт асинхронно, що означає, що він не блокуватиме рендеринг сторінки.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Атрибут defer',
//                 paragraphs: [
//                     'Атрибут defer також завантажує скрипт асинхронно, але гарантує, що скрипт буде виконано лише після повного завантаження HTML-документа.',
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: '<script src="script.js" async></script>\n<script src="script.js" defer></script>',
//                 description: 'Приклади використання async та defer.',
//             },
//         ],
//     },
//     {
//         id: '53',
//         title: 'Як додати CSS на сторінку?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://www.w3schools.com/css/css_howto.asp',
//         },
//         img: 'https://example.com/add_css.jpg',
//         views: 280,
//         createdAt: '11.03.2024',
//         user: {
//             id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
//             username: 'alexManager',
//             firstname: 'Alex',
//             lastname: 'Johnson',
//
//             email: 'alexManager@gmail.com',
//
//             avatar: 'https://example.com/avatar11.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Методи підключення',
//                 paragraphs: [
//                     'CSS можна додати на сторінку через три основні методи: інлайнові стилі, внутрішні стилі та зовнішні файли CSS.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: '<link rel="stylesheet" href="styles.css">',
//                 description: 'Приклад підключення зовнішнього CSS-файлу.',
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Переваги зовнішнього CSS',
//                 paragraphs: [
//                     'Використання зовнішнього CSS-файлу допомагає зберігати код чистим і дозволяє повторно використовувати стилі на різних сторінках.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '54',
//         title: 'Яка різниця між reset.css та normalize.css?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://css-tricks.com/css-reset-vs-normalize-css/',
//         },
//         img: 'https://example.com/reset_normalize.jpg',
//         views: 290,
//         createdAt: '12.02.2023',
//         user: {
//             id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
//             username: 'leoUser',
//             firstname: 'Leo',
//             lastname: 'Mikhailov',
//
//             email: 'leoUser@gmail.com',
//
//             avatar: 'https://example.com/avatar12.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'reset.css',
//                 paragraphs: [
//                     'reset.css — це файл, який скидає всі стилі браузера до нуля, забезпечуючи єдину базу для стилізації.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'normalize.css',
//                 paragraphs: [
//                     'normalize.css зберігає деякі стилі браузера, але стандартизує їх для забезпечення кращого вигляду на різних платформах.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Вибір',
//                 paragraphs: [
//                     'Вибір між reset.css та normalize.css залежить від ваших потреб: якщо ви хочете почати з нуля, виберіть reset.css; якщо хочете зберегти деякі стилі, використовуйте normalize.css.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '55',
//         title: 'Що таке critical CSS?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://web.dev/critical-css/',
//         },
//         img: 'https://example.com/critical_css.jpg',
//         views: 300,
//         createdAt: '13.12.2024',
//         user: {
//             id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
//             username: 'janeAdmin',
//             firstname: 'Jane',
//             lastname: 'Williams',
//
//             email: 'janeAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar13.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Critical CSS',
//                 paragraphs: [
//                     'Critical CSS — це CSS, необхідний для відображення частини сторінки, що видима на екрані, при першому завантаженні.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Переваги',
//                 paragraphs: [
//                     'Використання critical CSS покращує швидкість завантаження сторінки, оскільки браузер може швидше відобразити контент.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: '<style>\n  h1 { color: blue; }\n</style>',
//                 description: 'Приклад critical CSS для заголовка.',
//             },
//         ],
//     },
//     {
//         id: '56',
//         title: 'Що таке специфічність селекторів CSS?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity',
//         },
//         img: 'https://example.com/specificity.jpg',
//         views: 260,
//         createdAt: '14.11.2024',
//         user: {
//             id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
//             username: 'peterManager',
//             firstname: 'Peter',
//             lastname: 'Muller',
//
//             email: 'peterManager@gmail.com',
//
//             avatar: 'https://example.com/avatar14.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Специфічність',
//                 paragraphs: [
//                     'Специфічність визначає, який стиль застосовується до елемента, коли є конфлікт між селекторами.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Вимірювання специфічності',
//                 paragraphs: [
//                     'Специфічність вимірюється за допомогою чисел, які базуються на типах селекторів: інлайн-стилі мають найвищий пріоритет, потім ID, класи, псевдокласи та, нарешті, елементи.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: '/* Висока специфічність */\n#menu .item {\n  color: red;\n}',
//                 description: 'Приклад селектора з високою специфічністю.',
//             },
//         ],
//     },
//     {
//         id: '57',
//         title: 'Яка різниця між псевдокласом і псевдоелементом в CSS?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes_and_pseudo-elements',
//         },
//         img: 'https://example.com/pseudo_classes.jpg',
//         views: 270,
//         createdAt: '15.11.2024',
//         user: {
//             id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
//             username: 'mariaUser',
//             firstname: 'Maria',
//             lastname: 'Petrova',
//
//             email: 'mariaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar15.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Псевдокласи',
//                 paragraphs: [
//                     'Псевдокласи, такі як :hover, застосовуються до елементів на основі їх стану.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Псевдоелементи',
//                 paragraphs: [
//                     'Псевдоелементи, такі як ::before, використовуються для стилізації частин елементів.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'a:hover {\n  color: blue;\n}\n\np::first-line {\n  font-weight: bold;\n}',
//                 description: 'Приклад псевдокласу та псевдоелемента.',
//             },
//         ],
//     },
//     {
//         id: '58',
//         title: 'Що таке блокова модель CSS?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model',
//         },
//         img: 'https://example.com/css_box_model.jpg',
//         views: 290,
//         createdAt: '16.11.2024',
//         user: {
//             id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
//             username: 'maxAdmin',
//             firstname: 'Max',
//             lastname: 'Gordon',
//
//             email: 'maxAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar16.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Блокова модель',
//                 paragraphs: [
//                     'Блокова модель описує, як браузер розраховує розміри елементів. Вона включає контент, відступи, облямівки та поля.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Структура',
//                 paragraphs: [
//                     'Кожен елемент має свою область, яка визначає його розмір і відображення на сторінці.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'box-sizing: border-box;',
//                 description:
//                     'Ця властивість змінює, як елементи враховують поля та облямівки.',
//             },
//         ],
//     },
//     {
//         id: '59',
//         title: 'Що робить властивість box-sizing?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing',
//         },
//         img: 'https://example.com/box_sizing.jpg',
//         views: 310,
//         createdAt: '17.11.2024',
//         user: {
//             id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
//             username: 'nickManager',
//             firstname: 'Nick',
//             lastname: 'Garcia',
//
//             email: 'nickManager@gmail.com',
//
//             avatar: 'https://example.com/avatar17.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення',
//                 paragraphs: [
//                     'Властивість box-sizing визначає, як браузер розраховує ширину і висоту елемента.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Значення',
//                 paragraphs: [
//                     'Існують два основних значення: content-box (за замовчуванням) і border-box, яке включає облямівку та відступи в загальних розмірах.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'box-sizing: border-box;',
//                 description:
//                     'Використання border-box для більшої контрольованості елементів.',
//             },
//         ],
//     },
//     {
//         id: '60',
//         title: 'Які види позиціонування елементів на сторінці ви знаєте?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/position',
//         },
//         img: 'https://example.com/positioning.jpg',
//         views: 280,
//         createdAt: '18.11.2024',
//         user: {
//             id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
//             username: 'claraUser',
//             firstname: 'Clara',
//             lastname: 'Santos',
//
//             email: 'claraUser@gmail.com',
//
//             avatar: 'https://example.com/avatar18.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Типи позиціонування',
//                 paragraphs: [
//                     "В CSS є п'ять основних типів позиціонування: static, relative, absolute, fixed і sticky.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Короткий опис',
//                 paragraphs: [
//                     'Static: стандартне позиціонування, Relative: позиція елемента відносно його нормального місця, Absolute: позиція елемента відносно найближчого позиціонованого батька, Fixed: позиція елемента відносно вікна перегляду, Sticky: комбінація relative і fixed.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '61',
//         title: 'Що робить властивість z-index?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/z-index',
//         },
//         img: 'https://example.com/z_index.jpg',
//         views: 310,
//         createdAt: '19.11.2024',
//         user: {
//             id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
//             username: 'tomAdmin',
//             firstname: 'Tom',
//             lastname: 'Anderson',
//
//             email: 'tomAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar19.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення z-index',
//                 paragraphs: [
//                     'Властивість z-index контролює порядок накладання елементів. Чим більше значення, тим вище елемент на стеку.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Важливість',
//                 paragraphs: [
//                     'z-index працює лише на позиційованих елементах (relative, absolute, fixed, sticky).',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'z-index: 10;',
//                 description: 'Встановлення z-index для елемента.',
//             },
//         ],
//     },
//     {
//         id: '62',
//         title: 'Яка різниця між px, em, rem?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/length',
//         },
//         img: 'https://example.com/units.jpg',
//         views: 320,
//         createdAt: '20.11.2024',
//         user: {
//             id: 'qkcVyIbnjYeEbaYVKGhtZrny7GC3',
//             username: 'sarahManager',
//             firstname: 'Sarah',
//             lastname: 'Cooper',
//
//             email: 'sarahManager@gmail.com',
//
//             avatar: 'https://example.com/avatar20.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Різні одиниці виміру',
//                 paragraphs: [
//                     'px — пікселі, em — відносна одиниця, що базується на розмірі шрифту батьківського елемента, rem — відносна одиниця, що базується на розмірі шрифту кореневого елемента.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Коли використовувати?',
//                 paragraphs: [
//                     'Для адаптивного дизайну краще використовувати em або rem, оскільки вони дозволяють легше налаштовувати масштабування шрифтів.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '63',
//         title: 'Яка різниця між гумовою, адаптивною та респонсивною версткою?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Responsive_design',
//         },
//         img: 'https://example.com/responsive_design.jpg',
//         views: 250,
//         createdAt: '21.11.2024',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Гумова верстка',
//                 paragraphs: [
//                     'Гумова верстка використовує відсоткові одиниці для ширини, що дозволяє елементам адаптуватися до ширини екрану.',
//                     'Цей підхід забезпечує, що елементи зберігають свої пропорції незалежно від розміру вікна.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Адаптивна верстка',
//                 paragraphs: [
//                     'Адаптивна верстка використовує фіксовані розміри для кількох визначених екранів.',
//                     'Цей підхід передбачає створення окремих стилів для кожного пристрою, таких як мобільний, планшет та десктоп.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Респонсивна верстка',
//                 paragraphs: [
//                     'Респонсивна верстка поєднує в собі гумову та адаптивну верстку.',
//                     'Вона використовує медіа-запити для зміни стилів в залежності від характеристик пристрою, таких як ширина екрану.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '64',
//         title: 'Яка різниця між visibility:hidden та display:none?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/visibility',
//         },
//         img: 'https://example.com/visibility_display.jpg',
//         views: 320,
//         createdAt: '21.11.2024',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'visibility:hidden',
//                 paragraphs: [
//                     'Коли ви використовуєте visibility: hidden, елемент залишається в документі, але не відображається на екрані.',
//                     'Цей елемент займає простір на сторінці.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'display:none',
//                 paragraphs: [
//                     'Коли ви використовуєте display: none, елемент повністю видаляється з документа.',
//                     'Він не займає жодного місця на сторінці, і все, що йому слідує, може зайняти його місце.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: "element.style.visibility = 'hidden';\n// Елемент залишається в потоці документа, але не видимий.\n\nelement.style.display = 'none';\n// Елемент повністю видаляється з потоку документа.",
//                 description: 'Приклади використання visibility та display.',
//             },
//         ],
//     },
//     {
//         id: '65',
//         title: 'Для чого потрібне правило @supports?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@supports',
//         },
//         img: 'https://example.com/supports_rule.jpg',
//         views: 210,
//         createdAt: '21.11.2024',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Правило @supports',
//                 paragraphs: [
//                     'Правило @supports дозволяє вам перевірити, чи підтримує браузер певну властивість CSS.',
//                     'Це допомагає створювати адаптивні стилі в залежності від можливостей браузера.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: '@supports (display: grid) {\n  .container {\n    display: grid;\n  }\n}',
//                 description:
//                     'Приклад використання правила @supports для визначення, чи підтримується grid layout.',
//             },
//         ],
//     },
//     {
//         id: '66',
//         title: 'Яка різниця між Progressive Enhancement та Graceful Degradation?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://www.smashingmagazine.com/2011/11/progressive-enhancement-and-graceful-degradation/',
//         },
//         img: 'https://example.com/enhancement_degradation.jpg',
//         views: 180,
//         createdAt: '21.11.2024',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//         category: [ArticleCategory.HTML, ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Progressive Enhancement',
//                 paragraphs: [
//                     'Progressive Enhancement передбачає створення базового контенту, який працює в усіх браузерах, і додавання покращень для сучасних браузерів.',
//                     'Цей підхід дозволяє користувачам з старими або обмеженими браузерами отримувати основний контент.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Graceful Degradation',
//                 paragraphs: [
//                     'Graceful Degradation, навпаки, починає з повного функціоналу для нових браузерів, але поступово зменшує функціонал для старих браузерів.',
//                     'Цей підхід може призводити до того, що користувачі старих браузерів можуть не отримати контент у повному обсязі.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '67',
//         title: 'Що таке repaint та reflow?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/Performance/Repaints_and_reflows',
//         },
//         img: 'https://example.com/repaint_reflow.jpg',
//         views: 240,
//         createdAt: '21.11.2024',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//         category: [ArticleCategory.HTML, ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Repaint',
//                 paragraphs: [
//                     'Repaint — це процес, при якому браузер переробляє видимі зміни в елементах, наприклад, зміну кольору або фону.',
//                     'Цей процес не впливає на структуру документа, тому не потрібно перераховувати позиції елементів.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Reflow',
//                 paragraphs: [
//                     'Reflow відбувається, коли змінюється структура документа, наприклад, зміна ширини або висоти елементів.',
//                     'Цей процес є більш витратним, оскільки браузер повинен перерахувати позиції та розміри всіх елементів.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: "element.style.width = '100px';\n// Це може викликати reflow\n\nelement.style.color = 'red';\n// Це викликає repaint, але не reflow.",
//                 description:
//                     'Приклади, які ілюструють різницю між repaint і reflow.',
//             },
//         ],
//     },
//     {
//         id: '68',
//         title: 'Яка різниця між cookie, sessionStorage та localStorage?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/API/Storage',
//         },
//         img: 'https://example.com/storage_types.jpg',
//         views: 300,
//         createdAt: '21.11.2024',
//         user: {
//             id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
//             username: 'markUser',
//             firstname: 'Mark',
//             lastname: 'Smith',
//             email: 'markUser@gmail.com',
//             avatar: 'https://example.com/avatar6.png',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Cookies',
//                 paragraphs: [
//                     'Cookies - це невеликі шматочки даних, які веб-сайт може зберігати в браузері користувача.',
//                     'Вони можуть бути використані для зберігання інформації про сеанс, налаштування та інші дані.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'sessionStorage',
//                 paragraphs: [
//                     'sessionStorage зберігає дані тільки на час сесії. Це означає, що дані зберігаються, поки відкрите вікно браузера.',
//                     'Якщо вікно закриється, всі дані sessionStorage зникають.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'localStorage',
//                 paragraphs: [
//                     'localStorage, на відміну від sessionStorage, зберігає дані без терміну дії.',
//                     'Ці дані залишаються доступними навіть після закриття браузера.',
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: "// Зберігання cookie\ndocument.cookie = \"username=JohnDoe; expires=Fri, 31 Dec 2024 23:59:59 GMT;\";\n\n// sessionStorage\nsessionStorage.setItem('key', 'value');\n\n// localStorage\nlocalStorage.setItem('key', 'value');",
//                 description:
//                     'Приклади використання cookie, sessionStorage і localStorage.',
//             },
//         ],
//     },
//     {
//         id: '69',
//         title: 'Яка різниця між відносним та абсолютним шляхом?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/URLs',
//         },
//         img: 'https://example.com/relative_absolute_paths.jpg',
//         views: 280,
//         createdAt: '21.11.2024',
//         user: {
//             id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
//             username: 'katyaAdmin',
//             firstname: 'Katya',
//             lastname: 'Ivanova',
//             email: 'katyaAdmin@gmail.com',
//             avatar: 'https://example.com/avatar7.jpg',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Відносний шлях',
//                 paragraphs: [
//                     'Відносний шлях вказує на місце розташування ресурсу відносно поточної сторінки.',
//                     'Приклад: "images/photo.jpg" вказує на зображення в папці images, що розташована поряд із поточною сторінкою.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Абсолютний шлях',
//                 paragraphs: [
//                     'Абсолютний шлях вказує на повну URL-адресу ресурсу.',
//                     'Приклад: "https://example.com/images/photo.jpg" вказує на конкретне зображення в мережі.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '70',
//         title: 'Яка різниця між тегом та елементом?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
//         },
//         img: 'https://example.com/tag_vs_element.jpg',
//         views: 220,
//         createdAt: '21.11.2024',
//         user: {
//             id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
//             username: 'johnManager',
//             firstname: 'John',
//             lastname: 'Doe',
//             email: 'johnManager@gmail.com',
//             avatar: 'https://example.com/avatar8.jpg',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Тег',
//                 paragraphs: [
//                     'Тег - це синтаксичний маркер у HTML, який визначає початок і кінець елемента.',
//                     'Приклад: <p> - це тег, який вказує на параграф.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Елемент',
//                 paragraphs: [
//                     'Елемент включає тег, його атрибути і вміст.',
//                     "Приклад: <p class='TEXT' as ArticleSection.TEXT>Hello World</p> - це елемент, який включає тег, клас і текстовий вміст.",
//                 ],
//             },
//         ],
//     },
//     {
//         id: '71',
//         title: 'Коли використовувати <button>, а коли <a>?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button',
//         },
//         img: 'https://example.com/button_vs_a.jpg',
//         views: 310,
//         createdAt: '21.11.2024',
//         user: {
//             id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
//             username: 'annaUser',
//             firstname: 'Anna',
//             lastname: 'Koval',
//
//             email: 'annaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar9.jpg',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '<button>',
//                 paragraphs: [
//                     'Тег <button> використовується для створення кнопок, які виконують дії, наприклад, надсилання форми або запуск скриптів.',
//                     "Приклад: <button type='submit'>Відправити</button>.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '<a>',
//                 paragraphs: [
//                     'Тег <a> використовується для створення гіперпосилань, які ведуть на інші сторінки або адреси.',
//                     "Приклад: <a href='https://example.com'>Перейти на сайт</a>.",
//                 ],
//             },
//         ],
//     },
//     {
//         id: '72',
//         title: 'Для чого потрібний атрибут type у кнопки?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button',
//         },
//         img: 'https://example.com/button_type.jpg',
//         views: 270,
//         createdAt: '21.11.2024',
//         user: {
//             id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
//             username: 'lucyAdmin',
//             firstname: 'Lucy',
//             lastname: 'Brown',
//
//             email: 'lucyAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar10.jpg',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Атрибут type',
//                 paragraphs: [
//                     'Атрибут type вказує тип кнопки, що впливає на її поведінку в контексті форм.',
//                     "Основні типи: 'submit', 'reset' і 'button'.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: "<button type='submit'>Відправити</button>\n<button type='reset'>Скинути</button>\n<button type='button'>Просто кнопка</button>",
//                 description: 'Приклади різних типів кнопок.',
//             },
//         ],
//     },
//     {
//         id: '73',
//         title: 'Для чого потрібний тег <base>?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base',
//         },
//         img: 'https://example.com/base_tag.jpg',
//         views: 220,
//         createdAt: '21.11.2024',
//         user: {
//             id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
//             username: 'alexManager',
//             firstname: 'Alex',
//             lastname: 'Johnson',
//
//             email: 'alexManager@gmail.com',
//
//             avatar: 'https://example.com/avatar11.jpg',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Тег <base>',
//                 paragraphs: [
//                     'Тег <base> задає базовий URL для всіх відносних посилань у документі.',
//                     'Це важливо для забезпечення правильних шляхів до ресурсів.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: "<base href='https://example.com/' />",
//                 description: 'Приклад використання тегу <base>.',
//             },
//         ],
//     },
//     {
//         id: '74',
//         title: 'Яка різниця між checkbox та radio?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox',
//         },
//         img: 'https://example.com/checkbox_vs_radio.jpg',
//         views: 300,
//         createdAt: '21.11.2024',
//         user: {
//             id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
//             username: 'leoUser',
//             firstname: 'Leo',
//             lastname: 'Mikhailov',
//
//             email: 'leoUser@gmail.com',
//
//             avatar: 'https://example.com/avatar12.jpg',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Checkbox',
//                 paragraphs: [
//                     'Checkbox - це елемент, який дозволяє вибрати один або декілька варіантів.',
//                     'Користувач може ставити або знімати галочки з кількох чекбоксів.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Radio',
//                 paragraphs: [
//                     'Radio - це елемент, який дозволяє вибрати лише один варіант з кількох.',
//                     "Всі radio-кнопки з одного набору мають однакове ім'я.",
//                 ],
//             },
//         ],
//     },
//     {
//         id: '75',
//         title: 'Що таке наслідування стилів в CSS?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance',
//         },
//         img: 'https://www.bia.pp.ua/wp-content/uploads/2019/01/p2.jpg',
//         views: 350,
//         createdAt: '01.01.2023',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення',
//                 paragraphs: [
//                     'Наслідування стилів в CSS - це процес, завдяки якому дочірні елементи успадковують стилі від батьківських елементів.',
//                     'Це дозволяє зберігати консистентність стилю у всій структурі документа.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклади наслідування',
//                 paragraphs: [
//                     'Наприклад, якщо ви визначили колір тексту для елемента <body>, усі текстові елементи в цьому тілі автоматично успадкують цей колір, якщо їм не задано іншого.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '76',
//         title: 'Що таке каскадність в CSS?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade',
//         },
//         img: 'https://example.com/cascade_css.jpg',
//         views: 400,
//         createdAt: '05.03.2023',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення',
//                 paragraphs: [
//                     'Каскадність в CSS описує, як браузер обробляє конфлікти між стилями, які можуть бути застосовані до одного й того ж елемента.',
//                     'Це означає, що якщо кілька правил застосовуються до одного елемента, браузер вирішує, яке правило має пріоритет.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Пріоритет',
//                 paragraphs: [
//                     'CSS використовує специфічність для визначення, яке правило застосувати. Правила з більшою специфічністю отримують пріоритет над правилами з меншою.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '77',
//         title: 'Яка різниця між контентними та декоративними зображеннями?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://www.w3.org/WAI/tutorials/images/',
//         },
//         img: 'https://example.com/content_vs_decorative_images.jpg',
//         views: 270,
//         createdAt: '30.03.2023',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Контентні зображення',
//                 paragraphs: [
//                     'Контентні зображення передають важливу інформацію та мають значення для контенту веб-сторінки.',
//                     'Вони зазвичай повинні мати атрибут alt для опису.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Декоративні зображення',
//                 paragraphs: [
//                     'Декоративні зображення використовуються лише для естетичного оформлення та не несуть ніякої інформації.',
//                     'Для таких зображень атрибут alt повинен бути порожнім.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '78',
//         title: 'Чому у <img> та <input> немає псевдоелементів ::before, ::after?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements',
//         },
//         img: 'https://example.com/no_pseudo_elements.jpg',
//         views: 320,
//         createdAt: '23.05.2023',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Причина',
//                 paragraphs: [
//                     'Псевдоелементи ::before та ::after можуть бути використані лише з елементами, які мають вміст, таким як <div> або <span>.',
//                     'Елементи <img> і <input> є самозакриваючими, тобто вони не можуть містити вміст, тому не можуть мати псевдоелементи.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '79',
//         title: 'Для чого потрібна функція calc в CSS?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/calc',
//         },
//         img: 'https://example.com/calc_function.jpg',
//         views: 290,
//         createdAt: '11.06.2023',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Опис',
//                 paragraphs: [
//                     'Функція calc() дозволяє виконувати математичні обчислення при визначенні значень CSS.',
//                     'Це корисно для адаптивного дизайну, коли потрібно комбінувати різні одиниці виміру.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'width: calc(100% - 50px);',
//                 description:
//                     'Приклад використання calc для визначення ширини елемента.',
//             },
//         ],
//     },
//     {
//         id: '80',
//         title: 'Що таке flex-контейнер та flex-елемент?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Flexbox',
//         },
//         img: 'https://example.com/flex_container_element.jpg',
//         views: 360,
//         createdAt: '12.08.2023',
//         user: {
//             id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
//             username: 'markUser',
//             firstname: 'Mark',
//             lastname: 'Smith',
//             email: 'markUser@gmail.com',
//             avatar: 'https://example.com/avatar6.png',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Flex-контейнер',
//                 paragraphs: [
//                     'Flex-контейнер - це батьківський елемент, який застосовує flexbox до своїх дочірніх елементів.',
//                     'Для визначення flex-контейнера потрібно встановити display: flex;.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Flex-елемент',
//                 paragraphs: [
//                     'Flex-елементи - це дочірні елементи flex-контейнера, які розташовуються у лінії або стовпці в залежності від налаштувань flexbox.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '81',
//         title: 'Що таке flex-вісь?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox',
//         },
//         img: 'https://example.com/flex_axis.jpg',
//         views: 310,
//         createdAt: '15.07.2023',
//         user: {
//             id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
//             username: 'katyaAdmin',
//             firstname: 'Katya',
//             lastname: 'Ivanova',
//             email: 'katyaAdmin@gmail.com',
//             avatar: 'https://example.com/avatar7.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Flex-вісь',
//                 paragraphs: [
//                     'Flex-вісь - це основна вісь, уздовж якої розташовані flex-елементи.',
//                     'Існує дві осі: основна вісь і перпендикулярна вісь.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основна та перпендикулярна осі',
//                 paragraphs: [
//                     'Основна вісь - це вісь, на якій розташовані flex-елементи. Перпендикулярна вісь - це вісь, що перетинає основну.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '82',
//         title: 'Які відмінності у mobile first та desktop first підходів?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://www.smashingmagazine.com/2018/01/mobile-first-responsive-design/',
//         },
//         img: 'https://example.com/mobile_first_vs_desktop_first.jpg',
//         views: 450,
//         createdAt: '01.09.2023',
//         user: {
//             id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
//             username: 'johnManager',
//             firstname: 'John',
//             lastname: 'Doe',
//             email: 'johnManager@gmail.com',
//             avatar: 'https://example.com/avatar8.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Mobile First',
//                 paragraphs: [
//                     'Mobile first - це підхід, при якому спочатку розробляється дизайн для мобільних пристроїв.',
//                     'Потім на основі цього дизайну створюються версії для більших екранів.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Desktop First',
//                 paragraphs: [
//                     "Desktop first - це підхід, при якому спочатку розробляється дизайн для десктопних комп'ютерів.",
//                     'Потім його адаптують для мобільних пристроїв.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '83',
//         title: 'Які переваги svg перед png або jpeg?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://www.smashingmagazine.com/2017/06/benefits-of-svg/',
//         },
//         img: 'https://example.com/svg_vs_png_jpeg.jpg',
//         views: 320,
//         createdAt: '30.09.2023',
//         user: {
//             id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
//             username: 'annaUser',
//             firstname: 'Anna',
//             lastname: 'Koval',
//
//             email: 'annaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar9.jpg',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Векторна графіка',
//                 paragraphs: [
//                     'SVG - це векторний формат зображення, що дозволяє масштабувати без втрати якості.',
//                     'Це робить його ідеальним для логотипів і графіки.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Малі розміри файлів',
//                 paragraphs: [
//                     'SVG-файли зазвичай мають менші розміри в порівнянні з растровими форматами, такими як PNG та JPEG.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '84',
//         title: 'Яка різниця між rgb, rgba та hex?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://www.w3schools.com/css/css_colors.asp',
//         },
//         img: 'https://example.com/rgb_rgba_hex.jpg',
//         views: 400,
//         createdAt: '20.02.2024',
//         user: {
//             id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
//             username: 'lucyAdmin',
//             firstname: 'Lucy',
//             lastname: 'Brown',
//
//             email: 'lucyAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar10.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'RGB',
//                 paragraphs: [
//                     'RGB - це система кольорів, яка використовує червоний, зелений і синій канали.',
//                     'Кольори визначаються шляхом комбінування цих трьох кольорів.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'RGBA',
//                 paragraphs: [
//                     'RGBA - це розширена версія RGB, яка включає альфа-канал для визначення прозорості.',
//                     'Це дозволяє створювати напівпрозорі кольори.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Hex',
//                 paragraphs: [
//                     'Hex - це шістнадцяткова система для визначення кольорів.',
//                     'Вона складається з шести символів, які представляють значення RGB.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '85',
//         title: 'Чим відрізняється лінійний та радіальний градієнти?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://www.w3schools.com/css/css3_gradients.asp',
//         },
//         img: 'https://example.com/linear_radial_gradients.jpg',
//         views: 350,
//         createdAt: '15.03.2024',
//         user: {
//             id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
//             username: 'alexManager',
//             firstname: 'Alex',
//             lastname: 'Johnson',
//
//             email: 'alexManager@gmail.com',
//
//             avatar: 'https://example.com/avatar11.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Лінійний градієнт',
//                 paragraphs: [
//                     'Лінійний градієнт - це градієнт, який змінюється від одного кольору до іншого вздовж прямої лінії.',
//                     'Він визначається за допомогою напрямку або кута.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Радіальний градієнт',
//                 paragraphs: [
//                     'Радіальний градієнт - це градієнт, який змінюється від центру до країв у формі кола.',
//                     'Це створює ефект, ніби колір виходить з центру.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '86',
//         title: 'Що таке правило обмеження домену (same origin policy)?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy',
//         },
//         img: 'https://example.com/same_origin_policy.jpg',
//         views: 260,
//         createdAt: '28.03.2023',
//         user: {
//             id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
//             username: 'leoUser',
//             firstname: 'Leo',
//             lastname: 'Mikhailov',
//
//             email: 'leoUser@gmail.com',
//
//             avatar: 'https://example.com/avatar12.jpg',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення',
//                 paragraphs: [
//                     'Правило обмеження домену - це політика безпеки, яка обмежує доступ до ресурсів з інших доменів.',
//                     'Це необхідно для захисту даних користувачів та запобігання атакам.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклади',
//                 paragraphs: [
//                     'Наприклад, якщо ваш веб-сайт завантажує ресурси з іншого домену, браузер може заблокувати їх через цю політику.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '87',
//         title: 'Що таке атрибути в HTML?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_attributes',
//         },
//         img: 'https://example.com/html_attributes.jpg',
//         views: 290,
//         createdAt: '16.03.2023',
//         user: {
//             id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
//             username: 'janeAdmin',
//             firstname: 'Jane',
//             lastname: 'Williams',
//
//             email: 'janeAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar13.jpg',
//         },
//         category: [ArticleCategory.HTML],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Опис',
//                 paragraphs: [
//                     'Атрибути в HTML - це додаткові характеристики, які можна додати до тегів для надання їм більшої інформації.',
//                     'Атрибути завжди прописуються в відкриваючому тегу.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклади атрибутів',
//                 paragraphs: [
//                     'Наприклад, атрибут src в тегу <img> вказує шлях до зображення.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '88',
//         title: 'Які основні зміни HTML5, CSS3?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://www.w3schools.com/whatis/whatis_html5.asp',
//         },
//         img: 'https://example.com/html5_css3_changes.jpg',
//         views: 370,
//         createdAt: '29.03.2023',
//         user: {
//             id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
//             username: 'peterManager',
//             firstname: 'Peter',
//             lastname: 'Muller',
//
//             email: 'peterManager@gmail.com',
//
//             avatar: 'https://example.com/avatar14.jpg',
//         },
//         category: [ArticleCategory.HTML, ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'HTML5',
//                 paragraphs: [
//                     'HTML5 вводить нові семантичні елементи, такі як <header>, <footer>, <article> та <section>.',
//                     'Ці елементи покращують структурованість документів.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'CSS3',
//                 paragraphs: [
//                     'CSS3 вводить нові можливості, такі як градієнти, тіні, трансформації та анімації.',
//                     'Ці можливості дозволяють створювати більш привабливі та інтерактивні веб-сторінки.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '89',
//         title: 'Яка частина вебу найбільш головна? Без чого фронтенд розробка не буде існувати?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/What_is_the_web',
//         },
//         img: 'https://example.com/frontend_essentials.jpg',
//         views: 450,
//         createdAt: '30.05.2023',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//         category: [
//             ArticleCategory.HTML,
//             ArticleCategory.CSS,
//             ArticleCategory.JAVASCRIPT,
//         ],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основи вебу',
//                 paragraphs: [
//                     'Веб складається з трьох основних технологій: HTML, CSS та JavaScript. HTML визначає структуру веб-сторінок, CSS відповідає за їхній стиль, а JavaScript надає інтерактивність. Без цих трьох елементів фронтенд розробка просто не існуватиме.',
//                     'HTML (HyperText Markup Language) використовується для створення каркасу веб-сторінки. Важливо знати, як правильно використовувати теги, щоб створити доступну та семантичну розмітку.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 title: 'Структура веб-технологій',
//                 src: 'https://example.com/web_technologies_structure.jpg',
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'CSS та JavaScript',
//                 paragraphs: [
//                     'CSS (Cascading Style Sheets) дозволяє визначити, як виглядають HTML-елементи. За його допомогою можна задати кольори, шрифти, відступи та багато іншого.',
//                     'JavaScript - це мова програмування, яка дозволяє реалізувати динамічні елементи на веб-сторінках, такі як слайдери, модальні вікна та інші інтерактивні компоненти.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '90',
//         title: 'Як браузер інтерпретує HTML, CSS та JavaScript?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/How_browsers_work',
//         },
//         img: 'https://example.com/browser_interpretation.jpg',
//         views: 500,
//         createdAt: '19.04.2023',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Процес інтерпретації',
//                 paragraphs: [
//                     'Коли ви відкриваєте веб-сторінку, браузер виконує кілька ключових етапів для її відображення. Перш за все, він отримує HTML-код з сервера. HTML документ обробляється, і браузер створює DOM (Document Object Model), що представляє структуру документа.',
//                     "CSS обробляється для створення CSSOM (CSS Object Model), що містить інформацію про стилі. Після цього браузер об'єднує DOM і CSSOM у render tree, що використовується для відображення контенту.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Виконання JavaScript',
//                 paragraphs: [
//                     'JavaScript виконується в контексті браузера. Він може маніпулювати DOM, що дозволяє змінювати структуру веб-сторінки в реальному часі. Браузер має JavaScript-двигун, який відповідає за виконання скриптів.',
//                     'Браузер також обробляє асинхронні запити, що дозволяє завантажувати нові дані без перезавантаження сторінки, наприклад, при використанні AJAX.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад простого JavaScript коду',
//                 code: "document.addEventListener('DOMContentLoaded', function() {\n  const greeting = document.createElement('h1');\n  greeting.textContent = 'Вітаємо на нашій сторінці!';\n  document.body.appendChild(greeting);\n});",
//             },
//         ],
//     },
//     {
//         id: '91',
//         title: 'Які властивості CSS не варто використовувати? Які спровокують рекалькуляцію і зупиняють DOM?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://css-tricks.com/repaint-reflow-how-browser-works/',
//         },
//         img: 'https://example.com/css_reflow.jpg',
//         views: 320,
//         createdAt: '10.08.2023',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Рекалькуляція та перерисовка',
//                 paragraphs: [
//                     'Рекалькуляція - це процес, під час якого браузер перевіряє, чи потрібно оновити розмітку сторінки через зміни в DOM або CSS. Властивості, такі як `width`, `height`, `margin`, `padding`, можуть викликати рекалькуляцію, що значно уповільнює рендеринг сторінки.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Властивості, що спричиняють рекалькуляцію',
//                 paragraphs: [
//                     'Не рекомендується часто використовувати такі властивості, як:',
//                     '- `position`: зміна позиціювання елемента.',
//                     '- `display`: зміна типу відображення елемента.',
//                     '- `overflow`: зміна способу відображення переповненого контенту.',
//                     'Ці зміни можуть призвести до того, що браузеру доведеться повторно обчислювати та перерисовувати весь документ.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '92',
//         title: 'Як парсяться селектори CSS?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors',
//         },
//         img: 'https://example.com/css_selectors_parsing.jpg',
//         views: 270,
//         createdAt: '20.09.2023',
//         user: {
//             id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
//             username: 'markUser',
//             firstname: 'Mark',
//             lastname: 'Smith',
//             email: 'markUser@gmail.com',
//             avatar: 'https://example.com/avatar6.png',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Парсинг селекторів',
//                 paragraphs: [
//                     'Парсинг селекторів у CSS - це процес, при якому браузер визначає, які елементи на веб-сторінці відповідають певному селектору. Селектори парсяться зліва направо, і браузер перевіряє, чи елементи відповідають критеріям селектора.',
//                     'Важливо розуміти специфіку селекторів, оскільки це впливає на продуктивність.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад селекторів CSS',
//                 code: "/* Селектор класу */\n.button {\n  background-color: blue;\n}\n\n/* Селектор ID */\n#header {\n  font-size: 20px;\n}\n\n/* Селектор атрибута */\na[href='https://example.com'] {\n  color: red;\n}",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Важливість ефективності селекторів',
//                 paragraphs: [
//                     'Завжди намагайтеся використовувати прості селектори, оскільки їх легше парсити і вони підвищують продуктивність рендерингу.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '93',
//         title: 'Специфічність селекторів',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity',
//         },
//         img: 'https://example.com/css_specificity.jpg',
//         views: 350,
//         createdAt: '29.09.2023',
//         user: {
//             id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
//             username: 'katyaAdmin',
//             firstname: 'Katya',
//             lastname: 'Ivanova',
//             email: 'katyaAdmin@gmail.com',
//             avatar: 'https://example.com/avatar7.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення специфічності',
//                 paragraphs: [
//                     'Специфічність - це механізм, за допомогою якого браузер визначає, який стиль застосувати до елемента, якщо декілька селекторів відповідають йому.',
//                     'Кожен селектор має специфічність, що вимірюється у вигляді чисел. Вищий показник специфічності означає, що стиль буде переважати.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад специфічності селекторів',
//                 code: '/* Специфічність = 0-1-0 */\n#header {\n  color: blue;\n}\n\n/* Специфічність = 1-0-0 */\n.header .title {\n  color: red;\n}\n\n/* Специфічність = 0-0-1 */\na {\n  text-decoration: none;\n}',
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення специфічності',
//                 paragraphs: [
//                     'Специфічність визначається у вигляді чотирьох чисел: (inline, id, class, element). Чим вищий показник, тим більша специфічність.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '94',
//         title: 'На рівні із чим буде специфічність у псевдоелемента і псевдокласа?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes_and_pseudo-elements',
//         },
//         img: 'https://example.com/pseudo_elements_classes.jpg',
//         views: 310,
//         createdAt: '04.03.2024',
//         user: {
//             id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
//             username: 'johnManager',
//             firstname: 'John',
//             lastname: 'Doe',
//             email: 'johnManager@gmail.com',
//             avatar: 'https://example.com/avatar8.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Псевдокласи та псевдоелементи',
//                 paragraphs: [
//                     'Псевдокласи (наприклад, :hover) та псевдоелементи (наприклад, ::before) також мають специфічність, яка базується на селекторах, до яких вони додаються.',
//                     'Специфічність псевдокласів та псевдоелементів можна розглядати як збільшення специфічності базового селектора.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад специфічності псевдокласів',
//                 code: ".button:hover {\n  background-color: green;\n}\n\n#header::before {\n  content: 'Welcome';\n}",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Специфічність у псевдокласах',
//                 paragraphs: [
//                     'Наприклад, якщо у вас є селектор .button з специфічністю 0-1-0, то .button:hover матиме специфічність 0-1-1.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '95',
//         title: 'Які переваги використання препроцесорів? Чого не вистачає у чистому CSS?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://sass-lang.com/guide',
//         },
//         img: 'https://example.com/css_preprocessors.jpg',
//         views: 400,
//         createdAt: '10.03.2024',
//         user: {
//             id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
//             username: 'annaUser',
//             firstname: 'Anna',
//             lastname: 'Koval',
//
//             email: 'annaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar9.jpg',
//         },
//         category: [ArticleCategory.CSS],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке препроцесори?',
//                 paragraphs: [
//                     'Препроцесори CSS, такі як SASS або LESS, додають до CSS розширені можливості, такі як змінні, вкладеність, міксини і функції.',
//                     'Ці можливості роблять код більш організованим та зручним для підтримки.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Переваги препроцесорів',
//                 paragraphs: [
//                     'Переваги використання препроцесорів включають:',
//                     '- **Змінні**: дозволяють зберігати значення і повторно їх використовувати.',
//                     '- **Вкладеність**: дозволяє структурувати CSS так, як HTML.',
//                     '- **Міксини**: дозволяють створювати повторювані блоки коду.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад SASS коду',
//                 code: '$primary-color: #333;\n\n.button {\n  background-color: $primary-color;\n  &:hover {\n    background-color: lighten($primary-color, 10%);\n  }\n}',
//             },
//         ],
//     },
//     {
//         id: '96',
//         title: 'Що таке DOM і Shadow DOM? В чому їх різниця?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM',
//         },
//         img: 'https://example.com/dom_shadow_dom.jpg',
//         views: 360,
//         createdAt: '01.01.2023',
//         user: {
//             id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
//             username: 'lucyAdmin',
//             firstname: 'Lucy',
//             lastname: 'Brown',
//
//             email: 'lucyAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar10.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'DOM',
//                 paragraphs: [
//                     "DOM (Document Object Model) - це об'єктна модель, що представляє структуру HTML-документа у вигляді дерева. Це дозволяє програмам і скриптам динамічно змінювати вміст, структуру та стиль веб-сторінки.",
//                     "DOM є глобальною об'єктною моделлю, доступною з JavaScript, що дозволяє взаємодіяти з HTML-елементами.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Shadow DOM',
//                 paragraphs: [
//                     'Shadow DOM - це частина веб-компонентів, яка дозволяє створювати ізольовані від основного DOM частини веб-сторінки.',
//                     'Це дозволяє створювати компоненти, які мають власні стилі і структуру, що не впливають на зовнішні елементи.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад Shadow DOM',
//                 code: "const shadowHost = document.createElement('div');\nconst shadowRoot = shadowHost.attachShadow({ mode: 'open' });\nshadowRoot.innerHTML = `<style>h1 { color: blue; }</style><h1>Hello Shadow DOM!</h1>`;\ndocument.body.appendChild(shadowHost);",
//             },
//         ],
//     },
//     {
//         id: '97',
//         title: 'Що таке preventDefault() і stopPropagation()?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault',
//         },
//         img: 'https://example.com/prevent_default_stop_propagation.jpg',
//         views: 410,
//         createdAt: '25.03.2023',
//         user: {
//             id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
//             username: 'alexManager',
//             firstname: 'Alex',
//             lastname: 'Johnson',
//
//             email: 'alexManager@gmail.com',
//
//             avatar: 'https://example.com/avatar11.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'preventDefault()',
//                 paragraphs: [
//                     'Метод `preventDefault()` використовується для скасування стандартної поведінки події. Наприклад, при натисканні на посилання `preventDefault()` може запобігти переходу на нову сторінку.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'stopPropagation()',
//                 paragraphs: [
//                     'Метод `stopPropagation()` запобігає події від подальшого поширення по дереву DOM. Це означає, що подія не буде оброблена батьківськими елементами.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання',
//                 code: "const button = document.querySelector('button');\nbutton.addEventListener('click', function(event) {\n  event.preventDefault(); // Скасовує стандартну поведінку\n  event.stopPropagation(); // Зупиняє поширення події\n  alert('Button clicked!');\n});",
//             },
//         ],
//     },
//     {
//         id: '98',
//         title: 'Що таке capturing bubbling?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/API/Event/capturing_bubbling_phases',
//         },
//         img: 'https://example.com/capturing_bubbling.jpg',
//         views: 370,
//         createdAt: '08.03.2023',
//         user: {
//             id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
//             username: 'leoUser',
//             firstname: 'Leo',
//             lastname: 'Mikhailov',
//
//             email: 'leoUser@gmail.com',
//
//             avatar: 'https://example.com/avatar12.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Каптурування та бульбашкування',
//                 paragraphs: [
//                     'Події в DOM проходять два етапи: каптурування і бульбашкування. Каптурування - це етап, коли подія йде від батьківських елементів до дочірніх.',
//                     'Бульбашкування - це етап, коли подія йде від дочірніх елементів до батьківських.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад обробників подій',
//                 code: "const parent = document.querySelector('.parent');\nconst child = document.querySelector('.child');\n\nparent.addEventListener('click', function() {\n  alert('Parent clicked!');\n}, true); // Каптурування\n\nchild.addEventListener('click', function() {\n  alert('Child clicked!');\n}); // Бульбашкування",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Важливість каптурування та бульбашкування',
//                 paragraphs: [
//                     'Розуміння цих етапів є важливим для створення ефективних обробників подій і маніпуляцій з DOM.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '99',
//         title: 'Що таке hoisting?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Glossary/Hoisting',
//         },
//         img: 'https://example.com/hoisting.jpg',
//         views: 390,
//         createdAt: '28.03.2023',
//         user: {
//             id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
//             username: 'janeAdmin',
//             firstname: 'Jane',
//             lastname: 'Williams',
//
//             email: 'janeAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar13.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення hoisting',
//                 paragraphs: [
//                     'Hoisting - це механізм в JavaScript, при якому змінні та функції оголошуються перед їхнім використанням. Це означає, що ви можете використовувати змінні до їхнього оголошення в коді.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад hoisting',
//                 code: 'console.log(x); // undefined\nvar x = 5;\nconsole.log(x); // 5',
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Hoisting з функціями',
//                 paragraphs: [
//                     'Функції також підлягають hoisting, що означає, що їх можна викликати до їхнього оголошення.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '100',
//         title: 'Де в React спрацьовує цей hoisting?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/hooks-state.html',
//         },
//         img: 'https://example.com/react_hoisting.jpg',
//         views: 430,
//         createdAt: '01.04.2023',
//         user: {
//             id: 'BrKES0pOcxcgYBUpKmZxBzqKFhl1',
//             username: 'peterManager',
//             firstname: 'Peter',
//             lastname: 'Muller',
//
//             email: 'peterManager@gmail.com',
//
//             avatar: 'https://example.com/avatar14.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Hoisting у React',
//                 paragraphs: [
//                     'В React hoisting може спостерігатися в компонентах функцій та класах. Коли ви використовуєте `useState`, ви можете викликати його перед поверненням JSX.',
//                     'Це дозволяє створити локальний стан, який доступний у всій функції.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання useState',
//                 code: 'import React, { useState } from ArticleCategory.REACT;\n\nconst MyComponent = () => {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>Click me</button>\n    </div>\n  );\n};',
//             },
//         ],
//     },
//     {
//         id: '101',
//         title: 'В якому кейсі потрібен var?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var',
//         },
//         img: 'https://example.com/var_use_case.jpg',
//         views: 280,
//         createdAt: '25.04.2023',
//         user: {
//             id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
//             username: 'mariaUser',
//             firstname: 'Maria',
//             lastname: 'Petrova',
//
//             email: 'mariaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar15.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення var',
//                 paragraphs: [
//                     '`var` - це ключове слово для оголошення змінних у JavaScript. З ним змінна має функціональну область видимості, що означає, що вона доступна в межах функції, в якій була оголошена.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Коли використовувати var?',
//                 paragraphs: [
//                     'Використання `var` може бути доречним у випадках, коли ви хочете, щоб змінна була доступною в усій функції, навіть якщо вона оголошена в умовному блоці.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання var',
//                 code: 'function example() {\n  if (true) {\n    var x = 5;\n  }\n  console.log(x); // 5\n}',
//             },
//         ],
//     },
//     {
//         id: '102',
//         title: 'Які переваги проміси мають над колбеками?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises',
//         },
//         img: 'https://example.com/promises_vs_callbacks.jpg',
//         views: 450,
//         createdAt: '20.09.2023',
//         user: {
//             id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
//             username: 'maxAdmin',
//             firstname: 'Max',
//             lastname: 'Gordon',
//
//             email: 'maxAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar16.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Проблема колбеків',
//                 paragraphs: [
//                     "Колбеки часто призводять до проблеми, відомої як 'callback hell', коли глибокі вкладення колбеків роблять код важким для читання та підтримки.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Переваги промісів',
//                 paragraphs: [
//                     'Проміси пропонують лінійний підхід до обробки асинхронного коду, що робить його легшим для читання та розуміння.',
//                     'Вони також дозволяють легко обробляти помилки за допомогою `.catch()`.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад промісу',
//                 code: "const myPromise = new Promise((resolve, reject) => {\n  const success = true;\n  if (success) {\n    resolve('Operation was successful!');\n  } else {\n    reject('Operation failed!');\n  }\n});\n\nmyPromise\n  .then(result => console.log(result))\n  .catch(error => console.error(error));",
//             },
//         ],
//     },
//     {
//         id: '103',
//         title: 'Яка різниця event loop на фронтенді і на бекенді?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop',
//         },
//         img: 'https://example.com/event_loop.jpg',
//         views: 500,
//         createdAt: '04.09.2023',
//         user: {
//             id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
//             username: 'nickManager',
//             firstname: 'Nick',
//             lastname: 'Garcia',
//
//             email: 'nickManager@gmail.com',
//
//             avatar: 'https://example.com/avatar17.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Event Loop у JavaScript',
//                 paragraphs: [
//                     'Event Loop - це механізм, який дозволяє JavaScript обробляти асинхронні події. Хоча він працює однаково на фронтенді і бекенді, середовища виконання можуть мати різні особливості.',
//                     'На фронтенді Event Loop виконує код, обробляє події і викликає колбеки, тоді як на бекенді, таких як Node.js, він виконує код асинхронно, з використанням неблокуючих операцій вводу-виводу.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Відмінності у виконанні',
//                 paragraphs: [
//                     'Фронтенд зазвичай обробляє користувацькі події, в той час як бекенд обробляє запити та відповіді серверу. Це призводить до різних патернів взаємодії.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання Event Loop',
//                 code: "console.log('Start');\nsetTimeout(() => {\n  console.log('Timeout!');\n}, 0);\nconsole.log('End');",
//             },
//         ],
//     },
//     {
//         id: '104',
//         title: 'Що таке JSX?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/introducing-jsx.html',
//         },
//         img: 'https://example.com/jsx.jpg',
//         views: 480,
//         createdAt: '29.09.2023',
//         user: {
//             id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
//             username: 'claraUser',
//             firstname: 'Clara',
//             lastname: 'Santos',
//
//             email: 'claraUser@gmail.com',
//
//             avatar: 'https://example.com/avatar18.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення JSX',
//                 paragraphs: [
//                     'JSX (JavaScript XML) - це синтаксис, який дозволяє писати HTML-подібний код у JavaScript. Він використовується в React для опису вигляду інтерфейсу користувача.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Чому використовується JSX?',
//                 paragraphs: [
//                     'JSX робить код більш читабельним і простим у написанні, дозволяючи поєднувати HTML-подібний код з JavaScript. Це робить створення компонентів у React більш зручним.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад JSX',
//                 code: "const element = <h1>Hello, world!</h1>;\nReactDOM.render(element, document.getElementById('root'));",
//             },
//         ],
//     },
//     {
//         id: '105',
//         title: 'Яка роль ключів у React?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://reactjs.org/docs/lists-and-keys.html',
//         },
//         img: 'https://example.com/react_keys.jpg',
//         views: 490,
//         createdAt: '11.02.2024',
//         user: {
//             id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
//             username: 'tomAdmin',
//             firstname: 'Tom',
//             lastname: 'Anderson',
//
//             email: 'tomAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar19.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Ключі у React',
//                 paragraphs: [
//                     'Ключі - це спеціальні атрибути, які використовуються для ідентифікації елементів у списках React. Вони допомагають React відстежувати, які елементи змінюються, додаються або видаляються.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Чому важливі ключі?',
//                 paragraphs: [
//                     'Використання ключів покращує продуктивність і допомагає уникнути проблем з оновленням інтерфейсу, оскільки React може ефективніше рендерити списки.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання ключів',
//                 code: "const items = ['Apple', 'Banana', 'Cherry'];\nconst listItems = items.map((item, index) => <li key={index}>{item}</li>);\nreturn <ul>{listItems}</ul>;",
//             },
//         ],
//     },
//     {
//         id: '106',
//         title: 'Які типи даних існують у JavaScript?',
//         subtitle: {
//             text: 'Огляд основних типів даних у JavaScript.',
//         },
//         views: 520,
//         createdAt: '15.03.2024',
//         user: {
//             id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
//             username: 'lucyAdmin',
//             firstname: 'Lucy',
//             lastname: 'Brown',
//
//             email: 'lucyAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar10.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Примітивні типи даних',
//                 paragraphs: [
//                     "JavaScript має кілька примітивних типів даних, які не є об'єктами. Це:",
//                     '- **String:** Рядки тексту.',
//                     '- **Number:** Числові значення.',
//                     '- **Boolean:** Логічні значення (true/false).',
//                     '- **Undefined:** Змінна без значення.',
//                     '- **Null:** Намірене відсутність значення.',
//                     '- **Symbol:** Унікальний ідентифікатор (ES6).',
//                     '- **BigInt:** Для роботи з великими цілими числами.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: "Об'єктні типи даних",
//                 paragraphs: [
//                     "Окрім примітивних типів, JavaScript також має об'єктні типи, такі як:",
//                     "- **Object:** Загальний тип для всіх об'єктів.",
//                     '- **Array:** Масиви для зберігання списків.',
//                     "- **Function:** Функції, які є об'єктами.",
//                 ],
//             },
//         ],
//     },
//     {
//         id: '107',
//         title: 'Що таке NaN?',
//         subtitle: {
//             text: 'NaN (Not-a-Number) є спеціальним значенням у JavaScript.',
//         },
//         img: 'https://example.com/nan.jpg',
//         views: 420,
//         createdAt: '30.12.2023',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення NaN',
//                 paragraphs: [
//                     'NaN - це значення, яке вказує на те, що вираз не може бути представленим як число.',
//                     'Це часто відбувається в результаті неуспішних операцій над числами, наприклад, ділення нуля на нуль.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Перевірка NaN',
//                 paragraphs: [
//                     "Для перевірки, чи є значення NaN, використовуйте метод `isNaN()`. Важливо зазначити, що NaN не дорівнює самому собі, тому 'NaN === NaN' поверне false.",
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад NaN',
//                 code: 'console.log(NaN === NaN); // false\nconsole.log(isNaN(NaN)); // true',
//             },
//         ],
//     },
//     {
//         id: '108',
//         title: 'Яка різниця між null та undefined?',
//         subtitle: {
//             text: 'Null та undefined - це два різних типи в JavaScript.',
//         },
//         img: 'https://example.com/null_undefined.jpg',
//         views: 380,
//         createdAt: '05.12.2023',
//         user: {
//             id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
//             username: 'markUser',
//             firstname: 'Mark',
//             lastname: 'Smith',
//             email: 'markUser@gmail.com',
//             avatar: 'https://example.com/avatar6.png',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення null',
//                 paragraphs: [
//                     'Null є спеціальним значенням, яке представляє відсутність значення. Це вказує на те, що змінна існує, але не має значення.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення undefined',
//                 paragraphs: [
//                     'Undefined - це тип, який вказує на те, що змінна не була ініціалізована. Якщо змінна оголошена, але не має значення, її значення буде undefined.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основні відмінності',
//                 paragraphs: [
//                     '- **null**: явне вказівка на відсутність значення.',
//                     '- **undefined**: значення, яке автоматично присвоюється змінним, які не були ініціалізовані.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '109',
//         title: 'Чим відрізняється строга і нестрога рівність (=== та ==)?',
//         subtitle: {
//             text: 'JavaScript підтримує два типи порівняння: строгий та нестрогий.',
//         },
//         img: 'https://example.com/equality_operators.jpg',
//         views: 460,
//         createdAt: '12.01.2023',
//         user: {
//             id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
//             username: 'katyaAdmin',
//             firstname: 'Katya',
//             lastname: 'Ivanova',
//             email: 'katyaAdmin@gmail.com',
//             avatar: 'https://example.com/avatar7.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Нестора рівність (==)',
//                 paragraphs: [
//                     'Нестора рівність не враховує тип даних. Це означає, що JavaScript може привести типи до одного виду перед порівнянням.',
//                     "Наприклад, '5' == 5 поверне true.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Строга рівність (===)',
//                 paragraphs: [
//                     'Строга рівність враховує тип даних. Це означає, що якщо типи не співпадають, результат буде false.',
//                     "Наприклад, '5' === 5 поверне false.",
//                 ],
//             },
//         ],
//     },
//     {
//         id: '110',
//         title: "Чому результатом порівняння двох схожих об'єктів є false?",
//         subtitle: {
//             text: "Об'єкти у JavaScript мають посилальну природу.",
//         },
//         img: 'https://example.com/object_comparison.jpg',
//         views: 500,
//         createdAt: '19.02.2023',
//         user: {
//             id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
//             username: 'johnManager',
//             firstname: 'John',
//             lastname: 'Doe',
//             email: 'johnManager@gmail.com',
//             avatar: 'https://example.com/avatar8.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: "Порівняння об'єктів",
//                 paragraphs: [
//                     "Коли ви порівнюєте об'єкти, JavaScript порівнює не їхні значення, а посилання на об'єкти в пам'яті.",
//                     "Це означає, що навіть якщо два об'єкти мають однакові значення, вони все ще вважаються різними.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: "Приклад порівняння об'єктів",
//                 code: "const obj1 = { name: 'Alice' };\nconst obj2 = { name: 'Alice' };\nconsole.log(obj1 === obj2); // false",
//             },
//         ],
//     },
//     {
//         id: '111',
//         title: "Як перевірити 2 об'єкти на ідентичність?",
//         subtitle: {
//             text: "Перевірка ідентичності об'єктів у JavaScript.",
//         },
//         img: 'https://example.com/check_identity.jpg',
//         views: 410,
//         createdAt: '05.01.2023',
//         user: {
//             id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
//             username: 'annaUser',
//             firstname: 'Anna',
//             lastname: 'Koval',
//
//             email: 'annaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar9.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Перевірка на ідентичність',
//                 paragraphs: [
//                     "Щоб перевірити, чи два об'єкти ідентичні, ви можете використовувати методи, такі як `JSON.stringify()` для порівняння їх значень.",
//                     "Цей метод перетворює об'єкти в рядки, що дозволяє проводити їх порівняння.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад перевірки ідентичності',
//                 code: "const obj1 = { name: 'Alice' };\nconst obj2 = { name: 'Alice' };\nconst isEqual = JSON.stringify(obj1) === JSON.stringify(obj2);\nconsole.log(isEqual); // true",
//             },
//         ],
//     },
//     {
//         id: '112',
//         title: "Як зробити копію об'єкта?",
//         subtitle: {
//             text: "Методи копіювання об'єктів у JavaScript.",
//         },
//         img: 'https://example.com/copy_object.jpg',
//         views: 480,
//         createdAt: '25.03.2023',
//         user: {
//             id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
//             username: 'lucyAdmin',
//             firstname: 'Lucy',
//             lastname: 'Brown',
//
//             email: 'lucyAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar10.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: "Копіювання об'єктів",
//                 paragraphs: [
//                     "В JavaScript існує кілька способів копіювання об'єкта:",
//                     '- Використання оператора розширення: `const newObj = {...originalObj};`',
//                     '- Використання `Object.assign()`: `const newObj = Object.assign({}, originalObj);`',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: "Приклад копіювання об'єкта",
//                 code: 'const original = { a: 1, b: 2 };\nconst copy = { ...original };\nconsole.log(copy); // { a: 1, b: 2 }',
//             },
//         ],
//     },
//     {
//         id: '113',
//         title: 'Чим відрізняються змінні var, let та const?',
//         subtitle: {
//             text: 'Різниця між змінними в JavaScript.',
//         },
//         img: 'https://example.com/var_let_const.jpg',
//         views: 440,
//         createdAt: '15.02.2023',
//         user: {
//             id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
//             username: 'alexManager',
//             firstname: 'Alex',
//             lastname: 'Johnson',
//
//             email: 'alexManager@gmail.com',
//
//             avatar: 'https://example.com/avatar11.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Змінна var',
//                 paragraphs: [
//                     'Змінні, оголошені за допомогою `var`, мають функціональну область видимості. Це означає, що вони доступні в межах функції, в якій були оголошені.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Змінна let',
//                 paragraphs: [
//                     'Змінні, оголошені за допомогою `let`, мають блочну область видимості. Це означає, що вони доступні тільки в межах блоку коду, в якому були оголошені.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Змінна const',
//                 paragraphs: [
//                     'Змінні, оголошені за допомогою `const`, також мають блочну область видимості, але їх значення не можна змінювати після оголошення.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '114',
//         title: "Як дізнатися чи є об'єкт масивом?",
//         subtitle: {
//             text: "Перевірка, чи є об'єкт масивом у JavaScript.",
//         },
//         img: 'https://example.com/is_array.jpg',
//         views: 430,
//         createdAt: '22.04.2023',
//         user: {
//             id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
//             username: 'leoUser',
//             firstname: 'Leo',
//             lastname: 'Mikhailov',
//
//             email: 'leoUser@gmail.com',
//
//             avatar: 'https://example.com/avatar12.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Перевірка масиву',
//                 paragraphs: [
//                     "Для перевірки, чи є об'єкт масивом, використовуйте метод `Array.isArray()`. Це безпечний і надійний спосіб перевірки.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад перевірки масиву',
//                 code: 'const arr = [1, 2, 3];\nconsole.log(Array.isArray(arr)); // true',
//             },
//         ],
//     },
//     {
//         id: '115',
//         title: 'Які перебираючі методи масивів ви знаєте?',
//         subtitle: {
//             text: 'Методи для перебору масивів у JavaScript.',
//         },
//         img: 'https://example.com/array_methods.jpg',
//         views: 490,
//         createdAt: '05.05.2023',
//         user: {
//             id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
//             username: 'janeAdmin',
//             firstname: 'Jane',
//             lastname: 'Williams',
//
//             email: 'janeAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar13.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основні методи',
//                 paragraphs: [
//                     'У JavaScript існує кілька методів для перебору масивів:',
//                     '- `forEach()`: виконує функцію для кожного елемента масиву.',
//                     '- `map()`: створює новий масив з результатами виклику функції для кожного елемента.',
//                     '- `filter()`: створює новий масив з елементами, які проходять тест, заданий функцією.',
//                     '- `reduce()`: виконує функцію на кожному елементі масиву для зведення його до єдиного значення.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '116',
//         title: "Як об'єднати масиви?",
//         subtitle: {
//             text: "Методи об'єднання масивів у JavaScript.",
//         },
//         img: 'https://example.com/array_concat.jpg',
//         views: 460,
//         createdAt: '14.06.2023',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: "Методи об'єднання",
//                 paragraphs: [
//                     "В JavaScript ви можете об'єднувати масиви за допомогою різних методів:",
//                     '- Використання методу `concat()`: `const newArray = array1.concat(array2);`',
//                     '- Використання оператора розширення: `const newArray = [...array1, ...array2];`',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '117',
//         title: 'Як дізнатися чи знаходиться елемент у масиві?',
//         subtitle: {
//             text: 'Методи перевірки наявності елементів у масивах.',
//         },
//         img: 'https://example.com/array_includes.jpg',
//         views: 400,
//         createdAt: '18.06.2023',
//         user: {
//             id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
//             username: 'mariaUser',
//             firstname: 'Maria',
//             lastname: 'Petrova',
//
//             email: 'mariaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar15.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Перевірка наявності елемента',
//                 paragraphs: [
//                     'Для перевірки, чи містить масив певний елемент, ви можете використовувати метод `includes()`. Цей метод повертає true або false.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад перевірки наявності елемента',
//                 code: "const fruits = ['apple', 'banana', 'orange'];\nconsole.log(fruits.includes('banana')); // true",
//             },
//         ],
//     },
//     {
//         id: '118',
//         title: 'Що таке підняття (hoisting)?',
//         subtitle: {
//             text: 'Підняття є важливим аспектом в JavaScript.',
//         },
//         img: 'https://example.com/hoisting.jpg',
//         views: 470,
//         createdAt: '20.04.2023',
//         user: {
//             id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
//             username: 'maxAdmin',
//             firstname: 'Max',
//             lastname: 'Gordon',
//
//             email: 'maxAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar16.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення підняття',
//                 paragraphs: [
//                     'Підняття (hoisting) - це механізм, за допомогою якого оголошення змінних та функцій піднімаються на початок своєї області видимості під час виконання коду.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад підняття',
//                 code: 'console.log(a); // undefined\nvar a = 5;',
//             },
//         ],
//     },
//     {
//         id: '119',
//         title: 'Яким буде значення змінної var, якщо звернутися до неї до її оголошення?',
//         subtitle: {
//             text: 'Значення змінної var до оголошення.',
//         },
//         img: 'https://example.com/var_value.jpg',
//         views: 450,
//         createdAt: '01.07.2023',
//         user: {
//             id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
//             username: 'nickManager',
//             firstname: 'Nick',
//             lastname: 'Garcia',
//
//             email: 'nickManager@gmail.com',
//
//             avatar: 'https://example.com/avatar17.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Значення до оголошення',
//                 paragraphs: [
//                     'Якщо ви звертаєтеся до змінної, оголошеної за допомогою `var`, до її оголошення, ви отримаєте значення undefined.',
//                     'Це відбувається через механізм підняття.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад',
//                 code: 'console.log(a); // undefined\nvar a = 5;',
//             },
//         ],
//     },
//     {
//         id: '120',
//         title: 'Що буде, якщо звернутися до змінної let/const до її оголошення?',
//         subtitle: {
//             text: 'Значення змінних let та const до оголошення.',
//         },
//         img: 'https://example.com/let_const_value.jpg',
//         views: 420,
//         createdAt: '15.08.2023',
//         user: {
//             id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
//             username: 'claraUser',
//             firstname: 'Clara',
//             lastname: 'Santos',
//
//             email: 'claraUser@gmail.com',
//
//             avatar: 'https://example.com/avatar18.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Значення до оголошення',
//                 paragraphs: [
//                     'При зверненні до змінної, оголошеної за допомогою `let` або `const`, до її оголошення, ви отримаєте помилку ReferenceError.',
//                     'Це відбувається, оскільки ці змінні не підлягають підняттю.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад',
//                 code: "console.log(b); // ReferenceError: Cannot access 'b' before initialization\nlet b = 5;",
//             },
//         ],
//     },
//     {
//         id: '121',
//         title: 'Що таке область видимості (Scope)?',
//         subtitle: {
//             text: 'Область видимості визначає, де змінні доступні.',
//         },
//         img: 'https://example.com/scope.jpg',
//         views: 430,
//         createdAt: '12.09.2023',
//         user: {
//             id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
//             username: 'tomAdmin',
//             firstname: 'Tom',
//             lastname: 'Anderson',
//
//             email: 'tomAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar19.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення області видимості',
//                 paragraphs: [
//                     'Область видимості (Scope) визначає, де змінні доступні для використання в коді.',
//                     'JavaScript має глобальну область видимості та блочну область видимості, яка контролюється фігурними дужками.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Типи області видимості',
//                 paragraphs: [
//                     '- **Глобальна**: змінні доступні з будь-якої частини коду.',
//                     '- **Функціональна**: змінні доступні тільки в межах функції.',
//                     '- **Блочна**: змінні доступні лише в межах блоку коду (змінні, оголошені за допомогою let і const).',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '122',
//         title: 'Чим Function Declaration відрізняється від Function Expression?',
//         subtitle: {
//             text: 'Досліджуємо основні відмінності між декларацією та виразом функцій у JavaScript.',
//         },
//         views: 520,
//         createdAt: '20.03.2024',
//         user: {
//             id: 'hdkjUiQhjoPIVMqfORNbvEHm4Wg1',
//             username: 'testuser2',
//             firstname: 'Test2',
//             lastname: 'User2',
//
//             email: 'testuser2@gmail.com',
//             avatar: 'FRGDHJ',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Function Declaration',
//                 paragraphs: [
//                     "Function Declaration — це спосіб оголошення функції з використанням ключового слова `function`, за яким слідує ім'я функції та її тіло. Ось приклад:",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад Function Declaration',
//                 code: "function myFunction() {\n  console.log('Hello, World!');\n}",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Підняття (Hoisting)',
//                 paragraphs: [
//                     'Декларації функцій підлягають підняттю (hoisting), що означає, що ви можете викликати цю функцію до її фактичного оголошення в коді.',
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Function Expression',
//                 paragraphs: [
//                     "Функціональний вираз — це спосіб визначення функції, який може або не може мати ім'я. Він призначається змінній. Ось приклад:",
//                 ],
//             },
//             {
//                 id: '5',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад Function Expression',
//                 code: "const myFunction = function() {\n  console.log('Hello, World!');\n};",
//             },
//             {
//                 id: '6',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Відмінності між Function Declaration та Function Expression',
//                 paragraphs: [
//                     '- **Підняття:** Function Declarations підлягають підняттю, тоді як Function Expressions - ні.',
//                     "- **Іменування:** Function Expressions можуть бути анонімними, а Function Declarations завжди мають ім'я.",
//                     '- **Використання в контексті:** Function Expressions часто використовуються в якості колбеків або як аргументи.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '123',
//         title: 'Чим стрілочна функція відрізняється від звичайної?',
//         subtitle: {
//             text: 'Аналіз стрілочних функцій у порівнянні з традиційними функціями в JavaScript.',
//         },
//         views: 490,
//         createdAt: '15.04.2023',
//         user: {
//             id: 'meuKZ9Dc5ucUuMn72esjwMi9Azl2',
//             username: 'markUser',
//             firstname: 'Mark',
//             lastname: 'Smith',
//             email: 'markUser@gmail.com',
//             avatar: 'https://example.com/avatar6.png',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке стрілочні функції?',
//                 paragraphs: [
//                     'Стрілочні функції (Arrow Functions) - це синтаксичне скорочення для оголошення функцій, введене в ECMAScript 6.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад стрілочної функції',
//                 code: 'const add = (a, b) => a + b;',
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основні відмінності',
//                 paragraphs: [
//                     '- **Синтаксис:** Стрілочні функції мають більш компактний синтаксис.',
//                     "- **Контекст `this`:** Значення `this` у стрілочних функціях є лексичною прив'язкою.",
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклад контексту `this`',
//                 paragraphs: [
//                     "У стрілочних функціях `this` вказує на об'єкт, в якому функція була оголошена.",
//                 ],
//             },
//             {
//                 id: '5',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання `this`',
//                 code: 'function Person() {\n  this.age = 0;\n  setInterval(() => {\n    this.age++;\n    console.log(this.age);\n  }, 1000);\n}\nconst p = new Person();',
//             },
//         ],
//     },
//     {
//         id: '124',
//         title: 'Чи існує аналог arguments для стрілочної функції?',
//         subtitle: {
//             text: 'Розглянемо, як працюють аргументи в стрілочних функціях.',
//         },
//         views: 450,
//         createdAt: '25.12.2023',
//         user: {
//             id: 'tfs04ij0b5anHdw2qt6LghQsEfC3',
//             username: 'katyaAdmin',
//             firstname: 'Katya',
//             lastname: 'Ivanova',
//             email: 'katyaAdmin@gmail.com',
//             avatar: 'https://example.com/avatar7.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: "Об'єкт `arguments`",
//                 paragraphs: [
//                     "У звичайних функціях можна використовувати об'єкт `arguments` для доступу до аргументів, які були передані функції.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: "Приклад об'єкта `arguments`",
//                 code: 'function example() {\n  console.log(arguments);\n}\nexample(1, 2, 3); // [1, 2, 3]',
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Відсутність `arguments` у стрілочних функціях',
//                 paragraphs: [
//                     "Стрілочні функції не мають власного об'єкта `arguments`, тому спроба його використання призведе до помилки.",
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Використання оператора розширення',
//                 paragraphs: [
//                     'Однак можна використовувати оператор розширення (`...`) для отримання аргументів у стрілочній функції.',
//                 ],
//             },
//             {
//                 id: '5',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання оператора розширення',
//                 code: 'const example = (...args) => {\n  console.log(args);\n};\nexample(1, 2, 3); // [1, 2, 3]',
//             },
//         ],
//     },
//     {
//         id: '125',
//         title: 'Що таке лексичне оточення (Lexical Environment)?',
//         subtitle: {
//             text: 'Досліджуємо концепцію лексичного оточення у JavaScript.',
//         },
//         views: 480,
//         createdAt: '12.05.2023',
//         user: {
//             id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
//             username: 'johnManager',
//             firstname: 'John',
//             lastname: 'Doe',
//             email: 'johnManager@gmail.com',
//             avatar: 'https://example.com/avatar8.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Лексичне оточення',
//                 paragraphs: [
//                     'Лексичне оточення - це структура, яка містить всі змінні та функції, доступні у певному контексті виконання.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Структура лексичного оточення',
//                 paragraphs: [
//                     '- **Environment Record:** Зберігає всі оголошені змінні.',
//                     '- **Outer Environment Reference:** Посилається на зовнішнє лексичне оточення.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Створення лексичного оточення',
//                 paragraphs: [
//                     'Коли функція оголошується, вона створює нове лексичне оточення. Коли виконується функція, JavaScript отримує доступ до змінних у цьому оточенні.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '126',
//         title: 'Що таке замикання (Closures)?',
//         subtitle: {
//             text: 'Розуміння замикань у JavaScript.',
//         },
//         views: 500,
//         createdAt: '19.02.2024',
//         user: {
//             id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
//             username: 'annaUser',
//             firstname: 'Anna',
//             lastname: 'Koval',
//
//             email: 'annaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar9.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке замикання?',
//                 paragraphs: [
//                     'Замикання — це функція, яка зберігає доступ до свого лексичного оточення, навіть коли функція була викликана поза межами свого лексичного оточення.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад замикання',
//                 code: 'function outer() {\n  let counter = 0;\n  return function inner() {\n    counter++;\n    return counter;\n  };\n}\nconst increment = outer();\nconsole.log(increment()); // 1\nconsole.log(increment()); // 2',
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Використання замикань',
//                 paragraphs: [
//                     'Замикання дозволяє зберігати стан, навіть після завершення виконання зовнішньої функції. Це часто використовується для створення приватних змінних.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '127',
//         title: 'Для чого використовують замикання?',
//         subtitle: {
//             text: 'Досліджуємо роль замикань у JavaScript.',
//         },
//         views: 530,
//         createdAt: '28.03.2024',
//         user: {
//             id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
//             username: 'leoUser',
//             firstname: 'Leo',
//             lastname: 'Mikhailov',
//
//             email: 'leoUser@gmail.com',
//
//             avatar: 'https://example.com/avatar12.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке замикання?',
//                 paragraphs: [
//                     'Замикання - це функція, яка має доступ до своєї зовнішньої функції, навіть після завершення її виконання. Це дозволяє зберігати стан функцій і змінних, які не можуть бути доступні ззовні.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Застосування замикань',
//                 paragraphs: [
//                     'Основні причини використання замикань в JavaScript:',
//                     '- **Приватні змінні:** Замикання дозволяє створювати приватні змінні, доступні лише в контексті замикання.',
//                     '- **Зберігання стану:** Завдяки замиканням можна зберігати стани між викликами функцій.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад замикання',
//                 code: 'function makeCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\nconst counter = makeCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2',
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     'Замикання є важливим інструментом у JavaScript для створення модулів, обробки станів і управління доступом до змінних. Вони допомагають зберігати дані без ризику їх зміни ззовні.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '128',
//         title: 'Що таке IIFE?',
//         subtitle: {
//             text: 'Розглядаємо самовиконувані функції в JavaScript.',
//         },
//         views: 440,
//         createdAt: '22.02.2024',
//         user: {
//             id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
//             username: 'janeAdmin',
//             firstname: 'Jane',
//             lastname: 'Williams',
//
//             email: 'janeAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar13.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'IIFE (Immediately Invoked Function Expression)',
//                 paragraphs: [
//                     'IIFE - це функція, яка виконується негайно після її визначення. Це дозволяє створити локальне оточення для змінних, не забруднюючи глобальне оточення.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад IIFE',
//                 code: "(function() {\n  let message = 'Hello, World!';\n  console.log(message);\n})();",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Переваги IIFE',
//                 paragraphs: [
//                     '- **Ізоляція:** Змінні, оголошені в IIFE, недоступні ззовні.',
//                     '- **Запобігання конфліктам:** Використання IIFE допомагає уникнути конфліктів змінних у глобальному оточенні.',
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     'IIFE є потужним інструментом для створення модульного коду в JavaScript і забезпечує ізоляцію змінних, що допомагає уникати конфліктів.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '129',
//         title: 'Що таке this?',
//         subtitle: {
//             text: 'Розкриваємо концепцію контексту виконання в JavaScript.',
//         },
//         views: 560,
//         createdAt: '20.01.2024',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Контекст `this`',
//                 paragraphs: [
//                     "`this` - це спеціальне ключове слово, яке вказує на об'єкт, до якого функція належить в момент її виклику. Це дозволяє функціям взаємодіяти з об'єктами.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Значення `this`',
//                 paragraphs: [
//                     "- **Глобальний контекст:** У глобальному контексті `this` вказує на глобальний об'єкт (в браузері - це `window`).",
//                     "- **Методи об'єктів:** При виклику методу з об'єкта `this` вказує на об'єкт, з якого був викликаний метод.",
//                     '- **Стрілочні функції:** У стрілочних функціях `this` зберігає значення з лексичного оточення.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад контексту `this`',
//                 code: 'const obj = {\n  value: 10,\n  getValue: function() {\n    return this.value;\n  }\n};\nconsole.log(obj.getValue()); // 10',
//             },
//         ],
//     },
//     {
//         id: '130',
//         title: 'Як можна підмінити контекст виклику функції?',
//         subtitle: {
//             text: 'Методи для зміни контексту `this` в JavaScript.',
//         },
//         views: 490,
//         createdAt: '13.05.2024',
//         user: {
//             id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
//             username: 'mariaUser',
//             firstname: 'Maria',
//             lastname: 'Petrova',
//
//             email: 'mariaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar15.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Зміна контексту `this`',
//                 paragraphs: [
//                     'JavaScript надає декілька методів для підміни контексту `this` у функціях:',
//                     '- **call()**: Викликає функцію з певним значенням `this`.',
//                     '- **apply()**: Подібно до `call()`, але приймає масив аргументів.',
//                     "- **bind()**: Створює нову функцію з прив'язаним значенням `this`.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання `call()`',
//                 code: "function greet() {\n  console.log(`Hello, ${this.name}`);\n}\nconst user = { name: 'Alice' };\ngreet.call(user); // Hello, Alice",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     'Зміна контексту `this` дозволяє використовувати функції в різних контекстах і робить код більш гнучким.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '131',
//         title: 'Чи можна змінити контекст функції, яку повернув метод bind?',
//         subtitle: {
//             text: 'Аналіз використання bind у JavaScript.',
//         },
//         views: 470,
//         createdAt: '09.06.2024',
//         user: {
//             id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
//             username: 'maxAdmin',
//             firstname: 'Max',
//             lastname: 'Gordon',
//
//             email: 'maxAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar16.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Метод `bind()`',
//                 paragraphs: [
//                     "Метод `bind()` створює нову функцію з прив'язаним значенням `this` і переданими аргументами. Ця нова функція зберігає це значення `this` і не може бути змінена.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання `bind()`',
//                 code: "const obj = { name: 'Bob' };\nfunction greet() {\n  console.log(`Hello, ${this.name}`);\n}\nconst boundGreet = greet.bind(obj);\nboundGreet(); // Hello, Bob",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Зміна контексту',
//                 paragraphs: [
//                     'Контекст, заданий за допомогою `bind()`, не може бути змінений. Це одна з основних характеристик `bind()`, яка робить його корисним для створення функцій з фіксованим контекстом.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '132',
//         title: 'Чи можна підмінити контекст виклику стрілочної функції?',
//         subtitle: {
//             text: 'Особливості стрілочних функцій у JavaScript.',
//         },
//         views: 480,
//         createdAt: '30.05.2024',
//         user: {
//             id: '18zZBJnmEqWJNwGj2SvbNiNVXol1',
//             username: 'nickManager',
//             firstname: 'Nick',
//             lastname: 'Garcia',
//
//             email: 'nickManager@gmail.com',
//
//             avatar: 'https://example.com/avatar17.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Стрілочні функції',
//                 paragraphs: [
//                     'Стрілочні функції в JavaScript мають лексичне значення `this`, що означає, що `this` визначається з контексту, в якому була оголошена стрілочна функція.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Чи можна змінити `this`?',
//                 paragraphs: [
//                     'Оскільки стрілочні функції не мають свого власного `this`, змінити його не можна. Це робить їх дуже зручними для використання в колбеках, де важливо зберегти контекст.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад стрілочної функції',
//                 code: "const obj = {\n  name: 'Charlie',\n  greet: function() {\n    setTimeout(() => {\n      console.log(`Hello, ${this.name}`);\n    }, 1000);\n  }\n};\nobj.greet(); // Hello, Charlie",
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     'Стрілочні функції забезпечують зручний спосіб роботи з контекстом, особливо у випадках, коли потрібно передати функцію як колбек.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '133',
//         title: "Що таке прототип об'єкта?",
//         subtitle: {
//             text: 'Розкриваємо концепцію прототипів у JavaScript.',
//         },
//         views: 620,
//         createdAt: '10.06.2024',
//         user: {
//             id: '4g1WI5M1XIZU6VKvIfJBG7TzMsD3',
//             username: 'alexManager',
//             firstname: 'Alex',
//             lastname: 'Johnson',
//
//             email: 'alexManager@gmail.com',
//
//             avatar: 'https://example.com/avatar11.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення прототипу',
//                 paragraphs: [
//                     "Прототип об'єкта - це об'єкт, з якого інший об'єкт успадковує властивості і методи. Кожен об'єкт в JavaScript має вбудоване посилання на свій прототип, що дозволяє використовувати методи та властивості, які не визначені безпосередньо в об'єкті.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Принцип роботи',
//                 paragraphs: [
//                     "Коли ви намагаєтеся отримати доступ до властивості об'єкта, JavaScript спочатку перевіряє сам об'єкт. Якщо властивість не знайдена, він переходить до прототипу об'єкта і перевіряє його. Цей процес триває, поки не буде знайдена властивість або не буде досягнуто кінця ланцюга прототипів.",
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад прототипу',
//                 code: "function Person(name) {\n  this.name = name;\n}\n\nPerson.prototype.greet = function() {\n  console.log(`Привіт, мене звати ${this.name}`);\n};\n\nconst alice = new Person('Аліса');\nalice.greet(); // Привіт, мене звати Аліса",
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     "Прототипи в JavaScript є потужним інструментом для реалізації наслідування і розподілу методів між об'єктами, що дозволяє зменшити дублювання коду.",
//                 ],
//             },
//         ],
//     },
//     {
//         id: '134',
//         title: 'Як працює прототипне наслідування в JavaScript?',
//         subtitle: {
//             text: 'Заглиблюємось у механізм наслідування в JavaScript.',
//         },
//         views: 580,
//         createdAt: '18.07.2024',
//         user: {
//             id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
//             username: 'leoUser',
//             firstname: 'Leo',
//             lastname: 'Mikhailov',
//
//             email: 'leoUser@gmail.com',
//
//             avatar: 'https://example.com/avatar12.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Прототипне наслідування',
//                 paragraphs: [
//                     "Прототипне наслідування в JavaScript дозволяє одному об'єкту успадковувати властивості та методи іншого об'єкта. Це досягається за допомогою властивості `prototype`, яка зберігає методи і властивості, доступні для об'єктів, створених з даного прототипу.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Створення наслідування',
//                 paragraphs: [
//                     "Щоб створити об'єкт, що успадковує властивості з іншого об'єкта, використовують конструктори. Наприклад, якщо у нас є базовий об'єкт, то ми можемо створити підклас, використовуючи `Object.create()` для налаштування ланцюга прототипів.",
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад прототипного наслідування',
//                 code: "function Animal(name) {\n  this.name = name;\n}\n\nAnimal.prototype.speak = function() {\n  console.log(`${this.name} робить звук`);\n};\n\nfunction Dog(name) {\n  Animal.call(this, name);\n}\n\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.bark = function() {\n  console.log(`${this.name} гавкає`);\n};\n\nconst dog = new Dog('Рекс');\ndog.speak(); // Рекс робить звук\n dog.bark(); // Рекс гавкає",
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     "Прототипне наслідування є основним способом реалізації об'єктно-орієнтованого програмування в JavaScript, дозволяючи створювати ієрархії об'єктів і ділитися методами.",
//                 ],
//             },
//         ],
//     },
//     {
//         id: '135',
//         title: "Як створити об'єкт, у якому не буде прототипу?",
//         subtitle: {
//             text: "Методи створення об'єкта без прототипу в JavaScript.",
//         },
//         views: 410,
//         createdAt: '10.09.2024',
//         user: {
//             id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
//             username: 'janeAdmin',
//             firstname: 'Jane',
//             lastname: 'Williams',
//
//             email: 'janeAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar13.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: "Об'єкти без прототипів",
//                 paragraphs: [
//                     "Створення об'єкта без прототипу може бути досягнуто за допомогою методів `Object.create(null)`, або конструктора `Object`. Це дозволяє створити об'єкт, у якого немає звичайних властивостей та методів, які присутні в об'єктах.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: "Приклад створення об'єкта без прототипу",
//                 code: 'const objWithoutPrototype = Object.create(null);\nconsole.log(Object.getPrototypeOf(objWithoutPrototype)); // null',
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Використання без прототипів',
//                 paragraphs: [
//                     "Об'єкти без прототипів корисні для уникнення конфліктів з методами об'єкта, такими як `toString()`, що може бути важливо в ситуаціях, де ви не хочете, щоб об'єкт мав доступ до цих методів.",
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     "Створення об'єктів без прототипів може бути корисним у певних сценаріях, де потрібно мати повний контроль над властивостями об'єкта.",
//                 ],
//             },
//         ],
//     },
//     {
//         id: '136',
//         title: "Як перевірити, чи є властивість об'єкта особистою властивістю або це властивість прототипу?",
//         subtitle: {
//             text: 'Методи для перевірки властивостей в JavaScript.',
//         },
//         views: 450,
//         createdAt: '25.07.2024',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Особисті властивості vs. властивості прототипу',
//                 paragraphs: [
//                     "В JavaScript є два типи властивостей: особисті (власні) властивості, які безпосередньо належать об'єкту, та властивості, що успадковуються від прототипу.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Методи перевірки',
//                 paragraphs: [
//                     "- **hasOwnProperty()**: Метод, який перевіряє, чи є властивість особистою властивістю об'єкта.",
//                     "- **in оператор**: Використовується для перевірки, чи є властивість у об'єкті (включаючи прототипи).",
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад перевірки властивостей',
//                 code: "const obj = {\n  ownProp: 'Я власна властивість'\n};\n\nconsole.log(obj.hasOwnProperty('ownProp')); // true\nconsole.log('ownProp' in obj); // true\nconsole.log(obj.hasOwnProperty('toString')); // false\nconsole.log('toString' in obj); // true",
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     'Розуміння, які властивості є особистими, а які - з прототипу, є важливим для ефективного програмування в JavaScript.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '137',
//         title: "Як заборонити змінювати об'єкт?",
//         subtitle: {
//             text: "Методи захисту об'єктів у JavaScript.",
//         },
//         views: 480,
//         createdAt: '30.09.2024',
//         user: {
//             id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
//             username: 'mariaUser',
//             firstname: 'Maria',
//             lastname: 'Petrova',
//
//             email: 'mariaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar15.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: "Захист об'єктів",
//                 paragraphs: [
//                     "JavaScript надає кілька способів заборонити змінювати об'єкти, щоб забезпечити цілісність даних. Найбільш поширеним методом є використання `Object.freeze()`, який робить об'єкт незмінним.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання Object.freeze()',
//                 code: "const obj = {\n  prop: 'Змінна'\n};\nObject.freeze(obj);\nobj.prop = 'Не змінюється';\nconsole.log(obj.prop); // 'Змінна'",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Інші методи',
//                 paragraphs: [
//                     "Крім `Object.freeze()`, також можна використовувати `Object.seal()`, щоб заборонити додавання нових властивостей, або `Object.preventExtensions()`, щоб заборонити розширення об'єкта.",
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     "Забезпечення цілісності об'єктів є важливою практикою в JavaScript, і правильне використання цих методів може допомогти уникнути небажаних змін.",
//                 ],
//             },
//         ],
//     },
//     {
//         id: '138',
//         title: "Що таке дескриптори властивостей об'єкта?",
//         subtitle: {
//             text: 'Розуміння дескрипторів властивостей у JavaScript.',
//         },
//         views: 500,
//         createdAt: '12.09.2024',
//         user: {
//             id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
//             username: 'maxAdmin',
//             firstname: 'Max',
//             lastname: 'Gordon',
//
//             email: 'maxAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar16.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Дескриптори властивостей',
//                 paragraphs: [
//                     "Дескриптори властивостей в JavaScript - це об'єкти, що описують властивості, включаючи такі аспекти, як можливість запису, можливість перерахунку та можливість конфігурації. Існує два типи дескрипторів: 'data descriptor' та 'accessor descriptor'.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Типи дескрипторів',
//                 paragraphs: [
//                     '- **Data Descriptor**: містить значення властивості та інформацію про можливість запису (writable) та перерахунку (enumerable).',
//                     '- **Accessor Descriptor**: визначає геттери і сеттери, що дозволяє обробляти доступ до значення властивості.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад дескриптора властивостей',
//                 code: "const obj = {};\nObject.defineProperty(obj, 'prop', {\n  value: 42,\n  writable: false,\n  enumerable: true,\n  configurable: false\n});\n\nconsole.log(obj.prop); // 42\nobj.prop = 100; // Не буде змінено\nconsole.log(obj.prop); // 42",
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     "Розуміння дескрипторів властивостей дозволяє програмістам управляти доступом до властивостей об'єктів у JavaScript, що може бути важливим для підтримки цілісності даних.",
//                 ],
//             },
//         ],
//     },
//     {
//         id: '139',
//         title: 'Чим відрізняється функція конструктор та клас?',
//         subtitle: {
//             text: 'Розгляд основних відмінностей між функціями-конструкторами та класами в JavaScript.',
//         },
//         views: 540,
//         createdAt: '10.07.2024',
//         user: {
//             id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
//             username: 'claraUser',
//             firstname: 'Clara',
//             lastname: 'Santos',
//
//             email: 'claraUser@gmail.com',
//
//             avatar: 'https://example.com/avatar18.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Функція конструктор',
//                 paragraphs: [
//                     "Функція конструктор - це звичайна функція, яка використовується для створення об'єктів. Вона викликається з оператором `new`, і під час її виконання автоматично створюється новий об'єкт, а `this` посилається на нього.",
//                     'Приклад функції конструктора:',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад функції конструктора',
//                 code: "function Car(brand, model) {\n  this.brand = brand;\n  this.model = model;\n}\n\nconst myCar = new Car('Toyota', 'Camry');",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Класи в JavaScript',
//                 paragraphs: [
//                     "Класи в JavaScript, введені в ES6, є синтаксичним цукром над функціями конструкторами. Вони забезпечують більш зрозумілий і чистий спосіб створення об'єктів і визначення методів. Класи також підтримують наслідування через `extends`.",
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад класу',
//                 code: "class Car {\n  constructor(brand, model) {\n    this.brand = brand;\n    this.model = model;\n  }\n}\n\nconst myCar = new Car('Toyota', 'Camry');",
//             },
//             {
//                 id: '5',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основні відмінності',
//                 paragraphs: [
//                     '1. Синтаксис: Класи мають чистіший синтаксис, що полегшує їх читання та використання.\n2. Наслідування: Класи підтримують простіше наслідування через `extends`.\n3. Методи: У класах методи можна визначати безпосередньо в тілі класу, що робить їх доступними для всіх екземплярів.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '140',
//         title: 'Що потрібно зробити, щоб метод класу потрапив до його екземпляра?',
//         subtitle: {
//             text: 'Обговорення способів забезпечення доступу до методів класу через екземпляри.',
//         },
//         views: 460,
//         createdAt: '14.08.2024',
//         user: {
//             id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
//             username: 'tomAdmin',
//             firstname: 'Tom',
//             lastname: 'Anderson',
//
//             email: 'tomAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar19.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Методи класу',
//                 paragraphs: [
//                     'Методи, визначені в класі, автоматично доступні для всіх екземплярів цього класу. Щоб методи класу потрапили до його екземпляра, потрібно їх просто визначити в класі.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад методу класу',
//                 code: "class Person {\n  constructor(name) {\n    this.name = name;\n  }\n\n  greet() {\n    console.log(`Привіт, мене звати ${this.name}`);\n  }\n}\n\nconst john = new Person('Джон');\njohn.greet(); // Привіт, мене звати Джон",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Методи статичні',
//                 paragraphs: [
//                     'Якщо вам потрібно, щоб методи не були доступні для екземплярів, а лише на класовому рівні, ви можете визначити статичні методи за допомогою ключового слова `static`.',
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад статичного методу',
//                 code: 'class MathUtil {\n  static add(a, b) {\n    return a + b;\n  }\n}\n\nconsole.log(MathUtil.add(5, 10)); // 15',
//             },
//             {
//                 id: '5',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     'Методи класу стають частиною всіх його екземплярів, якщо їх просто визначити в класі. Статичні методи, навпаки, доступні лише на рівні класу.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '141',
//         title: 'Чи є в JavaScript множинне наслідування?',
//         subtitle: {
//             text: 'Розгляд механізмів наслідування в JavaScript.',
//         },
//         views: 520,
//         createdAt: '29.09.2024',
//         user: {
//             id: 'qkcVyIbnjYeEbaYVKGhtZrny7GC3',
//             username: 'sarahManager',
//             firstname: 'Sarah',
//             lastname: 'Cooper',
//
//             email: 'sarahManager@gmail.com',
//
//             avatar: 'https://example.com/avatar20.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Множинне наслідування',
//                 paragraphs: [
//                     'У JavaScript немає прямої підтримки множинного наслідування, тобто неможливо успадкувати від кількох класів одночасно. Проте, можна реалізувати схожі концепції за допомогою композиції або змішування (mixins).',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Композиція',
//                 paragraphs: [
//                     "Композиція полягає у використанні об'єктів, які вже мають необхідні методи та властивості, без безпосереднього наслідування. Це дозволяє комбінувати функціональність з різних класів.",
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад композиції',
//                 code: "function canEat() {\n  return 'Я можу їсти';\n}\n\nfunction canWalk() {\n  return 'Я можу йти';\n}\n\nconst animal = {\n  eat: canEat,\n  walk: canWalk\n};\n\nconsole.log(animal.eat()); // Я можу їсти\nconsole.log(animal.walk()); // Я можу йти",
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Змішування (Mixins)',
//                 paragraphs: [
//                     "Змішування - це підхід, який дозволяє включати методи з одного об'єкта в інший. Цей метод також може бути використаний для досягнення подібного до множинного наслідування.",
//                 ],
//             },
//             {
//                 id: '5',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад змішування',
//                 code: "const mixin = {\n  swim() {\n    console.log('Я плаваю');\n  }\n};\n\nclass Fish {\n  constructor(name) {\n    this.name = name;\n  }\n}\n\nObject.assign(Fish.prototype, mixin);\n\nconst salmon = new Fish('Лосось');\nsalmon.swim(); // Я плаваю",
//             },
//             {
//                 id: '6',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     'Хоча JavaScript не підтримує множинне наслідування безпосередньо, існують альтернативні методи, такі як композиція та змішування, які дозволяють досягти подібних результатів.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '143',
//         title: 'Що таке Promise?',
//         subtitle: {
//             text: 'Основи Promises в JavaScript',
//         },
//         views: 1020,
//         createdAt: '01.10.2024',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення Promise',
//                 paragraphs: [
//                     "Promise (обіцянка) — це об'єкт, який представляє асинхронну операцію та її результат. Promise може мати три стани: очікування (pending), виконано (fulfilled), або відхилено (rejected).",
//                     "Об'єкт Promise дозволяє зручно управляти асинхронним кодом і обробляти результати виконання, зменшуючи ймовірність виникнення помилок.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад створення Promise',
//                 code: "const myPromise = new Promise((resolve, reject) => {\n  const success = true;\n  if (success) {\n    resolve('Успішне виконання!');\n  } else {\n    reject('Помилка виконання.');\n  }\n});\n\nmyPromise\n  .then(result => console.log(result))\n  .catch(error => console.error(error));",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Стан обіцянки',
//                 paragraphs: [
//                     "Promise спочатку знаходиться в стані 'pending'. Коли асинхронна операція завершується успішно, вона переходить у стан 'fulfilled', або, якщо сталася помилка, у стан 'rejected'.",
//                     'Цей механізм допомагає зручніше працювати з асинхронним кодом, дозволяючи використовувати методи `then` та `catch` для обробки результатів.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '144',
//         title: 'Які переваги проміси мають над колбеками?',
//         subtitle: {
//             text: 'Переваги використання Promises',
//         },
//         views: 850,
//         createdAt: '11.10.2024',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Чому варто використовувати Promises?',
//                 paragraphs: [
//                     '1. **Читабельність**: Код із використанням Promises виглядає більш структурованим та зрозумілим завдяки методам `then` і `catch`.',
//                     '2. **Обробка помилок**: Використання `catch` дозволяє централізовано обробляти помилки, що знижує ймовірність пропуску помилок.',
//                     '3. **Уникнення callback hell**: Promises дозволяють уникнути вкладених колбеків, які ускладнюють читання та підтримку коду.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад промісів в дії',
//                 code: "function getData() {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      resolve('Дані отримані!');\n    }, 2000);\n  });\n}\n\ngetData()\n  .then(data => console.log(data))\n  .catch(error => console.error(error));",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Порівняння з колбеками',
//                 paragraphs: [
//                     "У колбек-орієнтованому коді може виникнути так звана 'callback hell', що ускладнює читання та підтримку коду. Promises дозволяють уникнути цього за рахунок використання ланцюжків викликів, що підвищує зручність роботи.",
//                 ],
//             },
//         ],
//     },
//     {
//         id: '145',
//         title: 'Що таке callback hell?',
//         subtitle: {
//             text: 'Проблеми колбеків у JavaScript',
//         },
//         views: 600,
//         createdAt: '30.11.2024',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення callback hell',
//                 paragraphs: [
//                     'Callback hell - це термін, що описує ситуацію, коли колбеки вкладені один в один, що призводить до важкочитного та незручного коду.',
//                     'Це часто трапляється, коли виконуються кілька асинхронних операцій, що залежать одна від одної.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад callback hell',
//                 code: "doSomething(function(result) {\n  doSomethingElse(result, function(newResult) {\n    doThirdThing(newResult, function(finalResult) {\n      console.log('Результат:', finalResult);\n    });\n  });\n});",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Вирішення проблеми',
//                 paragraphs: [
//                     'Використання Promises є одним з найкращих способів уникнути callback hell, оскільки дозволяє використовувати ланцюги методів `then` і `catch`, що робить код більш чистим і зрозумілим.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '146',
//         title: 'Для чого потрібен метод Promise.all?',
//         subtitle: {
//             text: 'Обробка декількох Promise одночасно',
//         },
//         views: 720,
//         createdAt: '05.12.2024',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Опис методу Promise.all',
//                 paragraphs: [
//                     "Метод `Promise.all()` приймає масив Promises і повертає новий Promise, який виконується, коли всі об'єкти у масиві завершилися. Якщо будь-який з Promises відхиляється, Promise.all також відхиляється.",
//                     'Цей метод корисний для паралельного виконання декількох асинхронних операцій.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад Promise.all',
//                 code: "const promise1 = Promise.resolve(3);\nconst promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'Два'));\nconst promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'Три'));\n\nPromise.all([promise1, promise2, promise3])\n  .then(values => {\n    console.log(values); // [3, 'Два', 'Три']\n  });",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Застосування',
//                 paragraphs: [
//                     'Promise.all особливо корисний, коли необхідно виконати кілька незалежних асинхронних запитів, а далі обробити результати після завершення всіх запитів.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '147',
//         title: 'Для чого потрібен метод Promise.race?',
//         subtitle: {
//             text: 'Обробка перших завершених Promise',
//         },
//         views: 680,
//         createdAt: '15.10.2024',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Опис методу Promise.race',
//                 paragraphs: [
//                     "Метод `Promise.race()` приймає масив Promises і повертає новий Promise, який виконується або відхиляється, залежно від того, який з об'єктів завершується першим.",
//                     'Цей метод дозволяє обробляти ситуації, коли важливо знати, яка асинхронна операція завершилась першою.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад Promise.race',
//                 code: "const promise1 = new Promise((resolve) => setTimeout(resolve, 500, 'Перше!'));\nconst promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'Друге!'));\n\nPromise.race([promise1, promise2])\n  .then(result => {\n    console.log(result); // 'Друге!'\n  });",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Застосування',
//                 paragraphs: [
//                     'Promise.race корисний для виконання асинхронних запитів, де потрібно дізнатися результат першої завершеної операції, що може бути корисним у випадках, коли необхідно використовувати швидші результати.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '148',
//         title: 'Для чого потрібна async/await функція?',
//         subtitle: {
//             text: 'Робота з асинхронним кодом у JavaScript',
//         },
//         views: 900,
//         createdAt: '20.12.2024',
//         user: {
//             id: 'd6RJwaIJmjbHTV2PdSg04DpPjWl1',
//             username: 'johnManager',
//             firstname: 'John',
//             lastname: 'Doe',
//             email: 'johnManager@gmail.com',
//             avatar: 'https://example.com/avatar8.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення async/await',
//                 paragraphs: [
//                     'async/await — це синтаксичний цукор для роботи з обіцянками (Promises) в JavaScript. Вони дозволяють писати асинхронний код, який виглядає і поводиться як синхронний.',
//                     'Функція, позначена ключовим словом `async`, завжди повертає обіцянку. А ключове слово `await` можна використовувати тільки всередині `async` функцій для затримки виконання до завершення промісу.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання async/await',
//                 code: "async function fetchData() {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error('Помилка:', error);\n  }\n}\n\nfetchData();",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Переваги використання async/await',
//                 paragraphs: [
//                     '1. **Читабельність**: Код стає зрозумілішим та легшим для читання.',
//                     '2. **Обробка помилок**: Використання `try/catch` для обробки помилок робить код більш елегантним.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '149',
//         title: 'Як обробляти помилки в async/await функції?',
//         subtitle: {
//             text: 'Стратегії обробки помилок',
//         },
//         views: 720,
//         createdAt: '31.12.2024',
//         user: {
//             id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
//             username: 'annaUser',
//             firstname: 'Anna',
//             lastname: 'Koval',
//
//             email: 'annaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar9.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Обробка помилок',
//                 paragraphs: [
//                     'Обробка помилок у `async/await` функціях здійснюється за допомогою стандартного механізму `try/catch`. Це дозволяє виявляти помилки, які виникають під час виконання асинхронних операцій.',
//                     'Якщо проміс буде відхилено, управління передається до блоку `catch`, де можна обробити помилку.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад обробки помилок',
//                 code: "async function fetchData() {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    if (!response.ok) throw new Error('Мережна помилка!');\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error('Помилка:', error.message);\n  }\n}\n\nfetchData();",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Рекомендації',
//                 paragraphs: [
//                     'При обробці помилок у `async/await` функціях важливо обробляти різні типи помилок, включаючи мережеві проблеми, помилки парсингу даних тощо.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '150',
//         title: 'Що таке event loop?',
//         subtitle: {
//             text: 'Основи циклу подій у JavaScript',
//         },
//         views: 850,
//         createdAt: '25.10.2024',
//         user: {
//             id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
//             username: 'lucyAdmin',
//             firstname: 'Lucy',
//             lastname: 'Brown',
//
//             email: 'lucyAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar10.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення event loop',
//                 paragraphs: [
//                     'Event loop (цикл подій) — це механізм, який дозволяє JavaScript виконувати асинхронні операції, не блокуючи основний потік виконання.',
//                     'JavaScript виконує код в однопоточному середовищі, тому event loop забезпечує обробку асинхронних завдань, таких як запити до сервера, введення користувача тощо.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/event-loop-diagram.png',
//                 title: 'Схема циклу подій',
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Як працює event loop',
//                 paragraphs: [
//                     '1. **Стек викликів**: JavaScript виконує функції в стеку викликів.',
//                     '2. **Черга подій**: Коли асинхронна операція завершується, її колбек додається в чергу подій.',
//                     '3. **Цикл**: Event loop перевіряє, чи є в стеку викликів, і якщо він порожній, то бере функцію з черги подій та виконує її.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '151',
//         title: 'Що таке use strict?',
//         subtitle: {
//             text: 'Режим суворого дотримання правил у JavaScript',
//         },
//         views: 600,
//         createdAt: '12.12.2024',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Опис use strict',
//                 paragraphs: [
//                     "`'use strict';` — це директива, яка дозволяє увімкнути суворий режим в JavaScript. Цей режим допомагає уникнути ряду помилок та забезпечує кращу продуктивність.",
//                     'Суворий режим запобігає використанню небезпечних функцій і веде до більшого контролю за написанням коду.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання use strict',
//                 code: "'use strict';\n\nfunction myFunction() {\n  undeclaredVariable = 5; // Помилка: undeclaredVariable не оголошена\n}\n\nmyFunction();",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Переваги',
//                 paragraphs: [
//                     '1. **Помилки**: Директива допомагає виявляти помилки на ранніх стадіях.',
//                     '2. **Безпека**: Використання суворого режиму запобігає небезпечному поведінці коду.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '152',
//         title: 'Що таке ООП у Javascript?',
//         subtitle: {
//             text: "Об'єктно-орієнтоване програмування в JavaScript",
//         },
//         views: 720,
//         createdAt: '23.11.2024',
//         user: {
//             id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
//             username: 'leoUser',
//             firstname: 'Leo',
//             lastname: 'Mikhailov',
//
//             email: 'leoUser@gmail.com',
//
//             avatar: 'https://example.com/avatar12.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення ООП',
//                 paragraphs: [
//                     "Об'єктно-орієнтоване програмування (ООП) — це парадигма програмування, яка базується на концепції об'єктів. У JavaScript об'єкти є основними одиницями даних.",
//                     'ООП дозволяє структурувати код, забезпечуючи повторне використання, абстракцію та інкапсуляцію.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: "Створення об'єктів",
//                 code: "class Car {\n  constructor(brand) {\n    this.brand = brand;\n  }\n  display() {\n    console.log(`Машина: ${this.brand}`);\n  }\n}\n\nconst myCar = new Car('Toyota');\nmyCar.display();",
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основні принципи ООП',
//                 paragraphs: [
//                     "1. **Інкапсуляція**: Приховування даних об'єкта.",
//                     '2. **Спадкування**: Можливість створення нових класів на базі існуючих.',
//                     "3. **Поліморфізм**: Використання одного інтерфейсу для роботи з різними об'єктами.",
//                 ],
//             },
//         ],
//     },
//     {
//         id: '153',
//         title: 'Що таке DOM?',
//         subtitle: {
//             text: "Модель об'єкта документа в JavaScript",
//         },
//         views: 800,
//         createdAt: '20.11.2024',
//         user: {
//             id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
//             username: 'janeAdmin',
//             firstname: 'Jane',
//             lastname: 'Williams',
//
//             email: 'janeAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar13.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення DOM',
//                 paragraphs: [
//                     "DOM (Document Object Model) — це об'єктна модель документа, яка представляє структуру HTML або XML документу у вигляді дерева об'єктів.",
//                     'DOM дозволяє програмістам взаємодіяти з документами, змінювати їх структуру, стиль та вміст за допомогою JavaScript.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://example.com/dom-structure.png',
//                 title: 'Структура DOM',
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Взаємодія з DOM',
//                 paragraphs: [
//                     'JavaScript може змінювати DOM, що дозволяє динамічно оновлювати контент на веб-сторінках. Це можливо завдяки методам, таким як `getElementById`, `querySelector`, `appendChild` та інші.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '154',
//         title: 'Що таке рекурсія?',
//         subtitle: {
//             text: 'Основи рекурсивного програмування в JavaScript',
//         },
//         views: 750,
//         createdAt: '12.10.2024',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення рекурсії',
//                 paragraphs: [
//                     "Рекурсія — це метод програмування, при якому функція викликає сама себе для розв'язання задачі.",
//                     'Рекурсивні функції зазвичай мають базовий випадок, який зупиняє рекурсію, і рекурсивний випадок, який викликає саму функцію.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад рекурсії',
//                 code: 'function factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}\n\nconsole.log(factorial(5)); // 120',
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Коли використовувати рекурсію',
//                 paragraphs: [
//                     'Рекурсія часто використовується для обходу деревоподібних структур даних, таких як файли або DOM, а також для алгоритмів, таких як сортування.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '155',
//         title: 'Багатопотоковість (паралелізм) та асинхронність у JavaScript це одне й те саме?',
//         subtitle: {
//             text: 'Розрізнення асинхронності та паралелізму',
//         },
//         views: 680,
//         createdAt: '22.11.2024',
//         user: {
//             id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
//             username: 'mariaUser',
//             firstname: 'Maria',
//             lastname: 'Petrova',
//
//             email: 'mariaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar15.jpg',
//         },
//         category: [ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Визначення термінів',
//                 paragraphs: [
//                     'Асинхронність і паралелізм — це різні концепції програмування.',
//                     'Асинхронність дозволяє виконувати код, не чекаючи завершення попереднього, тоді як паралелізм передбачає одночасне виконання кількох потоків.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклади',
//                 paragraphs: [
//                     '1. **Асинхронність**: Використання `setTimeout` для затримки виконання функції.',
//                     '2. **Паралелізм**: Використання веб-воркерів для виконання коду у фоновому режимі.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     'Хоча обидві концепції стосуються виконання коду, асинхронність фокусується на не блокуючих операціях, а паралелізм — на одночасному виконанні.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '156',
//         title: 'Що таке рекурсія в JavaScript?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://it-blog.in.ua/shcho-take-rekursiya-v-javascript/',
//         },
//         img: 'https://it-blog.in.ua/wp-content/uploads/rekursiya-v-javascript.jpg',
//         views: 878,
//         createdAt: '17.06.2023',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//         category: [ArticleCategory.IT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'В JavaScript рекурсія – це процес, коли функція викликає саму себе. Коли функція викликається рекурсивно, вона робить це з новими аргументами, щоб розв’язати меншу версію задачі.',
//                     'Один з класичних прикладів рекурсії – це обчислення факторіала числа. Факторіал числа n (позначається n!) визначається як добуток всіх натуральних чисел від 1 до n. Ось приклад рекурсивної функції для обчислення факторіала:',
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'function factorial(n) {\n  if (n === 0) {\n    return 1;\n  } else {\n    return n * factorial(n - 1);\n  }\n}\n\nconsole.log(factorial(5)); // Виведе: 120',
//             },
//             {
//                 id: '5',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'У цьому прикладі функція factorial викликає саму себе з аргументом n - 1, доки n не стане рівним 0. Рекурсивний виклик дозволяє розкласти велику задачу (обчислення факторіала числа n) на менші задачі (обчислення факторіала числа n - 1), що допомагає досягти розв’язку.',
//                     'Інший приклад рекурсії – це обхід дерева. Припустимо, що ми маємо структуру дерева, де кожен вузол може мати декілька дочірніх вузлів. Ось приклад функції, яка рекурсивно обходить всі вузли дерева:',
//                 ],
//             },
//             {
//                 id: '6',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'function traverseTree(node) {\n  console.log(node.value);\n\n  if (node.left) {\n    traverseTree(node.left);\n  }\n\n  if (node.right) {\n    traverseTree(node.right);\n  }\n}\n\n// Приклад використання:\nvar tree = {\n  value: 1,\n  left: {\n    value: 2,\n    left: null,\n    right: null\n  },\n  right: {\n    value: 3,\n    left: {\n      value: 4,\n      left: null,\n      right: null\n    },\n    right: null\n  }\n};\n\ntraverseTree(tree);',
//             },
//             {
//                 id: '7',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'У цьому прикладі функція traverseTree виводить значення поточного вузла, а потім рекурсивно викликає себе для кожного дочірнього вузла. Цей процес триває до тих пір, поки не будуть оброблені всі вузли дерева.',
//                     'Рекурсія може бути потужним інструментом в програмуванні, але важливо дбати про базовий випадок (який вказує, коли рекурсивні виклики повинні припинитись) та обмеження стеку викликів, щоб уникнути переповнення стеку.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '157',
//         title: 'Принципи програмування в JavaScript: KISS, DRY, YAGNI',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://blog.ohyr.dev/kiss-yagni-dry',
//         },
//         img: 'https://img3.teletype.in/files/25/4c/254ca56d-599c-43a4-85d6-3fbf0e23d2ee.jpeg',
//         views: 501,
//         createdAt: '05.08.2023',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//         category: [ArticleCategory.IT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'У світі програмування існує кілька ключових принципів, які допомагають створювати більш читабельний, ефективний та підтримуваний код. Давайте розглянемо деякі з них із прикладами на мові програмування JavaScript.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'KISS (Keep It Simple, Stupid) or (Keep it Short and Simple)',
//                 paragraphs: [
//                     'Принцип KISS стверджує, що системи мають бути максимально простими і зрозумілими. Це дозволяє зменшити кількість помилок і полегшити підтримку коду.',
//                     'Не треба для якоїсь маленької фічі додавати у проект цілу велику бібліотеку. Надзвичайно розповсюджено зараз, особливо на фронті - як-от з бібліотекою moment.js. Нам треба одну дату в проекті відформатувати, а ми додаємо цілу бібліотеку, тим самим додаючи цілу одну залежність, збільшуючи розмір бандлу, збільшуючи кількість потенційних вразливостей у проекті і так далі.',
//                     'Не варто перевантажувати інтерфейс - надмірно розбивати один метод на купу інших, виносити певний хардкод в конфігураційні файли, додавати можливість налаштування чомусь простому...\nПриклад. Є у нас бекенд, який запускається на строго визначеному порті (ну максимум додали можливість задавати порт у конфіг-файлі). І ми такі "ну блін, це ж не зовсім зручно, давайте напишемо логіку для автоматичного знаходження першого вільного порта і будемо біндитись туди, це ж краще". Ну зробили так. А потім адміни голову ламають, як наш бекенд порт вибирає собі, мають налаштовувати фаєрвол для всіх портів одразу і т.д. По-перше, не варто було так робити - треба було по-простому - конфіг файл і все. По-друге, якби клієнту знадобився такий автовибір порту, він би сам цю логіку на своїй стороні написав.',
//                     'Не потрібно оптимізовувати проект, економлячи кілька наносекунд. Швидш за все, ця оптимізація зробить з коду кашу, і він точно не буде short and simple. До цього ж відноситься і реалізація астрономічної точності математичних розрахунків на неастрономічних проектах.',
//                     'Що більше стрічок коду у проекті, то більше в ньому потенційних багів, тому що кількість багів у проекті прямо пропорційна кількості стрічок коду.',
//                     'Насправді, кожен початківець стикається з результатом "невиконання" цього принципу тоді, коли начитавшись розумної літератури, починає новий проект. Стільки всяких ідей крутиться в голові, треба ж зробити так, щоб у майбутньому було простіше розширяти проект, треба продумати всі моменти... Так, якщо цього не зробити, то у вас вийде Фейсбук, технічний борг у якому хрін випилиш. Але якщо упоротись - ви проект так і не закінчите. Тому варто шукати золоту середину.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: "DRY (Don't Repeat Yourself)",
//                 paragraphs: [
//                     'Принцип DRY закликає до уникання дублювання коду шляхом використання функцій, класів або інших абстракцій.',
//                     'Принцип був сформований у відомій книзі "Програміст-прагматик" Ендрю Ханта і Дейва Томаса. Насправді, цей принцип не стільки про дублювання коду (бо про це і так каже майже будь-який інший принцип), скільки про єдине джерело даних (Single Source of Truth).',
//                     'Будь-яка інформація повинна мати єдине, однозначне і авторитетне представлення в системі.',
//                     'Безліч разів бачив, що дані в додатку дублюються просто для того, щоб було "простіше працювати", типу дані однакові, але зберігаються в різних форматах. Я теж коли писав свої проекти, думав: "блін, нашо мені кожен раз конвертувати цю стрічку в мій формат, якщо можна просто в таблиці поруч нове поле зробити і туди це все класти". Насправді, нове поле поруч з оригінальним - це ще не страшно, бо його видно. А ось коли у нас одні і ті самі дані в різних таблицях - це вже страшно. Та, насправді, навіть коли вони поруч, дуже просто забути продублювати операції для роботи з ними. У будь-якому разі, рано чи пізно ці дані розсинхронізуються, і стане погано.',
//                     'Так, принцип також застосовують до коду, але я хотів би тут перерахувати ті виключення, при яких цей принцип можна і треба не виконувати.',
//                     'Ну ось наприклад ви пишете фронт і бек - валідація. Її просто обовʼязково дублювати, це загальновідоме правило і без цього ніяк не можна, бо інакше ви або змушуєте клієнт і сервер страждати від величезної кількості запитів (якщо валідувати тільки на бекенді), або ж порушуєте найпростіші принципи компʼютерної безпеки (валідуючи лише на фронті).',
//                     'Також як чудовий приклад виключення з принципу DRY можна назвати компʼютерні ігри. Зазвичай у онлайн-іграх деякий код дублюють і на клієнті, і на сервері, заради оптимізації. Адже без такої оптимізації навіть гравці з відносно непоганим пінгом бачили б слайдшоу замість плавного руху персонажів, до прикладу (ну типу клієнт сам обраховує приблизні вектори руху персонажів і рухає їх, поки достовірна інформація йде з сервера, і виходить імітація відсутності затримок).',
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: "// Приклад DRY:\nlet usernames = ['Alice', 'Bob', 'Charlie'];\n\n// Повторення коду:\nfor (let i = 0; i < usernames.length; i++) {\n  console.log(`Hello, ${usernames[i]}!`);\n}\n\n// Покращений варіант:\nfunction greetUser(username) {\n  console.log(`Hello, ${username}!`);\n}\n\nusernames.forEach(greetUser);\n",
//             },
//             {
//                 id: '5',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'Тут ми замінили повторюваний цикл на виклик функції greetUser, що робить код більш читабельним та підтримуваним.',
//                 ],
//             },
//             {
//                 id: '6',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: "YAGNI (You Aren't Gonna Need It)",
//                 paragraphs: [
//                     'Принцип YAGNI попереджає про створення функціональності, яка вам наразі не потрібна. Це дозволяє уникнути зайвого коду та складнощі в майбутньому.',
//                     'Можливості, які не описані у вимогах системи, не повинні бути реалізовані.',
//                     'Тобто коли пишемо код, треба бути впевненими, що цей код обовʼязково нам знадобиться. Якщо думаємо - що код знадобиться пізніше - негайно припиняємо. Якщо ж займаємось рефакторингом - не варто боятись видаляти сутності, що не використовуються - раніше були часи, коли ці сутності були потрібні, тепер ці часи минули.',
//                     'Ну і знову ж, поговоримо про реальні приклади і застосування цього принципу.',
//                     '1.\tЗамовник не має оплачувати те, чого він не замовляв. Навіть якщо ви думаєте, що якась штука буде йому корисною, він має про це знати ще до того, як ви почнете її писати, бо, повірте, у майбутньому це гарантовано вилізе боком.',
//                     '2.\tПоговоримо про вилізе боком з попереднього пункту. Ну от ви написали якусь додаткову логіку на майбутнє. Потім замовник вам дає завдання написати нову фічу, і ви такі: блін, вона ж повністю протиречить тій додатковій логіці, що я написав раніше.... І це ще ок, ви просто видалите її. Але ж може бути, що ви написали новий модуль типу на майбутнє, і вже використали його десь. Так тепер вам ще і попереднє все переписувати, перетестовувати і так далі.',
//                     '3.\tНаписавши нову штуку, на вас лягає зобовʼязання її підтримувати: писати тести, документацію, підганяти конфігурацію і слідкувати за помилками, пояснювати юзерам, як вашою штукою користуватись, і так далі. Воно вам треба?',
//                     '4.\tЯкщо проект fixed-price, а ви додали якусь нову штуку, якої не було в ТЗ, замовник з легкістю може почати вами маніпулювати: "ой, а ви ось це зробили, але воно взагалі не так повинно працювати, допишіть будь ласка". Таким чином, ви додали роботи, тобто витратили гроші вашої компанії, і цілком можливо навіть вивели її в мінус, тому варто чекати небажаних гостей.',
//                 ],
//             },
//             {
//                 id: '8',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     'Використання цих принципів дозволяє створювати більш ефективний, читабельний та підтримуваний код у JavaScript. Розуміння цих принципів допомагає програмістам покращувати свої навички та розвивати якісний софтвер.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '158',
//         title: 'Як працюють замикання в JavaScript',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://foxminded.ua/zamykannia-javascript/',
//         },
//         img: 'https://i.ytimg.com/vi/S3cBIww_6os/maxresdefault.jpg',
//         views: 7656,
//         createdAt: '05.09.2023',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//         category: [ArticleCategory.IT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'Замикання javascript можуть бути корисними в безлічі сценаріїв програмування, даючи змогу створювати приватні змінні та методи, передавати функції як аргументи, використовувати функції зворотного виклику та багато іншого. Вони є невід’ємною частиною мови JavaScript і допомагають розробникам створювати гнучкіший і ефективніший код.',
//                     'У наступних розділах ми детальніше розглянемо роботу замикань, способи їхнього створення та використання, а також потенційні проблеми, з якими можна зіткнутися під час їхнього використання',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що це таке',
//                 paragraphs: [
//                     'Давайте уявимо, що у нас є функція, яка живе всередині іншої. І ця внутрішня функція може бачити і використовувати змінні із зовнішньої. Ось як це може виглядати:',
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'function outerFunction() {\n\n  var outerVariable = \'Привіт, я змінна із зовнішньої функції!\';\n\n  function innerFunction() {\n\n    console.log(outerVariable);\n\n  }\n\n  return innerFunction;\n\n}\n\nvar myFunction = outerFunction();\n\nmyFunction(); // Виводить "Привіт, я змінна із зовнішньої функції!"',
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'У цьому прикладі innerFunction є замиканням, тому що вона може отримати доступ до змінної outerVariable, яка визначена у зовнішній функції outerFunction. Навіть після того, як зовнішня функція закінчила свою роботу і повернула innerFunction, замикання все ще пам’ятає значення outerVariable і може використати його при виклику myFunction().',
//                     'Давайте розглянемо ще один приклад, щоб прояснити поняття замикань:',
//                 ],
//             },
//             {
//                 id: '41',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'function counter() {\n\n  var count = 0;\n\n  function increment() {\n\n    count++;\n\n    console.log(count);\n\n  }\n\n  function decrement() {\n\n    count--;\n\n    console.log(count);\n\n  }\n\n  return {\n\n    increment: increment,\n\n    decrement: decrement\n\n  };\n\n}\n\nvar myCounter = counter();\n\nmyCounter.increment(); // Виводить 1\n\nmyCounter.increment(); // Виводить 2\n\nmyCounter.decrement(); // Виводить 1',
//             },
//             {
//                 id: '5',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'У цьому прикладі counter – це зовнішня функція, яка створює дві внутрішні – increment і decrement. Кожна з них має доступ до змінної count, оголошеної всередині counter. Коли ми викликаємо counter(), ми отримуємо об’єкт із двома методами increment і decrement. Ми можемо викликати ці методи, щоб збільшувати або зменшувати значення count і бачити результати в консолі.',
//                     'Таким чином, замикання дозволяють нам створювати функції, які запам’ятовують значення змінних, визначених у їхніх зовнішніх функціях. Це корисно для збереження стану та створення приватних змінних і методів, які недоступні ззовні. Пам’ятайте, що замикання можуть бути дуже потужним інструментом у JavaScript, і їхнє розуміння допоможе вам писати більш гнучкий та ефективний код.\n\n',
//                 ],
//             },
//             {
//                 id: '6',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Створення замикань',
//                 paragraphs: [
//                     'Замикання створюються в момент виконання коду, коли функція оголошується всередині іншої або блоку коду. Ось кілька практичних прикладів, які допоможуть вам краще зрозуміти, як це відбувається.',
//                 ],
//             },
//             {
//                 id: '81',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://cdn-ckkcn.nitrocdn.com/zFBNvlNnhjnAtIruckhWUtdrrYcfdzYJ/assets/images/source/rev-52b0cf6/foxminded.ua/wp-content/uploads/2023/09/zamikania-js-1024x576.jpg',
//                 title: 'Рис.1 Створення замикання',
//             },
//             {
//                 id: '82437',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклад 1. Замикання з використанням аргументу функції',
//                 paragraphs: [],
//             },
//             {
//                 id: '494552',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: "function outerFunction(name) {\n\n  function innerFunction() {\n\n    console.log('Привіт, ' + name + '!');\n\n  }\n\n  return innerFunction;\n\n}\n\nvar greetJohn = outerFunction('John');\n\ngreetJohn(); // Виводить \"Привіт, John!\"\n\nvar greetAnna = outerFunction('Anna');\n\ngreetAnna(); // Виводить \"Привіт, Anna!\"",
//             },
//             {
//                 id: '855',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'У цьому прикладі innerFunction є замиканням, яке має доступ до аргументу name, переданого у зовнішню функцію outerFunction. Коли ми викликаємо outerFunction(‘John’), ми створюємо замикання greetJohn, яке запам’ятовує значення name рівне ‘John’. Аналогічно, при виклику outerFunction(‘Anna’), ми створюємо замикання greetAnna, яке запам’ятовує значення name, що дорівнює ‘Anna’. При виклику цих замикань вони виводять привітання з відповідним ім’ям.',
//                 ],
//             },
//             {
//                 id: '9',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклад 2. Замикання з використанням локальної змінної зовнішньої функції',
//                 paragraphs: [],
//             },
//             {
//                 id: '912',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'function counter() {\n\n  var count = 0;\n\n  function increment() {\n\n    count++;\n\n    console.log(\'Поточне значення: \' + count);\n\n  }\n\n  return increment;\n\n}\n\nvar myCounter = counter();\n\nmyCounter(); // Виводить "Поточне значення: 1"\n\nmyCounter(); // Виводить "Поточне значення: 2"',
//             },
//             {
//                 id: '955',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'Тут counter – це зовнішня функція, яка оголошує локальну змінну count. Потім вона повертає внутрішню функцію increment, яка має доступ до змінної count. Коли ми викликаємо counter(), ми отримуємо замикання myCounter, яке запам’ятовує значення count і збільшує його при кожному виклику. Ми можемо викликати myCounter і бачити, як значення count збільшується.',
//                     'Отже, ви бачите, як просто створювати замикання в JavaScript. Вони дають змогу зберігати стан змінних і мати доступ до них усередині функцій, що робить ваш код гнучким.',
//                 ],
//             },
//             {
//                 id: '788',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Потенційні проблеми',
//                 paragraphs: [
//                     'Давайте обговоримо деякі потенційні проблеми, з якими ви можете зіткнутися під час використання замикань у JavaScript. Хоча замикання є потужним інструментом, неправильне їх використання може призвести до деяких небажаних наслідків:',
//                     '1. Одна з найпоширеніших проблем – це витік пам’яті. Коли функція, яка є замиканням, має доступ до змінних або об’єктів, більше не потрібних, вони продовжують займати пам’ять. Щоб уникнути витоків пам’яті, важливо бути уважними під час використання замикань і переконатися, що вони не зберігають посилання на великі обсяги даних або об’єкти, які більше не потрібні. Зазвичай достатньо звільнити посилання на ці дані, щоб дозволити збирачу сміття видалити їх із пам’яті.',
//                     '2. Використання замикань може призвести до невеликого зниження продуктивності. Коли замикання викликається, воно повинно звернутися до своїх зовнішніх змінних, що вимагає деякого часу. У більшості випадків це непомітно, але якщо замикання викликається безліч разів у циклі або всередині критично важливої ділянки коду, процес може сповільнитися.',
//                     '3. Неправильне використання замикань може призвести до помилок і несподіваної поведінки коду. Наприклад, якщо не акуратно поводитися зі змінними, оголошеними всередині замикання, може виникнути конфлікт і несподівана зміна значення змінної. Важливо бути уважними і розуміти, які змінні доступні і як вони можуть бути змінені.',
//                     '4. Ще одна проблема – це втрата контексту виконання функції. Коли замикання передається і викликається в іншому контексті, може виникнути проблема з доступом до змінних і об’єктів, на які воно очікує. У таких випадках може знадобитися явне прив’язування контексту при передачі замикання.',
//                     'Важливо розуміти ці потенційні проблеми і бути обережними під час використання замикань у своєму коді. Хороша практика – це тестування і перевірка свого коду на наявність витоків пам’яті та несподіваної поведінки.',
//                 ],
//             },
//             {
//                 id: '9559',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Використання в реальних сценаріях',
//                 paragraphs: [
//                     'Давайте розглянемо деякі реальні сценарії, у яких замикання можуть бути корисними. Це допоможе вам краще зрозуміти, як їх використовувати у своїх проєктах.',
//                 ],
//             },
//             {
//                 id: '923',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'Приклад 1. Створення приватних змінних і методів в об’єкт',
//                 ],
//             },
//             {
//                 id: '548569680',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'function createPerson(name) {\n\n  var age = 0;\n\n  function increaseAge() {\n\n    age++;\n\n  }\n\n  return {\n\n    getName: function() {\n\n      return name;\n\n    },\n\n    getAge: function() {\n\n      return age;\n\n    },\n\n    celebrateBirthday: function() {\n\n      increaseAge();\n\n    }\n\n  };\n\n}\n\nvar person = createPerson(\'John\');\n\nconsole.log(person.getName()); // Виводить "John"\n\nconsole.log(person.getAge()); // Виводить 0\n\nperson.celebrateBirthday();\n\nconsole.log(person.getAge()); // Виводить 1',
//             },
//             {
//                 id: '927',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'У цьому прикладі ми створюємо об’єкт person, який має приватні змінні name і age, а також методи для отримання імені та віку (getName і getAge). Замикання дозволяє цим методам мати доступ до приватних змінних name і age. Метод celebrateBirthday викликає внутрішню функцію increaseAge, яка збільшує значення age на одиницю. Таким чином, ми можемо безпечно змінювати й отримувати значення змінних через методи об’єкта, а вони залишаються недоступними ззовні.',
//                 ],
//             },
//             {
//                 id: '928',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'Приклад 2. Функції зворотного виклику (Callback functions)',
//                 ],
//             },
//             {
//                 id: '412436',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: "function fetchData(url, callback) {\n\n  // Логіка отримання даних з API\n\n  var data = '...'; // Отримані дані\n\n  callback(data);\n\n}\n\nfetchData('https://api.example.com', function(data) {\n\n  console.log('Отримані дані:', data);\n\n});",
//             },
//             {
//                 id: '9543721',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'У цьому прикладі функція fetchData приймає URL і функцію зворотного виклику callback. Усередині fetchData ми отримуємо дані з API і зберігаємо їх у змінній data. Потім ми викликаємо callback і передаємо їй отримані дані. Замикання тут дає змогу передавати дані між функціями та зберігати контекст виконання. У наведеному прикладі ми передаємо анонімну функцію як callback, яка виводить отримані дані в консоль.',
//                     'Це лише два приклади використання замикань, і є безліч інших сценаріїв, де вони можуть бути корисними. Наприклад, в асинхронних операціях, обробці подій або при створенні модульної структури коду.',
//                     'Використання замикань дає змогу створювати більш гнучкий і модульний код, зберігаючи приватні дані та методи, а також передаючи контекст виконання між функціями. Вони допомагають уникнути глобальних змінних і конфліктів імен, а також сприяють підвищенню безпеки та зручності використання коду',
//                 ],
//             },
//             {
//                 id: '909547',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     'У цій статті ми розглянули що таке замикання js і його важливість у контексті JavaScript. Ми вивчили, як вони працюють на простих прикладах для програмістів-початківців. Також ми обговорили потенційні проблеми, включно з витоками пам’яті, і розглянули приклади використання замикань у реальних сценаріях',
//                     'Сподіваюся, ця стаття допомогла вам краще зрозуміти замикання в JavaScript і надихнула на створення більш якісного коду з використанням цієї потужної концепції.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '159',
//         title: 'Що таке AJAX та як ця технологія працює',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://dzudzylo.com/javascript/shcho-take-ajax-ta-iak-tsia-tekhnolohiia-pratsiuie.html',
//         },
//         img: 'https://habrastorage.org/getpro/habr/upload_files/0a4/04e/a28/0a404ea2829daa3fe989773c2aa1bd7a.jpg',
//         views: 1001,
//         createdAt: '26.09.2023',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//         category: [ArticleCategory.IT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'Сьогодні поговоримо про технологію, що у свій час змінила Web, назва якій AJAX.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке AJAX',
//                 paragraphs: [
//                     'AJAX (Asynchronous JavaScript and XML) – технологія, що дозволяє здійснювати асинхронний обмін даними між клієнтом та сервером без потреби перезавантажувати сторінку.',
//                     'Завдяки AJAX можна оновлювати окремі частини сторінки безпосередньо на клієнті.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Як працює технологія AJAX?',
//                 paragraphs: [
//                     'При використанні AJAX, клієнтська сторона (браузер) взаємодіє з сервером асинхронно, відправляючи запити та отримуючи відповіді без перезавантаження сторінки.',
//                     'Сервер оброблює цей запит від клієнта (браузера) та повертає дані у форматі, зазвичай, JSON або XML. Після отримання відповіді, JavaScript виконує певні дії з цими даними, наприклад, оновлює вміст сторінки, додає нову інформацію або змінює вигляд елементів сторінки',
//                 ],
//             },
//             {
//                 id: '5',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'У яких випадках використовується AJAX?',
//                 paragraphs: [
//                     'AJAX широко використовується в веб-розробці для різних завдань:',
//                     '1. Оновлення динамічного вмісту: AJAX дозволяє оновлювати лише певні частини сторінки без перезавантаження всього вмісту. Наприклад, в соціальних мережах чи месенджерах, можна оновлювати стрічку новин або коментарів без необхідності перезавантажувати всю сторінку.',
//                     '2. Відправлення та отримання даних форм: За допомогою AJAX можна відправляти дані з форм, такі як авторизація, коментарі, повідомлення тощо, без перезавантаження сторінки. Це забезпечує більш зручний та безперервний досвід користувача.',
//                     '3. Асинхронна перевірка чи валідація даних: AJAX дозволяє виконувати перевірку даних на сервері асинхронно. Наприклад, ви можете перевіряти наявність нових повідомлень або оновлень безпосередньо на сторінці без необхідності вручну перезавантажувати її.',
//                 ],
//             },
//             {
//                 id: '90',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклади використання AJAX у JavaScript',
//                 paragraphs: [],
//             },
//             {
//                 id: '125348',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Отримання даних з сервера',
//                 paragraphs: [],
//             },
//             {
//                 id: '36586707',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'function fetchData() {\n  var xhttp = new XMLHttpRequest();\n  xhttp.onreadystatechange = function() {\n    if (this.readyState == 4 && this.status == 200) {\n      var data = JSON.parse(this.responseText);\n    }\n  };\n  xhttp.open("GET", "data.json", true);\n  xhttp.send();\n}',
//             },
//             {
//                 id: '9',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Відправка даних форми на сервер',
//                 paragraphs: [],
//             },
//             {
//                 id: '912',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'function submitForm() {\n  var xhttp = new XMLHttpRequest();\n  xhttp.onreadystatechange = function() {\n    if (this.readyState == 4 && this.status == 200) {\n      document.getElementById("result").innerHTML = this.responseText;\n    }\n  };\n  xhttp.open("POST", "submit.php", true);\n  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");\n  var data = "name=" + encodeURIComponent(document.getElementById("name").value);\n  xhttp.send(data);\n}',
//             },
//             {
//                 id: '909',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок',
//                 paragraphs: [
//                     'AJAX дозволяє комфортно працювати з вебом, дозволяючи користувачу не очікувати постійних перезавантажень громіздких html шаблонів та перемальовувань DOM дерева.',
//                     'Саме завдяки AJAX ми користуємось класними Web додатками, що не вимагають постійних перезавантажень сторінки.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '160',
//         title: 'Розбираємося з хуками в React',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://dou.ua/forums/topic/47858/',
//         },
//         img: 'https://miro.medium.com/v2/resize:fit:900/1*f1uLCX2jrfA_zvDElGDvcQ.png',
//         views: 783,
//         createdAt: '08.03.2023',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//         category: [ArticleCategory.IT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що таке хуки',
//                 paragraphs: [
//                     'У React хуки — це спеціальні функції, які дозволяють нам «підключитися» (англ. hook into) до внутрішніх механізмів бібліотеки. Іншими словами, хуки — це API для внутрішнього функціоналу React. Для прикладу, стан зберігається у Fіber-дереві, до якого в нас немає прямого доступу зовні. Тому для виконання маніпуляцій зі станом нам потрібні абстракції у вигляді хуків.',
//                     'На момент написання цієї статті в React є 17 вбудованих хуків (два з яких ще в canary). Крім того, інші бібліотеки, такі як React Router або Redux, також впроваджують свої власні хуки.',
//                     'За допомогою хуків ми можемо: створити стан та отримати доступ до нього, зареєструвати побічні ефекти, отримати та зберегти DOM-вузли, отримати доступ до контексту,покращити перформанс застосунку ',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Особливості хуків',
//                 paragraphs: [
//                     'Як ви могли вже помітити, всі хуки починаються зі слова use. Так React відрізняє їх від звичайних функцій. Якщо ви пишете кастомні хуки (про які ми поговоримо детальніше згодом), треба обов’язково користуватися цим правилом, коли обираєте їм назву.',
//                     'Хуки можна викликати тільки в межах функцій. Тобто ми можемо їх використовувати в функціональних компонентах або кастомних хуках. Вони не працюють в класах.',
//                     'Та найцікавіша особливість хуків — це те, що їх можна використовувати тільки на найвищому рівні компонента. На практиці це означає, що ми не можемо викликати хуки всередині умов (if), циклів, інших функцій або після раннього return. Це правило забезпечує виклик хуків в одному і тому ж порядку при кожному ререндері компонента.',
//                     'Пропоную зануритися глибше в React для повного розуміння цієї особливості хуків. Хуки, а також пропси, список апдейтів, стейт та інші дані важливі для коректної роботи React, зберігаються у Fiber-дереві.',
//                     'Структура даних для збереження хуків називається зв’язаним списком, де кожен елемент має вказівник на наступний, вони йдуть ніби ланцюжком. Якщо один з використаних хуків не буде викликано під час ререндеру, це порушить порядок зв’язаного списку та призведе до некоректної роботи. Адже для ідентифікації значення певного хука використовується саме його порядок, в нас немає іншого ідентифікатора, типу назви або айді.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Заміна класовим методам життєвого циклу',
//                 paragraphs: [
//                     'Хуки працюють винятково з функціональними компонентами. Але вони дозволяють реалізувати функціонал, який зазвичай використовується в класових компонентах. Особисто мені зручніше використовувати хуки, оскільки вони здаються логічними та простішими в розумінні.',
//                     'Класовий метод componentDidMount спрацьовує відразу після вбудови компонента в DOM-дерево. На практиці тут я зазвичай виконую початкові налаштування, такі як отримання даних з API або налаштування обробників подій.',
//                     'Якщо ми хочемо досягти такого ж ефекту з використанням хуків, ми можемо скористатися useEffect з порожнім масивом залежностей:',
//                 ],
//             },
//             {
//                 id: '412',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'useEffect(() => {\n    fetchUsers();\n }, []);',
//             },
//             {
//                 id: '33658',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'Але справжню силу хуків можна відчути в порівнянні з методом componentDidUpdate. Цей метод у класових компонентах викликається на кожен ререндер. З хуками ми можемо досягти цього ж ефекту, передавши в масив залежностей useEfect змінні, які ми «відстежуємо», тобто при зміні яких повинна статися певна дія (викликатися колбек).',
//                     'Водночас ми можемо створювати стільки окремих незалежних юз ефектів, скільки нам треба, тим самим сепаруючи логіку',
//                 ],
//             },
//             {
//                 id: '4645856',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'useEffect(() => {  \n    fetchUser(userId);\n  }, [userId]);',
//             },
//             {
//                 id: '354585693',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'Метод життєвого циклу componentWillUnmount спрацьовує безпосередньо перед тим, як компонент буде видалений з DOM. Я користуюсь ним для очищення таймерів, підписок або локальних даних. У функціональних компонентах це можна реалізувати за допомогою cleanup функції в useEffect. Вона спрацьовує перед кожним викликом хука (крім першого), а також перед видаленням компоненту з DOM. Якщо масив залежности пустий — ефект такий самий, як в\n\ncomponentWillUnmount.',
//                 ],
//             },
//             {
//                 id: '4777712',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'useEffect(() => {\n  return () => {\n    clearTimeout(timeoutId);\n  };\n}, []);',
//             },
//             {
//                 id: '51256',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Кастомні хуки',
//                 paragraphs: [
//                     'React надає нам можливість перевикористовувати логіку та створювати свої кастомні хуки. Зазвичай для цього ми робимо просту функцію, наприклад, в utils',
//                     'Але якщо задіяна логіка, яка в собі містить хуки, звичайна функція нам не допоможе. Адже, як ми дізналися раніше, хуки можна викликати тільки на найвищому рівні. Для цього в React і були впроваджені кастомні хуки. По суті, це такі ж функції, але в них нам дозволяється викликати інші хуки.',
//                     'Наприклад розглянемо створення кастомного хука для отримання даних з API. Уявімо, що в нас є кілька компонентів, які повинні витягти дані з різних ендпоінтів. Ми можемо створити простий хук, який буде мати в собі стан для даних, статус завантаження та обробку помилок:',
//                 ],
//             },
//             {
//                 id: '5334756959',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: 'function useApiData(endpoint) {\n  // State to store the fetched data\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n  useEffect(() => {\n    const fetchData = async () => {\n      try {\n        const response = await fetch(apiEndpoint);\n        if (!response.ok) {\n          throw new Error(`Error: ${response.status}`);\n        }\n        const result = await response.json();\n        setData(result);\n      } catch (error) {\n        setError(error.message);\n      } finally {\n        setLoading(false);\n      }\n    };\n    fetchData();\n  }, [apiEndpoint]);\n  // Return the state and loading/error information for external use\n  return { data, loading, error };\n}',
//             },
//             {
//                 id: '904365',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'Цим простим хуком ми зробили абстракцію за логікою fetch, і тепер нам не треба піклуватися про імплементацію. Ми просто маємо результат, а саме: дані, поточний стан загрузки та помилки.',
//                     'За часів класових компонентів перевикористання логіки було набагато складнішим. Розробники зазвичай користувалися патернами, такими як render props або HOC (higher-order component). Вони не були такими чистими і зрозумілими, як кастомні хуки, а також змінювали ієрархію компонентів, призводячи до так званого «пекла обгорток» (wrapper hell). Це і було однією з основних мотивацій для впровадження хуків.',
//                     'Обов’язковим правилом створення кастомних хуків є те, що вони завжди повинні починатися зі слова use. Також важливо, щоб в кожного хука була своя конкретна та зрозуміла мета і описова назва. Він може приймати будь-які аргументи, а також вертати будь-які дані, які потрібні для імплементації. Всередині кастомного хука ми зазвичай використовуємо один або декілька інших хукі',
//                     'Приклади хуків, які часто доводиться писати на практиці: useDebounce, useLocalStorage, useThrottle, useGeolocation',
//                     'Цей патерн перевикористання логіки користується такою популярністю, що на просторах npm є ліби з великим вибором кастомних хуків (наприклад, ліба useHooks).',
//                 ],
//             },
//             {
//                 id: '148234678',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновки',
//                 paragraphs: [
//                     'У цій статті ми детально розглянули концепцію хуків в React та їхні особливості. Сподіваюсь, мені вдалося довести, що хуки є потужним інструментом, бо вони дозволяють зручно працювати зі станом, побічними ефектами та іншими аспектами компонентів.',
//                     'Ми розглянули вбудовані хуки, які надає React, такі як useState, useEffect та інші, а також розглянули можливості їхнього використання для створення функціональних компонентів, які замінюють класові методи життєвого циклу.',
//                     'Особливу увагу було приділено кастомним хукам, що дозволяють перевикористовувати логіку в різних частинах застосунку. Ми розглянули приклад створення кастомного хука для отримання даних з API, показуючи, як цей підхід спрощує код та полегшує його читання.',
//                     'Розуміння хуків та їхніх принципів дозволяє створювати декларативний та легко читабельний код, покращуючи продуктивність та обслуговуваність проєктів.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '161',
//         title: 'REST API як спосіб спілкування компонент веб-додатків',
//         subtitle: {
//             text: 'Джерело:https://foxminded.ua/shcho-take-rest-api/:',
//             link: '',
//         },
//         img: 'https://foxminded.ua/wp-content/uploads/2023/11/chto-takoe-rest-api.webp',
//         views: 341,
//         createdAt: '08.03.2024',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//         category: [ArticleCategory.IT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: '',
//                 paragraphs: [
//                     'Що таке REST API? Якщо ви новачок у світі веб-розробки, ці абревіатури можуть здатися трохи лякаючими, але не хвилюйтеся, ми розберемося в усьому по порядку. REST API – це набір правил і угод, які дають змогу веб-додаткам обмінюватися даними. У цій статті ми розглянемо основи REST API і постараємося зробити їх зрозумілими.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Що це таке?',
//                 paragraphs: [
//                     'REST API – це скорочення від Representational State Transfer Application Programming Interface. Насправді, не так уже й важливо, запам’ятаєте ви цю довгу абревіатуру чи ні. Важливіше зрозуміти, що це спосіб, за допомогою якого різні компоненти веб-додатків можуть спілкуватися між собою',
//                     'Якщо вам коли-небудь доводилося взаємодіяти з веб-сайтом, наприклад, надсилати запит на сервер для отримання даних або надсилання даних на сервер, то ви вже стикалися з REST API. Він використовується повсюдно у веб-розробці, і розуміння його роботи є ключовою навичкою для розробників.',
//                     'Для кращого розуміння того, як працює rest api, уявімо, що у нас є веб-додаток. Цей додаток має дві основні частини: frontend (клієнтська частина) і backend (серверна частина).',
//                     'REST API слугує мостом між цими двома частинами. Він дає змогу frontend надсилати запити до backend і отримувати дані звідти. Як це відбувається?',
//                     '1. Запити від клієнта до сервера: коли користувач додає товар до кошика на вебсторінці (frontend), JavaScript на сторінці створює HTTP-запит і відправляє його на сервер (backend). Запит може містити інформацію про товар, його кількість та інші деталі.',
//                     '2. Обробка запитів на сервері: сервер, отримавши запит, використовує REST API для інтерпретації його вмісту та виконання відповідної операції. Наприклад, він може перевірити доступність товару, зменшити кількість товару на складі та створити замовлення.',
//                     '3. Відповідь від сервера до клієнта: після опрацювання запиту сервер створює HTTP-відповідь і надсилає її назад на клієнтську сторону. Відповідь може містити інформацію про статус операції, оновлений стан даних або інші відомості.',
//                     '4. Оновлення інтерфейсу на клієнті: на клієнтському боці JavaScript обробляє HTTP-відповідь і, за необхідності, оновлює користувацький інтерфейс. Наприклад, він може оновити кошик користувача, показати повідомлення про успішну покупку тощо.',
//                     'Цей обмін даних між frontend і backend через REST API дає змогу застосунку функціонувати гладко й ефективно. REST API визначає правила для створення, надсилання та обробки запитів і відповідей, роблячи процес взаємодії стандартизованим і надійним',
//                 ],
//             },
//             {
//                 id: '55',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основні принципи',
//                 paragraphs: [
//                     'REST API будується на кількох ключових принципах, які роблять його ефективним і гнучким інструментом для обміну даними.',
//                     '1. Stateless: чому кожен HTTP-запит відбувається в повній ізоляції. REST API працює в режимі “без стану” (stateless), що означає, що кожен HTTP-запит, надісланий на сервер, містить усі необхідні дані для його обробки. Сервер не зберігає інформацію про попередні запити від клієнта. Це робить систему більш надійною та масштабованою.',
//                     '2. Client-Server: автономність клієнта і сервера та їхня взаємодія. REST API суворо розділяє клієнтську та серверну частини програми. Це означає, що вони можуть розвиватися незалежно одна від одної. Клієнт може бути веб-браузером, мобільним додатком або будь-яким іншим клієнтським додатком, а сервер може бути написаний будь-якою мовою програмування.',
//                     '3. Uniform Interface: чотири інтерфейси для досягнення однаковості. REST API спирається на чотири основні інтерфейси: ресурси, HTTP-методи (GET, POST, PUT, DELETE), представлення ресурсів (як дані подано клієнту), і посилання між ресурсами. Це створює однаковість у способі взаємодії клієнта і сервера.',
//                     '4. Cacheable: як кешування покращує продуктивність програми. REST API підтримує кешування, що означає, що клієнт може тимчасово зберігати дані, щоб зменшити навантаження на сервер і поліпшити продуктивність.',
//                     '5. Layered System: переваги шарової системи архітектури. Сервери REST API можна організувати в шари, що робить їх більш гнучкими і масштабованими. Кожен шар виконує певні функції, і їх можна додавати або видаляти без зміни клієнтського коду.',
//                     '6. Code on Demand: необов’язкове обмеження, що дозволяє завантажувати код клієнта. Цей принцип є необов’язковим і надає можливість серверу надсилати клієнту виконуваний код. Це рідко використовується і потребує додаткових заходів безпеки.',
//                     'Загалом, принципи rest api забезпечують ефективну та гнучку взаємодію між клієнтом і сервером, а також стандартизацію, надійність і стійкість системи.',
//                 ],
//             },
//             {
//                 id: '8',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновки',
//                 paragraphs: [
//                     'Це не просто набір технічних правил, це стандарт, який дає нам змогу будувати додатки та веб-сервіси, які можуть взаємодіяти один з одним за допомогою HTTP-протоколу.',
//                     'Важливість цієї технології стає очевидною, коли ми говоримо про сучасну розробку. Адже REST API надає нам стандартну взаємодію між клієнтами та серверами, що полегшує інтеграцію різноманітних додатків і служб. Воно також знаходить застосування в різноманітних сучасних сервісах і додатках. З його допомогою ми можемо інтегрувати різні сервіси та отримувати доступ до багатої екосистеми.',
//                     'У майбутньому, REST API збереже свою актуальність. Зі зростанням мікросервісної архітектури, збільшенням кількості пристроїв IoT і поліпшенням методів безпеки, REST API продовжуватиме відігравати ключову роль у світі розробки.',
//                     'Отже, розуміння та вміння правильно використовувати REST API залишаються важливими навичками для розробників, можна сказати, що це – невід’ємна частина сучасної розробки програмного забезпечення.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '162',
//         title: 'Що таке JSON. Усе про цей формат передачі даних в інтернеті',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://apix-drive.com/ua/blog/useful/scho-take-json',
//         },
//         img: 'https://www.opc-router.de/wp-content/uploads/2020/08/was-ist-json_600x250px-1.jpg',
//         views: 890,
//         createdAt: '25.07.2023',
//         user: {
//             id: 'nwPyI60mR9XWY3ozVuRGItx08PY2',
//             username: 'testuser',
//             firstname: 'Test',
//             lastname: 'lastnameUser',
//
//             email: 'testuser@gmail.com',
//
//             avatar: 'https://s1.1zoom.ru/big3/992/367659-alexfas01.jpg',
//         },
//         category: [ArticleCategory.REACT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'JSON це що?',
//                 paragraphs: [
//                     "JSON (JavaScript Object Notation) – це текстовий формат, призначений для зберігання структурованих даних. Він був створений американським програмістом Дугласом Крокфордом на базі JavaScript, але при цьому не прив'язаний до нього і є незалежним. JSON легко поєднується з будь-яким сучасним середовищем програмування, зокрема, код для введення та обробки даних у цьому форматі присутній у мовах PHP, Python, Java та Ruby.",
//                     "Файли JSON мають однойменне розширення .json, також цей формат може бути представлений в інших типах файлів (наприклад, .html), відображаючись у вигляді рядка JSON або об'єкта. Важливою особливістю стандарту є те, що рядок JSON виглядає як звичайний текст, який легко читається людиною – як і у випадку з будь-якими іншими текстовими форматами.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Принцип дії JSON. Навіщо він потрібен?',
//                 paragraphs: [
//                     "Формат JSON використовується для впорядкованого зберігання даних у процесі їх обміну між веб-браузером (або клієнтською частиною програми) та сервером (або між різними серверами). Більше того, завдяки текстовому вигляду рядка дані JSON можна легко передавати через будь-які інші канали обміну інформацією в інтернеті. Для отримання доступу до даних, що містяться в ньому, файл .json повинен бути перетворений на об'єкт JavaScript, для чого в цій мові є відповідні методи перетворення.",
//                     "Тепер опишемо принцип дії цього інструменту на реальному прикладі. Наприклад, є певний веб-додаток, який зберігає та обробляє дані своїх користувачів: текстовий редактор, поштовий сервіс або будь-що. Без JSON ці відомості досить незручно зберігати: вони будуть недоступні при заході з іншого браузера/пристрою (у разі зберігання в пам'яті браузера) або їх взагалі потрібно вписувати вручну (у разі зберігання прямо всередині документа).",
//                     "Для вирішення цієї проблеми і був винайдений стандарт JSON, який помітно спрощує та прискорює взаємну передачу даних між клієнтом (інтернет-браузер) та сервером сайту. Інакше кажучи, це спосіб запису об'єктів у JavaScript. Він оптимально взаємодіє з AJAX (асинхронний JS та XML), разом вони забезпечують асинхронне завантаження даних у фоновому режимі. Така функція дозволяє сайтам та веб-програми оновлювати інформацію без обов'язкового перезавантаження сторінок. Крім того, за допомогою JSON користувачам доступний запит даних із стороннього домену. Зробити це можна через тег <script>, а сам метод називається JSONP - це єдиний допустимий спосіб обміну даними між доменами.",
//                 ],
//             },
//             {
//                 id: '8644',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Синтаксис та структура JSON',
//                 paragraphs: [
//                     'Ключі та значення JSON у різних мовах програмування називаються по-різному: структура, запис, словник, асоціативний масив, послідовність, вектор, список тощо. Така універсальність дозволяє легко обмінюватись даними між програмними середовищами через JSON.',
//                 ],
//             },
//             {
//                 id: '8',
//                 type: 'IMAGE' as ArticleSection.IMAGE,
//                 src: 'https://drive.google.com/thumbnail?id=1VEiaNuKaFfX2GgjDKZYWeMYWSfue7U4j&sz=w1000',
//                 title: 'Рис. 1. Структурна динаміка зайнятості населення Харківської області за статтю та віковими групами (2014 рік)',
//             },
//             {
//                 id: '64536760',
//                 type: 'CODE' as ArticleSection.CODE,
//                 code: '{\n  "id": "1",\n  "title": "JSON це що?",\n  "paragraphs": [\n    {\n      "heading": "JSON (JavaScript Object Notation)",\n      "content": "JSON – це текстовий формат, призначений для зберігання структурованих даних. Він був створений американським програмістом Дугласом Крокфордом на базі JavaScript, але при цьому не прив\'язаний до нього і є незалежним. JSON легко поєднується з будь-яким сучасним середовищем програмування, зокрема, код для введення та обробки даних у цьому форматі присутній у мовах PHP, Python, Java та Ruby."\n    },\n  ]\n}',
//             },
//             {
//                 id: '13252',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Як працювати з JSON?',
//                 paragraphs: [
//                     'Створити файл JSON можна за допомогою стандартного текстового редактора Windows – Блокнота. Також існують спеціальні онлайн-сервіси, які мають ширший функціонал і зручніші для створення та редагування таких файлів. Наприклад, інтерфейс сервісу JSON Editor Online поділено на дві робочі зони: у лівій прописується код, а в правій розміщені робочі інструменти. Крім того, онлайн-сервіси оснащені корисною функцією автоматичного розпізнавання та виділення синтаксичних помилок у код, що допоможе помітно покращити його чистоту та швидкість написання.',
//                 ],
//             },
//             {
//                 id: '22228',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Висновок. Користь JSON',
//                 paragraphs: [
//                     'Формат JSON був створений для зручності зберігання даних у процесі їх обміну між веб-браузером та сайтом або між різними сайтами. Це текстовий формат даних, основною одиницею якого є пара «ключ-значення», працювати з ним можна не тільки через JS, а й через будь-яку іншу популярну мову програмування.',
//                     'JSON має ряд переваг у порівнянні з іншим подібним форматом XML, а його поєднання з AJAX дозволяє вносити зміни до сайтів та веб-додатків без оновлення сторінки.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '163',
//         title: 'Швидкодія сайту: скільки секунд ви насправді готові чекати?',
//         subtitle: {
//             text: 'Джерело:',
//             link: 'https://support.sitegist.com/shvydkodiya-sajtu-skilky-sekund-vy-naspravdi-gotovi-chekaty/',
//         },
//         img: 'https://support.sitegist.com/wp-content/uploads/2022/07/4669572.jpg',
//         views: 334,
//         createdAt: '29.07.2023',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//         category: [ArticleCategory.IT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Як довго люди можуть чекати на завантаження? ',
//                 paragraphs: [
//                     'Іноді 4 секунд достатньо, щоб людина не дочекалася завантаження сайту – і цей час постійно зменшується. Дослідження Google показують, що скоро бренди матимуть всього 2,4 секунди для привернення уваги. ',
//                     'Спробуйте оцінити свій сайт: чи достатньо швидко завантажується головна сторінка, інтерактивні елементи, галерея. Подумайте, скільки часу ви готові зачекати. Ваші клієнти чекатимуть вдвічі менше. Такі реалії боротьби за увагу користувачів в мережі, тож покращення швидкодії сайту = більше продажів. ',
//                     'Сам термін “швидкодія” – це про час, який займає коректне відтворення всіх елементів. Невчасне відтворення відео та слайдерів не лише “крадуть” час, а й створюють відчуття, що сайт несправний. Перевірити швидкість завантаження сайту можна безкоштовними сервісами: GooglePageSpeed Insights, gtmetrix,  та ін.',
//                     'Якщо розглядати питання з технічного боку – швидкодія сайту важлива для індексації та ранжування сторінок в Google. Затримка у видачі контенту знижує конверсії та суттєво впливає на лояльність клієнтів. Як це можливо виправити й отримати найкращий  показник швидкості завантаження? Розповідаємо про наші методи далі. ',
//                     'І перш ніж почнемо, кілька слів про хостинг – іноді саме від його вдосконалення залежатиме швидкість завантаження. У роботі над підтримкою сайтів ми звертаємо на це увагу та допомагаємо підібрати новий хостинг чи пропонуємо свій, щоб заповнити цю прогалину. Якщо ж швидкодія сервера хостингу в порядку, переходимо до конкретних дій. ',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Як ми оптимізуємо швидкість завантаження',
//                 paragraphs: [
//                     'Крок 1. Оптимізація візуальних елементів. Часто проблема повільного завантаження сайту в надто великих зображеннях. Знаємо, може здаватися, що це дуже простий крок, але саме такими найчастіше і нехтують.',
//                     'Усі зображення (фото, іконки, логотипи) ми оптимізовуємо, а також перевіряємо технічну коректність шаблонів сторінки. Так сайт зможе використовувати саме той розмір, який потрібен для кожного блоку, незалежно від початкової величини. Також з сервера краще видалити всі графічні файли, які вже не актуальні та не будуть використані в роботі.',
//                     'Надалі цей час можна заощадити, встановивши додатковий плагін – він буде оптимізовувати зображення відразу при додаванні на сайт. Такий плагін уже входить у преміум-модулі наших пакетів підтримки. Детальніше про пакети і що вони включають можна переглянути за посиланням.',
//                     'Крок 2. Кешування сайту. Дозвіл на кешування сайту означає, що запит на сервер від користувача прийде лише під час першого відвідування. Файли кешу зберігають код, потрібний для завантаження сторінки, типові зображення, тож вдруге браузер просто візьме дані звідти. Це, своєю чергою, зменшує навантаження на сервер і покращує швидкодію.',
//                     'Крок 3. Виправлення помилок на сайті – переважно 303 та 404, щоб уникнути непотрібних переадресацій. На цьому етапі тестуємо сайт та виправляємо наявні помилки.',
//                     'Крок 4. Стиснення CSS та JS файлів. Файли JavaScript і CSS також сповільнюють завантаження сторінок, тож оптимізація їхнього розміру – ще одна важлива складова швидкодії сайту. Інколи трапляються помилки в коді – їх, звісно ж, виправляємо. Ще одне зручне рішення – встановити плагін, який дозволить виключити на сторінці неактивний код (наприклад, елемента, який є лише на одній зі сторінок), щоб браузер не витрачав зайвий час на його завантаження.',
//                     "Крок 5. Видалення непотрібних плагінів з сайту. Досвід роботи з багатьма WordPress-сайтами показує, що автоматизація – це, звісно, добре, але велика кількість доданих плагінів дорівнює поганій швидкодії. Це не означає, що для виправлення ситуації потрібно видалити все – кожен плагін ми перевіряємо та за потреби змінюємо 'найважчі' чи ті, які не використовуються.",
//                     'Часто функції, які на сайті виконує плагін, можна замінити кодом, що значно полегшить його роботу. Візьмемо для прикладу слайдер – типовий і дуже поширений елемент на сайтах, який додає щоразу 1-2 секунди до тривалості завантаження. Часто його додають в шаблон домашньої сторінки у блок з товаром, відгуками чи статтями блогу. Як пришвидшити завантаження та зберегти цей елемент на сайті? Наша команда пропонує в цьому випадку замінити плагін за допомогою коду.',
//                     'Крок 6. Налаштування пріоритетного завантаження. Тут хочемо нагадати, що файли можуть бути прив’язані до першого екрану сторінки, другого і т.д. Ми налаштовуємо завантаження так, щоб вони спрацьовували почергово – залежно від того, яка частину першою побачить користувач.',
//                     'Кожен з цих кроків має свої нюанси та ефективність на конкретному сайті. Часто рішення може бути досить індивідуальним і потребувати оптимізації коду, шрифтів чи інших найрізноманітніших елементів. Ми ж хотіли поділитися зрозумілою інструкцією.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '164',
//         title: 'Які основні відмінності між TypeScript і JavaScript?',
//         subtitle: {
//             text: 'Порівняння TypeScript та JavaScript',
//         },
//         views: 1020,
//         createdAt: '15.02.2023',
//         user: {
//             id: 'MqonEyICTeMapkAPyPFH7w1E5l52',
//             username: 'annaUser',
//             firstname: 'Anna',
//             lastname: 'Koval',
//
//             email: 'annaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar9.jpg',
//         },
//         category: [ArticleCategory.TYPESCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Основні відмінності',
//                 paragraphs: [
//                     'TypeScript — це надбудова над JavaScript, яка додає статичну типізацію та нові функції. JavaScript є динамічно типізованою мовою, тоді як TypeScript дозволяє визначати типи змінних, що допомагає уникати багатьох помилок.',
//                     'Крім того, TypeScript підтримує сучасні можливості ECMAScript, такі як класи, модулі та асинхронні функції.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад TypeScript коду',
//                 code: "let message: string = 'Привіт, TypeScript!';\nconsole.log(message);",
//             },
//         ],
//     },
//     {
//         id: '165',
//         title: 'Які переваги та недоліки використання TypeScript?',
//         subtitle: {
//             text: 'Огляд переваг і недоліків TypeScript',
//         },
//         views: 980,
//         createdAt: '10.05.2023',
//         user: {
//             id: 'ObGe2X8MNTde2RSffQgE0Jpxek72',
//             username: 'lucyAdmin',
//             firstname: 'Lucy',
//             lastname: 'Brown',
//
//             email: 'lucyAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar10.jpg',
//         },
//         category: [ArticleCategory.TYPESCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Переваги TypeScript',
//                 paragraphs: [
//                     '1. **Статична типізація**: TypeScript допомагає знайти помилки ще на етапі написання коду завдяки статичній типізації.',
//                     '2. **Підтримка нових функцій**: TypeScript дозволяє використовувати найновіші можливості JavaScript, навіть якщо вони ще не підтримуються у браузерах.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Недоліки TypeScript',
//                 paragraphs: [
//                     '1. **Час на налаштування**: Потрібно більше часу на налаштування та конфігурацію проєкту.',
//                     '2. **Крива навчання**: Для розробників, які звикли до динамічної типізації JavaScript, може знадобитися час для звикання до TypeScript.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '166',
//         title: 'Що таке типи даних у TypeScript і як їх використовують?',
//         subtitle: {
//             text: 'Типи даних у TypeScript',
//         },
//         views: 860,
//         createdAt: '18.08.2023',
//         user: {
//             id: 'J3aB11HdHTZW6udzrrw2ymBhIOz1',
//             username: 'mainAdmin',
//             firstname: 'Maryna',
//             lastname: 'Shavlak',
//             email: 'mainAdmin@gmail.com',
//             avatar: 'https://drive.google.com/thumbnail?id=1RD0jSAm8kdTLKa-Vr0daeE8T9-QcfPCa&sz=w1000',
//         },
//         category: [ArticleCategory.TYPESCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Типи даних у TypeScript',
//                 paragraphs: [
//                     'TypeScript дозволяє визначати типи для змінних, функцій та параметрів. Основні типи: `string`, `number`, `boolean`, `array`, `tuple`, `enum`, `any`, `void`, `null`, та `undefined`.',
//                     'Це робить код більш передбачуваним та надійним, оскільки компілятор може виявити невідповідності в типах під час розробки.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад з типами',
//                 code: "let age: number = 25;\nlet isActive: boolean = true;\nlet name: string = 'John';",
//             },
//         ],
//     },
//     {
//         id: '167',
//         title: 'Розкажіть про інтерфейси в TypeScript і наведіть приклади їх використання.',
//         subtitle: {
//             text: 'Що таке інтерфейси у TypeScript',
//         },
//         views: 1040,
//         createdAt: '11.03.2024',
//         user: {
//             id: '4juq0tzGf5fNMCXCRFOa5mvFO5O2',
//             username: 'leoUser',
//             firstname: 'Leo',
//             lastname: 'Mikhailov',
//
//             email: 'leoUser@gmail.com',
//
//             avatar: 'https://example.com/avatar12.jpg',
//         },
//         category: [ArticleCategory.TYPESCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Інтерфейси в TypeScript',
//                 paragraphs: [
//                     "Інтерфейси у TypeScript визначають структуру об'єктів. Вони дозволяють описувати типи для об'єктів з певними властивостями і методами, роблячи код більш організованим.",
//                     "Інтерфейси можуть бути використані для перевірки відповідності типів та полегшують роботу з об'єктами.",
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад інтерфейсу',
//                 code: "interface User {\n  name: string;\n  age: number;\n}\n\nlet user: User = { name: 'John', age: 30 };",
//             },
//         ],
//     },
//     {
//         id: '168',
//         title: 'Як працюють Generics у TypeScript і чому вони корисні?',
//         subtitle: {
//             text: 'Основи Generics у TypeScript',
//         },
//         views: 930,
//         createdAt: '15.01.2023',
//         user: {
//             id: '9Dpc2pFoeORLyQrxHlGIbe5wjbf2',
//             username: 'janeAdmin',
//             firstname: 'Jane',
//             lastname: 'Williams',
//
//             email: 'janeAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar13.jpg',
//         },
//         category: [ArticleCategory.TYPESCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Generics у TypeScript',
//                 paragraphs: [
//                     'Generics дозволяють створювати компоненти, які можуть працювати з різними типами даних, зберігаючи типову безпеку. Це робить код більш гнучким та універсальним.',
//                     'Наприклад, можна створити функцію, яка приймає масив будь-яких типів і повертає перший елемент цього масиву.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад використання Generics',
//                 code: 'function getFirstElement<T>(arr: T[]): T {\n  return arr[0];\n}\n\nlet numbers = [1, 2, 3];\nlet firstNumber = getFirstElement(numbers);',
//             },
//         ],
//     },
//     {
//         id: '169',
//         title: 'Як можна використовувати Enums у TypeScript і які їхні переваги?',
//         subtitle: {
//             text: 'Що таке Enums у TypeScript',
//         },
//         views: 890,
//         createdAt: '10.04.2023',
//         user: {
//             id: 'vvfdFnPQMLVkrnCBjsTZcPsUq9U2',
//             username: 'mainUser',
//             firstname: 'Tetiana',
//             lastname: 'Shavlak',
//
//             email: 'mainUser@gmail.com',
//
//             avatar: 'https://drive.google.com/thumbnail?id=1J1xUPYYkJeOsBTpDuf36vsV7UfxlM2uG&sz=w1000',
//         },
//         category: [ArticleCategory.TYPESCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Enums у TypeScript',
//                 paragraphs: [
//                     'Enums (перерахування) дозволяють створювати набір іменованих констант. Це корисно, коли потрібно працювати з фіксованими значеннями, які не змінюються.',
//                     'За допомогою Enums можна зробити код більш зрозумілим і легким для підтримки.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад Enum',
//                 code: 'enum Direction {\n  Up,\n  Down,\n  Left,\n  Right\n}\n\nlet move: Direction = Direction.Up;',
//             },
//         ],
//     },
//     {
//         id: '170',
//         title: 'Як TypeScript покращує безпеку типів проти JavaScript?',
//         subtitle: {
//             text: 'TypeScript vs. JavaScript у безпеці типів',
//         },
//         views: 1010,
//         createdAt: '20.06.2023',
//         user: {
//             id: 'Ue15ycXTpxVhCZ2eJoOVYaArKEa2',
//             username: 'mariaUser',
//             firstname: 'Maria',
//             lastname: 'Petrova',
//
//             email: 'mariaUser@gmail.com',
//
//             avatar: 'https://example.com/avatar15.jpg',
//         },
//         category: [ArticleCategory.TYPESCRIPT, ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Безпека типів у TypeScript',
//                 paragraphs: [
//                     'У JavaScript немає строгого контролю за типами, що може призводити до помилок на етапі виконання. TypeScript додає статичну типізацію, що дозволяє виявляти помилки на етапі компіляції.',
//                     'Це знижує ризик виникнення помилок і підвищує надійність коду.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Приклад типізації',
//                 paragraphs: [
//                     'Використовуючи TypeScript, можна уникнути ситуацій, коли функція отримує неправильні аргументи або повертає значення неправильного типу.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '171',
//         title: 'Які можливості для рефакторингу та підтримки коду надає TypeScript?',
//         subtitle: {
//             text: 'TypeScript для підтримки коду',
//         },
//         views: 850,
//         createdAt: '25.09.2023',
//         user: {
//             id: 'KXv8oUPLQeUXSzoXOWJV4nw47CG2',
//             username: 'maxAdmin',
//             firstname: 'Max',
//             lastname: 'Gordon',
//
//             email: 'maxAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar16.jpg',
//         },
//         category: [ArticleCategory.TYPESCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Рефакторинг з TypeScript',
//                 paragraphs: [
//                     'TypeScript значно полегшує рефакторинг коду завдяки строгій типізації. Виправлення помилок і змінення структури програми стає безпечнішим і швидшим.',
//                     'Інструменти для рефакторингу, такі як IntelliSense в IDE, допомагають виявляти проблеми на етапі написання коду.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Підтримка масштабних проектів',
//                 paragraphs: [
//                     'TypeScript ідеально підходить для масштабних проектів, оскільки дозволяє ефективніше організовувати код і забезпечує більшу передбачуваність поведінки.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '172',
//         title: 'Що таке Decorators у TypeScript і в яких випадках їх використовують?',
//         subtitle: {
//             text: 'Використання декораторів у TypeScript',
//         },
//         views: 980,
//         createdAt: '10.12.2023',
//         user: {
//             id: 'qkcVyIbnjYeEbaYVKGhtZrny7GC3',
//             username: 'sarahManager',
//             firstname: 'Sarah',
//             lastname: 'Cooper',
//
//             email: 'sarahManager@gmail.com',
//
//             avatar: 'https://example.com/avatar20.jpg',
//         },
//         category: [ArticleCategory.TYPESCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Декоратори в TypeScript',
//                 paragraphs: [
//                     'Декоратори — це спеціальні функції, які можна застосовувати до класів, методів, властивостей або параметрів. Вони додають метаінформацію або змінюють поведінку класу або методу.',
//                     'Декоратори корисні для написання повторно використовуваного коду та додавання функціональності, не змінюючи вихідний код.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад декоратора',
//                 code: 'function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {\n  const originalMethod = descriptor.value;\n  descriptor.value = function (...args: any[]) {\n    console.log(`Calling ${propertyKey} with`, args);\n    return originalMethod.apply(this, args);\n  };\n}\n\nclass Example {\n  @log\n  add(a: number, b: number) {\n    return a + b;\n  }\n}\n\nlet example = new Example();\nexample.add(2, 3);',
//             },
//         ],
//     },
//     {
//         id: '173',
//         title: 'Як у TypeScript використовують простори імен і модулі?',
//         subtitle: {
//             text: 'Простори імен та модулі у TypeScript',
//         },
//         views: 910,
//         createdAt: '05.02.2023',
//         user: {
//             id: 'mYX7XszmZJgEUSU9eeKDJYbP7P22',
//             username: 'claraUser',
//             firstname: 'Clara',
//             lastname: 'Santos',
//
//             email: 'claraUser@gmail.com',
//
//             avatar: 'https://example.com/avatar18.jpg',
//         },
//         category: [ArticleCategory.TYPESCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Простори імен і модулі',
//                 paragraphs: [
//                     "Простори імен (namespaces) і модулі (modules) в TypeScript допомагають організовувати код. Простори імен використовуються для групування логічно пов'язаних компонентів, а модулі — для поділу коду на файли.",
//                     'Це полегшує підтримку великих проектів та сприяє кращій читабельності коду.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'CODE' as ArticleSection.CODE,
//                 title: 'Приклад простору імен',
//                 code: "namespace Utils {\n  export function log(message: string) {\n    console.log(message);\n  }\n}\n\nUtils.log('Hello from namespace!');",
//             },
//         ],
//     },
//     {
//         id: '174',
//         title: 'Які стратегії міграції з JavaScript на TypeScript ви знаєте?',
//         subtitle: {
//             text: 'Поради щодо міграції з JavaScript на TypeScript',
//         },
//         views: 840,
//         createdAt: '01.04.2023',
//         user: {
//             id: 'Str49JTKBAOoaEhM8XeQLLLPPDp2',
//             username: 'tomAdmin',
//             firstname: 'Tom',
//             lastname: 'Anderson',
//
//             email: 'tomAdmin@gmail.com',
//
//             avatar: 'https://example.com/avatar19.jpg',
//         },
//         category: [ArticleCategory.TYPESCRIPT, ArticleCategory.JAVASCRIPT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Міграція на TypeScript',
//                 paragraphs: [
//                     'Міграція з JavaScript на TypeScript може бути поступовою. Одна з основних стратегій — це почати з додавання файлів з розширенням `.ts` в існуючий проект та поступово додавати типи.',
//                     'Також корисно спочатку додати TypeScript до нових модулів, поступово перетворюючи старі файли.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Стратегія поступового впровадження',
//                 paragraphs: [
//                     '1. Почніть з простих типів та перевірки.',
//                     '2. Використовуйте інструменти для автоматичного перетворення коду.',
//                     '3. Навчіться відловлювати помилки за допомогою інструментів, таких як ESLint.',
//                 ],
//             },
//         ],
//     },
//     {
//         id: '175',
//         title: 'Що відрізняє хороший код від поганого?',
//         subtitle: {
//             text: 'Ключові критерії якості коду',
//         },
//         views: 1120,
//         createdAt: '12.03.2023',
//         user: {
//             id: 'zM4UyVgfKNf2vrf5sXmBIxA5QOl2',
//             username: 'mainManager',
//             firstname: 'Maxim',
//             lastname: 'Shavlak',
//             email: 'mainManager@gmail.com',
//             avatar: 'https://st3.depositphotos.com/1071184/13782/v/450/depositphotos_137825710-stock-illustration-business-person-analyzing-financial-statistics.jpg',
//         },
//         category: [ArticleCategory.IT],
//         blocks: [
//             {
//                 id: '1',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Чіткість та зрозумілість',
//                 paragraphs: [
//                     'Гарний код — це код, який легко читати й розуміти. Він має бути логічно структурованим і мати зрозумілі назви змінних, функцій та класів. Поганий код часто важко зрозуміти через заплутані або надто короткі назви змінних, відсутність коментарів чи незрозумілу логіку.',
//                     'Якщо інші розробники (або ви самі через кілька місяців) не можуть швидко зрозуміти, що робить ваш код — це перший показник того, що його потрібно покращити.',
//                 ],
//             },
//             {
//                 id: '2',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Модульність та повторне використання',
//                 paragraphs: [
//                     'Гарний код складається з невеликих, незалежних модулів, кожен з яких виконує одну чітко визначену задачу. Це полегшує його тестування, підтримку та повторне використання. Поганий код часто має велику кількість повторюваних фрагментів, що ускладнює його зміну й тестування.',
//                     'Модульність також дозволяє легко масштабувати проєкт, оскільки кожен компонент може бути оновлений або замінений без значних змін в інших частинах системи.',
//                 ],
//             },
//             {
//                 id: '3',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Простота підтримки',
//                 paragraphs: [
//                     "Гарний код легко підтримувати. Він містить достатню кількість коментарів, але без зайвих деталей, які швидко застарівають. Поганий код часто має багато 'гарячкових виправлень', де рішення були прийняті поспіхом, без уваги до майбутнього розвитку програми.",
//                     'Код повинен бути написаний так, щоб його було легко оновлювати без необхідності переписувати всю систему.',
//                 ],
//             },
//             {
//                 id: '4',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Продуктивність та ефективність',
//                 paragraphs: [
//                     'Гарний код працює швидко та ефективно, використовуючи оптимальні алгоритми та структури даних. Поганий код часто страждає від низької продуктивності через неправильний вибір алгоритмів або неврахування ефективності на етапі розробки.',
//                     'Однак не завжди варто жертвувати зрозумілістю заради швидкості. У багатьох випадках важливо знайти баланс між простотою та продуктивністю.',
//                 ],
//             },
//             {
//                 id: '5',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Тестованість',
//                 paragraphs: [
//                     'Гарний код повинен бути легко тестованим. Це означає, що він написаний так, щоб окремі модулі або функції можна було перевіряти окремо, що полегшує пошук помилок. Поганий код часто важко тестувати через тісне переплетення логіки або відсутність модульності.',
//                     'Тестування — це важлива частина розробки, яка допомагає гарантувати стабільність і надійність програми в майбутньому.',
//                 ],
//             },
//             {
//                 id: '6',
//                 type: 'TEXT' as ArticleSection.TEXT,
//                 title: 'Гнучкість та масштабованість',
//                 paragraphs: [
//                     "Гарний код гнучкий та легко масштабується, що дозволяє адаптувати його до нових вимог або змін без значних переписувань. Поганий код часто настільки жорстко прив'язаний до поточних умов, що будь-яка зміна викликає каскад проблем в інших частинах системи.",
//                     'Вміння писати гнучкий код дозволяє легко інтегрувати нові функції та зменшує ризики під час розвитку проекту.',
//                 ],
//             },
//         ],
//     },
// ];
// const articlesCollection = collection(firestore, 'articles');
//
// async function uploadArticles(articles: Article[]) {
//     try {
//         // @ts-ignore
//         const promises = [];
//         articles.forEach((article) => {
//             const userDoc = doc(articlesCollection);
//             promises.push(setDoc(userDoc, article));
//         });
//
//         // @ts-ignore
//         await Promise.all(promises); // Wait for all uploads to complete
//         console.log('Articles uploaded successfully!');
//     } catch (error) {
//         console.error('Error uploading articles:', error);
//     }
// }
