# callable-promise

A tiny TypeScript utility for creating **callable promises** — a promise that you can resolve by calling it like a function.

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
- Zero dependencies
- Fully typed (TypeScript generics)
- Simple and expressive API

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

## API

### `callablePromise<T>()`

Returns an object that is both:

- a `PromiseLike<T>`
- a function `(value: T) => void` that resolves it

## License

MIT
