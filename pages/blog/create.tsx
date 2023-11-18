'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { Tiptap } from '../../components/TipTap';
import { SessionTypes } from '../../lib/types';
import { useSession } from 'next-auth/react';
import { Button } from '../../components/ui/button';
import { useRouter } from 'next/router';
import { Icons } from '../../components/icons';
import moment from 'moment';
import { Input } from '../../components/ui/input';

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
      const postImage = await convertToBase64(file);
      setPostImages(postImage);
    }
  };

  const convertToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      // Convert to Base 64
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = err => reject(err);
    });
  };

  return (
    <div className='mt-40 flex flex-col justify-center items-center'>
      <div className='blog-image-upload'>
        <Input
          type={'file'}
          onChange={handleImageUpload}
          accept={'.jpeg, .png, .jpg'}
        />
        <Button variant='secondary' />
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
