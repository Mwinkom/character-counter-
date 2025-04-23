//TEST CHARACTER COUNTER MAIN FUNCTIONS (Character Count, Word Count, Sentence Count, Reading Time)

const {
  getCharacterCount,
  getWordCount,
  getSentenceCount,
  getReadingTime
} = require('../js/textAnalytics.js');

  
describe('getCharacterCount', () => {
  test('should count characters including spaces', () => {
    expect(getCharacterCount("Hello world")).toBe(11);
    expect(getCharacterCount("   Hello   world")).toBe(16);
    expect(getCharacterCount("$& @) >#")).toBe(8);
    expect(getCharacterCount("")).toBe(0);
  });

  test('should count characters excluding spaces', () => {
    expect(getCharacterCount("Hello world", false)).toBe(10);
  });
});

describe('getWordCount', () => {
  test('should return correct word count', () => {
    expect(getWordCount("Hello world")).toBe(2);
    expect(getWordCount("   Hello   world again ")).toBe(3);
    expect(getWordCount("")).toBe(0);
  });
});

describe('getSentenceCount', () => {
  test('should return correct sentence count', () => {
    expect(getSentenceCount("This is a sentence. Another one! And?")).toBe(3);
    expect(getSentenceCount(" ")).toBe(0);
    expect(getSentenceCount("Hello...  How are you today!? I am not okay.")).toBe(3);
  });
});

describe('getReadingTime', () => {
  test('should return <1 minute if under 200 characters', () => {
    expect(getReadingTime(150)).toBe("<1 minute");
  });

  test('should return 1 minute if exactly 200 characters', () => {
    expect(getReadingTime(200)).toBe("1 minute");
  });

  test('should return correct minute count for more than 200', () => {
    expect(getReadingTime(400)).toBe("2 minutes");
  });
});
  