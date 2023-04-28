import analyzeLine from '../../src/helpers/analyzeLine';

const trim = (text: TemplateStringsArray) =>
  text[0].replace(/^[\n]{1}/, '').replace(/[\n]{1}$/, '');

const indentedWithTabs = trim`
		Lorem Ipsum
`;

const indentedListItem = trim`
		1.) Lorem Ipsum
`;

describe('analyzeLine', () => {
  it('Indented with 2 tabs, use tabs', () => {
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

  it('Indented with 2 tabs, use spaces', () => {
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

  it('Indented list item, use spaces', () => {
    const result = analyzeLine(indentedListItem, 4, false);

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
});
