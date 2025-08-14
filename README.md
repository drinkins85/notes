[Placeholder replacer](https://github.com/drinkins85/notes/blob/main/src/placeholder-replacer/placeholder-replacer.ts)
```typescript
const replacers = {
PLACEHOLDER1: () => '11111',
PLACEHOLDER2: () => '22222',
}

replaceMultiplePlaceholders(
  "string_with_[PLACEHOLDER1]_and_[PLACEHOLDER2]_etc",
  replacers,
  {
    unknownValue: 'unknown',
    failedValue: 'failed',
    placeholderStyle: '[]',
  }
);

// result: "string_with_11111_and_22222_etc"

```
[Throttled request](https://github.com/drinkins85/notes/blob/main/src/throttled-request/throttled-request.ts)
```typescript
type SomeAsyncFunctionType = (number: number) => Promise<number>;
const someAsyncFunction: SomeAsyncFunctionType = async (arg: number) => (
  new Promise((resolve) => (
    setTimeout(() => { resolve(arg); }, 1000)
  ))
);

const throttledSomeAsyncFunction = throttledRequest(someAsyncFunction, 5000);

const startTimeStamp = Date.now();
throttledSomeAsyncFunction(1)
  .then((result) => {
    console.log('executionTime', Date.now() - startTimeStamp);
    console.log(result);
  }).catch((error: unknown) => {
  console.log(error);
});
```

