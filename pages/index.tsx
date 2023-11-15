import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage
} from 'next';
import React, { useEffect } from 'react';
import Blog from './Blog';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import { CircularProgress, Stack } from '@mui/material';
import { ContactUs } from '../components';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    (process.env.NEXT_PUBLIC_BACKEND_URL + 'postsdata/') as string
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
  const blogDate = moment().format('D MMM YYYY');

  useEffect(() => {
    console.log('>> blogs', blogs);
  }, [blogs]);
  return (
    <React.Fragment>
      <div className='bg-[#121212] text-white flex min-h-screen flex-col items-center justify-center'>
        <div className='w-11/12 h-[2px] mb-10 mt-24 bg-gray-700'></div>
        <div className='flex flex-col items-center my-20 w-full'>
          <div className='font-bold text-white uppercase lg:text-[12rem] md:text-[9rem] sm:text-[7rem] text-7xl'>
            <Link href='#'>THE BLOG</Link>
          </div>
        </div>
        <div className='w-11/12 h-[2px] bg-gray-700'></div>
        <div className='blogs m-10 grid md:grid-cols-2 grid-cols-1'>
          <div className='main-blog col-span-1'>
            {blogs[0] ? (
              blogs.slice(0, 1).map((b: any, i: number) => {
                return (
                  <div className='first-blog md:my-0 my-10' key={i}>
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
                      <div className='w-11/12'>
                        {b.postBody?.replace(/<\/?[^>]+(>|$)/g, ' ')}
                      </div>
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
      <div className=''>
        <ContactUs />
      </div>
    </React.Fragment>
  );
};

export default Home;
