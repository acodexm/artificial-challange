import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { useQuery } from 'react-query';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import LoadingHandler from './loading/LoadingHandler';
import { State } from './Main';
import { Container } from 'styled-bootstrap-grid';
import Job from './Job';

interface OwnProps {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
}

type Props = OwnProps;

const Jobs: FunctionComponent<Props> = ({ setState, state }) => {
  const fetchProjects = ({ thread, pageIndex, filters, sortBy, desc }: State) => {
    const url = new URL(`http://localhost:8080/api/jobs?thread=${thread}&pageIndex=${pageIndex}`);
    filters && filters.forEach((filter) => filter && url.searchParams.append('filters', filter));
    sortBy && url.searchParams.set('sortBy', sortBy);
    desc && url.searchParams.set('desc', desc);
    return fetch(url.toString()).then((res) => res.json());
  };

  const { isLoading, isError, data, isFetching, isPreviousData } = useQuery(
    ['jobs', state],
    () => fetchProjects(state),
    { keepPreviousData: true }
  );
  return (
    <Container>
      <SearchBar state={state} setSearch={setState} />
      <LoadingHandler loading={isLoading} error={isError}>
        {data?.page?.map((job: any) => (
          <Job key={job.id} job={job} filters={state.filters} />
        ))}
      </LoadingHandler>
      <Pagination
        pageIndex={state.pageIndex}
        setPage={setState}
        isPreviousData={isPreviousData}
        hasMore={data?.hasMore ?? true}
      />
      {isFetching ? <span> Loading...</span> : null}
    </Container>
  );
};

export default Jobs;
