import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import LoadingHandler from './loading/LoadingHandler';
import { State } from './Main';
import { Container } from 'styled-bootstrap-grid';
import Job from './Job';
import { QueryUpdater } from '../helpers/hooks/useQueryAsState';
import qs from 'query-string';

interface OwnProps {
  state: State;
  setState: QueryUpdater<State>;
}

type Props = OwnProps;

const Jobs: FunctionComponent<Props> = ({ setState, state }) => {
  const fetchProjects = (state: State) => {
    return fetch(
      `http://localhost:8080/api/jobs?${qs.stringify(state, {
        skipEmptyString: true,
        skipNull: true,
      })}`
    ).then((res) => res.json());
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
        isFetching={isFetching}
        pageIndex={state.pageIndex}
        setPage={setState}
        isPreviousData={isPreviousData}
        hasMore={data?.hasMore ?? true}
      />
    </Container>
  );
};

export default Jobs;
