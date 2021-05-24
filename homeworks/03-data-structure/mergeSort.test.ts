import { Comparator, mergeSort } from './mergeSort';

describe('mergeSort', () => {
  const comparator: Comparator<number> = (a: number, b: number) =>
    a > b
      ? 1
      : a == b
      ? 0
      : -1

  it('should sort empty array', () => {
    expect(mergeSort([], comparator)).toEqual([])
  })

  it('should sort one element array', () => {
    expect(mergeSort([42], comparator)).toEqual([42]);
  })

  it('should sort sorted array', () => {
    const xs = [1, 2, 3, 4, 5];
    expect(mergeSort(xs, comparator)).toEqual(xs);
  })
  it('should sort any array', () => {
    const xs = [5, 10, 1239, 4, 32234, 1231, 5329, 1, 3, 5];
    const expected = xs.concat().sort(comparator);
    const actual = mergeSort(xs, comparator);
    expect(actual).toEqual(expected);
  })
})
