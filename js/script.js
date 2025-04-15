const body = document.body;
const toggleBtn = document.getElementById("mode-button");
const toggleIcon = document.querySelector(".light_dark_icon");


//LIGHT/DARK MODE TOGGLE

toggleBtn.addEventListener("click", () => {
  const isDark = body.classList.contains("dark-mode");
  const logo = document.querySelector(".logo");
  const upDownIcon = document.querySelector("path");
  // const seeLess = document.querySelector(".see-button");

  if (isDark) {
    // Change to light mode
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    toggleIcon.src = "assets/images/icon-moon.svg";
    logo.src = "assets/images/logo-light-theme.svg"
    upDownIcon.fill = "#12131A"; 
    // seeLess.innerHTML = "See less";
  } else {
    // Change to dark mode
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    toggleIcon.src = "assets/images/icon-sun.svg";
    logo.src = "assets/images/logo-dark-theme.svg";
    upDownIcon.fill = "#E4E4EF"; 
    
  }
});

//CHARACTER COUNTER
const textarea = document.getElementById("textarea");
const totalCharacters = document.getElementById("totalCharacters");
const wordCount = document.getElementById("wordCount");
const sentenceCount = document.getElementById("sentenceCount");
const excludeSpaces = document.getElementById("exclude-spaces");


function updateAnalytics(){
  const text = textarea.value;

  //Character Count
  const characters = text.length;
    if (excludeSpaces.checked) {
      const textWithoutSpaces = text.replace(/\s/g, "");
      totalCharacters.textContent = String(textWithoutSpaces.length).padStart(2, "0");
    }
    else {
      totalCharacters.textContent = String(characters).padStart(2, "0");
    }

  //Word Count
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
};

textarea.addEventListener("input", updateAnalytics);
excludeSpaces.addEventListener("change", updateAnalytics);


































// textarea.addEventListener("input", () => {
//   const text = textarea.value;
//   const characters = text.length;
//   const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
//   const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;

//   totalCharacters.textContent = characters;
//   wordCount.textContent = words;
//   sentenceCount.textContent = sentences;
// });