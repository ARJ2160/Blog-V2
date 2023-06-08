'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { Tiptap } from '../../components/TipTap';
import { SessionTypes } from '../../lib/types';
import { useSession } from 'next-auth/react';
import { Button } from '../../components/ui/button';

const Create = (): JSX.Element => {
  const { data: session }: SessionTypes = useSession();
  const [description, setDescription] = useState('');
  // const editorRef = useRef(null);
  // const [title, setTitle] = useState('');
  // const [body, setBody] = useState('');
  // const [author, setAuthor] = useState('');
  // // const [image, setImage] = useState('');
  // // const [isPending, setIsPending] = useState(false);
  // // const [isPrestine, setIsPrestine] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const blog = {
      _id: uuidv4(),
      // title,
      author: session?.user?.name,
      postBody: description
    };
    console.log('>>', blog);
    fetch((process.env.NEXT_PUBLIC_BACKEND_URL + 'postsdata') as string, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    }).then(() => {
      // setIsPending(false);
      // setIsPrestine(false);
    });
  };

  // const handleTitleChange = (title: string) => {
  //   setTitle(title);
  // };

  // const handleImageChange = (title: string) => {
  //   setImage(title);
  // };

  // return (
  //   <div className='w-screen min-h-screen flex justify-center items-center text-center'>
  //     <div className='grid grid-cols-2'>
  //       <div className='col-span-1'>
  //         <Editor
  //           // id={}
  //           apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
  //           onInit={(evt: any, editor: any) => (editorRef.current = editor)}
  //           initialValue=''
  //           onEditorChange={(newValue, editor) => handleEditorChange(newValue)}
  //           value={body}
  //           init={{
  //             height: 500,
  //             menubar: true,
  //             plugins: [
  //               'advlist',
  //               'autolink',
  //               'lists',
  //               'link',
  //               'image',
  //               'charmap',
  //               'preview',
  //               'anchor',
  //               'searchreplace',
  //               'visualblocks',
  //               'code',
  //               'fullscreen',
  //               'insertdatetime',
  //               'media',
  //               'table',
  //               'code',
  //               'help',
  //               'wordcount'
  //             ],
  //             toolbar:
  //               'undo redo | blocks | ' +
  //               'bold italic forecolor | alignleft aligncenter ' +
  //               'alignright alignjustify | bullist numlist outdent indent | ' +
  //               'removeformat | help',
  //             content_style:
  //               'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  //             paste_data_images: true
  //           }}
  //           scriptLoading={{ async: true }}
  //         />
  //       </div>
  //       <div className='col-span-1 flex justify-center items-center'>
  //         <div className='right-sidebar '>
  //           <Box>
  //             <div className='title'>
  //               <InputLabel shrink>Title</InputLabel>
  //               <Input
  //                 className='input-label'
  //                 value={title}
  //                 onChange={e => handleTitleChange(e.target.value)}
  //               />
  //             </div>
  //             <div className='author'>
  //               <InputLabel shrink>Author</InputLabel>
  //               <Input
  //                 className='input-label'
  //                 value={author}
  //                 onChange={e => handleAuthorChange(e.target.value)}
  //               />
  //             </div>
  //             {/* <div className='image'>
  //               <InputLabel shrink>Image</InputLabel>
  //               <Input
  //                 type='text'
  //                 className='input-label'
  //                 value={image}
  //                 onChange={e => handleImageChange(e.target.value)}
  //               />
  //               <Editor
  //                 id={}
  //                 apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
  //                 onInit={(evt: any, editor: any) =>
  //                   (editorRef.current = editor)
  //                 }
  //                 onEditorChange={(newValue, editor) => setImage(newValue)}
  //                 value={image}
  //                 init={{
  //                   height: 200,
  //                   menubar: false,
  //                   plugins: [],
  //                   toolbar: false,
  //                   content_style:
  //                     'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  //                   paste_data_images: true,
  //                   file_picker_callback: (callback, value, meta) => {
  //                     if (meta.filetype == 'image') {
  //                       callback('myimage.jpg', { alt: 'My alt text' });
  //                     }

  //                   },
  //                   branding: false,
  //                 }}
  //                 scriptLoading={{ async: true }}
  //               />
  //             </div> */}
  //             <div className='publish'>
  //               <Button
  //                 // disabled={!isPrestine || isPending}
  //                 className='text-black hover:text-white'
  //                 onClick={handleSubmit}
  //                 fullWidth
  //                 variant='contained'
  //               >
  //                 PUBLISH
  //               </Button>
  //             </div>
  //           </Box>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className='mt-40 flex flex-col justify-center items'>
      <Tiptap setDescription={setDescription} />
      <Button
        className='h-16 bg-black text-white hover:bg-black '
        variant='secondary'
        onClick={handleSubmit}
      >
        PUBLISH
      </Button>
    </div>
  );
};

export default Create;
