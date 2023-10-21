import { useCallback } from 'react'
import Editor, { OnChange } from '@monaco-editor/react'

import './CodeEditor.css'
import { ReactComponent as Copy } from '../../assets/copy.svg'
import { Button } from '../Button/Button'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  const handleEditorChange: OnChange = useCallback(
    (val) => {
      if (val) {
        onChange(val)
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

      <Editor defaultLanguage="html" value={value} onChange={handleEditorChange} />
    </>
  )
}
