'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { SessionTypes } from '../../lib/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Editor } from '../../components/index';
import client from '../../services/client';

const Create = (): JSX.Element => {
  const router = useRouter();
  const { data: session }: SessionTypes = useSession();
  const [description, setDescription] = useState<string>('');
  const [postTitle, setPostTitle] = useState<string>('');
  const [postImage, setPostImages] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handlePostSubmit = async (e: any) => {
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
    await client.post('/postsdata', blog).then(res => {
      if (res.status === 200) {
        setTimeout(() => {
          setLoading(false);
          router.push('/');
        }, 1500);
      }
    });
  };

  return (
    <Editor
      postImage={postImage}
      setPostImages={setPostImages}
      postTitle={postTitle}
      setPostTitle={setPostTitle}
      description={description}
      setDescription={setDescription}
      loading={loading}
      handlePostSubmit={handlePostSubmit}
    />
  );
};

export default Create;
