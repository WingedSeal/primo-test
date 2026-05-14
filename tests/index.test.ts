import { merge } from "../src/index";

describe("merge function", () => {
    test("merges three typical sorted arrays", () => {
        expect(merge([1, 2, 3], [9, 8, 7], [4, 5, 6])).toEqual([
            1, 2, 3, 4, 5, 6, 7, 8, 9,
        ]);
    });

    test("returns empty array when all inputs are empty", () => {
        expect(merge([], [], [])).toEqual([]);
    });

    test("handles collection_1 and collection_3 empty, collection_2 populated", () => {
        expect(merge([], [5, 3, 1], [])).toEqual([1, 3, 5]);
    });

    test("handles collection_2 empty, collection_1 and collection_3 populated", () => {
        expect(merge([1, 4], [], [6, 9])).toEqual([1, 4, 6, 9]);
    });

    test("handles single element in each collection", () => {
        expect(merge([3], [7], [5])).toEqual([3, 5, 7]);
    });

    test("handles duplicate values across collections", () => {
        expect(merge([1, 2, 2], [4, 3, 2], [3, 4, 5])).toEqual([
            1, 2, 2, 2, 3, 3, 4, 4, 5,
        ]);
    });

    test("handles all collections containing the same value", () => {
        expect(merge([5, 5], [5, 5], [5, 5])).toEqual([5, 5, 5, 5, 5, 5]);
    });

    test("handles negative numbers", () => {
        expect(merge([-9, -5, -1], [6, 3, -3], [-8, -2, 4])).toEqual([
            -9, -8, -5, -3, -2, -1, 3, 4, 6,
        ]);
    });

    test("handles collections of unequal lengths", () => {
        expect(merge([1], [10, 7, 4, 2], [11, 15])).toEqual([
            1, 2, 4, 7, 10, 11, 15,
        ]);
    });

    test("returns a new array and does not mutate the inputs", () => {
        const c1 = [1, 2, 3];
        const c2 = [9, 8, 7];
        const c3 = [4, 5, 6];
        const result = merge(c1, c2, c3);
        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        expect(c1).toEqual([1, 2, 3]);
        expect(c2).toEqual([9, 8, 7]);
        expect(c3).toEqual([4, 5, 6]);
    });
});
