export enum CompareResult {
  EQ = 0,
  GT = 1,
  LS = -1
}

export type Comparator<T> = (a: T, b: T) => CompareResult;

export function mergeSort<V>(xs: V[], comparator: Comparator<V>): V[] {
  const copy = xs.concat();
  if (copy.length <= 1) {
    return copy
  }
  mergeSortRec(copy, comparator, 0, xs.length - 1);
  return copy;
}

function mergeSortRec<V>(xs: V[], comparator: Comparator<V>, left: number, right: number) {
  if (left >= right) {
    return;
  }
  const middle = ((right + left) / 2) | 0;
  mergeSortRec(xs, comparator, left, middle)
  mergeSortRec(xs, comparator, middle + 1, right);
  merge(xs, comparator, left, middle, right);
}

function merge<V>(xs: V[], comparator: Comparator<V>, left: number, middle: number, right: number) {
  const ls = [];
  for (let i = left; i <= middle; i++) {
    ls.push(xs[i]);
  }
  const rs = [];
  for (let i = middle + 1; i <= right; i++) {
    rs.push(xs[i]);
  }
  let l = 0, r = 0, i = left;
  while (ls.length > 0 && rs.length > 0) {
    if (comparator(ls[l], rs[r]) === CompareResult.GT) {
      xs[i] = rs.shift()!;
    } else {
      xs[i] = ls.shift()!;
    }
    i++;
  }
  while (ls.length > 0) {
    xs[i++] = ls.shift()!;
  }
  while (rs.length > 0) {
    xs[i++] = rs.shift()!;
  }
}

