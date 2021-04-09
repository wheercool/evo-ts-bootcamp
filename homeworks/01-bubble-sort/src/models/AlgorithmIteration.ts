export type AlgorithmIteration = (xs: number[]) => [boolean, number[]];
export type Algorithm = (xs: number[]) => Generator<number[]>;

export function toAlgorithmIteration(generator: Generator<number[]>): AlgorithmIteration {
  return () => {
    const next = generator.next();
    const done = next.done ?? false;
    return [done, next.value];
  }
}
