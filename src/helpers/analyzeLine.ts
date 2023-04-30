import calculateNumberOfTextColumns from './calculateNumberOfTextColumns';

export type LineType =
  | 'empty'
  | 'indented'
  | 'list-item'
  | 'comment'
  | 'trailer'
  | 'regular';

export default function analyzeLine(
  line: string,
  tabSize: number,
  indentWithTabs: boolean
) {
  let listItemPrefix = '';
  let indentationWidth = 0;
  let indentationText = '';
  let leadingText = '';
  let lineType: LineType;

  const regexpOrderedList = /^[\t ]*(.?[0-9a-zA-Z]\.{1}\)*[\t ]+)/g;
  const regexpUnorderedList = /^[\t ]*([*-]{1}[\t ]+)/g;
  const regexpIndentation = /^[\t ]+/g;
  const regexpComment = /^#/g;

  const orderedListMatches = regexpOrderedList.exec(line);
  const unorderedListMatches = regexpUnorderedList.exec(line);
  const indentationMatches = regexpIndentation.exec(line);
  const commentMatches = regexpComment.exec(line);

  if (line === '') {
    lineType = 'empty';
  } else if (orderedListMatches || unorderedListMatches) {
    lineType = 'list-item';
  } else if (indentationMatches) {
    lineType = 'indented';
  } else if (commentMatches) {
    lineType = 'comment';
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
