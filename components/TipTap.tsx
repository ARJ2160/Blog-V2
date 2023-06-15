import { EditorContent, useEditor } from '@tiptap/react';
import Code from '@tiptap/extension-code';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Typography from '@tiptap/extension-typography';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
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
  description,
  setDescription,
  setImages
}: TipTapProps) => {
  const HTML_REGEX = /<\/?[^>]+(>|$)/g;

  Image.configure({
    inline: true,
    allowBase64: true
  });
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
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
        class: '!min-h-[30rem]'
      }
      // handleDrop: function (view: any, event: any, moved: any) {
      //   if (
      //     !moved &&
      //     event.dataTransfer &&
      //     event.dataTransfer.files &&
      //     event.dataTransfer.files[0]
      //   ) {
      //     // if dropping external files
      //     let file = event.dataTransfer.files[0]; // the dropped file
      //     let filesize = parseInt((file.size / 1024 / 1024).toFixed(4)); // get the filesize in MB
      //     if (
      //       (file.type === 'image/jpeg' || file.type === 'image/png') &&
      //       filesize < 10
      //     ) {
      //       // check valid image type under 10MB
      //       // check the dimensions
      //       let _URL = window.URL || window.webkitURL;
      //       let img: any = new Image(); /* global Image */
      //       img.src = _URL.createObjectURL(file);
      //       img.onload = function () {
      //         if (this.width > 5000 || this.height > 5000) {
      //           window.alert(
      //             'Your images need to be less than 5000 pixels in height and width.'
      //           ); // display alert
      //         } else {
      //           // valid image so upload to server
      //           // uploadImage will be your function to upload the image to the server or s3 bucket somewhere
      //           setImages(file)
      //             .then((response: any) => {
      //               // response is the image url for where it has been saved
      //               // pre-load the image before responding so loading indicators can stay
      //               // and swaps out smoothly when image is ready
      //               let image = new Image();
      //               image.src = response;
      //               image.onload = function () {
      //                 // place the now uploaded image in the editor where it was dropped
      //                 const { schema } = view.state;
      //                 const coordinates = view.posAtCoords({
      //                   left: event.clientX,
      //                   top: event.clientY
      //                 });
      //                 const node = schema.nodes.image.create({ src: response }); // creates the image element
      //                 const transaction = view.state.tr.insert(
      //                   coordinates.pos,
      //                   node
      //                 ); // places it in the correct position
      //                 return view.dispatch(transaction);
      //               };
      //             })
      //             .catch((error: any) => {
      //               if (error) {
      //                 window.alert(
      //                   'There was a problem uploading your image, please try again.'
      //                 );
      //               }
      //             });
      //         }
      //       };
      //     } else {
      //       window.alert(
      //         'Images need to be in jpg or png format and less than 10mb in size.'
      //       );
      //     }
      //     return true; // handled
      //   }
      //   return false; // not handled use default behaviour
      // }
    }
  });

  return (
    <div className='textEditor min-w-[80vw] min-h-[30rem] '>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
