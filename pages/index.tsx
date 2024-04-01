import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage
} from 'next';
import React from 'react';
import Blog from './Blog';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import { CircularProgress, Stack } from '@mui/material';
import { ContactUs, Footer } from '../components/index';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    (process.env.NEXT_PUBLIC_BACKEND_URL + '/postsdata/') as string
  ).then(res => res.json());
  return {
    props: {
      blogs: res
    }
  };
};

const Home: NextPage = ({
  blogs
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  return (
    <React.Fragment>
      <ToastContainer autoClose={8000} />
      <div className='bg-[#121212] text-white flex min-h-screen flex-col items-center justify-center'>
        <div className='w-11/12 h-[2px] mb-10 mt-24 bg-gray-700'></div>
        <div className='flex flex-col items-center my-20 w-full'>
          <div className='font-bold text-white uppercase lg:text-[12rem] md:text-[9rem] sm:text-[7rem] text-7xl'>
            <Link href='/'>THE BLOG</Link>
          </div>
        </div>
        <div className='w-11/12 h-[2px] bg-gray-700'></div>
        <div className='blogs m-10 grid md:grid-cols-2 grid-cols-1'>
          <div className='main-blog col-span-1'>
            {blogs[0] ? (
              blogs.slice(0, 1).map((blog: any, i: number) => {
                return (
                  <div className='first-blog md:my-0 my-10' key={i}>
                    <div className='blog-image'>
                      <Link
                        href={`/blog/${blog?._id}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Image
                          className='w-11/12 h-3/4 object-center aspect-ratio'
                          src={blog.postImage}
                          width={700}
                          height={400}
                          loading='lazy'
                          alt='No image available'
                        />
                      </Link>
                    </div>
                    <div className='blog-content'>
                      <div className='text-5xl py-2'>{blog?.title}</div>
                      <p className='text-gray-500'>by {blog.author}</p>
                      <p className='pb-4 text-gray-500'>
                        {moment(blog?.postDate).format('MMM Do YYYY')}
                      </p>
                      <div className='w-11/12'>
                        {blog.postBody?.replace(/<\/?[^>]+(>|$)/g, ' ')}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <React.Fragment>
                <CircularProgress />
              </React.Fragment>
            )}
          </div>
          <div className='secondary-blogs col-span-1'>
            {blogs?.length > 0 ? (
              <React.Fragment>
                {blogs.slice(1, blogs.length).map((b: any, index: number) => {
                  return (
                    <div key={index}>
                      <Stack spacing={2}>
                        <Blog blog={b} />
                      </Stack>
                    </div>
                  );
                })}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <CircularProgress />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
      <ContactUs />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
