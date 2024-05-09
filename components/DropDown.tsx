import Link from 'next/link';
import React from 'react';
import { Button } from './index';
import { signOut, useSession } from 'next-auth/react';
import { SessionTypes } from '../lib/types';

export const DropDown = ({ isOpen, toggle }: any) => {
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
                fetch('/');
              }}
              className='mx-5 cursor-pointer'
            >
              Sign Out
            </Button>
          </>
        )}
      </div>
    </>
  );
};
