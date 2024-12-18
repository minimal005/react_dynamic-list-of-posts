import classNames from 'classnames';
import * as postsService from './api/posts';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { Post } from './types/Post';

export const App = () => {
  const [userSelectedId, setUserSelectedId] = useState<number | null>(null);

  const [postsByUser, setPostsByUser] = useState<Post[]>([]);
  const [postSelected, setPostSelected] = useState<Post | null>(null);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoadind] = useState(false);
  const [isActiveListUsers, setIsActiveListUsers] = useState(false);

  useEffect(() => {
    if (!userSelectedId) {
      return;
    }

    setPostSelected(null);
    setIsLoadind(true);
    const getPostsByUser = async () => {
      try {
        const postsUser = await postsService.getPosts(userSelectedId);

        setPostSelected(null);
        setPostsByUser(postsUser);
      } catch (error) {
        setIsError(true);
        setPostsByUser([]);
      } finally {
        setIsLoadind(false);
      }
    };

    getPostsByUser();
  }, [userSelectedId]);

  const showMessageAboutNotPosts =
    !postsByUser.length && userSelectedId && !isLoading && !isError;

  return (
    <main className="section" onClick={() => setIsActiveListUsers(false)}>
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  setIsError={setIsError}
                  setUserSelectedId={setUserSelectedId}
                  isActive={isActiveListUsers}
                  setIsActive={setIsActiveListUsers}
                  setPostsByUser={setPostsByUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!userSelectedId && !isLoading && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showMessageAboutNotPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {!!postsByUser.length && (
                  <PostsList
                    postsByUser={postsByUser}
                    setPostSelected={setPostSelected}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': !!postSelected },
            )}
          >
            {postSelected && (
              <div className="tile is-child box is-success ">
                <PostDetails postSelected={postSelected} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
