import { createHighlighter, type BundledTheme } from "shiki";

const HtmlCodeLangRegex = /class="language-(?<lang>[^:]+?)(:(?<filename>.+?))?"/;

const createShikiHighlighter = async (body: string, theme: BundledTheme | "none") => {
    var langs = [...body.matchAll(new RegExp(HtmlCodeLangRegex, "g"))]
        .map((lgs) => lgs.groups?.lang ?? "")
        .filter(Boolean);
    langs = Array.from(new Set(langs));

    return await createHighlighter({ langs, themes: [theme] });
}

const createFileNameElement = (fileName: string | null | undefined) => {
    if (!fileName) return "";
    return `<div class="post-code-info"><span>${fileName}</span></div>`;
}

export const highlightCode = async (body: string, theme: BundledTheme | "none") => {
    const highlighter = await createShikiHighlighter(body, theme);
    return body.replace(
        /<pre><code(.+?)>([\s\S]+?)<\/code><\/pre>/g,
        (_, language: string, code: string) => {
            const langMatch = language.match(HtmlCodeLangRegex);
            const retHTML = highlighter.codeToHtml(
                code
                    .replace(/&quot;/g, '"')
                    .replace(/&apos;/g, "'")
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")
                    .replace(/&amp;/g, "&"),
                { lang: langMatch?.groups?.lang ?? "", theme }
            );

            const fileNameEl = createFileNameElement(langMatch?.groups?.filename);

            if (fileNameEl) {
                return fileNameEl + retHTML.replace('<pre class="', '<pre class="code-with-file ')
            }
            return fileNameEl + retHTML;
        });
}