import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface OwnProps {
  author: string;
  timestamp: string;
}

type Props = OwnProps;
const Info = styled.div`
  font-size: small;
  margin: 5px 0;
  color: #f79100;
`;
const InfoHeader: FunctionComponent<Props> = ({ author, timestamp }) => {
  return (
    <Info>
      <strong>{author}</strong> {timestamp && <span>{new Date(timestamp).toDateString()}</span>}
    </Info>
  );
};

export default InfoHeader;
