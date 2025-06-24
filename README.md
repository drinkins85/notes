[Placeholder replacer](https://github.com/drinkins85/notes/blob/main/src/placeholder-replacer/placeholder-replacer.ts)
```
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

