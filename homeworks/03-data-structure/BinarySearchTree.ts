import { IBinarySearchTree } from './IBinarySearchTree';
import { IBinaryTree } from './IBinaryTree';

export class BinarySearchTree implements IBinarySearchTree<number> {
  left?: BinarySearchTree;
  right?: BinarySearchTree;

  constructor(public value: number) {
  }

  static createTree(tree: IBinaryTree<number>): BinarySearchTree {
    const result = new BinarySearchTree(tree.value);
    if (tree.left) {
      result.left = BinarySearchTree.createTree(tree.left);
    }
    if (tree.right) {
      result.right = BinarySearchTree.createTree(tree.right);
    }
    return result;
  }

  insert(value: number) {
    if (value < this.value) {
      if (this.left) {
        this.left.insert(value);
      } else {
        this.left = new BinarySearchTree(value);
      }
    } else {
      if (this.right) {
        this.right.insert(value);
      } else {
        this.right = new BinarySearchTree(value);
      }
    }
    return this;
  }

  append(...values: number[]): BinarySearchTree {
    values.forEach(v => this.insert(v));
    return this;
  }

  has(value: number): boolean {
    if (value === this.value) {
      return true;
    }
    if (value < this.value) {
      return this.left ? this.left.has(value) : false;
    }
    return this.right ? this.right.has(value) : false;
  }
}
