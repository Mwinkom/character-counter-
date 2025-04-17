const body = document.body;
const toggleBtn = document.getElementById("mode-button");
const toggleIcon = document.querySelector(".light_dark_icon");
const toggleButton = document.getElementById("toggle-bars-btn");
let isExpanded = false;

// LIGHT/DARK MODE TOGGLE
toggleBtn.addEventListener("click", () => {
  const isDark = body.classList.contains("dark-mode");
  const logo = document.querySelector(".logo");

  if (isDark) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    toggleIcon.src = "assets/images/icon-moon.svg";
    logo.src = "assets/images/logo-light-theme.svg";
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    toggleIcon.src = "assets/images/icon-sun.svg";
    logo.src = "assets/images/logo-dark-theme.svg";
  }
});

// CHARACTER COUNTER + LIMIT
const textarea = document.getElementById("text-area");
const totalCharacters = document.getElementById("totalCharacters");
const wordCount = document.getElementById("wordCount");
const sentenceCount = document.getElementById("sentenceCount");
const excludeSpaces = document.getElementById("exclude-spaces");
const setCharacterLimit = document.getElementById("set-limit");
const characterLimitInput = document.getElementById("char-limit-input");
const warningBox = document.querySelector(".warning-message");

// PROGRESS BAR SETUP
const progressSection = document.querySelector(".progress_section");
const templateBar = document.querySelector(".progress-bar-container.template");

function generateLetterBars() {
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const clone = templateBar.cloneNode(true);
    clone.classList.remove("template");
    clone.style.display = "none";
    clone.setAttribute("data-letter", letter);
    clone.querySelector(".letter").textContent = letter;
    progressSection.appendChild(clone);
  }
}
generateLetterBars();

// MAIN ANALYTICS FUNCTION
function updateAnalytics() {
  const text = textarea.value;
  const includeSpaces = !excludeSpaces.checked;
  const currentCharCount = includeSpaces ? text.length : text.replace(/\s/g, "").length;

  totalCharacters.textContent = String(currentCharCount).padStart(2, "0");

  // Personalized Word Count
  let wordNumber = 0;
  let words = text.trim().split(" ");
  for (let word of words) {
    if (word !== "") {
      wordNumber++;
    }
  }
  wordCount.textContent = String(wordNumber).padStart(2, "0");

  // Personalized Sentence Count
  let sentences = text.split(/[.!?]/);
  let sentenceNumber = 0;
  for (let sentence of sentences) {
    if (sentence.trim() !== "") {
      sentenceNumber++;
    }
  }
  sentenceCount.textContent = String(sentenceNumber).padStart(2, "0");

  // Reading Time
  const readingTime = Math.ceil(currentCharCount / 200);
  const readingTimeDisplay = document.querySelector(".reading-time");

  if (currentCharCount < 200 && currentCharCount >= 1) {
    readingTimeDisplay.textContent = "<1 minute";
  } else if (readingTime === 1) {
    readingTimeDisplay.textContent = "1 minute";
  } else {
    readingTimeDisplay.textContent = `${readingTime} minutes`;
  }

  // Character Limit Logic
  characterLimitInput.style.display = setCharacterLimit.checked ? "inline-block" : "none";

  if (setCharacterLimit.checked && characterLimitInput.value !== "") {
    const limit = parseInt(characterLimitInput.value);
  
    if (!isNaN(limit) && currentCharCount >= limit) {
      textarea.classList.add("warning-border");
      textarea.classList.add("no-focus"); // disable focus styles
  
      warningBox.innerHTML = `
        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px;">
        <path d="..." fill="#FE8159"/>
        </svg> 
        <p>Limit reached! Your text exceeds ${limit} characters</p>
      `;
    } else {
      textarea.classList.remove("warning-border");
      textarea.classList.remove("no-focus"); // restore focus
      warningBox.innerHTML = "";
    }
  
  } else {
    // 🛠 Reset styles when checkbox is not checked
    textarea.classList.remove("warning-border");
    textarea.classList.remove("no-focus");
    warningBox.innerHTML = "";
  }
  


  updateLetterDensity(text);
}

// Block further typing if limit reached
textarea.addEventListener("keydown", (e) => {
  const text = textarea.value;
  const includeSpaces = !excludeSpaces.checked;
  const currentCharCount = includeSpaces ? text.length : text.replace(/\s/g, "").length;
  const limit = parseInt(characterLimitInput.value);

  if (
    setCharacterLimit.checked &&
    !isNaN(limit) &&
    currentCharCount >= limit &&
    !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)
  ) {
    e.preventDefault(); // block input
  }
});


// PROGRESS BAR DENSITY
function updateLetterDensity(text) {
  const letters = text.toUpperCase().replace(/[^A-Z]/g, "");
  const totalLetters = letters.length;
  const message = document.getElementById("letter-density-message");
  const bars = document.querySelectorAll(".progress-bar-container:not(.template)");

  const letterCounts = {};
  for (let char of letters) {
    letterCounts[char] = (letterCounts[char] || 0) + 1;
  }

  if (totalLetters === 0) {
    message.style.display = "block";
    bars.forEach(bar => bar.style.display = "none");
    toggleButton.style.display = "none";
    return;
  }

  message.style.display = "none";

  const validBars = [];

  bars.forEach(bar => {
    const letter = bar.dataset.letter;
    const count = letterCounts[letter] || 0;
    const percent = totalLetters ? (count / totalLetters * 100).toFixed(2) : 0;

    if (count > 0) {
      bar.querySelector(".progress-fill").style.width = `${percent}%`;
      bar.querySelector(".percentage").textContent = `${count} (${percent}%)`;
      validBars.push(bar);
    }
    bar.style.display = "none"; // hide all first
  });

  if (validBars.length <= 5 || isExpanded) {
    validBars.forEach(bar => (bar.style.display = "flex"));
    toggleButton.style.display = validBars.length <= 5 ? "none" : "inline-block";
    toggleButton.innerHTML = isExpanded ? 
    `See less <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.25 0.65625L10.875 5.21875C11.0312 5.375 11.0312 5.625 10.875 5.75L10.25 6.375C10.125 6.53125 9.875 6.53125 9.71875 6.375L6 2.6875L2.25 6.375C2.09375 6.53125 1.875 6.53125 1.71875 6.375L1.09375 5.75C0.9375 5.625 0.9375 5.375 1.09375 5.21875L5.71875 0.65625C5.875 0.5 6.09375 0.5 6.25 0.65625Z" fill="currentColor"/>
    </svg>
    ` 
    : 
    `See more <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.71875 6.375L1.09375 1.78125C0.9375 1.65625 0.9375 1.40625 1.09375 1.25L1.71875 0.65625C1.875 0.5 2.09375 0.5 2.25 0.65625L6 4.34375L9.71875 0.65625C9.875 0.5 10.125 0.5 10.25 0.65625L10.875 1.25C11.0312 1.40625 11.0312 1.65625 10.875 1.78125L6.25 6.375C6.09375 6.53125 5.875 6.53125 5.71875 6.375Z" fill="currentColor"/>
    </svg>`;
  } else {
    validBars.forEach((bar, index) => {
      bar.style.display = index < 5 ? "flex" : "none";
    });
    toggleButton.style.display = "inline-block";
    toggleButton.innerHTML = `See more <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.71875 6.375L1.09375 1.78125C0.9375 1.65625 0.9375 1.40625 1.09375 1.25L1.71875 0.65625C1.875 0.5 2.09375 0.5 2.25 0.65625L6 4.34375L9.71875 0.65625C9.875 0.5 10.125 0.5 10.25 0.65625L10.875 1.25C11.0312 1.40625 11.0312 1.65625 10.875 1.78125L6.25 6.375C6.09375 6.53125 5.875 6.53125 5.71875 6.375Z" fill="currentColor"/>
    </svg>`;
  }
}

// TOGGLE EXPAND/COLLAPSE
toggleButton.addEventListener("click", () => {
  isExpanded = !isExpanded;
  updateLetterDensity(textarea.value);
});

// EVENT LISTENERS
textarea.addEventListener("input", updateAnalytics);
excludeSpaces.addEventListener("change", updateAnalytics);
setCharacterLimit.addEventListener("change", updateAnalytics);
characterLimitInput.addEventListener("input", updateAnalytics);

// INIT
document.addEventListener("DOMContentLoaded", () => {
  updateAnalytics();
});
