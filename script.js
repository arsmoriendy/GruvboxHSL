window.addEventListener("load", () => {
  addCopyButtons();

  // toggle options
  const options = document.querySelector(".options");
  const toggleOptionsButton = document.querySelector(".options>button");
  const optionsModal = document.querySelector(".options>.modal");
  [toggleOptionsButton, optionsModal].forEach(element => {
    element.addEventListener("click", () => toggleActive(options));
  });

  // toggle dropdowns
  [... document.querySelectorAll(".dropdownOption")].forEach(element => {
    element.querySelector(".dropdownOptionButton").addEventListener("click", () => toggleActive(element));
  })

  // toggle theme
  let lightMode = localStorage["lightMode"] === undefined ? false : JSON.parse(localStorage["lightMode"]);
  updateTheme(lightMode);
  
  const toggleTheme = document.querySelector("#toggleTheme");
  toggleTheme.addEventListener("click", e => {
    lightMode = !lightMode;
    updateTheme(lightMode);
    e.target.checked = lightMode;
  });

  // toggle tables
  const darkTable = document.querySelector("#darkTable");
  const lightTable = document.querySelector("#lightTable");
  const toggleShowDarkTable = document.querySelector('#toggleShowDarkTable');
  const toggleShowLightTable = document.querySelector('#toggleShowLightTable');

  // initialize
  if (localStorage["showTable"]) {
    const showTable = JSON.parse(localStorage["showTable"]);
    if (showTable[0]) addActive(darkTable);
    if (showTable[1]) addActive(lightTable);
  } else {
    addActive(darkTable);
    addActive(lightTable);
  }

  function updateTableChecksAndLocalStorage() {
    const showTable = [];
    showTable[0] = toggleShowDarkTable.checked = checkActive(darkTable);
    showTable[1] = toggleShowLightTable.checked = checkActive(lightTable);
    localStorage["showTable"] = JSON.stringify(showTable);
  }
  updateTableChecksAndLocalStorage();

  toggleShowDarkTable.addEventListener("click", () => {
    if (checkActive(lightTable)) {
      toggleActive(darkTable);
    } else if (!checkActive(darkTable)) {
      addActive(darkTable);
    } else {
      removeActive(darkTable);
      addActive(lightTable);
    }
    updateTableChecksAndLocalStorage();
  })
  toggleShowLightTable.addEventListener("click", () => {
    if (checkActive(darkTable)) {
      toggleActive(lightTable);
    } else if (!checkActive(lightTable)) {
      addActive(lightTable);
    } else {
      removeActive(lightTable);
      addActive(darkTable);
    }
    updateTableChecksAndLocalStorage();
  })
})

function checkActive(element) {
  return element.classList.contains("active");
}

function addActive(element) {
  element.classList.add("active");
}

function removeActive(element) {
  element.classList.remove("active");
}

function toggleActive(element) {
  if (checkActive(element)) {
    removeActive(element);
  } else {
    addActive(element);
  }
}

function updateTheme(lightMode) {
  lightMode
    ? document.body.setAttribute("class", "light")
    : document.body.setAttribute("class", "dark");
  localStorage["lightMode"] = lightMode;
};

function addCopyButtons() {
  [... document.querySelectorAll("td.color")].forEach(td => {
    const color = td.textContent;

    const copyBtn = document.createElement("button");
    copyBtn.setAttribute("class", "copyBtn");
    copyBtn.addEventListener("click", e => {
      const initalText = e.target.innerText;
      e.target.innerText = "";
      setTimeout(() => {
        e.target.innerText = initalText;
      }, 5000);
      navigator.clipboard.writeText(color);
    })
    copyBtn.innerText = "󱉨";
    td.appendChild(copyBtn);
  })
}

