import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../redux/actions/post-actions';
import { Button, TextArea, Form, Label, Icon } from 'semantic-ui-react';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  const handleChange = e => setText(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    addPost({ text });
    setText('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Say something</label>
        <TextArea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={handleChange}
          required></TextArea>
      </Form.Field>
      <Form.Field>
        <Button primary>
          <Icon name="plus" /> Create
        </Button>
      </Form.Field>
    </Form>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addPost
};

export default connect(
  null,
  mapDispatchToProps
)(PostForm);
