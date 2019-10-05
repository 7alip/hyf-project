import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../../redux/actions/post-actions';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from '../posts/CommentItem';
import {
  Loader,
  Segment,
  Dimmer,
  Container,
  List,
  Card,
  Divider
} from 'semantic-ui-react';
import Spinner from '../layout/Spinner';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return (
    <Spinner loading={loading || post === null}>
      <Container>
        <Link to="/posts" className="ui button secondary">
          Back to posts
        </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <Divider />
        <h1>Comments</h1>
        <Card.Group>
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
        </Card.Group>
      </Container>
    </Spinner>
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
