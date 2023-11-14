import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const Blog = ({ blog }: any): JSX.Element => {
  // const [author, setAuthor] = useState(blog?.author);
  const [title, setTitle] = useState(blog?.title);
  const [postBody, setPostBody] = useState(blog?.postBody);
  const [imageSrc, setImageSrc] = useState(blog?.imagesrc);
  const [_id, setId] = useState(blog?._id);
  const blogDate = moment().format('MMM Do YYYY');

  useEffect(() => {
    // setAuthor(blog?.author);
    setTitle(blog?.title);
    setImageSrc(blog?.imagesrc);
    setId(blog?._id);
    setPostBody(() => {
      return blog?.postBody
        ?.split(' ')
        .slice(0, 18)
        .join(' ')
        ?.replace(/<\/?[^>]+(>|$)/g, ' ');
    });
  }, []);

  return (
    <div>
      <Link href={`/blog/${_id}`} rel='noopener noreferrer'>
        <div className='blog-thumbnail'>
          <div className='flex justify-between'>
            <div className='pr-6'>
              <Image
                className='w-96 h-36 aspect-auto'
                src={imageSrc}
                width={imageSrc?.width || 100}
                height={imageSrc?.height || 100}
                loading='lazy'
                alt='No image available'
              />
            </div>
            <div className='flex flex-col justify-start text-start'>
              <div className='text-2xl text-bold'>{title}</div>
              <div className='text-gray-600'>{blogDate}</div>
              <div className='text-gray-300 pt-6'>{postBody}</div>
            </div>
          </div>
          <div className='w-[98%] h-[2px] my-6 bg-gray-700'></div>
        </div>
      </Link>
    </div>
  );
};

export default Blog;
