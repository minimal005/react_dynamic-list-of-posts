import React from 'react';
import { Post as PostUser } from '../types/Post';

type Props = {
  post: PostUser;
  setCurrentPost: (post: PostUser | null) => void;
  currentPost: PostUser | null;
};
export const Post: React.FC<Props> = props => {
  const { post, setCurrentPost, currentPost } = props;
  const handleOpenDetails = () => {
    if (!currentPost || currentPost.id !== post.id) {
      setCurrentPost(post);
    } else {
      setCurrentPost(null);
    }
  };

  const openClassButton = currentPost?.id === post.id ? '' : 'is-light';

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>
      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          onClick={handleOpenDetails}
          type="button"
          data-cy="PostButton"
          className={`button is-link ${openClassButton}`}
        >
          {currentPost?.id === post.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
