import React from 'react';
import { EditorProps } from '../lib/types';
import { handleImageUpload } from '../lib/utils';
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
  const handleImageChange = async (file: File | undefined) => {
    const image = await handleImageUpload(file);
    setPostImage(image);
  };
  return (
    <>
      <ToastContainer autoClose={8000} />
      <div className='h-screen grid grid-cols-2 mt-18 gap-20 m-10 mb-0'>
        <div className='col-span-1 flex flex-col justify-center'>
          <Tiptap
            title={postTitle}
            setTitle={setPostTitle}
            description={description}
            setDescription={setDescription}
          />
          <Button
            className='w-full h-16 bg-black text-white mt-10 hover:bg-black '
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
              handleImageChange(file);
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
