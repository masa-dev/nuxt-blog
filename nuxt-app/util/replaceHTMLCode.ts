import axios from 'axios'
import * as cheerio from 'cheerio'

export async function replaceHTMLCode(html: string) {
  // コードブロックにファイル名を表示できるようにする
  let replacedHtml = html.replaceAll(
    /<pre><code class="language-.+?:(.+?)">/g,
    replaceCodeBlockTag
  )

  const urlTagList = replacedHtml.matchAll(
    /<a href="(https?:\/\/.+?)">https?:\/\/.+?<\/a>/g
  )
  for (const url of urlTagList) {
    const linkTag = url[0]
    const linkUrl = url[1]
    if (linkTag.match(`<a href="${linkUrl}">${linkUrl}</a>`)) {
      const linkCard = await createLinkCard(linkUrl, linkTag)
      replacedHtml = replacedHtml.replaceAll(linkTag, linkCard)
    }
  }

  return replacedHtml
}

function replaceCodeBlockTag(match: string, fileName: string) {
  return match
    .replace(`:${fileName}`, '')
    .replace('<pre>', `<pre data-label="${fileName}">`)
}

async function createLinkCard(url: string, linkTag: string): Promise<string> {
  try {
    if (url.match(/https?:\/\/localhost/)) {
      return linkTag
    }

    const response = await axios.get<string>(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })

    const $ = cheerio.load(response.data)

    const head = {
      baseDomain: url.match(/https?:\/\/(.+?)(\/|$)/)![1],
      iconUrl: $('link[rel=icon]').attr('href'),
      title: $('title').text(),
      description: $('meta[property="description"]').attr('content'),
      ogDescription: $('meta[property="og:description"]').attr('content'),
      ogImageUrl: $('meta[property="og:image"]').attr('content'),
    }

    const html = `<div class="link-card my-3">
  <a href="${url}" class="d-flex w-100" target="_blank" rel="noopener noreferrer">
    <div class="">
      <img alt="${head.title}" src="${head.ogImageUrl}"/>
    </div>
    <div class="link-card-text py-1 px-3">
      <div class="link-card-title">${head.title}</div>
      <div class="link-card-description">${
        head.description || head.ogDescription
      }</div>
      <div class="link-card-siteinfo"><img src="${head.iconUrl}"/><span>${
      head.baseDomain
    }</span></div>
    </div>
  </a>
</div>`
    return html
  } catch (e) {
    return linkTag
  }
}
