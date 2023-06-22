import calculateNumberOfTextColumns from './calculateNumberOfTextColumns.js';

export type LineType =
  | 'empty'
  | 'indented'
  | 'list-item'
  | 'protected'
  | 'regular';

export interface LineAnalyzerOptions {
  tabSize?: number;
  indentWithTabs?: boolean;
  /**
   * If a line begins with a protected pattern, it keeps untouched.
   */
  protectedPatterns?: string[];
}

export default function analyzeLine(
  line: string,
  options: LineAnalyzerOptions = {}
) {
  const defaultOptions: LineAnalyzerOptions = {
    tabSize: 2,
    indentWithTabs: false,
    protectedPatterns: ['#', 'Co-authored-by:', 'Signed-off-by:'],
  };
  const finalOptions = Object.assign(defaultOptions, options);
  const { tabSize, indentWithTabs, protectedPatterns } = finalOptions;

  let listItemPrefix = '';
  let indentationWidth = 0;
  let indentationText = '';
  let leadingText = '';
  let lineType: LineType;

  const isProtected = protectedPatterns.some(
    (pattern) => line.indexOf(pattern) === 0
  );

  const regexpOrderedList = /^[\t ]*(.?[0-9a-zA-Z]\.{1}\)*[\t ]+)/g;
  const regexpUnorderedList = /^[\t ]*([*-]{1}[\t ]+)/g;
  const regexpIndentation = /^[\t ]+/g;

  const orderedListMatches = regexpOrderedList.exec(line);
  const unorderedListMatches = regexpUnorderedList.exec(line);
  const indentationMatches = regexpIndentation.exec(line);

  if (line === '') {
    lineType = 'empty';
  } else if (orderedListMatches || unorderedListMatches) {
    lineType = 'list-item';
  } else if (indentationMatches) {
    lineType = 'indented';
  } else if (isProtected) {
    lineType = 'protected';
  } else {
    lineType = 'regular';
  }

  if (orderedListMatches) {
    leadingText = orderedListMatches[0];
    listItemPrefix = orderedListMatches[1];
  }

  if (unorderedListMatches) {
    leadingText = unorderedListMatches[0];
    listItemPrefix = unorderedListMatches[1];
  }

  if (indentationMatches && lineType !== 'list-item') {
    leadingText = indentationMatches[0];
  }

  indentationWidth = calculateNumberOfTextColumns(leadingText, tabSize);

  if (!indentWithTabs) {
    indentationText = ''.padStart(indentationWidth, ' ');
  } else {
    indentationText = ''.padStart(Math.ceil(indentationWidth / tabSize), '\t');
  }

  return {
    listItemPrefix,
    indentationWidth,
    indentationText,
    leadingText,
    lineType,
  };
}
