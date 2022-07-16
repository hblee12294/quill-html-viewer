import { FC, useEffect, useRef, useState, useCallback } from 'react'
import pretty from 'pretty'
import hljs from 'highlight.js'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github.css'
// import 'highlight.js/styles/a11y-dark.css'
// import 'highlight.js/styles/a11y-light.css'
// import 'highlight.js/styles/hybrid.css'

import './Highlighter.css'
import { ReactComponent as Copy } from '../../assets/copy.svg'
import { Button } from '../Button/Button'

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
    setHTMLContent(beautifiedContent)
  }, [children])

  const onCopyHtmlContent = useCallback(() => {
    navigator.clipboard.writeText(htmlContent)
  }, [htmlContent])

  return (
    <>
      <div className="display-toolbar">
        <Button onClick={onCopyHtmlContent}>
          <Copy></Copy>
        </Button>
      </div>

      <pre className="highlighter-pre">
        <code
          ref={codeRef}
          className="hljs highlighter-code"
          dangerouslySetInnerHTML={{ __html: hljs.highlight(htmlContent, { language: 'xml' }).value }}
        ></code>
      </pre>
    </>
  )
}
