import { FC, ReactNode, useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github.css'

hljs.registerLanguage('xml', xml)

interface HighlighterProps {
  children?: ReactNode
}

export const Highlighter: FC<HighlighterProps> = ({ children }) => {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!codeRef.current) return

    hljs.highlightElement(codeRef.current)
  }, [children])

  return (
    <pre>
      <code ref={codeRef} className="xml">
        {children}
      </code>
    </pre>
  )
}
