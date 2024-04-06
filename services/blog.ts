import { v4 as uuidv4 } from 'uuid';
import client from './client';

export const postBlog = async (
  author: string,
  title: string,
  postBody: string,
  postDate: string,
  postImage: string
) => {
  const payload = {
    _id: uuidv4(),
    author,
    title,
    postBody,
    postDate,
    postImage
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
  postImage: string
) => {
  const payload = {
    title,
    author,
    postBody,
    postImage
  };
  await client.put(`/postsdata/update/${id}`, payload);
};

export const deleteBlog = async (id: string) => {
  await client.delete('/postsdata/' + id);
};
