import { Language } from '../types/language';

export const LANGUAGE_VERSIONS: Record<Language, string> = {
    javascript: '18.15.0',
    typescript: '5.0.3',
    python: '3.10.0',
    java: '15.0.2',
    csharp: '6.12.0',
    php: '8.2.3',
    html: '5.0.0',
    css: '3.0.0',
    scss: '1.62.1',
};

export const CODE_SNIPPETS: Record<Language, string> = {
    javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
    typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
    python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    csharp: `using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n`,
    php: "<?php\n\n$name = 'Alex';\necho $name;\n",
    html: `<!DOCTYPE html>\n<html>\n<head>\n\t<title>Hello World</title>\n</head>\n<body>\n\t<h1>Hello, World!</h1>\n</body>\n</html>`,
    css: `body {\n\tfont-family: Arial, sans-serif;\n\tbackground-color: #f0f0f0;\n\tmargin: 0;\n\tpadding: 0;\n}\n\nh1 {\n\tcolor: #333;\n\ttext-align: center;\n}`,
    scss: `$primary-color: #333;\n$font-stack: Arial, sans-serif;\n\nbody {\n\tfont-family: $font-stack;\n\tbackground-color: lighten($primary-color, 40%);\n\tmargin: 0;\n\tpadding: 0;\n\n\th1 {\n\t\tcolor: $primary-color;\n\t\ttext-align: center;\n\t}\n}`,
};
