window.addEventListener("load", e => {
  [... document.querySelectorAll("td")].filter(td => td.attributes["bgcolor"]).forEach(td => {
    const color = td.innerText;

    const copyBtn = document.createElement("button");
    copyBtn.setAttribute("class", "copyBtn");
    copyBtn.addEventListener("click", e => {
      navigator.clipboard.writeText(color)
    })
    copyBtn.innerText = "Copy"
    td.appendChild(copyBtn)
  })
})
