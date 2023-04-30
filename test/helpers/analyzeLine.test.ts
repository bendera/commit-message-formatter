import analyzeLine from '../../src/helpers/analyzeLine';

const trim = (text: TemplateStringsArray) =>
  text[0].replace(/^[\n]{1}/, '').replace(/[\n]{1}$/, '');

const indentedWithTabs = trim`
		Lorem Ipsum
`;

const listItem = trim`
1.) Lorem Ipsum
`;

const listItemIndented = trim`
		1.) Lorem Ipsum
`;

const comment = trim`
# Lorem ipsum
`;

const commentIndented = trim`
		# Lorem ipsum
`;

describe('analyzeLine', () => {
  it('Default tab size should be 2', () => {
    const line = '		Lorem';

    const result = analyzeLine(line);

    expect(result.indentationWidth).toBe(4);
  });

  it('"tabSize" option should be applied', () => {
    const line = '		Lorem';

    const result = analyzeLine(line, { tabSize: 4 });

    expect(result.indentationWidth).toBe(8);
  });

  it('Should indented with spaces by default', () => {
    const line = '		Lorem';

    const result = analyzeLine(line);

    expect(result.indentationText).toBe('    ');
  });

  it('"indentWithTabs" option should be applied', () => {
    const line = '    Lorem';

    const result = analyzeLine(line, { indentWithTabs: true });

    expect(result.indentationText).toBe('\t\t');
  });

  it('"Co-authored-by:" trailers should be protected by default', () => {
    const line = 'Co-authored-by: John Doe';

    const result = analyzeLine(line);

    expect(result.lineType).toBe('protected');
  });

  it('"Signed-off-by:" trailers should be protected by default', () => {
    const line = 'Signed-off-by: John Doe';

    const result = analyzeLine(line);

    expect(result.lineType).toBe('protected');
  });

  it('Comments should be protected by default', () => {
    const line = '# Lorem';

    const result = analyzeLine(line);

    expect(result.lineType).toBe('protected');
  });

  it('Custom protected pattern should be applied', () => {
    const line = 'Fix: #54';

    const result = analyzeLine(line, { protectedPatterns: ['Fix:'] });

    expect(result.lineType).toBe('protected');
  });

  it('Should recognize empty lines', () => {
    const line = '';

    const result = analyzeLine(line);

    expect(result.lineType).toBe('empty');
  });

  it('Should recognize ordered list item', () => {
    const line = '  1.) Lorem ipsum';

    const result = analyzeLine(line);

    expect(result.lineType).toBe('list-item');
  });

  it('Should recognize unordered list item', () => {
    const line = '  * Lorem ipsum';

    const result = analyzeLine(line);

    expect(result.lineType).toBe('list-item');
  });

  it('Should recognize tab indented line', () => {
    const line = '		Lorem ipsum';

    const result = analyzeLine(line);

    expect(result.lineType).toBe('indented');
  });

  it('Should recognize space indented line', () => {
    const line = '        Lorem ipsum';

    const result = analyzeLine(line);

    expect(result.lineType).toBe('indented');
  });
});
