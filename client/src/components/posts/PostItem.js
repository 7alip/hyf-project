import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
  addLike,
  removeLike,
  deletePost
} from '../../redux/actions/post-actions';
import { Icon, Card, Image, Button } from 'semantic-ui-react';

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  addLike,
  removeLike,
  deletePost,
  showActions
}) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header
          style={{ display: 'flex', alignItems: 'center' }}
          as={Link}
          to={`/profile/${user}`}>
          <Image size="tiny" floated="left" circular src={avatar} alt={name} />
          <Card.Content>{name}</Card.Content>
        </Card.Header>
        <Card.Meta>
          <p>
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
        </Card.Meta>
        <Card.Description>
          <div>
            <p className="my-1">{text}</p>
            {showActions && (
              <>
                <Button
                  icon
                  type="button"
                  className="btn btn-light"
                  onClick={() => addLike(_id)}>
                  <Icon name="thumbs up" />{' '}
                  {likes.length > 0 && <span>{likes.length}</span>}
                </Button>
                <Button
                  icon
                  type="button"
                  className="btn btn-light"
                  onClick={() => removeLike(_id)}>
                  <Icon name="thumbs down" />{' '}
                </Button>
                <Link to={`/posts/${_id}`} className="ui button primary">
                  Discussion{' '}
                  {comments.length > 0 && <span>{comments.length}</span>}
                </Link>
                {!auth.loading && auth.user._id && (
                  <Button
                    icon
                    color="red"
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deletePost(_id)}>
                    <Icon name="times" />
                  </Button>
                )}
              </>
            )}
          </div>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

PostItem.defaultProps = {
  showActions: PropTypes.bool.isRequired
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = ({ authReducer }) => ({
  auth: authReducer
});

const mapDispatchToProps = { addLike, removeLike, deletePost };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);
