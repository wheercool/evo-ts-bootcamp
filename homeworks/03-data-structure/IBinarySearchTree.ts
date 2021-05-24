import { IBinaryTree } from './IBinaryTree';

export interface IBinarySearchTree<T extends number | string> extends IBinaryTree<T> {
  has(value: T): boolean;
}
