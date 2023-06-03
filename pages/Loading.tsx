// import { Stack } from '@mui/material';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';
// import Blog from './Blog';
// import { Skeleton } from '../components/ui/';

// const Loading = () => {
//   return (
//     <div>
//       <div className='blogs mx-10 grid grid-cols-2'>
//         <div className='main-blog col-span-1'>
//           {Array.from({ length: 12 }, (_, i) => i + 1)
//             .slice(0, 1)
//             .map((i: number) => {
//               return (
//                 <div className='first-blog' key={i}>
//                   <div className='blog-image'>
//                     <Skeleton className='w-11/12 h-3/4 object-center aspect-ratio' />
//                   </div>
//                   <div className='blog-content'>
//                     <Skeleton className='h-6 w-1/2 pt-4'></Skeleton>
//                     <Skeleton className='h-6 w-1/2 text-5xl py-4'></Skeleton>
//                     <Skeleton className='w-11/12 h-6'></Skeleton>
//                   </div>
//                 </div>
//               );
//             })}
//         </div>
//         <div className='secondary-blogs col-span-1'>
//           {Array.from({ length: 12 }, (_, i) => i + 1)
//             .slice(1)
//             .map((b: any, index: number) => {
//               return (
//                 <div key={index}>
//                   <Stack spacing={2}>
//                     <Skeleton className='' />
//                   </Stack>
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Loading;
import React from 'react';

const Loading = () => {
  return <div>Loading</div>;
};

export default Loading;
