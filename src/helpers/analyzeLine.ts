import calculateNumberOfTextColumns from './calculateNumberOfTextColumns';

export default function analyzeLine(
  line: string,
  tabSize: number,
  indentWithTabs: boolean
) {
  let isListItem = false;
  let isIndented = false;
  let isEmpty = false;
  let listItemPrefix = '';
  let indentationWidth = 0;
  let indentationText = '';
  let leadingText = '';

  const regexpOrderedList = /^[\t ]*(.?[0-9a-zA-Z]\.{1}\)*[\t ]+)/g;
  const regexpUnorderedList = /^[\t ]*([*-]{1}[\t ]+)/g;
  const regexpIndentation = /^[\t ]+/g;

  const orderedListMatches = regexpOrderedList.exec(line);
  const unorderedListMatches = regexpUnorderedList.exec(line);
  const indentationMatches = regexpIndentation.exec(line);

  if (line === '') {
    isEmpty = true;
  }

  if (indentationMatches) {
    isIndented = true;
  }

  if (orderedListMatches) {
    isListItem = true;
    leadingText = orderedListMatches[0];
    listItemPrefix = orderedListMatches[1];
  }

  if (unorderedListMatches) {
    isListItem = true;
    leadingText = unorderedListMatches[0];
    listItemPrefix = unorderedListMatches[1];
  }

  if (indentationMatches && !isListItem) {
    leadingText = indentationMatches[0];
  }

  indentationWidth = calculateNumberOfTextColumns(leadingText, tabSize);

  if (!indentWithTabs) {
    indentationText = ''.padStart(indentationWidth, ' ');
  } else {
    indentationText = ''.padStart(Math.ceil(indentationWidth / tabSize), '\t');
  }

  return {
    isListItem,
    isIndented,
    isEmpty,
    listItemPrefix,
    indentationWidth,
    indentationText,
    leadingText,
  };
}
