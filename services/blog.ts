import { v4 as uuidv4 } from 'uuid';
import client from './client';
import { deleteImageFromFirebase, postImageOnFirebase } from './firebase';

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
    if (postImage) {
      await deleteImageFromFirebase(postImage, id);
    }
    firebaseImageURL = await postImageOnFirebase(postImageFile, id);
  }

  const payload = {
    title,
    author,
    postBody,
    postImage: firebaseImageURL || postImage
  };
  await client.put(`/postsdata/update/${id}`, payload);
};

export const deleteBlog = async (id: string, image: string) => {
  if (image) {
    await deleteImageFromFirebase(image, id);
  }
  await client.delete('/postsdata/' + id);
};
