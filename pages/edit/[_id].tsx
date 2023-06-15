'use client';

import { useState } from 'react';
import React from 'react';
import { SessionTypes } from '../../lib/types';
import { useSession } from 'next-auth/react';
import { Tiptap } from '../../components/TipTap';
import { Button } from '../../components/ui/button';
import { useRouter } from 'next/router';

export const getServerSideProps = async (context: any) => {
  console.log('>>', context.params);
  const _id = context.params?._id;
  const res = await fetch(
    (process.env.NEXT_PUBLIC_BACKEND_URL + 'postsdata/' + _id) as string
  ).then(res => res.json());
  return {
    props: {
      blogDetails: res
    }
  };
};

const EditPost = ({ blogDetails }: any): JSX.Element => {
  const router = useRouter();
  const { data: session }: SessionTypes = useSession();
  const [description, setDescription] = useState(blogDetails.postBody);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const blog = {
      author: session?.user?.name,
      postBody: description
    };
    await fetch(
      (process.env.NEXT_PUBLIC_BACKEND_URL +
        `postsdata/update/${blogDetails._id}`) as string,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'PUT'
        },
        body: JSON.stringify(blog)
      }
    ).then(res => {
      if (res.ok) {
        setTimeout(() => {
          router.push('/');
        }, 1500);
      }
    });
  };

  return (
    <div className='mt-40 flex flex-col justify-center items'>
      <Tiptap description={description} setDescription={setDescription} />
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

export default EditPost;
