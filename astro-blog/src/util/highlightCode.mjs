import { createHighlighter } from "shiki";

const htmlCodeLangRegex =
  /class="language-(?<lang>[^:]+?)(:(?<filename>.+?))?"/;

const createShikiHighlighter = async (body, theme) => {
  let langs = [...body.matchAll(new RegExp(htmlCodeLangRegex, "g"))]
    .map((match) => match.groups?.lang ?? "")
    .filter(Boolean);
  langs = Array.from(new Set(langs));
  return createHighlighter({ langs, themes: [theme] });
};

const createFileNameElement = (fileName) => {
  if (!fileName) return "";
  return `<div class="post-code-info"><span>${fileName}</span></div>`;
};

export const highlightCode = async (body, theme) => {
  const highlighter = await createShikiHighlighter(body, theme);
  return body.replace(
    /<pre><code(.+?)>([\s\S]+?)<\/code><\/pre>/g,
    (_, language, code) => {
      const langMatch = language.match(htmlCodeLangRegex);
      const html = highlighter.codeToHtml(
        code
          .replace(/&quot;/g, '"')
          .replace(/&apos;/g, "'")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&amp;/g, "&"),
        { lang: langMatch?.groups?.lang ?? "text", theme },
      );
      const fileNameEl = createFileNameElement(langMatch?.groups?.filename);
      if (fileNameEl) {
        return (
          fileNameEl +
          html.replace('<pre class="', '<pre class="code-with-file ')
        );
      }
      return fileNameEl + html;
    },
  );
};
