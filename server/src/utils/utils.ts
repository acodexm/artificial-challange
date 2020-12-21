import { get, isDate, isNumber, isString } from 'lodash';

export type SortingRule = {
  id: string;
  desc?: boolean;
};

const compareTypes = (a: any, b: any) => {
  if (isString(a) && isString(b)) {
    return a.localeCompare(b);
  } else if (isDate(a) && isDate(b)) {
    return a.getTime() - b.getTime();
  } else if (isNumber(a) && isNumber(b)) {
    return a - b;
  }
  return 0;
};

export function sortByType<T>(sortBy: SortingRule) {
  return (l: T, r: T) => {
    if (sortBy.desc) return compareTypes(get(l, sortBy.id), get(r, sortBy.id));
    return compareTypes(get(r, sortBy.id), get(l, sortBy.id));
  };
}
