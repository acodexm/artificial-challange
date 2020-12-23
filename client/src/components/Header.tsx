import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Header = styled.header`
  h1 {
    z-index: 1;
    color: #00d8ff;
    text-align: center;
    font-style: italic;
  }
  div {
    padding: 0.5rem;
    position: absolute;
    top: 0;
    right: 0;
    background: #8e8e8e;
    clip-path: polygon(0 20px, 20px 100%, 100% 100%, 100% 0, 0 0);
    a {
      margin-left: 5px;
      color: #00d8ff;
      text-decoration: unset;
    }
  }
`;

export default () => (
  <Header>
    <div>
      <FontAwesomeIcon icon={faGithub} />
      <a href="https://github.com/acodexm">By acodexm</a>
    </div>
    <h1>HACKER NEWS: Who is hiring?</h1>
  </Header>
);
