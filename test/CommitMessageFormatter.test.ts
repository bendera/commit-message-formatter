import {
  finalNewlineInserted,
  finalNewlineInsertedWrapped,
  indentWithTabsRaw,
  indentWithTabsWrapped,
  listAlphaBraketTabsRaw,
  listAlphaBraketTabsWrapped,
  listAlphaTabsRaw,
  listAlphaTabsWrapped,
  listAsteriskTabsRaw,
  listAsteriskTabsWrapped,
  listDashTabsRaw,
  listDashTabsWrapped,
  listDecimalTabsRaw,
  listDecimalTabsWrapped,
  longSubjectFormatted,
  longSubjectRaw,
  shortSubjectRaw,
  todo2,
  todo2Expected,
  todo3,
  todo3Expected,
} from './_fixtures';
import CommitMessageFormatter from '../src/CommitMessageFormatter';

describe('CommitMessageFormatter', () => {
  it('CommitMessageFormatter is instantiable', () => {
    expect(new CommitMessageFormatter({})).toBeInstanceOf(
      CommitMessageFormatter
    );
  });

  it('Default options', () => {
    const formatter = new CommitMessageFormatter();

    expect(formatter.getOptions()).toStrictEqual({
      blankLineAfterSubject: false,
      subjectMode: 'truncate',
      subjectLength: 50,
      lineLength: 72,
      tabSize: 2,
      indentWithTabs: false,
    });
  });

  it('Options should be passed', () => {
    const formatter = new CommitMessageFormatter({
      blankLineAfterSubject: true,
      subjectMode: 'truncate-ellipses',
      subjectLength: 100,
      lineLength: 200,
      tabSize: 10,
      indentWithTabs: true,
    });

    expect(formatter.getOptions()).toStrictEqual({
      blankLineAfterSubject: true,
      subjectMode: 'truncate-ellipses',
      subjectLength: 100,
      lineLength: 200,
      tabSize: 10,
      indentWithTabs: true,
    });
  });

  it('Message should be untouched when message length is less than maximum subject length', () => {
    const formatter = new CommitMessageFormatter();

    expect(formatter.format('Lorem ipsum')).toBe('Lorem ipsum');
  });

  it('Subject should be untouched when actual subject lenght is less than maximum subject length', () => {
    const formatter = new CommitMessageFormatter();

    expect(formatter.format(shortSubjectRaw)).toBe(shortSubjectRaw);
  });

  it('Subject length is greater than maximum subject length', () => {
    const formatter = new CommitMessageFormatter();

    expect(formatter.format(longSubjectRaw)).toBe(longSubjectFormatted);
  });

  it('indented with tabs', () => {
    const formatter = new CommitMessageFormatter({
      tabSize: 4,
      indentWithTabs: true,
    });

    expect(formatter.format(indentWithTabsRaw)).toBe(indentWithTabsWrapped);
  });

  it('Ordered decimal list, indented with tabs', () => {
    const formatter = new CommitMessageFormatter({
      tabSize: 4,
      indentWithTabs: true,
    });

    expect(formatter.format(listDecimalTabsRaw)).toBe(listDecimalTabsWrapped);
  });

  it('Ordered list with ascii letters, indented with tabs', () => {
    const formatter = new CommitMessageFormatter({
      tabSize: 4,
      indentWithTabs: true,
    });

    expect(formatter.format(listAlphaTabsRaw)).toBe(listAlphaTabsWrapped);
  });

  it('ordered list with bracket after period, indented with tabs', () => {
    const formatter = new CommitMessageFormatter({
      tabSize: 4,
      indentWithTabs: true,
    });

    expect(formatter.format(listAlphaBraketTabsRaw)).toBe(
      listAlphaBraketTabsWrapped
    );
  });

  it('unordered list with asterisk, indented with tabs', () => {
    const formatter = new CommitMessageFormatter({
      tabSize: 4,
      indentWithTabs: true,
    });

    expect(formatter.format(listAsteriskTabsRaw)).toBe(listAsteriskTabsWrapped);
  });

  it('unordered list with dash, indented with tabs', () => {
    const formatter = new CommitMessageFormatter({
      tabSize: 4,
      indentWithTabs: true,
    });

    expect(formatter.format(listDashTabsRaw)).toBe(listDashTabsWrapped);
  });

  it('final newline should not be duplicated', () => {
    const formatter = new CommitMessageFormatter();

    expect(formatter.format(finalNewlineInserted)).toBe(
      finalNewlineInsertedWrapped
    );
  });

  it('todo2', () => {
    const formatter = new CommitMessageFormatter({ indentWithTabs: true });

    expect(formatter.format(todo2)).toBe(todo2Expected);
  });

  it('todo3', () => {
    const formatter = new CommitMessageFormatter();

    expect(formatter.format(todo3)).toBe(todo3Expected);
  });
});
