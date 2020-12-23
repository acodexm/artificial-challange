import React from 'react';
import { Container, Row } from 'styled-bootstrap-grid';
import styled from 'styled-components';

const NoContent = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  font-size: large;
`;

const NotFound = () => (
  <Container>
    <Row justifyContent={'center'} alignItems={'center'}>
      <NoContent style={{ margin: '5rem' }}>Page not found</NoContent>
    </Row>
  </Container>
);

export default NotFound;
