# callable-promise

A tiny TypeScript utility for creating **callable promises** — promises that you can resolve simply by calling them like a function.

```ts
import { callablePromise } from "callable-promise";

const done = callablePromise<number>();

setTimeout(() => {
    done(42); // resolves the promise
}, 1000);

const result = await done; // 42
```

## Features

- Promise that is also a function
- Fully typed (TypeScript generics)
- Zero dependencies
- Tracks internal state (`pending` / `fulfilled`)
- Simple and expressive API

## Installation

```sh
npm install callable-promise
```

## Usage

### Create a callable promise

```ts
const ready = callablePromise<string>();

// resolve it later
ready("OK");

// await it anywhere
const value = await ready; // "OK"
```

### Type-safe

```ts
const p = callablePromise<{ id: number }>();

p({ id: 123 });

const data = await p; // { id: number }
```

### Check promise state

```ts
const done = callablePromise<number>();

console.log(done.state); // 0 (pending)

done(10);

console.log(done.state); // 1 (fulfilled)
```

## API

### `callablePromise<T>()`

Creates a hybrid object that is both:

- a `Promise<T>`
- a callable resolver function `(value: T) => void`

### Type Definition

```ts
export type CallablePromise<T> = Promise<T> & {
    (value: T): void;
    readonly state: 0 | 1;
};
```

## License

MIT
