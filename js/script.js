const body = document.body;
const toggleBtn = document.getElementById("mode-button");
const toggleIcon = document.querySelector(".light_dark_icon");


//LIGHT/DARK MODE TOGGLE

toggleBtn.addEventListener("click", () => {
  const isDark = body.classList.contains("dark-mode");
  const logo = document.querySelector(".logo");
  // const seeLess = document.querySelector(".see-button");

  if (isDark) {
    // Change to light mode
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    toggleIcon.src = "assets/images/icon-moon.svg";
    logo.src = "assets/images/logo-light-theme.svg"
    // seeLess.innerHTML = "See less";
  } else {
    // Change to dark mode
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    toggleIcon.src = "assets/images/icon-sun.svg";
    logo.src = "assets/images/logo-dark-theme.svg";
  }
});

// CHARACTER COUNTER + LIMIT
const textarea = document.getElementById("textarea");
const totalCharacters = document.getElementById("totalCharacters");
const wordCount = document.getElementById("wordCount");
const sentenceCount = document.getElementById("sentenceCount");
const excludeSpaces = document.getElementById("exclude-spaces");
const setCharacterLimit = document.getElementById("set-limit");
const characterLimitInput = document.getElementById("char-limit-input");
const warningBox = document.querySelector(".warning-message");

function updateAnalytics() {
  const text = textarea.value;
  const includeSpaces = !excludeSpaces.checked;
  const currentCharCount = includeSpaces ? text.length : text.replace(/\s/g, "").length;

  // Character Count
  totalCharacters.textContent = String(currentCharCount).padStart(2, "0");

  // Word Count
  let wordNumber = 0;
  let words = text.trim().split(" ");
  for (let word of words) {
    if (word !== "") {
      wordNumber++;
    }
  }
  wordCount.textContent = String(wordNumber).padStart(2, "0");

  // Sentence Count
  let sentences = text.split(/[.!?]/);
  let sentenceNumber = 0;
  for (let sentence of sentences) {
    if (sentence.trim() !== "") {
      sentenceNumber++;
    }
  }
  sentenceCount.textContent = String(sentenceNumber).padStart(2, "0");

  // Reading Time (average 200 characters per minute)
  const readingTime = Math.ceil(currentCharCount / 200);
  const readingTimeDisplay = document.querySelector(".reading-time");

  if (currentCharCount >= 1 && currentCharCount < 200) {
    readingTimeDisplay.textContent = "<1 minute";
  } else if (readingTime === 1) {
    readingTimeDisplay.textContent = "1 minute";
  } else {
    readingTimeDisplay.textContent = `${readingTime} minutes`;
  }

  // CHARACTER LIMIT (Show/hide input)
  characterLimitInput.style.display = setCharacterLimit.checked ? "inline-block" : "none";

  // CHARACTER LIMIT (limit condition)
  if (setCharacterLimit.checked && characterLimitInput.value !== "") {
    const limit = parseInt(characterLimitInput.value);

    if (!isNaN(limit) && currentCharCount >= limit) {
      textarea.classList.add("warning-border");
      warningBox.innerHTML = `
        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px;">
        <path d="M7 1.34375C3.71875 1.34375 1.09375 3.99609 1.09375 7.25C1.09375 10.5312 3.71875 13.1562 7 13.1562C10.2539 13.1562 12.9062 10.5312 12.9062 7.25C12.9062 3.99609 10.2266 1.34375 7 1.34375ZM7 0.46875C10.7188 0.46875 13.7812 3.53125 13.7812 7.25C13.7812 10.9961 10.7188 14.0312 7 14.0312C3.25391 14.0312 0.21875 10.9961 0.21875 7.25C0.21875 3.53125 3.25391 0.46875 7 0.46875ZM6.01562 9.875H6.34375V6.59375H6.01562C5.82422 6.59375 5.6875 6.45703 5.6875 6.26562V6.04688C5.6875 5.88281 5.82422 5.71875 6.01562 5.71875H7.32812C7.49219 5.71875 7.65625 5.88281 7.65625 6.04688V9.875H7.98438C8.14844 9.875 8.3125 10.0391 8.3125 10.2031V10.4219C8.3125 10.6133 8.14844 10.75 7.98438 10.75H6.01562C5.82422 10.75 5.6875 10.6133 5.6875 10.4219V10.2031C5.6875 10.0391 5.82422 9.875 6.01562 9.875ZM7 3.3125C7.46484 3.3125 7.875 3.72266 7.875 4.1875C7.875 4.67969 7.46484 5.0625 7 5.0625C6.50781 5.0625 6.125 4.67969 6.125 4.1875C6.125 3.72266 6.50781 3.3125 7 3.3125Z" fill="#FE8159"/>
        </svg> 
        <p>Limit reached! Your text exceeds ${limit} characters</p>
      `;
    } else {
      textarea.classList.remove("warning-border");
      warningBox.innerHTML = "";
    }
  } else {
    textarea.classList.remove("warning-border");
    warningBox.innerHTML = "";
  }
  updateLetterDensity(text);
}

// LISTENERS

textarea.addEventListener("input", updateAnalytics);
excludeSpaces.addEventListener("change", updateAnalytics);
setCharacterLimit.addEventListener("change", updateAnalytics);
characterLimitInput.addEventListener("input", updateAnalytics);

//PROGRESS BAR

const progressSection = document.querySelector(".progress_section");
const templateBar = document.querySelector(".progress-bar-container.template");

// Create bars A–Z from template
function generateLetterBars() {
  for (let i = 65; i <= 90; i++) { // ASCII A-Z
    const letter = String.fromCharCode(i);
    const clone = templateBar.cloneNode(true);
    clone.classList.remove("template");
    clone.style.display = "flex";
    clone.setAttribute("data-letter", letter);
    clone.querySelector(".letter").textContent = letter;
    progressSection.appendChild(clone);
  }
}

generateLetterBars();

function updateLetterDensity(text) {
  const letters = text.toUpperCase().replace(/[^A-Z]/g, "");
  const totalLetters = letters.length;

  const letterCounts = {};

  for (let char of letters) {
    letterCounts[char] = (letterCounts[char] || 0) + 1;
  }

  const bars = document.querySelectorAll(".progress-bar-container:not(.template)");
  const message = document.getElementById("letter-density-message");

  if (totalLetters === 0) {
    // Show placeholder, hide all bars
    message.style.display = "block";
    bars.forEach(bar => bar.style.display = "none");
    return;
  }

  // If there's content, hide message and update bars
  message.style.display = "none";

  bars.forEach(bar => {
    const letter = bar.dataset.letter;
    const count = letterCounts[letter] || 0;
    const percent = totalLetters ? (count / totalLetters * 100).toFixed(2) : 0;

    if (count === 0) {
      bar.style.display = "none";
    } else {
      bar.style.display = "flex";
      bar.querySelector(".progress-fill").style.width = `${percent}%`;
      bar.querySelector(".percentage").textContent = `${count} (${percent}%)`;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateLetterDensity("");
});





























