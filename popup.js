chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Received request in content JS:", request);
  const resultContainer = document.getElementById("result-container");
  // delete all children of resultContainer
  if (resultContainer) {
    while (resultContainer.firstChild) {
      resultContainer.removeChild(resultContainer.firstChild);
    }
  }
  // change opacity of resultContainer to 1
  resultContainer.style.opacity = 1;
  // hide spinner-get by id
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
  // update text on element id status-subtext to "Analysis Complete"
  const statusSubtext = document.getElementById("status-subtext");
  statusSubtext.innerText = "Analysis Complete";
  const h1 = document.createElement("h1");
  h1.innerText = request.isOffensive
    ? "The text is unsafe"
    : "The text is safe";
  resultContainer.appendChild(h1);

  const ul = document.createElement("ul");
  request.reasons.forEach((reason) => {
    const li = document.createElement("li");
    li.innerText = reason;
    ul.appendChild(li);
  });
  resultContainer.appendChild(ul);

  if (request?.multiClass) {
    // add p tag to show multi class result
    const p = document.createElement("p");
    p.innerText = request.multiClass;
    resultContainer.appendChild(p);
  }
  console.log("DONE");

  sendResponse({ isOffensive: request.isOffensive, reasons: request.reasons });
});
