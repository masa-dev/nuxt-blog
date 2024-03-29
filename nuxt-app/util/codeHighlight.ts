import { highlightAll, hooks, plugins } from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-log'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-docker'

import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/show-language/prism-show-language'
import 'prismjs/plugins/treeview/prism-treeview.min.js'
import 'prismjs/plugins/treeview/prism-treeview.min.css'

import clipboardjs from 'clipboard'
import { isNullOrWhitespace } from './utilFunction'

export function codeHighlight() {
  initCopyToClipboardPrism()

  hooks.add('wrap', (env) => {
    if (env.type === 'tag') {
      if (env.content.match('<span class="token punctuation">&lt;</span>')) {
        const tagName = env.content.replaceAll(/<.+?>.+<\/span>/g, '')
        if (isNullOrWhitespace(tagName) === false) {
          if (tagName.match('-') || tagName.match(/[A-Z]/))
            env.classes.push('component-tag')
        }
      }
    }
    if (env.type === 'punctuation') {
      const stringPunctuation = ['"', "'"]

      if (stringPunctuation.includes(env.content)) {
        env.classes.push('string-punctuation')
      }
    }
    if (env.type === 'keyword') {
      const specialKeyword = [
        'try',
        'catch',
        'return',
        'as',
        'export',
        'default',
        'import',
        'from',
        'throw',
      ]

      if (specialKeyword.includes(env.content)) {
        env.classes.push('special-keyword')
      }
    }

    // language-log
    if (env.language === 'log') {
      if (env.type === 'property') {
        if (env.content.toLowerCase().includes('error')) {
          env.classes.push('property-error')
        }
      }
    }
  })
  highlightAll()
}

function initCopyToClipboardPrism() {
  let ClipboardJS = clipboardjs || undefined
  if (!ClipboardJS && typeof require === 'function') {
    ClipboardJS = require('clipboard')
  }

  const callbacks: any = []
  plugins.toolbar.registerButton('copy-to-clipboard', function (env: any) {
    const linkCopy = document.createElement('button')
    linkCopy.textContent = 'コピー'
    linkCopy.innerHTML = '<img src="/img/clipboard.svg" />'

    if (!ClipboardJS) {
      callbacks.push(registerClipboard)
    } else {
      registerClipboard()
    }
    return linkCopy

    function registerClipboard() {
      const clip = new ClipboardJS(linkCopy, {
        text() {
          return env.code
        },
      })

      clip.on('success', function () {
        linkCopy.classList.add('prism-copy-success')
        linkCopy.innerHTML = '<img src="/img/clipboard-check.svg" />'
        resetText()
      })
      clip.on('error', function () {
        linkCopy.classList.add('prism-copy-failure')
        linkCopy.innerHTML = '<img src="/img/clipboard-x.svg" />'
        resetText()
      })
    }

    function resetText() {
      setTimeout(function () {
        linkCopy.classList.remove('prism-copy-success')
        linkCopy.innerHTML = '<img src="/img/clipboard.svg" />'
      }, 5000)
    }
  })
}
