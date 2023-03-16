window.addEventListener("load", () => {
  function updateTheme() {
    if (lightMode) {
      document.body.setAttribute("class", "light");
    } else {
      document.body.setAttribute("class", "dark");
    }
    localStorage["lightMode"] = lightMode;
  };

  let lightMode = localStorage["lightMode"] === undefined ? false : JSON.parse(localStorage["lightMode"]);
  updateTheme();

  const toggleThemeButton = document.querySelector("#toggleThemeButton");
  toggleThemeButton.addEventListener("click", () => {
    lightMode = !lightMode;
    updateTheme();
  });

  [... document.querySelectorAll("td.color")].forEach(td => {
    const color = td.textContent;

    const copyBtn = document.createElement("button");
    copyBtn.setAttribute("class", "copyBtn");
    copyBtn.addEventListener("click", e => {
      navigator.clipboard.writeText(color)
    })
    copyBtn.innerText = "Copy"
    td.appendChild(copyBtn)
  })
})
