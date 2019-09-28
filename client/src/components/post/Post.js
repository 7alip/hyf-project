import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../../redux/actions/post-actions';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';
import CommentItem from '../posts/CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="/posts" className="btn">
        Back to posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments &&
          post.comments.map(comment => {
            return (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            );
          })}
      </div>
    </>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = ({ postReducer }) => ({ post: postReducer });

const mapDispatchToProps = { getPost };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
