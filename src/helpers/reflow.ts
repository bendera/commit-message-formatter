import analyzeLine from './analyzeLine';

export default function reflow(
  message: string,
  tabSize: number,
  indentWithTabs: boolean
) {
  const lines = message.split('\n');
  const joinedLines: string[] = [];
  let currentJoinedLine = '';
  let prevType: 'listitem' | 'indented' | 'empty' | 'regular' = 'regular';

  lines.forEach((l, i) => {
    const { isListItem, isEmpty, isIndented } = analyzeLine(
      l,
      tabSize,
      indentWithTabs
    );

    if (isListItem || isIndented) {
      if (
        prevType !== 'listitem' &&
        prevType !== 'indented' &&
        prevType !== 'empty'
      ) {
        joinedLines.push(currentJoinedLine);
      }

      if (prevType !== 'listitem' && prevType !== 'indented') {
        currentJoinedLine = l;
      } else {
        const prependedSpace = currentJoinedLine !== '' ? ' ' : '';
        currentJoinedLine += prependedSpace + l.trimStart().trimEnd();
      }

      prevType = isListItem ? 'listitem' : 'indented';
    } else if (isEmpty) {
      if (prevType !== 'empty') {
        joinedLines.push(currentJoinedLine);
        joinedLines.push('');
        currentJoinedLine = '';
      } else {
        joinedLines.push('');
        currentJoinedLine = '';
      }

      prevType = 'empty';
    } else {
      const prependedSpace = currentJoinedLine !== '' ? ' ' : '';
      currentJoinedLine += prependedSpace + l.trimStart().trimEnd();

      prevType = 'regular';
    }

    if (i === lines.length - 1) {
      joinedLines.push(currentJoinedLine);
    }
  });

  return joinedLines.join('\n');
}
