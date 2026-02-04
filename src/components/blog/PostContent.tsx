import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from 'lexical'

interface PostContentProps {
  content: SerializedEditorState
}

export default function PostContent({ content }: PostContentProps) {
  const html = convertLexicalToHTML({ data: content })

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
