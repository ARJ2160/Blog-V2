import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import NavBar from '../components/Navbar';

export const getServerSideProps = async (context: any) => {
  const _id = context.params?._id;
  const res = await fetch(
    `https://react-blog-backend-sigma.vercel.app/postsdata/${_id}`
  ).then(res => res.json());
  return {
    props: {
      blogDetails: res
    }
  };
};

const BlogDetails = ({ blogDetails }: any) => {
  const [author, setAuthor] = useState<string>(blogDetails?.author);
  const [title, setTitle] = useState<string>(blogDetails?.title);
  const [postBody, setPostBody] = useState(blogDetails?.postBody);
  const [imageSrc, setImageSrc] = useState(blogDetails?.imagesrc);
  const [_id, setId] = useState(blogDetails?._id);
  const blogDate = moment().format('D MMM YYYY');

  console.log(blogDetails);

  useEffect(() => {
    setAuthor(blogDetails?.author);
    setTitle(blogDetails?.title);
    setImageSrc(blogDetails?.imagesrc);
    setId(blogDetails?._id);
    setPostBody(() => blogDetails?.postBody.replace(/<\/?[^>]+(>|$)/g, ' '));
  }, []);

  return (
    <div key={_id}>
      <Head>
        <title>{title}</title>
      </Head>
      {/* <div className='flex flex-col items-center py-12 text-5xl font-bold'>
        {title}
      </div> */}
      <NavBar />
      <div className='container mx-auto flex flex-wrap py-6 mt-24'>
        <section className='w-full md:w-2/3 flex flex-col items-center'>
          <article className='flex flex-col shadow my-4'>
            <img src={imageSrc} />
            <div className='bg-white flex flex-col justify-start p-6'>
              <a
                href='#'
                className='text-blue-700 text-sm font-bold uppercase pb-4'
              >
                Technology
              </a>
              <p className='text-5xl text-bold'>{title}</p>
              <p className='text-sm py-4'>
                By {author}, Published on {blogDate}
              </p>
              <div className='pb-3'>
                <p>{postBody}</p>
              </div>
            </div>
          </article>
          <div className='w-full flex pt-6'>
            <a
              href='#'
              className='w-1/2 bg-white shadow hover:shadow-md text-left p-6'
            >
              <p className='text-lg text-blue-800 font-bold flex items-center'>
                <i className='fas fa-arrow-left pr-1'></i> Previous
              </p>
              <p className='pt-2'>Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
            </a>
            <a
              href='#'
              className='w-1/2 bg-white shadow hover:shadow-md text-right p-6'
            >
              <p className='text-lg text-blue-800 font-bold flex items-center justify-end'>
                Next <i className='fas fa-arrow-right pl-1'></i>
              </p>
              <p className='pt-2'>Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
            </a>
          </div>
          <div className='w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-10 mb-10 p-6'>
            <div className='w-full md:w-1/5 flex justify-center md:justify-start pb-4'>
              <img
                src='https://source.unsplash.com/collection/1346951/150x150?sig=1'
                className='rounded-full shadow h-32 w-32'
              />
            </div>
            <div className='flex-1 flex flex-col justify-center md:justify-start'>
              <p className='font-semibold text-2xl'>David</p>
              <p className='pt-2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur vel neque non libero suscipit suscipit eu eu urna.
              </p>
              <div className='flex items-center justify-center md:justify-start text-2xl no-underline text-blue-800 pt-4'>
                <a className='' href='#'>
                  <i className='fab fa-facebook'></i>
                </a>
                <a className='pl-4' href='#'>
                  <i className='fab fa-instagram'></i>
                </a>
                <a className='pl-4' href='#'>
                  <i className='fab fa-twitter'></i>
                </a>
                <a className='pl-4' href='#'>
                  <i className='fab fa-linkedin'></i>
                </a>
              </div>
            </div>
          </div>
        </section>
        <aside className='w-full md:w-1/3 flex flex-col items-center px-3'>
          <div className='w-full bg-white shadow flex flex-col my-4 p-6'>
            <p className='text-xl font-semibold pb-5'>About Us</p>
            <p className='pb-2'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              mattis est eu odio sagittis tristique. Vestibulum ut finibus leo.
              In hac habitasse platea dictumst.
            </p>
            <a
              href='#'
              className='w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4'
            >
              Get to know us
            </a>
          </div>

          <div className='w-full bg-white shadow flex flex-col my-4 p-6'>
            <p className='text-xl font-semibold pb-5'>Instagram</p>
            <div className='grid grid-cols-3 gap-3'>
              <img
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=1'
              />
              <img
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=2'
              />
              <img
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=3'
              />
              <img
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=4'
              />
              <img
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=5'
              />
              <img
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=6'
              />
              <img
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=7'
              />
              <img
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=8'
              />
              <img
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=9'
              />
            </div>
            <a
              href='#'
              className='w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-6'
            >
              <i className='fab fa-instagram mr-2'></i> Follow @dgrzyb
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetails;
