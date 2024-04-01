'use client';

import { useState } from 'react';
import React from 'react';
import { SessionTypes } from '../../lib/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Editor } from '../../components/index';
import client from '../../services/client';

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
    const blog = {
      title: postTitle,
      author: session?.user?.name,
      postBody: description,
      postImage
    };
    await client.put(`/postsdata/update/${blogDetails._id}`, blog).then(res => {
      if (res.status === 200) {
        setLoading(false);
        router.push('/');
      }
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

export default EditPost;
