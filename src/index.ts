const promiseThen = Promise.prototype.then;
const promiseCatch = Promise.prototype.catch;

/**
 * A promise that can be resolved by calling it like a function.
 * 
 * The returned object behaves as a `PromiseLike<T>`, but is also
 * a callable function `(value: T) => void` that resolves it.
 */
export type CallablePromise<T> = Promise<T> & {
    (value: T): void;
    /**
     * The internal state of the promise.
     * - `0` = pending (waiting to be resolved or rejected)
     * - `1` = fulfilled (resolved successfully)
     */
    readonly state: 0 | 1;
}

/**
 * Creates a callable promise — a promise that can be resolved by calling it like a function.
 *
 * The returned object behaves both as a `PromiseLike<T>` and as a resolver function.
 * Calling the function resolves the underlying promise with the provided value.
 *
 * Example:
 * ```ts
 * const done = callablePromise<number>();
 * done(42);       // resolves the promise
 * const value = await done; // 42
 * ```
 *
 * @returns A hybrid object: a promise that is also a callable resolver function.
 */
export function callablePromise<T>(): CallablePromise<T> {
    let resolve: any;
    let state: number = 0;
    const promise = new Promise(x => { resolve = x; })
    promise.then(() => state = 1, () => state = -1);

    return Object.defineProperties(resolve, {
        then: { value: promiseThen.bind(promise) },
        catch: { value: promiseCatch.bind(promise) },
        state: { get() { return state as 0 | 1; } }
    });
}
