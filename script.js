// let dictionaryUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

// let fetchButton = document.getElementById("fetch-btn");
let mainContent = document.querySelector("#main-content");
let meaning = document.querySelector("#meaning");
function getMeaning() {
  let inputWord = document.getElementById("inputWord");
  let word = inputWord.value;
  mainContent.innerHTML = "";
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => {
      if (res.ok) {
        return res;
      } else {
        console.log("error");
      }
    })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((data) => {
        console.log(data);
        console.log(data.word);
        let cardElement = document.createElement("div");
        cardElement.setAttribute("class", "card my-2 p-2");
        mainContent.append(cardElement);
        cardElement.innerHTML += `<div class="row">
          <h3 class="row-col-4 ">${data.word}</h3>
          <span class="row-col-4  "> ${data.phonetic}</span>
          <a href=${data.sourceUrls}>${data.sourceUrls}</a>
          </div>`;

        data.meanings.forEach((meanings) => {
          cardElement.innerHTML += `<h5 class="row-col-4 ">${meanings.partOfSpeech}  </h5>`;

          meanings.definitions.forEach((definition, idx) => {
            cardElement.innerHTML += `<div class="row  "><span class="col-sm-2">Definition ${
              idx + 1
            } :</span><span class="col-sm-9"> ${
              definition.definition
            }</span></div>`;
            definition.example
              ? (cardElement.innerHTML += `<div class="row"><span class="col-2">Example :</span><span class="col-8"> ${definition.example}</span></div>`)
              : null;
          });
          console.log(meanings.synonyms);
        });
      });
    })
    .catch((err) => console.log(err));
}
