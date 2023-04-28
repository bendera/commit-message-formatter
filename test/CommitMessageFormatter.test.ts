import CommitMessageFormatter from "../src/CommitMessageFormatter";

describe("CommitMessageFormatter", () => {
  it("CommitMessageFormatter is instantiable", () => {
    expect(new CommitMessageFormatter()).toBeInstanceOf(CommitMessageFormatter);
  });
});
