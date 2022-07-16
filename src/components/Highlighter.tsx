import { FC, useEffect, useRef, useState } from 'react'
import hljs from 'highlight.js'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github.css'
// import 'highlight.js/styles/monokai.css'
import pretty from 'pretty'

import styles from './Highlighter.module.css'

hljs.registerLanguage('xml', xml)

interface HighlighterProps {
  children: string
}

export const Highlighter: FC<HighlighterProps> = ({ children }) => {
  const codeRef = useRef<HTMLElement>(null)

  const [htmlContent, setHTMLContent] = useState(children)

  useEffect(() => {
    if (!codeRef.current) return

    const beautifiedContent = pretty(children)
    const highlightedHtml = hljs.highlight(beautifiedContent, { language: 'xml' }).value

    setHTMLContent(highlightedHtml)
  }, [children])

  return (
    <pre className={styles.pre}>
      <code ref={codeRef} className="hljs" dangerouslySetInnerHTML={{ __html: htmlContent }}></code>
    </pre>
  )
}
