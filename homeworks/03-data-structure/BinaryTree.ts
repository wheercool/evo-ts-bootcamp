import { IBinaryTree } from './IBinaryTree';

export enum TraverseType {
  InOrder,
  PreOrder,
  PostOrder,
  BFS
}

export class BinaryTree<T> implements IBinaryTree<T> {
  public left: IBinaryTree<T> | undefined;
  public right: IBinaryTree<T> | undefined;
  public value!: T;

  constructor(tree: IBinaryTree<T>) {
    this.setTree(tree);
  }

  public traverse<V>(traverseType: TraverseType): T[] {
    switch (traverseType) {
      case TraverseType.InOrder:
        return this.inOrderTraverse(this);
      case TraverseType.PreOrder:
        return this.preOrderTraverse(this);
      case TraverseType.PostOrder:
        return this.postOrderTraverse(this);
      case TraverseType.BFS:
        return this.bfsTraverse(this);
    }
  }

  public getColumn(columnOrder: number): T[] {
    const q: [tree: IBinaryTree<T>, order: number][] = [[this, 0]];
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

  public setTree(tree: IBinaryTree<T>): void {
    this.left = tree.left;
    this.right = tree.right;
    this.value = tree.value;
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

  private bfsTraverse(tree: IBinaryTree<T>): T[] {
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
