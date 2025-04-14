const body = document.body;
const toggleBtn = document.getElementById("mode-button");
const toggleIcon = document.querySelector(".light_dark_icon");

toggleBtn.addEventListener("click", () => {
  const isDark = body.classList.contains("dark-mode");
  const logo = document.querySelector(".logo");
  const upDownIcon = document.querySelector("path");

  if (isDark) {
    // Change to light mode
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    toggleIcon.src = "assets/images/icon-moon.svg";
    logo.src = "assets/images/logo-light-theme.svg"
    upDownIcon.fill = "#12131A"; 
  } else {
    // Change to dark mode
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    toggleIcon.src = "assets/images/icon-sun.svg";
    logo.src = "assets/images/logo-dark-theme.svg";
    upDownIcon.fill = "#E4E4EF"; 
  }
});
