import { EditorContent, useEditor } from '@tiptap/react';
import Typography from '@tiptap/extension-typography';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Heading from '@tiptap/extension-heading';
import Code from '@tiptap/extension-code';
import {
  FaBold,
  FaCode,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo
} from 'react-icons/fa';
import { SmilieReplacer } from '../lib/SimilieReplacer';
import { ColorHighlighter } from '../lib/ColorHighlighter';
import { TipTapProps } from '../lib/types';
import { Input } from './ui/input';
import { Editor } from '@tiptap/core';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className='menuBar'>
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is_active' : ''}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is_active' : ''}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is_active' : ''}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is_active' : ''}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'is_active' : ''
          }
        >
          <FaHeading className='heading1' />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is_active' : ''
          }
        >
          <FaHeading className='heading2' />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? 'is_active' : ''
          }
        >
          <FaHeading className='heading3' />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is_active' : ''}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is_active' : ''}
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is_active' : ''}
        >
          <FaQuoteLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is_active' : ''}
        >
          <FaCode />
        </button>
      </div>
      <div>
        <button onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

export const Tiptap = ({
  title,
  setTitle,
  description,
  setDescription
}: TipTapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Typography,
      ColorHighlighter,
      SmilieReplacer,
      OrderedList,
      ListItem,
      Code,
      Heading.configure({
        levels: [1, 2, 3]
      })
    ],
    content: description,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setDescription(html);
    },
    editorProps: {
      attributes: {
        class: '!min-h-[512px] !max-h-screen overflow-y-auto'
      }
    }
  });

  return (
    <>
      <div className='blog-title'>
        <div className='mb-2'>Title</div>
        <Input
          value={title}
          className='focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className='blog-body mt-2'>
        <div className='mb-2'>Blog Body</div>
        <div className='textEditor '>
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
};
