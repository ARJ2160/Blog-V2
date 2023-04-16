import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const Blog = ({ blog }: any) => {
  const [author, setAuthor] = useState(blog?.author);
  const [title, setTitle] = useState(blog?.title);
  const [postBody, setPostBody] = useState(blog?.postBody);
  const [imageSrc, setImageSrc] = useState(blog?.imagesrc);
  const [_id, setId] = useState(blog?._id);
  const blogDate = moment().format('D MMM YYYY');

  useEffect(() => {
    setAuthor(blog?.author);
    setTitle(blog?.title);
    setImageSrc(blog?.imagesrc);
    setId(blog?._id);
    setPostBody(() => {
      const wordarray = blog?.postBody?.split(' ').slice(0, 18).join(' ');
      const stringing = wordarray?.replace(/<\/?[^>]+(>|$)/g, ' ');
      return stringing;
    });
  }, []);

  return (
    <div
      className='max-w-md min-h-full bg-white text-black shadow-lg rounded-lg overflow-hidden my-4 col-span-1 p-4'
      key={_id}
    >
      <Link href={`/blog/${_id}`} target='_blank' rel='noopener noreferrer'>
        <div className='blog-thumbnail'>
          <Image
            className='w-full aspect-auto object-cover object-center'
            src={imageSrc}
            width={imageSrc?.width || 100}
            height={imageSrc?.height || 100}
            loading='lazy'
            alt='No image available'
          />
        </div>
      </Link>
      <div className='blog-preview-bg'>
        <h1 className='text-2xl'>{title}</h1>
        <p className='py-2 text-lg'>{postBody + ' ...'}</p>
        <p className='blog-author'>{author}</p>
        <p className='blog-date'>{blogDate}</p>
      </div>
    </div>
  );
};

export default Blog;
