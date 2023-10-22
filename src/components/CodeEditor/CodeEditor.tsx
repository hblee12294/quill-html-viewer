import { useEffect, useCallback, useRef } from 'react'
import Editor, { OnMount, OnChange, Monaco } from '@monaco-editor/react'

import './CodeEditor.css'
import { ReactComponent as Copy } from '../../assets/copy.svg'
import { Button } from '../Button/Button'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  const monacoRef = useRef<Monaco>()

  useEffect(() => {
    const monaco = monacoRef.current

    if (monaco) {
      const editor = monaco.editor.getEditors()[0]!
      editor.trigger('editor', 'editor.action.formatDocument', undefined)
    }
  }, [value])

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monacoRef.current = monaco
  }

  const handleEditorChange: OnChange = useCallback(
    (val, e) => {
      if (val) {
        const autoFormat = (e.changes[0] as any).forceMoveMarkers

        if (!autoFormat) {
          onChange(val)
        }
      }
    },
    [onChange],
  )

  const onCopyHtmlContent = useCallback(() => {
    navigator.clipboard.writeText(value)
  }, [value])

  return (
    <>
      <div className="code-editor-toolbar">
        <Button onClick={onCopyHtmlContent}>
          <Copy></Copy>
        </Button>
      </div>

      <Editor
        defaultLanguage="html"
        value={value}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          formatOnType: true,
          formatOnPaste: true,
        }}
      />
    </>
  )
}
