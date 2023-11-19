'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { Button, Icons, Input, Tiptap } from '../../components/index';
import { SessionTypes } from '../../lib/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import moment from 'moment';
import Image from 'next/image';
import compress from 'compress-base64';

const Create = (): JSX.Element => {
  const router = useRouter();
  const { data: session }: SessionTypes = useSession();
  const [description, setDescription] = useState<string>('');
  const [postTitle, setPostTitle] = useState<string>('');
  const [postImage, setPostImages] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const blog = {
      _id: uuidv4(),
      author: session?.user?.name,
      title: postTitle,
      postBody: description,
      postDate: moment().format('D MMM YYYY'),
      postImage
    };
    console.log('>> posted', blog);
    await fetch((process.env.NEXT_PUBLIC_BACKEND_URL + 'postsdata') as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify(blog)
    }).then(res => {
      if (res.ok) {
        setTimeout(() => {
          setLoading(false);
          router.push('/');
        }, 1500);
      }
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files && e.target.files.length) {
      file = e.target.files[0];
      const postImage = await compressAndConvertToBase64(file);
      setPostImages(postImage);
    }
  };

  const compressAndConvertToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      // Convert to Base 64
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        compress(fileReader.result as string, {
          width: 500,
          type: 'image/png',
          max: 200,
          min: 20,
          quality: 0.8
        }).then(result => resolve(result as string));
      };
      fileReader.onerror = err => reject(err);
    });
  };

  return (
    <div className='mt-40 flex flex-col justify-center items-center'>
      <div className='blog-image-upload '>
        <div>Upload an Image for your Blog</div>
        {postImage && (
          <Image
            className='w-32 h-32'
            width={100}
            height={100}
            src={postImage}
            alt={'Cant render Image'}
          />
        )}
        <Input
          type={'file'}
          onChange={handleImageUpload}
          accept={'.jpeg, .png, .jpg'}
        />
      </div>
      <Tiptap
        title={postTitle}
        setTitle={setPostTitle}
        description={description}
        setDescription={setDescription}
      />
      <Button
        className='h-16 bg-black text-white hover:bg-black '
        variant='secondary'
        onClick={handleSubmit}
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
  );
};

export default Create;
