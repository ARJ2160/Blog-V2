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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const blog = {
      _id: uuidv4(),
      author: session?.user?.name,
      postBody: description
    };
    await fetch((process.env.NEXT_PUBLIC_BACKEND_URL + 'postsdata') as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
      },
      body: JSON.stringify(blog)
    });
  };

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
