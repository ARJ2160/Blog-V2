import React from 'react';
import { EditorProps } from '../lib/types';
import { Tiptap, Button, Icons, SingleImageDropzone } from './index';
import { ToastContainer } from 'react-toastify';

export const Editor = ({
  postImage,
  postImageFile,
  setPostImage,
  setPostImageFile,
  postTitle,
  setPostTitle,
  description,
  setDescription,
  loading,
  handlePostSubmit
}: EditorProps) => {
  return (
    <>
      <ToastContainer autoClose={8000} />
      <div className='h-screen mt-32 grid grid-cols-2 mt-18 gap-2 m-10 mb-0'>
        <div className='col-span-1 flex flex-col justify-center'>
          <Tiptap
            title={postTitle}
            setTitle={setPostTitle}
            description={description}
            setDescription={setDescription}
          />
          <Button
            className='w-full h-16 bg-black text-white mt-10 hover:bg-black mb-10'
            variant='secondary'
            onClick={handlePostSubmit}
          >
            {loading ? (
              <div className='animate-spin'>
                <Icons.loading />
              </div>
            ) : (
              'PUBLISH'
            )}
          </Button>
        </div>
        <div className='blog-image-upload col-span-1 ml-10 flex flex-col justify-center'>
          <div>Upload an Image for your Blog</div>
          <SingleImageDropzone
            width={600}
            height={350}
            value={postImageFile || postImage}
            onChange={file => {
              if (file === undefined) {
                setPostImage('');
              }
              setPostImageFile(file);
            }}
            dropzoneOptions={{
              maxSize: 5000000
            }}
          />
        </div>
      </div>
    </>
  );
};
