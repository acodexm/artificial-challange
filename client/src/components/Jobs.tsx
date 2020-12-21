import React, { FunctionComponent, useState } from 'react';
import { useQuery } from 'react-query';
import { debounce } from 'lodash';

interface OwnProps {}

type Props = OwnProps;

const Jobs: FunctionComponent<Props> = () => {
  const [pageIndex, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('date');
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const fetchProjects = debounce((pageIndex: number, filter?: string, sortBy?: string) => {
    const url = new URL(`http://localhost:8080/api/jobs?pageIndex=${pageIndex}`);
    filter && url.searchParams.set('filter', filter);
    sortBy && url.searchParams.set('sortBy', sortBy);
    return fetch(url.toString()).then((res) => res.json());
  }, 300);

  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery<any, any, any>(
    ['jobs', { pageIndex, filter, sortBy }],
    () => fetchProjects(pageIndex, filter, sortBy),
    { keepPreviousData: true }
  );

  return (
    <div>
      <div>
        <input type="text" defaultValue={filter} onChange={(e) => setFilter(e.target?.value)} />
        <select defaultValue={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Date</option>
          <option value="salary">Salary</option>
        </select>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data?.page.map((job: any) => (
            <p key={job.id}>
              <span dangerouslySetInnerHTML={{ __html: job.text }} />
            </p>
          ))}
        </div>
      )}
      <span>Current Page: {pageIndex + 1}</span>
      <button onClick={() => setPage((old) => Math.max(old - 1, 0))} disabled={pageIndex === 0}>
        Previous Page
      </button>{' '}
      <button
        onClick={() => {
          if (!isPreviousData && data?.hasMore) {
            setPage((old) => old + 1);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPreviousData || !data?.hasMore}>
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{' '}
    </div>
  );
};

export default Jobs;
