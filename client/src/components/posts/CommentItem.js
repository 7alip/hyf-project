import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../redux/actions/post-actions';
import Moment from 'react-moment';

const CommentItem = ({
  auth,
  postId,
  comment: { _id, user, avatar, name, text, date },
  deleteComment
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt={name} />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && auth.user._id === user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteComment(postId, _id)}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
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
