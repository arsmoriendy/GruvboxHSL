window.addEventListener("load", e => {
  [... document.querySelectorAll("td")].filter(td => td.attributes["bgcolor"]).forEach(td => {
    const copyBtn = document.createElement("button");
    const color = td.innerText;
    copyBtn.setAttribute("class", "copyBtn");
    copyBtn.addEventListener("click", e => {
      console.log(color)
      navigator.clipboard.writeText(color)
    })
    copyBtn.innerText = "Copy"
    td.appendChild(copyBtn)
  })
})
