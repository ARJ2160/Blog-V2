'use client';

import { useState } from 'react';
import React from 'react';
import { SessionTypes } from '../../lib/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Editor } from '../../components/index';
import { editBlog } from '../../services/blog';
import { toast } from 'react-toastify';
import Head from 'next/head';

export const getServerSideProps = async (context: any) => {
  const _id = context.params?._id;
  const res = await fetch(
    (process.env.NEXT_PUBLIC_BACKEND_URL + '/postsdata/' + _id) as string
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
  const [postTitle, setPostTitle] = useState<string>(blogDetails.title);
  const [postImage, setPostImage] = useState<string>(blogDetails.postImage);
  const [loading, setLoading] = useState<boolean>(false);

  const [file, setFile] = useState<File | undefined>();

  const handlePostSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const author = session?.user?.name || '';
    editBlog(
      blogDetails._id,
      postTitle,
      author,
      description,
      postImage,
      file
    ).then(() => {
      setLoading(false);
      toast.success('BLOG EDITED');
      router.push('/');
    });
  };

  return (
    <>
      <Head>
        <title>{blogDetails.title}</title>
      </Head>
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
    </>
  );
};

export default EditPost;
