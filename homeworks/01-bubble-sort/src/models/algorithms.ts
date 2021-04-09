export function* minElement(xs: number[]) {
  for (let i = 0; i < xs.length; i++) {
    let min = xs[i], minIndex = i;
    for (let j = i + 1; j < xs.length; j++) {
      if (xs[j] < min) {
        minIndex = j;
        min = xs[j];
      }
    }
    xs[minIndex] = xs[i];
    xs[i] = min;
    yield xs;
  }
}

export function* bubble(xs: number[]) {
  for (let i = 1; i < xs.length; i++) {
    let f = 0;
    for (let j = 0; j < xs.length - i; j++) {
      if (xs[j + 1] < xs[j]) {
        f = 1;
        const tmp = xs[j];
        xs[j] = xs[j + 1];
        xs[j + 1] = tmp;
        yield xs;
      }
    }
    if (f === 0) {
      break;
    }
  }
}
