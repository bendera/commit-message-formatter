import analyzeLine from './analyzeLine';

export default function reflow(
  message: string,
  tabSize: number,
  indentWithTabs: boolean
) {
  const lines = message.split('\n');
  const joinedLines: string[] = [];
  let currentJoinedLine = '';
  let prevType: 'listitem' | 'indented' | 'empty' | 'regular' | 'none' = 'none';

  lines.forEach((l, i) => {
    const { lineType } = analyzeLine(l, tabSize, indentWithTabs);

    if (lineType === 'list-item' || lineType === 'indented') {
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

      prevType = lineType === 'list-item' ? 'listitem' : 'indented';
    } else if (lineType === 'empty') {
      if (prevType !== 'empty' && prevType !== 'none') {
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

    if (i === lines.length - 1 && prevType !== 'empty') {
      joinedLines.push(currentJoinedLine);
    }
  });

  return joinedLines.join('\n');
}
