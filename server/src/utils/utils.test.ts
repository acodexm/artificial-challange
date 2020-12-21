import { sortByType } from './utils';

const data = [
  {
    author: 'bkp2',
    children: [],
    created_at: new Date('2020-12-01T18:35:34.000Z'),
    created_at_i: 1606847734,
    id: 1,
    options: [],
    parent_id: 25266288,
    points: null,
    story_id: 25266288,
    text: 'Docker, Inc.| US, France, UK, Germany, Netherlands | Remote Docker',
    title: null,
    type: 'comment',
    url: null,
  },
  {
    author: 'bkp2',
    children: [],
    created_at: new Date('2020-11-01T18:35:34.000Z'),
    created_at_i: 1606847734,
    id: 2,
    options: [],
    parent_id: 25266288,
    points: null,
    story_id: 25266288,
    text: 'Docker, Inc.| US, France, UK, Germany, Netherlands | Remote Docker',
    title: null,
    type: 'comment',
    url: null,
  },
  {
    author: 'bkp2',
    children: [],
    created_at: new Date('2020-10-01T18:35:34.000Z'),
    created_at_i: 1606847734,
    id: 3,
    options: [],
    parent_id: 25266288,
    points: null,
    story_id: 25266288,
    text: 'Docker, Inc.| US, France, UK, Germany, Netherlands | Remote Docker',
    title: null,
    type: 'comment',
    url: null,
  },

];
describe('test utils', () => {
  it('sorts data desc', () => {
    expect(data.sort(sortByType({ id: 'id', desc: true }))).toEqual(data.reverse());
    expect(data.sort(sortByType({ id: 'created_at', desc: true }))).toEqual(data.reverse());
  });
  it('sorts data asc', () => {
    expect(data.sort(sortByType({ id: 'id', desc: false }))).toEqual(data);
    expect(data.sort(sortByType({ id: 'created_at', desc: false }))).toEqual(data);
  });
});
