import { type ClassValue, clsx } from 'clsx';
// import compress from 'compress-base64';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (e.target.files && e.target.files.length) {
    const file = e.target.files[0];
    // Comment compression for now
    // const postImage = await compressAndConvertToBase64(file);
    const postImage = await convertToBase64(file);
    return postImage;
  }
};

export const convertToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    // Convert to Base 64
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result as string);
    fileReader.onerror = err => reject(err);
  });
};

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
//         quality: 0.8
//       }).then(result => resolve(result as string));
//     };
//     fileReader.onerror = err => reject(err);
//   });
// };
