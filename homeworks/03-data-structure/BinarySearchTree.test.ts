import { BinarySearchTree } from './BinarySearchTree';

describe('BinarySearchTree', () => {
  describe('insert', () => {
    it('should build search tree', () => {
      const tree = new BinarySearchTree(8);
      tree.append(3, 10, 1, 6, 14, 4, 7, 13);

      expect(tree).toEqual({
          value: 8,
          left: {
            value: 3,
            left: { value: 1 },
            right: {
              value: 6,
              left: { value: 4 },
              right: { value: 7 }
            }
          },
          right: {
            value: 10,
            right: {
              value: 14,
              left: { value: 13 }
            }
          }
        }
      )
    })
  })
  describe('has', () => {
    let tree: BinarySearchTree;
    beforeEach(() => {
      tree = BinarySearchTree.createTree({
        value: 8,
        left: {
          value: 3,
          left: { value: 1 },
          right: {
            value: 6,
            left: { value: 4 },
            right: { value: 7 }
          }
        },
        right: {
          value: 10,
          right: {
            value: 14,
            left: { value: 13 }
          }
        }
      })
    })
    it('should find 7', () => {
      expect(tree.has(7)).toEqual(true);
    })
    it('should find 14', () => {
      expect(tree.has(14)).toEqual(true);
    })
    it('should return false if value is not in the tree (on left)', () => {
      expect(tree.has(9)).toEqual(false);
    })
    it('should return false if value is not in the tree (on right)', () => {
     expect(tree.has(15)).toEqual(false);
    })
  })
})
