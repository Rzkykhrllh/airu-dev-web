import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from 'lexical'

interface PostContentProps {
  content: SerializedEditorState
}

export default function PostContent({ content }: PostContentProps) {
  const html = convertLexicalToHTML({ data: content })

  return (
    <div
      className="prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        // Base typography
        lineHeight: '1.8',
        fontSize: '1rem',
        color: '#0f172a',
      }}
    />
  )
}
