import analyzeLine from './helpers/analyzeLine';
import reflow from './helpers/reflow';

type SubjectFormattingMode = 'truncate' | 'truncate-ellipses' | 'split';

export interface CommitMessageFormatterOptions {
  blankLineAfterSubject?: boolean;
  subjectMode?: SubjectFormattingMode;
  subjectLength?: number;
  lineLength?: number;
  tabSize?: number;
  indentWithTabs?: boolean;
}

class CommitMessageFormatter {
  private _blankLineAfterSubject: boolean;
  private _subjectMode: SubjectFormattingMode;
  private _subjectLength: number;
  private _lineLength: number;
  private _tabSize: number;
  private _indentWithTabs: boolean;

  constructor(options?: CommitMessageFormatterOptions) {
    const defaultOptions: CommitMessageFormatterOptions = {
      blankLineAfterSubject: false,
      subjectMode: 'truncate',
      subjectLength: 50,
      lineLength: 72,
      tabSize: 2,
      indentWithTabs: false,
    };
    const finalOptions = Object.assign(defaultOptions, options ? options : {});
    const {
      blankLineAfterSubject,
      subjectMode,
      subjectLength,
      lineLength,
      tabSize,
      indentWithTabs,
    } = finalOptions;

    this._blankLineAfterSubject = blankLineAfterSubject;
    this._subjectMode = subjectMode;
    this._subjectLength = subjectLength;
    this._lineLength = lineLength;
    this._tabSize = tabSize;
    this._indentWithTabs = indentWithTabs;
  }

  getOptions(): CommitMessageFormatterOptions {
    return {
      blankLineAfterSubject: this._blankLineAfterSubject,
      subjectMode: this._subjectMode,
      subjectLength: this._subjectLength,
      lineLength: this._lineLength,
      tabSize: this._tabSize,
      indentWithTabs: this._indentWithTabs,
    };
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
      this._tabSize,
      this._indentWithTabs
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
      return message;
    }

    const subject = this.formatSubject(message);

    let { formatted, rest } = subject;

    // remove leading space if it exists
    rest = rest.replace(/^([ ]+)/g, '');

    const nlMatches = /^[\n]+/gm.exec(rest);
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

    return formatted + rest;
  }
}

export default CommitMessageFormatter;
