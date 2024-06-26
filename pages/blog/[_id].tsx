'use client';

import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/index';
import { useRouter } from 'next/router';
import { Icons } from '../../components/icons';
import Image from 'next/image';
import Head from 'next/head';
import { SessionTypes } from '../../lib/types';
import { useSession } from 'next-auth/react';
import { deleteBlog } from '../../services/blog';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../../lib/constants';
import parse from 'html-react-parser';

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

const BlogDetails = ({ blogDetails }: any) => {
  const { data: session }: SessionTypes = useSession();

  const router = useRouter();
  const [author, setAuthor] = useState<string>(blogDetails?.author);
  const [title, setTitle] = useState<string>(blogDetails?.title);
  const [postBody, setPostBody] = useState(blogDetails?.postBody);
  const [postDate, setPostDate] = useState(blogDetails?.postDate);
  const [imageSrc, setImageSrc] = useState(blogDetails?.postImage);
  const [_id, setId] = useState(blogDetails?._id);
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    setAuthor(blogDetails?.author);
    setTitle(blogDetails?.title);
    setImageSrc(blogDetails?.postImage);
    setId(blogDetails?._id);
    setPostDate(() => moment(blogDetails?.postDate).format('D MMM YYYY'));
    setPostBody(blogDetails?.postBody);
  }, []);

  const handleDeleteBlog = async (e: any) => {
    e.preventDefault();
    setIsDeleteLoading(true);
    await deleteBlog(_id, imageSrc)
      .then(() => {
        toast.success('Blog Deleted Successfully!', toastifyConfig);
        setTimeout(() => {
          setIsDeleteLoading(false);
          router.push('/');
        }, 1500);
      })
      .catch(err => toast.error(err));
  };

  const editBlog = () => {
    setIsEditLoading(true);
    router.push('/edit/' + _id);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='container mx-auto flex flex-wrap py-6 mt-24' key={_id}>
        <section className='w-full md:w-2/3 flex flex-col items-center'>
          <article className='flex flex-col shadow mb-4 rounded-lg'>
            <Image
              height={1080}
              width={1920}
              className='rounded-lg'
              src={imageSrc}
              alt='Blog Image'
            />
            <div className='bg-white flex flex-col justify-start p-6'>
              <a
                href='#'
                className='text-blue-700 text-sm font-bold uppercase pb-4'
              >
                Technology
              </a>
              <p className='text-5xl text-bold'>{title}</p>
              <p className='text-sm py-4'>
                By {author}, Published on {postDate}
              </p>
              <div className='pb-3'>{parse(postBody)}</div>
            </div>
          </article>
        </section>
        {session?.user?.name === author && (
          <aside className='w-full md:w-1/3 flex flex-col items-center px-3'>
            <div className='w-full bg-white shadow flex flex-col my-4 p-6 rounded-lg'>
              <Button
                onClick={editBlog}
                className='w-full bg-blue-600 hover:bg-blue-600 text-white font-bold text-sm uppercase rounded flex items-center justify-center px-2 py-3 mt-4'
              >
                {isEditLoading ? (
                  <div className='animate-spin'>
                    <Icons.loading />
                  </div>
                ) : (
                  'Edit Blog'
                )}
              </Button>
              <Button
                onClick={handleDeleteBlog}
                className='w-full bg-red-600 hover:bg-red-600 text-white font-bold text-sm uppercase rounded flex items-center justify-center px-2 py-3 mt-4'
              >
                {isDeleteLoading ? (
                  <div className='animate-spin'>
                    <Icons.loading />
                  </div>
                ) : (
                  'Delete Blog'
                )}
              </Button>
            </div>
          </aside>
        )}
      </div>
    </>
  );
};

export default BlogDetails;
