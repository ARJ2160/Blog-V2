'use client';

import { useState } from 'react';
import React from 'react';
import { SessionTypes } from '../../lib/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Editor } from '../../components/index';
import { postBlog } from '../../services/blog';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../../lib/constants';

const Create = (): JSX.Element => {
  const router = useRouter();
  const { data: session }: SessionTypes = useSession();
  const [description, setDescription] = useState<string>('');
  const [postTitle, setPostTitle] = useState<string>('');
  const [postImage, setPostImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [file, setFile] = useState<File>();

  const handlePostSubmit = async (e: any) => {
    if (!postTitle || !file || !description) {
      toast.error('Please fill all details');
      return;
    }
    e.preventDefault();
    setLoading(true);
    const author = session?.user?.name || '';
    await postBlog(
      author,
      postTitle,
      description,
      moment().format('D MMM YYYY'),
      file
    ).then(() => {
      toast.success('BLOG CREATED', toastifyConfig);
      setTimeout(() => {
        setLoading(false);
        router.push('/');
      }, 1500);
    });
  };

  return (
    <Editor
      postImage={postImage}
      postImageFile={file}
      setPostImageFile={setFile}
      setPostImage={setPostImage}
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
