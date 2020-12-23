import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import Select from 'react-select';

interface OwnProps {
  setSearch: React.Dispatch<any>;
}

type Props = OwnProps;

const SearchBar: FunctionComponent<Props> = ({ setSearch }) => {
  const [thread, setThread] = useState('25266288');
  const [threads, setThreads] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [desc, setDesc] = useState('false');
  const [filters, setFilters] = useState<(string | undefined)[]>([]);
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearch({ thread, sortBy, desc, filters });
  }, [sortBy, thread, desc, filters]);

  useEffect(() => {
    fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story,author_whoishiring')
      .then((res) => res.json())
      .then((res) =>
        setThreads(res.hits.map((thread: any) => ({ label: thread.title, value: thread.objectID })))
      );
  }, []);
  return (
    <div>
      <Select
        onChange={(thread: any) => setThread(thread?.value)}
        options={threads}
        placeholder="select"
        className="spacing"
        isSearchable
      />
      <div>
        <input type="text" placeholder={'Search for specified words'} ref={search} />
        <button onClick={() => setFilters((prev) => [...prev, search.current?.value])}>
          Search
        </button>
        {filters.map((filter) => (
          <span key={filter}>
            {filter}{' '}
            <span
              onClick={() =>
                setFilters((prevState) => prevState.filter((f) => f !== filter && !f))
              }>
              x
            </span>
          </span>
        ))}
      </div>
      <select defaultValue={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="date">Date</option>
        <option value="salary">Salary</option>
      </select>
      <input
        type="checkbox"
        defaultChecked={false}
        onChange={(e) => setDesc(e.target.checked ? 'true' : 'false')}
      />
    </div>
  );
};

export default SearchBar;