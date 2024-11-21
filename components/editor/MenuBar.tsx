import {
    AiOutlineBold,
    AiOutlineClose,
    AiOutlineEnter,
    AiOutlineItalic,
    AiOutlineOrderedList,
    AiOutlineRedo,
    AiOutlineStrikethrough,
    AiOutlineUndo,
    AiOutlineUnorderedList,
  } from "react-icons/ai";
  import { BiParagraph } from "react-icons/bi";
  import { FiCode } from "react-icons/fi";
  import { MdOutlineLayersClear } from "react-icons/md";
  import { PiCodeBlock, PiQuotes } from "react-icons/pi";
  import { TbSpacingVertical } from "react-icons/tb";
import { Button } from "../ui/button";
import { Editor } from "@tiptap/react";

type MenuBarProps = {
    editor:  Editor | null; // Replace with actual type when using this component in a real-world application
}
  
  const MenuBar = ({ editor }: MenuBarProps) => {
    if (!editor) {
      return null;
    }
  
    return (
      <div className="p-5 sticky top-3 left-0 right-0 z-10 flex gap-2 flex-wrap">
        <Button
          variant="outline" 
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`editor-btn font-black ${
            editor.isActive("heading", { level: 1 }) && "active-editor-btn"
          }`}
        >
          H1
        </Button>
        <Button
          variant="outline" 
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`editor-btn font-extrabold ${
            editor.isActive("heading", { level: 2 }) && "active-editor-btn"
          }`}
        >
          H2
        </Button>
        <Button
          variant="outline" 
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`editor-btn font-semibold ${
            editor.isActive("heading", { level: 3 }) && "active-editor-btn"
          }`}
        >
          H3
        </Button>
        <Button
          variant="outline" 
          size="icon"        
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={`editor-btn font-medium ${
            editor.isActive("heading", { level: 4 }) && "active-editor-btn"
          }`}
        >
          H4
        </Button>
        <Button
          variant="outline" 
          size="icon"        
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={`editor-btn font-normal ${
            editor.isActive("heading", { level: 5 }) && "active-editor-btn"
          }`}
        >
          H5
        </Button>
        <Button
          variant="outline" 
          size="icon"        
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={`editor-btn font-normal ${
            editor.isActive("heading", { level: 6 }) && "active-editor-btn"
          }`}
        >
          H6
        </Button>
        <Button
          variant="outline" 
          size="icon"        
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`editor-btn ${
            editor.isActive("bold") && "active-editor-btn"
          }`}
        >
          <AiOutlineBold />
        </Button>
        <Button
          variant="outline" 
          size="icon"        
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`editor-btn ${
            editor.isActive("italic") && "active-editor-btn"
          }`}
        >
          <AiOutlineItalic />
        </Button>
        <Button
          variant="outline" 
          size="icon"        
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`editor-btn ${
            editor.isActive("strike") && "active-editor-btn"
          }`}
        >
          <AiOutlineStrikethrough />
        </Button>
        <Button
          variant="outline" 
          size="icon"        
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`editor-btn ${
            editor.isActive("code") && "active-editor-btn"
          }`}
        >
          <FiCode />
        </Button>
        <Button
          variant="outline" 
          size="icon"        
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className={`editor-btn`}
        >
          <MdOutlineLayersClear />
        </Button>
        <Button
          variant="outline" 
          size="icon"          
          onClick={() => editor.chain().focus().clearNodes().run()}
          className={`editor-btn`}
        >
          <AiOutlineClose />
        </Button>
        <Button
          variant="outline" 
          size="icon"        
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`editor-btn ${
            editor.isActive("paragraph") && "active-editor-btn"
          }`}
        >
          <BiParagraph />
        </Button>
  
        <Button
          variant="outline" 
          size="icon"        
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`editor-btn ${
            editor.isActive("bulletList") && "active-editor-btn"
          }`}
        >
          <AiOutlineUnorderedList />
        </Button>
        <Button
          variant="outline" 
          size="icon"        
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`editor-btn ${
            editor.isActive("orderedList") && "active-editor-btn"
          }`}
        >
          <AiOutlineOrderedList />
        </Button>
        <Button
          variant="outline" 
          size="icon"        
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`editor-btn ${
            editor.isActive("codeBlock") && "active-editor-btn"
          }`}
        >
          <PiCodeBlock />
        </Button>
        <Button
          variant="outline" 
          size="icon"        
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`editor-btn ${
            editor.isActive("blockquote") && "active-editor-btn"
          }`}
        >
          <PiQuotes />
        </Button>
        <Button
          variant="outline" 
          size="icon"        
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={`editor-btn`}
        >
          <TbSpacingVertical />
        </Button>
        <Button
          variant="outline" 
          size="icon"          
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className={`editor-btn`}
        >
          <AiOutlineEnter />
        </Button>
        <Button
          variant="outline" 
          size="icon"        
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className={`editor-btn`}
        >
          <AiOutlineUndo />
        </Button>
        <Button
          variant="outline" 
          size="icon"        
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={`editor-btn`}
        >
          <AiOutlineRedo />
        </Button>
      </div>
    );
  };
  
  export default MenuBar;