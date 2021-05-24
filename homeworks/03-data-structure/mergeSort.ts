export type Comparator<T> = (a: T, b: T) => number;

export function mergeSort<V>(values: V[], comparator: Comparator<V>): V[] {
  const copy = values.concat();
  if (copy.length <= 1) {
    return copy
  }
  mergeSortRec(copy, comparator, 0, values.length - 1);
  return copy;
}

function mergeSortRec<V>(xs: V[], comparator: Comparator<V>, left: number, right: number) {
  if (left >= right) {
    return;
  }
  const middle = Math.floor((right + left) / 2);
  mergeSortRec(xs, comparator, left, middle)
  mergeSortRec(xs, comparator, middle + 1, right);
  merge(xs, comparator, left, middle, right);
}

function merge<V>(values: V[], comparator: Comparator<V>, left: number, middle: number, right: number) {
  const leftValues = [];
  for (let i = left; i <= middle; i++) {
    leftValues.push(values[i]);
  }
  const rightValues = [];
  for (let i = middle + 1; i <= right; i++) {
    rightValues.push(values[i]);
  }
  let l = 0, r = 0, i = left;
  while (leftValues.length > 0 && rightValues.length > 0) {
    if (comparator(leftValues[l], rightValues[r]) > 0) {
      values[i] = rightValues.shift()!;
    } else {
      values[i] = leftValues.shift()!;
    }
    i++;
  }
  while (leftValues.length > 0) {
    values[i++] = leftValues.shift()!;
  }
  while (rightValues.length > 0) {
    values[i++] = rightValues.shift()!;
  }
}

