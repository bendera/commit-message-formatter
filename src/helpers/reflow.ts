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
    const { lineType } = analyzeLine(l, { tabSize, indentWithTabs });

    if (lineType === 'list-item') {
      if (prevType !== 'empty') {
        joinedLines.push(currentJoinedLine);
      }
      currentJoinedLine = l;
    } else if (lineType === 'indented') {
      if (prevType === 'indented' || prevType === 'list-item') {
        const prependedSpace = currentJoinedLine !== '' ? ' ' : '';
        currentJoinedLine += prependedSpace + l.trimStart().trimEnd();
      } else {
        if (prevType !== 'empty') {
          joinedLines.push(currentJoinedLine);
        }
        currentJoinedLine = l;
      }
    } else if (lineType === 'empty') {
      if (currentJoinedLine !== '') {
        joinedLines.push(currentJoinedLine);
      }

      joinedLines.push('');
      currentJoinedLine = '';
    } else if (lineType === 'regular') {
      const prependedSpace = currentJoinedLine !== '' ? ' ' : '';
      currentJoinedLine += prependedSpace + l.trimStart().trimEnd();
    } else if (lineType === 'protected') {
      if (currentJoinedLine !== '') {
        joinedLines.push(currentJoinedLine);
      }
      currentJoinedLine = '';
      joinedLines.push(l);
    }

    if (i === lines.length - 1 && currentJoinedLine !== '') {
      joinedLines.push(currentJoinedLine);
    }

    prevType = lineType;
  });

  return joinedLines.join('\n');
}
