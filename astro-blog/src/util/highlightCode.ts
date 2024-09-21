import { createHighlighter } from "shiki";

const HtmlCodeLangRegex = /class="language-(?<lang>[^:]+?)(:(?<filename>.+?))?"/;

const createShikiHighlighter = async (body: string) => {
    var langs = [...body.matchAll(new RegExp(HtmlCodeLangRegex, "g"))]
        .map((lgs) => lgs.groups?.lang ?? "")
        .filter(Boolean);
    langs = Array.from(new Set(langs));

    return await createHighlighter({ langs, themes: ["dark-plus"] });
}

const createFileNameElement = (fileName: string | null | undefined) => {
    if (!fileName) return "";
    return `<div class="post-code-info"><span>${fileName}</span></div>`;
}

export const highlightCode = async (body: string) => {
    const highlighter = await createShikiHighlighter(body);
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
                { lang: langMatch?.groups?.lang ?? "", theme: "dark-plus" }
            );

            const fileNameEl = createFileNameElement(langMatch?.groups?.filename);

            if (fileNameEl) {
                return fileNameEl + retHTML.replace('<pre class="', '<pre class="code-with-file ')
            }
            return fileNameEl + retHTML;
        });
}