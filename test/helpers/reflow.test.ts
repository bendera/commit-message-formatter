import reflow from '../../src/helpers/reflow';
import { finalNewlineInserted } from '../_fixtures';

// #region fixtures

const trim = (text: TemplateStringsArray) =>
  text[0].replace(/^[\n]{1}/, '').replace(/[\n]{1}$/, '');

const indentedWithTabs = trim`
Lorem ipsum

		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit
		amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.

		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit
		amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.
`;

const indentedWithTabsJoined = trim`
Lorem ipsum

		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.

		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.
`;

const longLines = trim`
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit
amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit
amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.
`;

const longLinesJoined = trim`
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.
`;

const listWithTabs = trim`
Lorem ipsum

		1.) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit
		amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.

		2.) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit
		amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.


		3.) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit
		amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.
`;

const listWithTabsJoined = trim`
Lorem ipsum

		1.) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.

		2.) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.


		3.) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.
`;

const mixed = trim`
Lorem ipsum

		1.) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit
		amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.

		2.) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit
		amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.


Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit
amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.
`;

const mixedJoined = trim`
Lorem ipsum

		1.) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.

		2.) Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.


Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas blandit lacinia massa sit amet sollicitudin. Ut quam est, dapibus finibus congue non, molestie eget.
`;

const beginsWithNl = trim`


Lorem ipsum
`;

const protectedLine = trim`

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Changes to be committed:
#	new file:   README.md
#
`;

// #endregion

describe('reflow', () => {
  it('rejoin indented lines', () => {
    expect(reflow(indentedWithTabs, { tabSize: 2, indentWithTabs: true })).toBe(
      indentedWithTabsJoined
    );
  });

  it('rejoin long lines', () => {
    expect(reflow(longLines, { tabSize: 2, indentWithTabs: true })).toBe(
      longLinesJoined
    );
  });

  it('rejoin list indented with tabs', () => {
    expect(reflow(listWithTabs, { tabSize: 2, indentWithTabs: true })).toBe(
      listWithTabsJoined
    );
  });

  it('rejoin mixed', () => {
    expect(reflow(mixed, { tabSize: 2, indentWithTabs: true })).toBe(
      mixedJoined
    );
  });

  it('begins with nl', () => {
    expect(reflow(beginsWithNl, { tabSize: 2, indentWithTabs: true })).toBe(
      beginsWithNl
    );
  });

  it('final newline should not be duplicated', () => {
    expect(
      reflow(finalNewlineInserted, { tabSize: 2, indentWithTabs: true })
    ).toBe(finalNewlineInserted);
  });

  it('Protected line should be kept untouched', () => {
    expect(reflow(protectedLine, { tabSize: 2, indentWithTabs: true })).toBe(
      protectedLine
    );
  });

  it('todo4', () => {
    const raw = trim`
Phasellus ac nisi ac arcu blandit egestas ac non dui.
Etiam sed lorem id mauris posuere porta id at lacus.
Aenean gravida nulla at tempor lobortis.
Fusce rhoncus tellus nec nisl congue bibendum.
Praesent convallis leo quis eros laoreet, nec viverra nulla ultricies.
`;
    const expected =
      'Phasellus ac nisi ac arcu blandit egestas ac non dui. Etiam sed lorem id mauris posuere porta id at lacus. Aenean gravida nulla at tempor lobortis. Fusce rhoncus tellus nec nisl congue bibendum. Praesent convallis leo quis eros laoreet, nec viverra nulla ultricies.';
    expect(reflow(raw, { tabSize: 2, indentWithTabs: true })).toBe(expected);
  });
});
