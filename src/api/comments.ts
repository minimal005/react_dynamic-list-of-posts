import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

const url = `/comments`;

export const getComments = (postId: number) => {
  return client.get<Comment[]>(`${url}?postId=${postId}`);
};

export const createComment = (comment: Omit<Comment, 'id'>) => {
  return client.post<Comment>(`${url}`, comment);
};

export const editComment = (comment: Comment) => {
  return client.patch<Comment>(`${url}/${comment.id}`, comment);
};

export const deleteComment = (commentId: number) => {
  return client.delete(`${url}/${commentId}`);
};
