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
  xit('Indented with 2 tabs, use tabs', () => {
    const result = analyzeLine(indentedWithTabs, 4, true);

    expect(result).toStrictEqual({
      indentationText: '		',
      indentationWidth: 8,
      isEmpty: false,
      isIndented: true,
      isListItem: false,
      leadingText: '		',
      listItemPrefix: '',
    });
  });

  xit('Indented with 2 tabs, use spaces', () => {
    const result = analyzeLine(indentedWithTabs, 4, false);

    expect(result).toStrictEqual({
      indentationText: '        ',
      indentationWidth: 8,
      isEmpty: false,
      isIndented: true,
      isListItem: false,
      leadingText: '		',
      listItemPrefix: '',
    });
  });

  xit('Indented list item, use spaces', () => {
    const result = analyzeLine(listItemIndented, 4, false);

    expect(result).toStrictEqual({
      indentationText: '            ',
      indentationWidth: 12,
      isEmpty: false,
      isIndented: true,
      isListItem: true,
      leadingText: '		1.) ',
      listItemPrefix: '1.) ',
    });
  });

  it('Should recognize empty lines', () => {
    const line = '';

    const result = analyzeLine(line, 4, false);

    expect(result.lineType).toBe('empty');
  });

  it('Should recognize ordered list item', () => {
    const line = '  1.) Lorem ipsum';

    const result = analyzeLine(line, 4, false);

    expect(result.lineType).toBe('list-item');
  });

  it('Should recognize unordered list item', () => {
    const line = '  * Lorem ipsum';

    const result = analyzeLine(line, 4, false);

    expect(result.lineType).toBe('list-item');
  });

  it('Should recognize tab indented line', () => {
    const line = '		Lorem ipsum';

    const result = analyzeLine(line, 4, false);

    expect(result.lineType).toBe('indented');
  });

  it('Should recognize space indented line', () => {
    const line = '        Lorem ipsum';

    const result = analyzeLine(line, 4, false);

    expect(result.lineType).toBe('indented');
  });

  it('When a line begins with hashmark, it should recognize as comment', () => {
    const line = '# Lorem ipsum';

    const result = analyzeLine(line, 4, false);

    expect(result.lineType).toBe('comment');
  });

  it('When a line contains a hashmark, it should recognize it is not a comment', () => {
    const line = 'Lorem Ipsum see: #123';

    const result = analyzeLine(line, 4, false);

    expect(result.lineType).not.toBe('comment');
  });
});
