import { useRef, useEffect, useState, useCallback } from 'react'
import Quill from 'quill'

import './App.css'
import { CodeEditor } from './components'

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  ['bold', 'italic', 'underline', 'strike', { script: 'sub' }, { script: 'super' }], // toggled buttons

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme

  [{ list: 'ordered' }, { list: 'bullet' }],

  ['blockquote', 'code-block', 'link', 'image'],

  ['clean'], // remove formatting button
]

function App() {
  const quillContainerRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<Quill>()

  const [htmlContent, setHTMLContent] = useState('')

  useEffect(() => {
    if (!quillContainerRef.current || quillRef.current) return

    const quill = new Quill(quillContainerRef.current, {
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: 'Type here ...',
      theme: 'snow', // or 'bubble'
    })

    quill.on('text-change', () => {
      setHTMLContent(quill.root.innerHTML)
    })

    quillRef.current = quill
  }, [])

  const onCodeEditorChange = useCallback((value: string) => {
    const quill = quillRef.current
    if (!quill) return

    quill.enable(false)
    quill.clipboard.dangerouslyPasteHTML(value, 'silent')
    quill.enable(true)
  }, [])

  return (
    <div className="wrap">
      <div className="editor">
        <div className="quill-container" ref={quillContainerRef}></div>
      </div>

      <div className="display">
        <CodeEditor value={htmlContent} onChange={onCodeEditorChange}></CodeEditor>
      </div>
    </div>
  )
}

export default App
