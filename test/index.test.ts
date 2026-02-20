import { describe, test } from 'node:test';
import assert from 'node:assert';
import { callablePromise } from '../src/index';

describe('CallablePromise', () => {
    test('resolves when called', async () => {
        const done = callablePromise<number>();
        done(42);
        const value = await done;
        assert.strictEqual(value, 42);
    });

    test('resolves with timeout', async () => {
        const done = callablePromise<string>();
        setTimeout(() => done('delayed'), 100);
        const value = await done;
        assert.strictEqual(value, 'delayed');
    });

    test('state changes to fulfilled after resolution', async () => {
        const done = callablePromise<string>();
        assert.strictEqual(done.state, 0); // pending
        done('hello');
        await done;
        assert.strictEqual(done.state, 1); // fulfilled
    });

    test('can be used in promise chains', async () => {
        const done = callablePromise<number>();
        setTimeout(() => done(42));
        const result = await done.then(x => x * 2);
        assert.strictEqual(result, 84);
    });

    test('promise with void type', async () => {
        const done = callablePromise<void>();
        let called = false;
        setTimeout(() => {
            called = true;
            done();
        });
        await done;
        assert.strictEqual(called, true);
    });
});
