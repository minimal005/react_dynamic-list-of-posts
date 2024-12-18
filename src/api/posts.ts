import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

const url = `/posts`;

export const getPosts = (userId: number) => {
  return client.get<Post[]>(`${url}?userId=${userId}`);
};

export const createPost = (post: Omit<Post, 'id'>) => {
  return client.post<Post>(`${url}`, post);
};

export const editPost = (post: Post) => {
  return client.patch<Post>(`${url}/${post.id}`, post);
};

export const deletePost = (postId: number) => {
  return client.delete(`${url}/${postId}`);
};
