import React from 'react';
import { EditorProps } from '../lib/types';
import Image from 'next/image';
import { handleImageUpload } from '../lib/utils';
import { Input, Tiptap, Button, Icons } from './index';

export const Editor = ({
  postImage,
  setPostImages,
  postTitle,
  setPostTitle,
  description,
  setDescription,
  loading,
  handlePostSubmit
}: EditorProps) => {
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = await handleImageUpload(e);
    if (image) {
      setPostImages(image);
    }
  };
  return (
    <div className='h-screen grid grid-cols-2 mt-18 gap-6 m-10'>
      <div className='col-span-1 flex flex-col justify-center'>
        <Tiptap
          title={postTitle}
          setTitle={setPostTitle}
          description={description}
          setDescription={setDescription}
        />
        <Button
          className='h-16 bg-black text-white mt-10 hover:bg-black '
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
        {postImage && (
          <Image
            className=''
            width={500}
            height={500}
            src={postImage || ''}
            alt={'Cant render Image'}
          />
        )}
        <Input
          type={'file'}
          onChange={handleImageChange}
          accept={'.jpeg, .png, .jpg'}
        />
      </div>
    </div>
  );
};
