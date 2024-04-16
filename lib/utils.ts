import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const handleImageUpload = async (e: File | undefined) => {
//   const file = e;
//   if (file) {
//     const postImage = await compressAndConvertToBase64(file);
//     return postImage;
//   } else return '';
// };

// export const compressAndConvertToBase64 = async (
//   file: File
// ): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     // Convert to Base 64
//     fileReader.readAsDataURL(file);
//     fileReader.onload = () => {
//       compress(fileReader.result as string, {
//         width: 500,
//         max: 200,
//         min: 20,
//         quality: 0.5
//       }).then(result => resolve(result as string));
//     };
//     fileReader.onerror = err => reject(err);
//   });
// };

export function formatFileSize(bytes?: number) {
  if (!bytes) {
    return '0 Bytes';
  }
  bytes = Number(bytes);
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const dm = 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
