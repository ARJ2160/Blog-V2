import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { signOut, useSession } from 'next-auth/react';
import { SessionTypes } from '../lib/types';

const DropDown = ({ isOpen, toggle }: any) => {
  const { status }: SessionTypes = useSession();
  return (
    <>
      <div
        className={
          isOpen
            ? `${
                status === 'authenticated' ? 'grid-rows-3' : 'grid-rows-2'
              } grid text-center pt-16 items-end bg-black text-white`
            : 'hidden'
        }
        onClick={toggle}
      >
        {status !== 'authenticated' && (
          <Link href='/login' className='mx-5 cursor-pointer'>
            Sign In
          </Link>
        )}
        {status === 'authenticated' && (
          <>
            <Link href='/blog/create' className='mx-5 cursor-pointer'>
              Write a Blog
            </Link>
            <Button
              variant='ghost'
              onClick={() => {
                signOut();
                // redirect('/')
                fetch('/');
              }}
              className='mx-5 cursor-pointer'
            >
              Sign Out
            </Button>
          </>
        )}
        <Link href='/' className='p-4'>
          Download
        </Link>
      </div>
    </>
  );
};

export default DropDown;
