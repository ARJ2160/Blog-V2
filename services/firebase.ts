import { storage } from '../lib/firebase';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes
} from 'firebase/storage';

export const postImageOnFirebase = async (
  file: File,
  blogId: string
): Promise<string> => {
  const imageRef = ref(storage, `${file.name + '_' + blogId}`);
  const imageURL = await uploadBytes(imageRef, file).then(async data => {
    const val = await getDownloadURL(data.ref);
    return val;
  });
  return imageURL;
};

export const deleteImageFromFirebase = async (image: string, id: string) => {
  const imageRef = ref(storage, `${image + '_' + id}`);
  await deleteObject(imageRef);
};
