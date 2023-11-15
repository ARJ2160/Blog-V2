import React from 'react';
import Logo from '../public/logo.webp';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { NavbarProps, SessionTypes } from '../lib/types';
import { Icons } from './icons';

export const NavBar = ({ toggle }: NavbarProps) => {
  const { data: session, status }: SessionTypes = useSession();
  return (
    <nav className='bg-black h-20 w-screen text-white flex justify-between items-center fixed top-0'>
      <div className='nav--logo flex justify-center items-center ml-10'>
        <Link href='/' className='nav--logo-primary'>
          <Image src={Logo} alt='logo' width={120} height={120} />
        </Link>
      </div>
      <div className='flex items-center md:hidden'>
        {status === 'authenticated' && session && session.user && (
          <Image
            className='rounded-full'
            src={session.user.image as string}
            width={'50'}
            height={'50'}
            alt='user image'
          />
        )}
        <div className='px-4 cursor-pointer' onClick={toggle}>
          <Icons.burger />
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
