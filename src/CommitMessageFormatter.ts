import analyzeLine from './helpers/analyzeLine';
import reflow from './helpers/reflow';

export type SubjectFormattingMode =
  | 'truncate'
  | 'truncate-ellipses'
  | 'split'
  | 'split-ellipses';

export interface CommitMessageFormatterOptions {
  subjectMode?: SubjectFormattingMode;
  subjectLength?: number;
  lineLength?: number;
  tabSize?: number;
  indentWithTabs?: boolean;
  collapseMultipleEmptyLines?: boolean;
}

class CommitMessageFormatter {
  private _subjectMode: SubjectFormattingMode;
  private _subjectLength: number;
  private _lineLength: number;
  private _tabSize: number;
  private _indentWithTabs: boolean;
  private _collapseMultipleEmptyLines: boolean;

  constructor(options?: CommitMessageFormatterOptions) {
    const defaultOptions: CommitMessageFormatterOptions = {
      subjectMode: 'truncate',
      subjectLength: 50,
      lineLength: 72,
      tabSize: 2,
      indentWithTabs: false,
      collapseMultipleEmptyLines: true,
    };
    const finalOptions = Object.assign(defaultOptions, options ? options : {});
    const {
      subjectMode,
      subjectLength,
      lineLength,
      tabSize,
      indentWithTabs,
      collapseMultipleEmptyLines,
    } = finalOptions;

    this._subjectMode = subjectMode;
    this._subjectLength = subjectLength;
    this._lineLength = lineLength;
    this._tabSize = tabSize;
    this._indentWithTabs = indentWithTabs;
    this._collapseMultipleEmptyLines = collapseMultipleEmptyLines;
  }

  getOptions(): CommitMessageFormatterOptions {
    return {
      subjectMode: this._subjectMode,
      subjectLength: this._subjectLength,
      lineLength: this._lineLength,
      tabSize: this._tabSize,
      indentWithTabs: this._indentWithTabs,
    };
  }

  private _removeUnnecessaryNewLines(message: string) {
    if (this._collapseMultipleEmptyLines) {
      return message.replace(/\n{3,}/gm, '\n\n');
    }

    return message;
  }

  formatSubject(rawText: string): { formatted: string; rest: string } {
    const nextNlPos = rawText.indexOf('\n');
    let rawLine = '';

    if (nextNlPos > -1) {
      rawLine = rawText.substring(0, nextNlPos);
    } else {
      rawLine = rawText;
    }

    if (rawLine.length <= this._subjectLength) {
      const rawLineLength = rawLine.length;

      return {
        formatted: rawLine,
        rest: rawText.substring(rawLineLength),
      };
    }

    if (this._subjectMode === 'truncate') {
      const formatted = rawLine.substring(0, this._subjectLength);
      const rest = rawText.substring(this._subjectLength);

      return {
        formatted,
        rest,
      };
    }

    if (this._subjectMode === 'truncate-ellipses') {
      const formatted = rawText.substring(0, this._subjectLength - 3) + '...';

      return {
        formatted,
        rest: '...' + rawText.substring(this._subjectLength - 3),
      };
    }

    if (this._subjectMode === 'split') {
      const firstLine = rawText.split('\n')[0];
      const words = firstLine.split(' ');
      let formatted = '';
      let rest = '';

      words.forEach((word, i) => {
        const prefix = i > 0 ? ' ' : '';
        const wordPadded = prefix + word;

        if (
          formatted.length + wordPadded.length <= this._subjectLength &&
          rest === ''
        ) {
          formatted += wordPadded;
        } else {
          if (rest === '') {
            rest += word;
          } else {
            rest += ' ' + word;
          }
        }
      });

      return {
        formatted,
        rest,
      };
    }

    if (this._subjectMode === 'split-ellipses') {
      const firstLine = rawText.split('\n')[0];
      const words = firstLine.split(' ');
      let formatted = '';
      let rest = '';

      words.forEach((word, i) => {
        const prefix = i > 0 ? ' ' : '';
        const wordPadded = prefix + word;
        const ellipsis = '...';

        if (
          formatted.length + wordPadded.length + ellipsis.length <=
            this._subjectLength &&
          rest === ''
        ) {
          formatted += wordPadded;
        } else {
          if (rest === '') {
            formatted += ellipsis;
            rest += ellipsis + word;
          } else {
            rest += ' ' + word;
          }
        }
      });

      return {
        formatted,
        rest,
      };
    }

    return {
      formatted: '',
      rest: '',
    };
  }

  formatNextLine(rawText: string): { formatted: string; rest: string } {
    let nextNlPos = rawText.indexOf('\n');

    if (nextNlPos === -1) {
      nextNlPos = rawText.length;
    }

    const rawLine = rawText.substring(0, nextNlPos + 1);

    if (rawLine.length < this._lineLength) {
      return {
        formatted: rawLine,
        rest: rawText.substring(nextNlPos + 1),
      };
    }

    const { indentationText, indentationWidth, leadingText } = analyzeLine(
      rawLine,
      {
        tabSize: this._tabSize,
        indentWithTabs: this._indentWithTabs,
      }
    );

    let formattedLine = leadingText;
    const remainingLine = rawLine.substring(leadingText.length);
    const availableLength = this._lineLength - indentationWidth;
    const words = remainingLine.split(' ');
    let charCount = 0;

    words.forEach((word, i) => {
      const pad = i === 0 ? '' : ' ';

      if (charCount + pad.length + word.length <= availableLength) {
        formattedLine += pad + word;
        charCount += pad.length + word.length;
      } else {
        formattedLine += '\n';
        formattedLine += indentationText;
        formattedLine += word;
        charCount = leadingText.length + word.length;
      }
    });

    return {
      formatted: formattedLine,
      rest: rawText.substring(nextNlPos + 1),
    };
  }

  format(message: string): string {
    if (message.length <= this._subjectLength) {
      return this._removeUnnecessaryNewLines(message);
    }

    const subject = this.formatSubject(message);

    let { formatted, rest } = subject;

    // remove leading space if it exists
    rest = rest.replace(/^([ ]+)/g, '');

    const nlMatches = /^[\n]+/g.exec(rest);
    const nlsAtTheBeginning = nlMatches ? nlMatches[0].length : 0;
    const minRequiredNls = 2;

    if (nlsAtTheBeginning < minRequiredNls) {
      rest = ''.padStart(minRequiredNls - nlsAtTheBeginning, '\n') + rest;
    }

    rest = reflow(rest, this._tabSize, this._indentWithTabs);

    while (rest.length > this._lineLength) {
      const next = this.formatNextLine(rest);

      formatted += next.formatted;
      rest = next.rest;
    }

    formatted = formatted + rest;

    return this._removeUnnecessaryNewLines(formatted);
  }
}

export default CommitMessageFormatter;
