import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPosts } from '../../redux/actions/post-actions';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import {
  Dimmer,
  Loader,
  Segment,
  Container,
  Icon,
  Card
} from 'semantic-ui-react';
import Spinner from '../layout/Spinner';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Spinner loading={loading}>
      <Container>
        <h1>Posts</h1>
        <p>
          <Icon name="user" /> Welcome to the community
        </p>
        <Segment color="blue" stacked>
          <PostForm />
        </Segment>
        <Card.Group>
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </Card.Group>
      </Container>
    </Spinner>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = ({ postReducer }) => ({
  post: postReducer
});

const mapDispatchToProps = {
  getPosts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
