import * as readline from "readline/promises";

interface DataPointer {
    array: number[];
    index: number;
    isReverse: boolean;
}

const peek = (dataPointer: DataPointer): number => {
    return dataPointer.array[dataPointer.index];
};

/** Advance the index in the data pointer and return whether it is exhausted */
const advance = (dataPointer: DataPointer): boolean => {
    if (dataPointer.isReverse) {
        dataPointer.index -= 1;
        return dataPointer.index < 0;
    }
    dataPointer.index += 1;
    return dataPointer.index >= dataPointer.array.length;
};

const merge = (
    collection_1: number[],
    collection_2: number[],
    collection_3: number[],
): number[] => {
    let collection1DataPointer: DataPointer = {
        array: collection_1,
        index: 0,
        isReverse: false,
    };
    let collection2DataPointer: DataPointer = {
        array: collection_2,
        index: collection_2.length - 1,
        isReverse: true,
    };
    let collection3DataPointer: DataPointer = {
        array: collection_3,
        index: 0,
        isReverse: false,
    };
    const dataPointers = [
        collection1DataPointer,
        collection2DataPointer,
        collection3DataPointer,
    ];
    let mergedArray: number[] = [];
    while (true) {
        let minNumber = Infinity;
        let minIndex = null;
        dataPointers.forEach((dataPointer, i) => {
            const value = peek(dataPointer);
            if (value < minNumber) {
                minNumber = value;
                minIndex = i;
            }
        });
        if (minIndex === null) throw new Error();
        mergedArray.push(minNumber);
        const empty = advance(dataPointers[minIndex]);
        if (empty) {
            dataPointers.splice(minIndex, 1);
        }
        if (dataPointers.length === 0) return mergedArray;
    }
};

const input = async (query: string): Promise<string> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    try {
        return await rl.question(query);
    } finally {
        rl.close();
    }
};

const isAscending = (arr: number[]) =>
    arr.every((v, i) => i === 0 || v >= arr[i - 1]);
const isDescending = (arr: number[]) =>
    arr.every((v, i) => i === 0 || v <= arr[i - 1]);

const main = async () => {
    const collection_1 = (await input("collection_1: "))
        .split(",")
        .map((s) => Number(s.trim()));
    if (!isAscending(collection_1))
        throw new Error("collection_1 is not ascending");
    const collection_2 = (await input("collection_2: "))
        .split(",")
        .map((s) => Number(s.trim()));
    if (!isDescending(collection_2))
        throw new Error("collection_2 is not descending");
    const collection_3 = (await input("collection_3: "))
        .split(",")
        .map((s) => Number(s.trim()));
    if (!isAscending(collection_3))
        throw new Error("collection_3 is not ascending");

    const result = merge(collection_1, collection_2, collection_3);
    console.log(result);
};

main();
