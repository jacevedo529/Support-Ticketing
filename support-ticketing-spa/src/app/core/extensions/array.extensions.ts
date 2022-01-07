export { };

declare global {
    interface Array<T> {
        /**
         * Determines if the given array contains items
         * 
         * @returns 'true' if array contains items, otherwise 'false'
         * 
         * @example
         * const array = [1,2,3];
         * array.any();  // returns true
         * 
         * @example
         * const array = [];
         * array.any(); //returns false
         */
        any(): boolean;

        /**
         * Determines if the given array contains the provided item
         * @param filter - Filter to match items in the array
         *
         * @returns if array has any item matching the filter returns 'true', otherwise 'false'
         *
         * @example
         * ```
         * const array = [1, 2, 3];
         * array.contains(x => x === 1); // returns true
         * ```
         * @example
         * ```
         * const array = [1, 2, 3];
         * array.contains(x => x === 4); // returns false
         * ```
         */
        contains(filter: (x: T) => boolean): boolean;

        /**
         * Sort an array ascending
         *
         * @param this - Array to sort
         * 
         * @returns An array with the same items, sorted ascending.
         *
         * @example
         * ```
         * const array = [3, 2, 1];
         * array.sortAscending(); // returns [1, 2, 3]
         * ```
         */
        sortAscending(this: Array<T>): Array<T>;


        /**
         * Sort an array ascending given the provided prop
         *
         * @param this - Array to sort
         * @param sortBy - Property path for sorting.
         *
         * @returns An array with the same items, sorted ascending.
         *
         * @example
         * ```
         * const array = [ { property1: { subProperty: 'value1'}, property2: 'value2' }, { property1: { subProperty: 'value1'}, property2: 'value3' } ];
         * array.sortAscendingByKey(x => x.property1.subProperty); // returns [ { property1: 'value1', property2: 'value2' }, { property1: 'value1', property2: 'value3' } ];
         * ```
         */
        sortAscendingByKey(this: Array<T>, sortBy: (x: T) => any): Array<T>;

        /**
         * Sort an array descending
         * 
         * @param this - Array to sort
         * 
         * @returns An array with the same items, sorted descending.
         *
         * @example
         * ```
         * const array = [3, 2, 1];
         * array.sortDescending(); // returns [3, 2, 1]
         * ```
         */
        sortDescending(this: Array<T>): Array<T>;

        /**
         * Sort an array descending given the provided prop
         *
         * @param this - Array to sort
         * @param sortBy - Property path for sorting.
         *
         * @returns An array with the same items, sorted descending.
         *
         * @example
         * ```
         * const array = [ { property1: { subProperty: 'value1'}, property2: 'value2' }, { property1: { subProperty: 'value1'}, property2: 'value3' } ];
         * array.sortDescendingByKey(x => x.property1.subProperty); // returns [ { property1: 'value1', property2: 'value2' }, { property1: 'value1', property2: 'value3' } ];
         * ```
         */
        sortDescendingByKey(this: Array<T>, sortBy: (x: T) => any): Array<T>;
    }
}

Array.prototype.any = function <T>(this: Array<T>): boolean {
    return this.length !== 0;
};

Array.prototype.contains = function <T>(this: Array<T>, filter: (x: T) => boolean) {
    // the action filter is applyed to the given array, and then we check if there is any value left.
    return this.filter(filter).any();
};

Array.prototype.sortAscending = function <T>(this: Array<T>): Array<T> {
    return this?.sortAscendingByKey(x => '') ?? [];
};

Array.prototype.sortAscendingByKey = function <T>(this: Array<T>, sortBy: (x: T) => any): Array<T> {
    if (!this.any()) {
        return [];
    }
    const sortByKeys = sortBy.toString().split('.');
    // remove first element 'x => x'
    sortByKeys?.shift();

    const sorted = this.sort((a, b) => {
        const values = getValuesForSorting(sortByKeys, a, b);
        if (typeof (values.aValue) === 'string' && typeof (values.bValue) === 'string') {
            return values.aValue.toString().localeCompare(values.bValue.toString());
        }
        else {
            if (values.aValue < values.bValue) {
                return -1;
            }
            if (values.aValue > values.bValue) {
                return 1;
            }
            return 0;
        }
    });

    // a copy of the array is return in order to not alter the given array.
    return Array.from(sorted);
};

Array.prototype.sortDescending = function <T>(this: Array<T>): Array<T> {
    return this?.sortDescendingByKey(x => '') ?? [];
};

Array.prototype.sortDescendingByKey = function <T>(this: Array<T>, sortBy: (x: T) => any): Array<T> {
    return this?.sortAscendingByKey(sortBy).reverse();
};

function getValuesForSorting<T>(sortByKeys: string[], aInitial: T, bInitial: T): { aValue: T, bValue: T } {
    let aValue: any = aInitial;
    let bValue: any = bInitial;
    sortByKeys.forEach(key => {
        const arrayKey = key.split('[');
        const isArrayKey = arrayKey.length > 1;
        // If key is array change the key. For Example: key could be "prop[0]", changing it changes for "prop"
        key = !isArrayKey ? key : arrayKey[0];
        // If aValue is undefined, this "aValue[key]" gives error, this way we prevent that
        aValue = aValue ? aValue[key] : aValue;
        bValue = bValue ? bValue[key] : bValue;
        if (isArrayKey) {
            const index = +arrayKey[1].split(']')[0];
            aValue = aValue ? aValue[index] : aValue;
            bValue = bValue ? bValue[index] : bValue;
        }
    });

    return { aValue: aValue, bValue: bValue };
}