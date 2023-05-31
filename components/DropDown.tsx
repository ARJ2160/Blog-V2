import Link from 'next/link';
import React from 'react';

const DropDown = ({ isOpen, toggle }: any) => {
  return (
    <>
      <div
        className={
          isOpen
            ? 'grid grid-rows-3 text-center pt-16 items-end bg-black text-white'
            : 'hidden'
        }
        onClick={toggle}
      >
        <Link href='/' className='p-4'>
          Premium
        </Link>
        <Link href='/menu' className='p-4'>
          Support
        </Link>
        <Link href='/' className='p-4'>
          Download
        </Link>
      </div>
    </>
  );
};

export default DropDown;
