import React, { FunctionComponent, useState } from 'react';
import { useQuery } from 'react-query';
import SearchBar from './SearchBar';
import LoadingHandler from './LoadingHandler';
import Pagination from './Pagination';

interface OwnProps {}

type Props = OwnProps;

const Jobs: FunctionComponent<Props> = () => {
  const [pageIndex, setPage] = useState(0);
  const [{ thread, filters, sortBy, desc }, setSearch] = useState({
    thread: '25266288',
    filters: [],
    sortBy: 'date',
    desc: 'true',
  });
  const fetchProjects = (
    thread: string,
    pageIndex: number,
    filters?: string[],
    sortBy?: string,
    desc?: string
  ) => {
    const url = new URL(`http://localhost:8080/api/jobs?thread=${thread}&pageIndex=${pageIndex}`);
    filters && filters.forEach((filter) => url.searchParams.append('filters', filter));
    sortBy && url.searchParams.set('sortBy', sortBy);
    desc && url.searchParams.set('desc', desc);
    return fetch(url.toString()).then((res) => res.json());
  };

  const { isLoading, isError, error, data, isFetching, isPreviousData } = useQuery(
    ['jobs', { thread, pageIndex, filters, sortBy, desc }],
    () => fetchProjects(thread, pageIndex, filters, sortBy, desc),
    { keepPreviousData: true }
  );
  return (
    <>
      <SearchBar setSearch={setSearch} />
      <LoadingHandler isLoading={isLoading} isError={isError} error={error}>
        {data?.page?.map((job: any) => (
          <p key={job.id}>
            <span dangerouslySetInnerHTML={{ __html: job.text }} />
          </p>
        ))}
      </LoadingHandler>
      <Pagination
        pageIndex={pageIndex}
        setPage={setPage}
        isPreviousData={isPreviousData}
        hasMore={data?.hasMore ?? true}
      />
      {isFetching ? <span> Loading...</span> : null}
    </>
  );
};

export default Jobs;
