const promiseThen = Promise.prototype.then;

/**
 * A promise that can be resolved by calling it like a function.
 * 
 * The returned object behaves as a `PromiseLike<T>`, but is also
 * a callable function `(value: T) => void` that resolves it.
 */
export type CallablePromise<T> = PromiseLike<T> & { (value: T): void; }


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
    const promise = new Promise(x => { resolve = x; })

    resolve.then = promiseThen.bind(promise);

    return resolve;
}
