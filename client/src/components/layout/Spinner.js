import React from 'react';
import { Dimmer, Loader, Container } from 'semantic-ui-react';

const Spinner = ({ loading, children }) => {
  return (
    <Dimmer.Dimmable
      style={{
        position: 'absolute',
        paddingTop: '5rem',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        height: '100vh',
        backgroundColor: '#eeeeee',
        overflowY: 'auto',
        zIndex: '0'
      }}>
      <Dimmer active={loading}>
        <Loader content="Loading" size="large" />
      </Dimmer>
      <Container>{children}</Container>
    </Dimmer.Dimmable>
  );
};

export default Spinner;
