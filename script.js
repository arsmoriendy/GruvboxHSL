const filters = {};
// init format
if (localStorage["filters"]) {
  const parsedLocalStorageFilters = JSON.parse(localStorage["filters"]);
  filters.roundFloats = parsedLocalStorageFilters.roundFloats;
  filters.spaceSeparators = parsedLocalStorageFilters.spaceSeparators;
} else {
  // defaults
  filters.roundFloats = false;
  filters.spaceSeparators = false;
}

window.addEventListener("load", () => {
  const colorTds = [...document.querySelectorAll("td.color")];
  // td init
  colorTds.forEach((td) => {
    // add copy buttons
    addCopyButton(td);
    // init color
    td.color = td.childNodes[0].nodeValue;
    // filter methods:
    td.roundFloats = function (color) {
      color = color.trim();
      // only for hsl
      if (color[0] === "h") {
        const splitter = color.includes(",") ? "," : " ";
        const splitColor = color.slice(4, -1).split(splitter);
        let formattedColor = `hsl(${splitColor[0]}`;
        for (let i = 1; i < splitColor.length; i++) {
          formattedColor = formattedColor.concat(
            splitter,
            `${Math.round(parseFloat(splitColor[i].slice(0, -1)))}%`,
          );
        }
        return formattedColor + ")";
      }
      return color;
    };
    td.spaceSeparators = function (color) {
      return color.replaceAll(",", " ");
    };
    td.applyFilters = function (filters) {
      let color = td.color;
      Object.keys(filters).forEach((filter) => {
        if (filters[filter]) {
          color = td[filter](color);
        }
      });
      td.childNodes[0].nodeValue = color;
    };
    td.applyFilters(filters);
  });

  // toggle options
  const options = document.querySelector(".options");
  const toggleOptionsButton = document.querySelector(".options>button");
  const optionsModal = document.querySelector(".options>.modal");
  [toggleOptionsButton, optionsModal].forEach((element) => {
    element.addEventListener("click", () => toggleActive(options));
  });

  // toggle dropdowns
  [...document.querySelectorAll(".dropdownOption")].forEach((element) => {
    element
      .querySelector(".dropdownOptionButton")
      .addEventListener("click", () => toggleActive(element));
  });

  // toggle theme
  let lightMode =
    localStorage["lightMode"] === undefined
      ? false
      : JSON.parse(localStorage["lightMode"]);
  updateTheme(lightMode);

  const toggleTheme = document.querySelector("#toggleTheme");
  toggleTheme.addEventListener("click", (e) => {
    lightMode = !lightMode;
    updateTheme(lightMode);
    e.target.checked = lightMode;
  });

  // toggle tables
  const darkTable = document.querySelector("#darkTable");
  const lightTable = document.querySelector("#lightTable");
  const toggleShowDarkTable = document.querySelector("#toggleShowDarkTable");
  const toggleShowLightTable = document.querySelector("#toggleShowLightTable");

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
  });
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
  });

  // toggle floats
  const roundFloats = document.querySelector("#roundFloats");
  roundFloats.addEventListener("click", (e) => {
    filters.roundFloats = !filters.roundFloats;
    colorTds.forEach((td) => {
      td.applyFilters(filters);
    });
    e.target.checked = filters.roundFloats;
    localStorage["filters"] = JSON.stringify(filters);
  });

  // toggle comma separators
  const spaceSeparators = document.querySelector("#spaceSeparators");
  spaceSeparators.addEventListener("click", (e) => {
    filters.spaceSeparators = !filters.spaceSeparators;
    colorTds.forEach((td) => {
      td.applyFilters(filters);
    });
    e.target.checked = filters.spaceSeparators;
    localStorage["filters"] = JSON.stringify(filters);
  });
});

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
}

const checkSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
const copySVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

function addCopyButton(td) {
  const copyBtn = document.createElement("button");
  copyBtn.setAttribute("class", "copyBtn");
  copyBtn.innerHTML = copySVG;
  copyBtn.addEventListener("click", (e) => {
    e.target.innerHTML = checkSVG;
    setTimeout(() => {
      e.target.innerHTML = copySVG;
    }, 5000);
    const colorVal = td.childNodes[0].nodeValue.trim();
    navigator.clipboard.writeText(colorVal);
  });
  td.appendChild(copyBtn);
}
