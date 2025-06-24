export type ReplaceFn = (...args: unknown[]) => string

export type ReplacersType = Record<string, ReplaceFn>;

export type ReplacePlaceholderType = (
  placeholder: string,
  replacers: ReplacersType,
  options: { unknownValue?: string, failedValue?: string },
) => string

export type PlaceholderStyleType = '[]' | '{}' | '()';

export type ReplaceMultiplePlaceholdersType = (
  stringWithPlaceholders: string,
  replacers: ReplacersType,
  options: {
    placeholderStyle: PlaceholderStyleType,
    unknownValue?: string,
    failedValue?: string,
  }) => string;
