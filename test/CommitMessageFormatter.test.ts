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

const trim = (text: TemplateStringsArray) =>
  text[0].replace(/^[\n]{1}/, '').replace(/[\n]{1}$/, '');

describe('CommitMessageFormatter', () => {
  it('CommitMessageFormatter is instantiable', () => {
    expect(new CommitMessageFormatter({})).toBeInstanceOf(
      CommitMessageFormatter
    );
  });

  it('Default options', () => {
    const formatter = new CommitMessageFormatter();

    expect(formatter.getOptions()).toStrictEqual({
      subjectMode: 'truncate',
      subjectLength: 50,
      lineLength: 72,
      tabSize: 2,
      indentWithTabs: false,
      protectedPatterns: ['#', 'Co-authored-by:', 'Signed-off-by:'],
    });
  });

  it('Options should be passed', () => {
    const formatter = new CommitMessageFormatter({
      subjectMode: 'truncate-ellipses',
      subjectLength: 100,
      lineLength: 200,
      tabSize: 10,
      indentWithTabs: true,
      protectedPatterns: ['Lorem:'],
    });

    expect(formatter.getOptions()).toStrictEqual({
      subjectMode: 'truncate-ellipses',
      subjectLength: 100,
      lineLength: 200,
      tabSize: 10,
      indentWithTabs: true,
      protectedPatterns: ['Lorem:'],
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

  it('Subject mode truncate', () => {
    const raw = trim`
Suspendisse porttitor semper nunc. Suspendisse potenti.
`;
    const expected = trim`
Suspendisse porttitor semper nunc. Suspendisse pot

enti.
`;

    const formatter = new CommitMessageFormatter({
      subjectMode: 'truncate',
    });

    expect(formatter.format(raw)).toBe(expected);
  });

  it('Subject mode truncate-ellipses', () => {
    const raw = trim`
Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit
`;
    const expected = trim`
Nemo enim ipsam voluptatem quia voluptas sit as...

...pernatur aut odit aut fugit
`;

    const formatter = new CommitMessageFormatter({
      subjectMode: 'truncate-ellipses',
    });

    expect(formatter.format(raw)).toBe(expected);
  });

  it('Subject mode split', () => {
    const raw = trim`
Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit
`;
    const expected = trim`
Nemo enim ipsam voluptatem quia voluptas sit

aspernatur aut odit aut fugit
`;

    const formatter = new CommitMessageFormatter({
      subjectMode: 'split',
    });

    expect(formatter.format(raw)).toBe(expected);
  });

  it('Subject mode split-ellipses', () => {
    const raw = trim`
Nemo enim ipsam voluptatem quia voluptas sit asp ernatur aut odit aut fugit
`;
    const expected = trim`
Nemo enim ipsam voluptatem quia voluptas sit...

...asp ernatur aut odit aut fugit
`;

    const formatter = new CommitMessageFormatter({
      subjectMode: 'split-ellipses',
    });

    expect(formatter.format(raw)).toBe(expected);
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

  it('Redundant empty lines should be removed', () => {
    const raw = 'Lorem\n\n\n\n\nIpsum\n\n\n\n\nDolor';

    const formatter = new CommitMessageFormatter({
      collapseMultipleEmptyLines: true,
    });

    expect(formatter.format(raw)).toBe('Lorem\n\nIpsum\n\nDolor');
  });

  it('Protected lines should not be touched', () => {
    const raw = trim`

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Changes to be committed:
#	new file:   README.md
#
`;

    const formatter = new CommitMessageFormatter();

    expect(formatter.format(raw)).toBe(raw);
  });

  it('todo4', () => {
    const raw = trim`
Phasellus ac nisi ac arcu blandit egestas ac non dui.
Etiam sed lorem id mauris posuere porta id at lacus.
Aenean gravida nulla at tempor lobortis.
Fusce rhoncus tellus nec nisl congue bibendum.
Praesent convallis leo quis eros laoreet, nec viverra nulla ultricies.
`;

    const expected = trim`
Phasellus ac nisi ac arcu blandit egestas ac non

dui.

Etiam sed lorem id mauris posuere porta id at lacus. Aenean gravida
nulla at tempor lobortis. Fusce rhoncus tellus nec nisl congue bibendum.
Praesent convallis leo quis eros laoreet, nec viverra nulla ultricies.
`;

    const formatter = new CommitMessageFormatter({
      lineLength: 72,
      subjectLength: 50,
      collapseMultipleEmptyLines: false,
      subjectMode: 'split',
    });
    const actual = formatter.format(raw);

    expect(actual).toBe(expected);
  });
});
