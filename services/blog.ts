import { v4 as uuidv4 } from 'uuid';
import client from './client';
import { storage } from '../lib/firebase';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes
} from 'firebase/storage';

export const postBlog = async (
  author: string,
  title: string,
  postBody: string,
  postDate: string,
  postImageFile: File | undefined
) => {
  const blogId = uuidv4();
  let firebaseImageURL = '';
  if (postImageFile) {
    firebaseImageURL = await postImageOnFirebase(postImageFile, blogId);
  }

  const payload = {
    _id: blogId,
    author,
    title,
    postBody,
    postDate,
    postImage: firebaseImageURL
  };
  await client.post('/postsdata', payload).then(resp => {
    return resp;
  });
};

export const editBlog = async (
  id: string,
  title: string,
  author: string,
  postBody: string,
  postImage: string,
  postImageFile: File | undefined
) => {
  let firebaseImageURL = '';

  if (postImageFile) {
    await deleteImageFromFirebase(postImage, id);
    firebaseImageURL = await postImageOnFirebase(postImageFile, id);
  }

  const payload = {
    title,
    author,
    postBody,
    postImage: firebaseImageURL
  };
  await client.put(`/postsdata/update/${id}`, payload);
};

export const deleteBlog = async (id: string, image: string) => {
  await deleteImageFromFirebase(image, id);
  await client.delete('/postsdata/' + id);
};

export const postImageOnFirebase = async (
  file: File,
  blogId: string
): Promise<string> => {
  const imageRef = ref(storage, `${file.name + '_' + blogId}`);
  const imageURL = await uploadBytes(imageRef, file).then(data => {
    return getDownloadURL(data.ref).then(val => {
      return val;
    });
  });
  return imageURL;
};

const deleteImageFromFirebase = async (image: string, id: string) => {
  const imageRef = ref(storage, `${image + '_' + id}`);
  await deleteObject(imageRef);
};
