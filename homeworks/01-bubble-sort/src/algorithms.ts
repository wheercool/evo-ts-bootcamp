export function* minElement(values: number[]) {
  for (let i = 0; i < values.length; i++) {
    let min = values[i], minIndex = i;
    for (let j = i + 1; j < values.length; j++) {
      if (values[j] < min) {
        minIndex = j;
        min = values[j];
      }
    }
    values[minIndex] = values[i];
    values[i] = min;
    yield values;
  }
}

export function* bubble(values: number[]) {
  for (let i = 1; i < values.length; i++) {
    let hasAnySwap = false;
    for (let j = 0; j < values.length - i; j++) {
      if (values[j + 1] < values[j]) {
        hasAnySwap = true;
        const tmp = values[j];
        values[j] = values[j + 1];
        values[j + 1] = tmp;
        yield values;
      }
    }
    if (!hasAnySwap) {
      break;
    }
  }
}
