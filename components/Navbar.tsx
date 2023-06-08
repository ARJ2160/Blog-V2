import React from 'react';
import Logo from '../public/logo.webp';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { SessionTypes } from '../lib/types';

const NavBar = ({ toggle }: any) => {
  const { data: session, status }: SessionTypes = useSession();
  console.log('>>', session);
  return (
    <nav className='bg-black h-20 w-screen text-white flex justify-between items-center fixed top-0'>
      <div className='nav--logo flex justify-center items-center ml-10'>
        <Link href='/' className='nav--logo-primary'>
          <Image src={Logo} alt='logo' width={120} height={120} />
        </Link>
      </div>
      <div className='flex items-center'>
        {status === 'authenticated' && session && session.user && (
          <Image
            className='rounded-full'
            src={session.user.image as string}
            width={'50'}
            height={'50'}
            alt='user image'
          />
        )}
        <div className='px-4 cursor-pointer md:hidden' onClick={toggle}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
              fill='#000'
            />
          </svg>
        </div>
      </div>
      <div className='pr-8 hidden md:flex items-center'>
        {status !== 'authenticated' && (
          <Link href='/login' className='mx-5 cursor-pointer'>
            Sign In
          </Link>
        )}
        {status === 'authenticated' && (
          <div className='flex items-center'>
            <Link href='/blog/create' className='mx-5 cursor-pointer'>
              Write a Blog
            </Link>
            <Button
              variant='secondary'
              onClick={() => {
                signOut();
                // redirect('/')
                fetch('/');
              }}
              className='mx-5 cursor-pointer'
            >
              Sign Out
            </Button>
            {session && session.user && (
              <Image
                className='rounded-full'
                src={session.user.image as string}
                width={'50'}
                height={'50'}
                alt='user image'
              />
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
