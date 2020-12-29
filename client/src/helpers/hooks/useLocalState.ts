import { Dispatch, SetStateAction, useEffect, useState } from 'react';
function getLocalState<S>(key: string, init: S) {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value) as S;
  }
  return init;
}
function setLocalState<S>(key: string, state: S) {
  localStorage.setItem(key, JSON.stringify(state));
}
function useLocalState<S>(key: string, initialState: S): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState<S>(getLocalState(key, initialState));
  useEffect(() => {
    setLocalState(key, state);
  }, [state]);
  return [state, setState];
}
export default useLocalState;
