import calculateNumberOfTextColumns from "../../src/helpers/calculateNumberOfTextColumns";

const trim = (text: TemplateStringsArray) =>
  text[0].replace(/^[\n]{1}/, '').replace(/[\n]{1}$/, '');

export const textWithTabs = trim`
aaa	aa	a	aaaa	
`;

export const textWithSpaces = trim`
aaa aa  a   aaaa    
`;

describe('calculateNumberOfTextColumns', () => {
  it('text with tabs', () => {
    expect(calculateNumberOfTextColumns(textWithTabs, 4)).toBe(20);
  });

  it('text with spaces', () => {
    expect(calculateNumberOfTextColumns(textWithSpaces, 4)).toBe(20);
  });
});
