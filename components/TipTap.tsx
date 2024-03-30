import { EditorContent, useEditor } from '@tiptap/react';
import Code from '@tiptap/extension-code';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Typography from '@tiptap/extension-typography';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

import {
  FaBold,
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

const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <div className='menuBar'>
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
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
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is_active' : ''
          }
        >
          <FaHeading />
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
  const HTML_REGEX = /<\/?[^>]+(>|$)/g;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Document,
      Paragraph,
      Text,
      Code,
      Typography,
      ColorHighlighter,
      SmilieReplacer
    ],
    content: description,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const removeHtmlTags = html.replace(HTML_REGEX, '');
      setDescription(removeHtmlTags);
    },
    editorProps: {
      attributes: {
        class: '!min-h-[50vh]'
      }
    }
  });

  return (
    <>
      <div className='blog-title'>
        <div className='mb-2'>Title</div>
        <div className='textEditor'>
          <Input value={title} onChange={e => setTitle(e.target.value)} />
        </div>
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
