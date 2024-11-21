'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { Button } from '../ui/button'
import { extensions } from './tiptapExtensions'
import MenuBar from './MenuBar'
import { Separator } from '../ui/separator'

type TipTapProps =  {
    content: string;
    onDataChange: (html: string) => void;
    disabled: boolean;
    ref: any
}

const Editor = ({ onDataChange, content, disabled , ref}: TipTapProps) => {
  const editor = useEditor({
    extensions: extensions,
    content: content,
    editable: !disabled,
    editorProps: {
        attributes: {
            class:
            "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none m-5 focus:outline-none prose-pre:bg-[#282c34] prose-pre:text-[#abb2bf]",
        },
    },
    onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onDataChange(html);
    }
  })

  return (
    <div className="w-full relative border border-input bg-transparent rounded-md shadow-sm transition-colors">
        {!disabled && <MenuBar editor={editor} />}
        <Separator className="my-1"/>
        <EditorContent ref={ref} editor={editor} />       
    </div>
)
}

export default Editor
