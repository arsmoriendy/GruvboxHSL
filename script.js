window.addEventListener("load", e => {
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
