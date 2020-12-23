import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { isArray } from 'lodash';
import Comment from './Comment';
import InfoHeader from './InfoHeader';
import { Item } from '../model/Item';

interface OwnProps {
  job: Item;
  filters: (string | undefined)[];
}

type Props = OwnProps;

function highlightWordsInHtml(line: string, word: string, color: string) {
  // ensure we capture the keyword, except if found inside a html tag
  const regex = new RegExp(`(?<!<[^>]*)(${word})`, 'gmi');
  const spanTag = `<span style="background-color: ${color}">$1</span>`;
  return line.replace(regex, spanTag);
}

const JobCard = styled.div`
  margin: 2rem 0;
  background-color: #2e3241;
  padding: 2rem;
  border: #00d8ff solid 1px;
  border-radius: 1rem;
  color: #00d8ff;
  a {
    color: #f79100;
  }
  p:first-child {
    font-weight: bold;
  }
`;
const Job: FunctionComponent<Props> = ({ job, filters }) => {
  let content = job.text;
  if (isArray(filters))
    filters.forEach((filter) => {
      if (filter) content = highlightWordsInHtml(content, filter, '#c36120');
    });
  else if (filters) content = highlightWordsInHtml(content, filters, '#c36120');

  return (
    <JobCard>
      <InfoHeader author={job.author} timestamp={job.created_at} />
      <span dangerouslySetInnerHTML={{ __html: content }} />
      <Comment comments={job.children} />
    </JobCard>
  );
};

export default Job;
