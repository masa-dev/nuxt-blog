import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-log'

import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/treeview/prism-treeview.min.js'
import 'prismjs/plugins/treeview/prism-treeview.min.css'

import clipboardjs from 'clipboard'

export function codeHighlight() {
  initCopyToClipboardPrism()
  Prism.hooks.add('wrap', (env) => {
    if (env.type == 'punctuation') {
      const stringPunctuation = ['"', "'"]

      if (stringPunctuation.some((sp) => sp == env.content)) {
        env.classes.push('string-punctuation')
      }
    }
    if (env.type == 'keyword') {
      const specialKeyword = [
        'try',
        'catch',
        'return',
        'as',
        'export',
        'default',
        'import',
        'from',
      ]

      if (specialKeyword.some((sk) => sk == env.content)) {
        env.classes.push('special-keyword')
      }
    }
  })
  Prism.highlightAll()
}

function initCopyToClipboardPrism() {
  var ClipboardJS = clipboardjs || undefined
  if (!ClipboardJS && typeof require === 'function') {
    ClipboardJS = require('clipboard')
  }

  var callbacks: any = []
  Prism.plugins.toolbar.registerButton(
    'copy-to-clipboard',
    function (env: any) {
      var linkCopy = document.createElement('button')
      linkCopy.textContent = 'コピー'
      linkCopy.innerHTML = '<img src="/img/clipboard.svg" />'

      if (!ClipboardJS) {
        callbacks.push(registerClipboard)
      } else {
        registerClipboard()
      }
      return linkCopy

      function registerClipboard() {
        var clip = new ClipboardJS(linkCopy, {
          text: function () {
            return env.code
          },
        })

        clip.on('success', function () {
          //linkCopy.textContent = 'コピー完了!'
          linkCopy.classList.add('prism-copy-success')
          linkCopy.innerHTML = '<img src="/img/clipboard-check.svg" />'
          resetText()
        })
        clip.on('error', function () {
          linkCopy.textContent = 'Ctrl+Cでコピー'
          resetText()
        })
      }

      function resetText() {
        setTimeout(function () {
          //linkCopy.textContent = 'コピー'
          linkCopy.classList.remove('prism-copy-success')
          linkCopy.innerHTML = '<img src="/img/clipboard.svg" />'
        }, 5000)
      }
    }
  )
}
