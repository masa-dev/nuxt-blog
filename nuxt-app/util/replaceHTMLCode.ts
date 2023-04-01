export function replaceHTMLCode(html: string) {
  // コードブロックにファイル名を表示できるようにする
  return html.replaceAll(
    /<pre><code class=\"language-.+?:(.+?)\">/g,
    replaceCodeBlockTag
  )

  function replaceCodeBlockTag(match: string, fileName: string) {
    return match
      .replace(`:${fileName}`, '')
      .replace('<pre>', `<pre data-label="${fileName}">`)
  }
}
