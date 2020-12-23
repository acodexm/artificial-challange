import React, { FunctionComponent, useEffect, useRef, useState, KeyboardEvent } from 'react';
import Select, { ValueType } from 'react-select';
import { State } from './Main';
import { QueryUpdater } from '../helpers/hooks/useQueryAsState';
import { flatten, isString } from 'lodash';
import styled from 'styled-components';
import { Container, Row } from 'styled-bootstrap-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';

interface OwnProps {
  state: State;
  setSearch: QueryUpdater<State>;
}
type Props = OwnProps;
type OptionType = {
  label: string;
  value: string;
};
const SearchBox = styled(Container)`
  margin-top: 1rem;
  .searchInput {
    display: flex;
    flex-grow: 1;
    background-color: #2e3241;
    border: #cccc solid 1px;
    border-radius: 5px;
    color: #00d8ff;
    min-height: 38px;
    padding: 2px 8px;
    box-sizing: border-box;
    ::placeholder {
      color: #00a0be;
    }
    :focus {
      z-index: 2;
      box-shadow: 0 0 0 2px #00d8ff;
    }
  }
  button {
    background-color: #00d8ff;
    border-radius: 5px;
  }
`;
const SearchKey = styled.span`
  margin: 1rem 1rem 0 0;
  padding: 3px;
  color: white;
  font-weight: bold;
  border-radius: 3px;
  background-color: #c36120;
  span {
    cursor: pointer;
    margin: 2px;
  }
`;
const SortBox = styled.div`
  align-items: center;
  display: flex;
  margin: 1rem 0 0 0;
  select {
    min-height: 38px;
    background-color: #00d8ff;
    margin-left: 4px;
    border-radius: 5px;
  }
`;
const SearchBar: FunctionComponent<Props> = ({ setSearch, state }) => {
  const [threads, setThreads] = useState([]);
  const [sortBy, setSortBy] = useState(state.sortBy);
  const [desc, setDesc] = useState(state.desc);
  const [filters, setFilters] = useState<string[]>(flatten([state.filters]));
  const search = useRef<HTMLInputElement>(null);
  const [selectedOption, setSelectedOption] = useState<ValueType<OptionType, false>>({
    value: state.thread,
    label: 'todo',
  });

  const handleChange = (option: ValueType<OptionType, false>) => {
    setSelectedOption(option);
  };
  useEffect(() => {
    setSearch({ thread: selectedOption?.value, sortBy, desc, filters });
  }, [sortBy, selectedOption, desc, filters]);

  useEffect(() => {
    fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story,author_whoishiring')
      .then((res) => res.json())
      .then((res) =>
        setThreads(res.hits.map((thread: any) => ({ label: thread.title, value: thread.objectID })))
      );
  }, []);
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  const handleSearch = () => {
    setFilters((prev) => {
      const f = [...prev];
      const value = search.current?.value;
      if (isString(value) && value !== '' && !f.find((v) => v == value)) {
        f.push(value);
      }
      return f;
    });
  };
  return (
    <div>
      <Select
        onChange={handleChange}
        options={threads}
        placeholder="Select topic"
        className="spacing"
        isSearchable
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            neutral50: '#00a0be',
            neutral80: '#00d8ff',
            neutral0: '#2e3241',
            primary25: '#0291ac',
            primary: '#00d8ff',
          },
        })}
      />
      <SearchBox>
        <Row>
          <input
            className={'searchInput'}
            type="text"
            placeholder={'Search for specified words'}
            ref={search}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearch}>Search</button>
        </Row>
        <Row>
          {filters.map((filter) => (
            <SearchKey key={filter}>
              {filter}{' '}
              <span
                onClick={() =>
                  setFilters((prevState) => prevState.filter((f) => f !== filter && !!f))
                }>
                x
              </span>
            </SearchKey>
          ))}
        </Row>
        <Row>
          <SortBox>
            <FontAwesomeIcon
              color={'#00d8ff'}
              flip={'horizontal'}
              size={'2x'}
              icon={desc ? faSortAmountDown : faSortAmountUp}
              onClick={() => setDesc((prevState) => !prevState)}
            />
            <select defaultValue={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Date</option>
              <option value="salary">Salary</option>
            </select>
          </SortBox>
        </Row>
      </SearchBox>
    </div>
  );
};

export default SearchBar;
