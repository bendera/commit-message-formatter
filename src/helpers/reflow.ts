import analyzeLine, { LineType } from './analyzeLine';

export default function reflow(
  message: string,
  tabSize: number,
  indentWithTabs: boolean
) {
  const lines = message.split('\n');
  const joinedLines: string[] = [];
  let currentJoinedLine = '';
  let prevType: LineType | 'none' = 'none';

  lines.forEach((l, i) => {
    const { lineType } = analyzeLine(l, tabSize, indentWithTabs);

    if (lineType === 'list-item' || lineType === 'indented') {
      if (
        prevType !== 'list-item' &&
        prevType !== 'indented' &&
        prevType !== 'empty'
      ) {
        joinedLines.push(currentJoinedLine);
      }

      if (prevType !== 'list-item' && prevType !== 'indented') {
        currentJoinedLine = l;
      } else {
        const prependedSpace = currentJoinedLine !== '' ? ' ' : '';
        currentJoinedLine += prependedSpace + l.trimStart().trimEnd();
      }
    } else if (lineType === 'empty') {
      if (prevType !== 'empty' && prevType !== 'none') {
        joinedLines.push(currentJoinedLine);
        joinedLines.push('');
        currentJoinedLine = '';
      } else {
        joinedLines.push('');
        currentJoinedLine = '';
      }
    } else if (lineType === 'regular') {
      const prependedSpace = currentJoinedLine !== '' ? ' ' : '';
      currentJoinedLine += prependedSpace + l.trimStart().trimEnd();
    }

    if (i === lines.length - 1 && currentJoinedLine !== '') {
      joinedLines.push(currentJoinedLine);
    }

    prevType = lineType;
  });

  return joinedLines.join('\n');
}
