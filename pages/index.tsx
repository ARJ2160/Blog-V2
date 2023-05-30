import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage
} from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Blog from './Blog';
import Navbar from './components/Navbar';
import Image from 'next/image';
import DropDown from './components/DropDown';
import Link from 'next/link';
import moment from 'moment';
import { Stack } from '@mui/material';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    'https://react-blog-backend-sigma.vercel.app/postsdata'
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
  const [isOpen, setIsOpen] = useState(false);
  const blogDate = moment().format('D MMM YYYY');

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', hideMenu);
    return () => {
      window.removeEventListener('resize', hideMenu);
    };
  });

  console.log(blogs);

  return (
    <React.Fragment>
      <Navbar toggle={toggle} />
      <DropDown isOpen={isOpen} toggle={toggle} />
      <div className='bg-black text-white flex min-h-screen flex-col items-center justify-center'>
        <Head>
          <title>THE BLOG</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='w-11/12 h-[2px] mb-10 mt-24 bg-gray-700'></div>
        <div className='flex flex-col items-center my-20 w-full'>
          <div className='font-bold text-white uppercase lg:text-[12rem] md:text-8xl sm:text-6xl text-6xl'>
            <Link href='#'>THE BLOG</Link>
          </div>
        </div>
        <div className='w-11/12 h-[2px] mb-10 bg-gray-700'></div>
        <div className='blogs mx-10 grid grid-cols-2'>
          <div className='main-blog col-span-1'>
            {blogs[0] ? (
              blogs.slice(0, 1).map((b: any, i: number) => {
                return (
                  <div className='first-blog' key={i}>
                    <div className='blog-image'>
                      <Link
                        href={`/blog/${b?._id}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Image
                          className='w-11/12 h-3/4 object-center aspect-ratio'
                          src={b.imagesrc}
                          width={b?.width || 100}
                          height={b?.height || 100}
                          loading='lazy'
                          alt='No image available'
                        />
                      </Link>
                    </div>
                    <div className='blog-content'>
                      <p className='pt-4'>{blogDate}</p>
                      <div className='text-5xl py-4'>{b?.title}</div>
                      <div>{b.postBody?.replace(/<\/?[^>]+(>|$)/g, ' ')}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <CircularProgress />
              </div>
            )}
          </div>
          <div className='secondary-blogs col-span-1'>
            {blogs?.length > 0 ? (
              <div className=''>
                {blogs.slice(1, blogs.length).map((b: any, index: number) => {
                  return (
                    <div key={index}>
                      <Stack spacing={2}>
                        <Blog blog={b} />
                      </Stack>
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
      </div>
    </React.Fragment>
  );
};

export default Home;
