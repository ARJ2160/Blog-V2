import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { useRouter } from 'next/router';
import { Icons } from '../../components/icons';
import Image from 'next/image';

export const getServerSideProps = async (context: any) => {
  const _id = context.params?._id;
  const res = await fetch(
    (process.env.NEXT_PUBLIC_BACKEND_URL + 'postsdata/' + _id) as string
  ).then(res => res.json());
  return {
    props: {
      blogDetails: res
    }
  };
};

const BlogDetails = ({ blogDetails }: any) => {
  const router = useRouter();
  const [author, setAuthor] = useState<string>(blogDetails?.author);
  const [title, setTitle] = useState<string>(blogDetails?.title);
  const [postBody, setPostBody] = useState(blogDetails?.postBody);
  const [imageSrc, setImageSrc] = useState(blogDetails?.imagesrc);
  const [_id, setId] = useState(blogDetails?._id);
  const [loading, setLoading] = useState<boolean>(false);
  const blogDate = moment().format('D MMM YYYY');

  useEffect(() => {
    setAuthor(blogDetails?.author);
    setTitle(blogDetails?.title);
    setImageSrc(blogDetails?.imagesrc);
    setId(blogDetails?._id);
    setPostBody(() => blogDetails?.postBody.replace(/<\/?[^>]+(>|$)/g, ' '));
  }, []);

  const deleteBlog = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await fetch(
      (process.env.NEXT_PUBLIC_BACKEND_URL + 'postsdata/' + _id) as string,
      { method: 'DELETE' }
    )
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          router.push('/');
        }, 1500);
      })
      .catch(err => console.log(err));
  };

  const editBlog = () => {
    router.push('/edit/' + _id);
  };

  return (
    <div key={_id}>
      <div className='container mx-auto flex flex-wrap py-6 mt-24'>
        <section className='w-full md:w-2/3 flex flex-col items-center'>
          <article className='flex flex-col shadow my-4'>
            <Image
              width={'700'}
              height={'400'}
              src={imageSrc}
              alt='Blog Image'
            />
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
            <Button
              onClick={editBlog}
              className='w-full bg-blue-600 hover:bg-blue-600 text-white font-bold text-sm uppercase rounded flex items-center justify-center px-2 py-3 mt-4'
            >
              Edit Blog
            </Button>
            <Button
              onClick={deleteBlog}
              className='w-full bg-red-600 hover:bg-red-600 text-white font-bold text-sm uppercase rounded flex items-center justify-center px-2 py-3 mt-4'
            >
              {loading ? (
                <div className='animate-spin'>
                  <Icons.loading />
                </div>
              ) : (
                'Delete Blog'
              )}
            </Button>
          </div>

          <div className='w-full bg-white shadow flex flex-col my-4 p-6'>
            <p className='text-xl font-semibold pb-5'>Other Blogs</p>
            <div className='grid grid-cols-3 gap-3'>
              <Image
                alt='grid-images'
                loading='lazy'
                width={200}
                height={200}
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=1'
              />
              <Image
                alt='grid-images'
                loading='lazy'
                width={200}
                height={200}
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=2'
              />
              <Image
                alt='grid-images'
                loading='lazy'
                width={200}
                height={200}
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=3'
              />
              <Image
                alt='grid-images'
                loading='lazy'
                width={200}
                height={200}
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=4'
              />
              <Image
                alt='grid-images'
                loading='lazy'
                width={200}
                height={200}
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=5'
              />
              <Image
                alt='grid-images'
                loading='lazy'
                width={200}
                height={200}
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=6'
              />
              <Image
                alt='grid-images'
                loading='lazy'
                width={200}
                height={200}
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=7'
              />
              <Image
                alt='grid-images'
                loading='lazy'
                width={200}
                height={200}
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=8'
              />
              <Image
                alt='grid-images'
                loading='lazy'
                width={200}
                height={200}
                className='hover:opacity-75'
                src='https://source.unsplash.com/collection/1346951/150x150?sig=9'
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetails;
