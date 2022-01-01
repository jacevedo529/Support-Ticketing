export { };

declare global {
    interface Array<T> {
        /**
         * Determine if the given array contains items
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
    }
}

Array.prototype.any = function <T>(this: Array<T>): boolean {
    return this.length !== 0;
};