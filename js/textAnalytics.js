// CHARACTER COUNTER MAIN FUNCTIONS (Character Count, Word Count, Sentence Count, Reading Time)
// This module contains functions to count characters, words, sentences, and calculate reading time based on character count.

// CHARACTER COUNT FUNCTION
function getCharacterCount(text, includeSpaces = true) {
  return includeSpaces ? text.length : text.replace(/\s/g, "").length;
}

// WORD COUNT FUNCTION
function getWordCount(text) {
  let wordNumber = 0;
  const words = text.trim().split(" ");
  for (let word of words) {
    if (word !== "") wordNumber++;
  }
  return wordNumber;
}

// SENTENCE COUNT FUNCTION
function getSentenceCount(text) {
  const sentences = text.split(/[.!?]/);
  let sentenceNumber = 0;
  for (let sentence of sentences) {
    if (sentence.trim() !== "") sentenceNumber++;
  }
  return sentenceNumber;
}

// READING TIME FUNCTION
function getReadingTime(charCount) {
  if (charCount >= 1 && charCount < 200) return "<1 minute";
  const minutes = Math.ceil(charCount / 200);
  return minutes === 1 ? "1 minute" : `${minutes} minutes`;
}

module.exports = {
  getCharacterCount,
  getWordCount,
  getSentenceCount,
  getReadingTime,
};