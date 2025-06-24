import { replaceMultiplePlaceholders, PlaceholderStyle } from "./placeholder-replacer";
import type { ReplacersType } from "./placeholder-replacer.types";

const UNKNOWN_PARAM_VALUE = '-1';
const FAILED_PARAM_VALUE = '-2';

const replacers: ReplacersType = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PLC1: () => 'TEST1',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PLC2: () => 'TEST2',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PLCERR: () => { throw new Error(); },
};

test('should replace placeholders via replacers functions', () => {
  expect(replaceMultiplePlaceholders(
    'https://site.com?timestamp=[PLC1]&random=prefix-[PLC2]-postfix',
    replacers,
    {
      unknownValue: UNKNOWN_PARAM_VALUE,
      failedValue: FAILED_PARAM_VALUE,
      placeholderStyle: PlaceholderStyle.squareBrackets,
    }
  )).toMatchInlineSnapshot(`"https://site.com?timestamp=TEST1&random=prefix-TEST2-postfix"`);
});

test(`should replace placeholders with ${UNKNOWN_PARAM_VALUE} if no replacer function`, () => {
  expect(replaceMultiplePlaceholders(
    'https://site.com?someparam=prefix_[UNKNOWN]_postfix',
    replacers,
    {
      unknownValue: UNKNOWN_PARAM_VALUE,
      failedValue: FAILED_PARAM_VALUE,
      placeholderStyle: PlaceholderStyle.squareBrackets,
    }
  )).toMatchInlineSnapshot(`"https://site.com?someparam=prefix_-1_postfix"`);
});

test(`should replace placeholders with ${FAILED_PARAM_VALUE} if error during replacer call`, () => {
  expect(replaceMultiplePlaceholders(
    'https://site.com?someparam=prefix_[PLCERR]_postfix',
    replacers,
    {
      unknownValue: UNKNOWN_PARAM_VALUE,
      failedValue: FAILED_PARAM_VALUE,
      placeholderStyle: PlaceholderStyle.squareBrackets,
    }
  )).toMatchInlineSnapshot(`"https://site.com?someparam=prefix_-2_postfix"`);
});

test(`should return the same string when passed string without placeholders`, () => {
  expect(replaceMultiplePlaceholders(
    'string without replacers',
    replacers,
    {
      unknownValue: UNKNOWN_PARAM_VALUE,
      failedValue: FAILED_PARAM_VALUE,
      placeholderStyle: PlaceholderStyle.squareBrackets,
    }
  )).toMatchInlineSnapshot(`"string without replacers"`);
});
