import { useRef, useEffect, useState } from 'react'
import Quill from 'quill'

import './App.css'
import { Highlighter } from './components'

function App() {
  const quillContainerRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<Quill>()

  const [htmlContent, setHTMLContent] = useState('')

  useEffect(() => {
    if (!quillContainerRef.current || quillRef.current) return

    const quill = new Quill(quillContainerRef.current, {
      modules: {
        toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline'], ['image', 'code-block']],
      },
      placeholder: 'Compose an epic...',
      theme: 'snow', // or 'bubble'
    })

    quill.on('text-change', () => {
      setHTMLContent(quill.root.innerHTML)
    })

    quillRef.current = quill
  }, [])

  return (
    <div className="wrap">
      <div className="editor">
        <div className="quill-container" ref={quillContainerRef}></div>
      </div>

      <div className="display">
        <Highlighter>{htmlContent}</Highlighter>
      </div>
    </div>
  )
}

export default App
