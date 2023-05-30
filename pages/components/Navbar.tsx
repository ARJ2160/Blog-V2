import React from 'react';
import Logo from '../../public/logo.webp';
import Link from 'next/link';
import Image from 'next/image';

const NavBar = ({ toggle }: any) => {
  return (
    <nav className='bg-black h-20 w-screen text-white flex justify-between items-center fixed top-0'>
      <div className='nav--logo flex justify-center items-center ml-10'>
        <a href='/' className='nav--logo-primary'>
          <Image src={Logo} alt='logo' width={120} height={120} />
        </a>
      </div>
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
      <div className='pr-8 md:block hidden'>
        <Link href='/' className='mx-5 cursor-pointer'>
          Learn
        </Link>
        <Link href='/' className='mx-5 cursor-pointer'>
          Blog
        </Link>
        <Link href='/' className='mx-5 cursor-pointer'>
          Bookmarks
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
