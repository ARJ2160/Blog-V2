import { useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';
import { Editor } from '@tinymce/tinymce-react';
import { uuid } from 'uuidv4';
import Navbar from '../components/Navbar';
import { Input } from '@mui/material';
import React from 'react';

const Create = (): JSX.Element => {
  // const modules = {
  //   toolbar: [
  //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //     ['bold', 'italic', 'underline', 'strike', 'link', 'code'], // toggled buttons
  //     ['image', 'blockquote', 'code-block'],
  //     [{ list: 'ordered' }, { list: 'bullet' }],
  //     [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  //     // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  //     // [{ 'font': [] }],
  //     ['clean'] // remove formatting button
  //   ]
  // };

  const editorRef = useRef('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [imagesrc, setImg] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const blog = { _id: uuid(), title, author, postBody: body, imagesrc };
    fetch('https://react-blog-backend-sigma.vercel.app/postdata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    }).then(() => {
      setIsPending(false);
    });
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className='create'>
        <div className='create-header'>
          <h2 className='create-heading'>Write Post</h2>
          <button className='preview-button'>Preview</button>
        </div>
        <form onSubmit={handleSubmit} id='form1'>
          <div className='create-container'>
            <div className='blog-body'>
              <div id='editor-container'>
                {/* <ReactQuill
                value={body}
                onChange={setBody}
                modules={modules}
                theme='snow'
              /> */}
                <Editor
                  onInit={(evt: any, editor: any) =>
                    (editorRef.current = editor)
                  }
                  initialValue=''
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                      'undo redo | formatselect | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                  onChange={e => setBody(e.target.value)}
                />
              </div>
            </div>
            <div className='create-right-sidebar'>
              {!isPending && (
                <button type='submit' form='form1' className='submit-button'>
                  Publish
                </button>
              )}

              <div className='create-right-inputs'>
                <div className='input-group'>
                  <label>Blog Title</label>
                  <Input />
                  <input
                    type='text'
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>

                <div className='input-group'>
                  <label>Thumbnail Image</label>
                  <input
                    type='text'
                    required
                    value={imagesrc}
                    onChange={e => setImg(e.target.value)}
                  ></input>
                </div>

                <div className='input-group'>
                  <label>Blog Author</label>
                  <input
                    type='text'
                    required
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
          </div>
          {isPending && <button disabled>Loading</button>}
        </form>
      </div>
    </React.Fragment>
  );
};

export default Create;
