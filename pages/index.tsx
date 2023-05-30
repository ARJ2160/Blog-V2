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

const Home: NextPage = ({ blogs }: any): JSX.Element => {
  return (
    <div className='bg-black text-white flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>THE BLOG</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <header className='w-full container mx-auto'>
        <div className='flex flex-col items-center py-12'>
          <a className='font-bold text-white uppercase lg:text-[9rem] md:text-8xl sm:text-6xl text-6xl' href='#'>
            THE BLOG
          </a>
        </div>
      </header>
      <div className='blogs mx-5'>
        {blogs?.length > 0 ? (
          <div className='grid grid-cols-4 gap-5'>
            {blogs.map((blog: any, index: number) => {
              return (
                <div key={index}>
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
    </div>
  );
};

export default Home;
