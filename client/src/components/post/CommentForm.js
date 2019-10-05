import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../redux/actions/post-actions';
import { Form, TextArea, Button, Segment } from 'semantic-ui-react';

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState('');

  const handleChange = e => setText(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    addComment(postId, { text });
    setText('');
  };

  return (
    <Segment padded>
      <Form className="form my-1" onSubmit={handleSubmit}>
        <Form.Field>
          <label>Leave a Comment</label>
          <TextArea
            name="text"
            cols="30"
            rows="5"
            placeholder="Leave a comment"
            value={text}
            onChange={handleChange}
            required></TextArea>
        </Form.Field>
        <Form.Field>
          <Button primary>Submit</Button>
        </Form.Field>
      </Form>
    </Segment>
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
