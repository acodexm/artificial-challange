import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import InfoHeader from './InfoHeader';

interface OwnProps {
  comments: any[];
}

type Props = OwnProps;
const CommentItem = styled.div`
  margin: 1rem 0 0 2rem;
  flex-wrap: wrap;
  flex-grow: 1;
  background-color: darkslateblue;
  padding: 1rem;
  border-radius: 8px;
  border: #332d64 solid 5px;
  div:first-of-type {
    font-weight: bold;
  }
`;
const CommentSection = styled.div`
  button {
    background: none;
    outline: none;
    color: #f79100;
    border: none;
    cursor: pointer;
  }
`;
const Comment: FunctionComponent<Props> = ({ comments }) => {
  const [open, setOpen] = useState(false);
  return comments.length ? (
    <CommentSection>
      <button onClick={() => setOpen((prevState) => !prevState)}>
        {open ? '[close]' : '[open]'}
      </button>
      {open &&
        comments.map((comment) => (
          <CommentItem>
            <InfoHeader author={comment.author} timestamp={comment.created_at} />
            <div dangerouslySetInnerHTML={{ __html: comment.text }} />
            <Comment comments={comment.children} />
          </CommentItem>
        ))}
    </CommentSection>
  ) : null;
};

export default Comment;
