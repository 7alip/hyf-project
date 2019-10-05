import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../redux/actions/post-actions';
import Moment from 'react-moment';
import {
  Icon,
  Button,
  Image,
  Segment,
  Card,
  List,
  Header
} from 'semantic-ui-react';

const CommentItem = ({
  auth,
  postId,
  comment: { _id, user, avatar, name, text, date },
  deleteComment
}) => {
  return (
    <Card fluid>
      <Card.Content as={Link} to={`/profile/${user}`}>
        <Image size="mini" floated="left" circular src={avatar} alt={name} />
        {!auth.loading && auth.user._id === user && (
          <Button
            floated="right"
            size="mini"
            inverted
            icon
            color="red"
            type="button"
            className="btn btn-danger"
            onClick={() => deleteComment(postId, _id)}>
            <Icon name="trash" />
          </Button>
        )}
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </Card.Meta>
        <Card.Description>
          <p>{text}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired
};

const mapStateToProps = ({ authReducer }) => ({
  auth: authReducer
});

const mapDispatchToProps = {
  deleteComment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItem);
