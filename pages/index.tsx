import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Blog from './Blog';
import Navbar from './components/Navbar';

export async function getServerSideProps() {
  const res = await fetch(
    'https://react-blog-backend-sigma.vercel.app/postsdata'
  ).then(res => res.json());
  return {
    props: {
      blogs: res
    }
  };
}

const Home: NextPage = ({ blogs }: any) => {
  console.log(blogs);
  return (
    <div className='bg-black text-white flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <header className='w-full container mx-auto'>
        <div className='flex flex-col items-center py-12'>
          <a
            className='font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl'
            href='#'
          >
            Minimal Blog
          </a>
          <p className='text-lg text-gray-600'>Lorem Ipsum Dolor Sit Amet</p>
        </div>
      </header>
      {blogs?.length > 0 ? (
        <div className='grid grid-cols-4'>
          {blogs.map((blog: any, index: number) => {
            return (
              <div key={index}>
                {' '}
                <Blog blog={blog} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Home;
