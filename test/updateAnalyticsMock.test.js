//MOCK DOM FOR TESTING

/**
 * @jest-environment jsdom
 */ 

// This is a mock DOM for testing purposes. It simulates the HTML structure and JavaScript functionality of the original code.

const { getCharacterCount, getWordCount, getSentenceCount, getReadingTime } = require('../js/textAnalytics');

// Mock the DOM structure
document.body.innerHTML = `
  <textarea id="textarea"></textarea>
  <div id="totalCharacters"></div>
  <div id="wordCount"></div>
  <div id="sentenceCount"></div>
  <div class="reading-time"></div>
  <div class="warning-message"></div>
  <input type="checkbox" id="set-limit" />
  <input id="char-limit-input" value="50" />
`;

// Mock the functions to simulate the behavior of the original code
const textarea = document.getElementById("textarea");
const totalCharacters = document.getElementById("totalCharacters");
const wordCount = document.getElementById("wordCount");
const sentenceCount = document.getElementById("sentenceCount");
const readingTimeDisplay = document.querySelector(".reading-time");
const setCharacterLimit = document.getElementById("set-limit");
const characterLimitInput = document.getElementById("char-limit-input");
const warningBox = document.querySelector(".warning-message");

function updateAnalytics() {
  const text = textarea.value;
  const currentCharCount = getCharacterCount(text);
  const currentWordCount = getWordCount(text);
  const currentSentenceCount = getSentenceCount(text);
  const readingTime = getReadingTime(currentCharCount);

  totalCharacters.textContent = currentCharCount.toString().padStart(2, "0");
  wordCount.textContent = currentWordCount.toString().padStart(2, "0");
  sentenceCount.textContent = currentSentenceCount.toString().padStart(2, "0");
  readingTimeDisplay.textContent = readingTime;

  // Limit logic
  characterLimitInput.style.display = setCharacterLimit.checked ? "inline-block" : "none";

  if (setCharacterLimit.checked && characterLimitInput.value !== "") {
    const limit = parseInt(characterLimitInput.value);
    if (!isNaN(limit) && currentCharCount >= limit) {
      warningBox.innerHTML = `<p>Limit reached! Your text exceeds ${limit} characters</p>`;
    } else {
      warningBox.innerHTML = "";
    }
  } else {
    warningBox.innerHTML = "";
  }
}

//Test cases for the updateAnalytics function
describe("updateAnalytics", () => {
  beforeEach(() => {
    textarea.value = "";
    setCharacterLimit.checked = false;
    warningBox.innerHTML = "";
  });

  test("updates character, word, and sentence counts", () => {
    textarea.value = "Hello world. This is Mildred!";
    updateAnalytics();

    expect(totalCharacters.textContent).toBe("29");
    expect(wordCount.textContent).toBe("05");
    expect(sentenceCount.textContent).toBe("02");
  });

  test("shows reading time properly for over 200 characters", () => {
    textarea.value = "a".repeat(300); // simulate 300 characters
    updateAnalytics();

    expect(readingTimeDisplay.textContent).toBe("2 minutes");

  });

  test("shows reading time properly for under 200 characters", () => {
    textarea.value = "a".repeat(150); // simulate 150 characters
    updateAnalytics();

    expect(readingTimeDisplay.textContent).toBe("<1 minute");
  })

  test("shows warning when limit is reached", () => {
    setCharacterLimit.checked = true;
    characterLimitInput.value = "20";
    textarea.value = "This text exceeds 20 characters.";
    updateAnalytics();

    expect(warningBox.innerHTML).toContain("Limit reached");
  });

  test("does not show warning when limit not reached", () => {
    setCharacterLimit.checked = true;
    characterLimitInput.value = "100";
    textarea.value = "Short text.";
    updateAnalytics();

    expect(warningBox.innerHTML).toBe("");
  });
});
