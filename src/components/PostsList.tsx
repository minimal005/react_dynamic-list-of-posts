import React, { useEffect, useState } from 'react';
import { Post as PostUser } from '../types/Post';
import { Post } from './Post';

type Props = {
  postsByUser: PostUser[];
  setPostSelected: (post: PostUser | null) => void;
};
export const PostsList: React.FC<Props> = props => {
  const { postsByUser, setPostSelected } = props;
  const [currentPost, setCurrentPost] = useState<PostUser | null>(null);

  useEffect(() => {
    setPostSelected(currentPost);
  }, [currentPost, setPostSelected]);

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {postsByUser.map(post => (
            <Post
              key={post.id}
              post={post}
              setCurrentPost={setCurrentPost}
              currentPost={currentPost}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
