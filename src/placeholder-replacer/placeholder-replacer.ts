import type {
  ReplacePlaceholderType,
  ReplacersType,
  ReplaceMultiplePlaceholdersType,
} from './placeholder-replacer.types';

const UNKNOWN_PARAM_VALUE = '-1';
const FAILED_PARAM_VALUE = '-2';

const replacers: ReplacersType = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TS: () => Date.now().toString(),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  RND: () => Math.round(Math.random() * 10000).toString(),
};

export enum PlaceholderStyle {
  squareBrackets = '[]',
  curlyBrackets = '{}',
  roundBrackets = '()'
}

const replacePlaceholder: ReplacePlaceholderType = (placeholder: string, replacersMap = {}, { unknownValue = '', failedValue = '' } = {}) => {
  if (typeof replacersMap[placeholder] !== 'function') {
    return unknownValue;
  }

  try {
    return (replacersMap[placeholder])();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return failedValue;
  }
};

export const replaceMultiplePlaceholders: ReplaceMultiplePlaceholdersType = (
  stringWithPlaceholders = '',
  replacersMap,
  options = { placeholderStyle: PlaceholderStyle.squareBrackets }
) => {
  const { placeholderStyle, ...otherOptions } = options;
  const [ openChar, closeChar] = placeholderStyle;
  const MULTI_REPLACER_REGEX = new RegExp(`\\${openChar}([^\\${closeChar}]+)\\${closeChar}`, 'g');

  return stringWithPlaceholders.replace(MULTI_REPLACER_REGEX, (match, placeholder: string) => (
    replacePlaceholder(placeholder, replacersMap, otherOptions)
  ));
};


// example
const strWithPlaceholder = 'https://site.com?timestamp=[TS]&random=prefix-[RND]-postfix';
const strWithReplacedValues = replaceMultiplePlaceholders(
  strWithPlaceholder,
  replacers,
  {
    unknownValue: UNKNOWN_PARAM_VALUE,
    failedValue: FAILED_PARAM_VALUE,
    placeholderStyle: PlaceholderStyle.squareBrackets,
  }
);
console.log(`${strWithPlaceholder} -> ${strWithReplacedValues}`);
// https://site.com?timestamp=[TS]&random=prefix-[RND]-postfix -> https://site.com?timestamp=1750766044999&random=prefix-7627-postfix
