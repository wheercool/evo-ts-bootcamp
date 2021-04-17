import { IBinaryTree } from './IBinaryTree';

export enum TraverseType {
  InOrder,
  PreOrder,
  PostOrder,
  BFS
}

export class BinaryTree<T> implements IBinaryTree<T> {
  get left(): IBinaryTree<T> | undefined {
    return this.tree.left;
  }

  get right(): IBinaryTree<T> | undefined {
    return this.tree.right;
  }

  get value(): T {
    return this.tree.value;
  }

  constructor(private tree: IBinaryTree<T>) {
  }

  traverse<V>(traverseType: TraverseType): T[] {
    switch (traverseType) {
      case TraverseType.InOrder:
        return this.inOrderTraverse(this.tree);
      case TraverseType.PreOrder:
        return this.preOrderTraverse(this.tree);
      case TraverseType.PostOrder:
        return this.postOrderTraverse(this.tree);
      case TraverseType.BFS:
        return this.bfsTraverse(this.tree);
    }
  }

  getColumn(columnOrder: number): T[] {
    const q: [tree: IBinaryTree<T>, order: number][] = [[this.tree, 0]];
    const result: T[] = [];
    while (q.length) {
      const [next, order] = q.shift()!;
      if (order === columnOrder) {
       result.push(next.value);
      }
      if (next.left) {
        q.push([next.left, order - 1]);
      }
      if (next.right) {
        q.push([next.right, order + 1]);
      }
    }
    return result;
  }

  private inOrderTraverse(tree: IBinaryTree<T>): T[] {
    const leftValues = tree.left ? this.inOrderTraverse(tree.left) : [];
    const rightValues = tree.right ? this.inOrderTraverse(tree.right) : [];
    return leftValues.concat([tree.value], rightValues);
  }

  private preOrderTraverse(tree: IBinaryTree<T>): T[] {
    const leftValues = tree.left ? this.preOrderTraverse(tree.left) : [];
    const rightValues = tree.right ? this.preOrderTraverse(tree.right) : [];
    return [tree.value].concat(leftValues, rightValues);
  }

  private postOrderTraverse(tree: IBinaryTree<T>): T[] {
    const leftValues = tree.left ? this.postOrderTraverse(tree.left) : [];
    const rightValues = tree.right ? this.postOrderTraverse(tree.right) : [];
    return leftValues.concat(rightValues, [tree.value]);
  }

  private bfsTraverse(tree: IBinaryTree<T>) {
    const q: IBinaryTree<T>[] = [tree];
    const result: T[] = [];
    while (q.length) {
      const next = q.shift()!;
      result.push(next.value);
      if (next.left) {
        q.push(next.left);
      }
      if (next.right) {
        q.push(next.right);
      }
    }
    return result;
  }
}
