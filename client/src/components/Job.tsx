import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface OwnProps {
  job: any;
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
  p:first-of-type {
    font-weight: bold;
  }
`;
const Job: FunctionComponent<Props> = ({ job, filters }) => {
  let content = job.text;
  filters.forEach((filter) => {
    if (filter) content = highlightWordsInHtml(content, filter, '#c36120');
  });

  return (
    <JobCard>
      <span dangerouslySetInnerHTML={{ __html: content }} />
    </JobCard>
  );
};

export default Job;
