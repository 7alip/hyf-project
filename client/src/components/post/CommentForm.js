import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../redux/actions/post-actions';

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState('');

  const handleChange = e => setText(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    addComment(postId, { text });
    setText('');
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a comment</h3>
      </div>
      <form className="form my-1" onSubmit={handleSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Leave a comment"
          value={text}
          onChange={handleChange}
          required></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addComment
};

export default connect(
  null,
  mapDispatchToProps
)(CommentForm);
