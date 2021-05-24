import { IBinarySearchTree } from './IBinarySearchTree';
import { BinaryTree } from './BinaryTree';
import { IBinaryTree } from './IBinaryTree';

export class BinarySearchTree extends BinaryTree<number>
  implements IBinarySearchTree<number> {

  public insert(value: number): BinarySearchTree {
    BinarySearchTree.insertInTree(value, this);
    return this;
  }

  public append(...values: number[]): BinarySearchTree {
    values.forEach(v => this.insert(v));
    return this;
  }

  public has(value: number): boolean {
    return BinarySearchTree.hasInThree(value, this);
  }

  private static insertInTree(value: number, tree: IBinaryTree<number>) {
    if (value < tree.value) {
      if (tree.left) {
        BinarySearchTree.insertInTree(value, tree.left);
      } else {
        tree.left = {
          value
        };
      }
    } else {
      if (tree.right) {
        BinarySearchTree.insertInTree(value, tree.right);
      } else {
        tree.right = {
          value
        }
      }
    }
  }

  private static hasInThree(value: number, tree: IBinaryTree<number>): boolean {
    if (value === tree.value) {
      return true;
    }
    if (value < tree.value) {
      return tree.left ? BinarySearchTree.hasInThree(value, tree.left) : false;
    }
    return tree.right ? BinarySearchTree.hasInThree(value, tree.right) : false;
  }
}
