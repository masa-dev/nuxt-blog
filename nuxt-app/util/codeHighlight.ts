import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-markdown'

export function codeHighlight() {
  Prism.hooks.add('wrap', (env) => {
    if (env.type !== 'keyword') {
      return
    }

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
  })
  Prism.highlightAll()
}
