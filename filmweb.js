let card = document.getElementById("main")
let button1 = document.getElementById("btn1")
let button2 = document.getElementById("btn2")

let productData = [];
let itemsPerPage=12;
let currentPage=1;

async function GetCards() {
  await fetch(`https://api.tvmaze.com/shows`)
    .then(response => response.json())
    .then((datas) => {
      productData = datas;
      // datas.forEach(data => {
      //   card.innerHTML += `       <div class="col-3">
      //       <div class="card" style="width: 18rem; margin-top: 100px;">
      //           <img src="${data.image.medium}" class="card-img-top" alt="Sekil tapilmadi">
      //           <div class="card-body">
      //             <h5 class="card-title">${data["name"]}</h5>
      //             <p class="card-text">Premiere: ${data["premiered"]}</p>
      //           </div>
      //           <ul class="list-group list-group-flush">
      //             <li class="list-group-item">IMDB Rating: ${data.rating.average}</li>
      //             <li class="list-group-item">Genre: ${data.genres}</li>
      //             <li class="list-group-item">Language: ${data["language"]}</li>
      //           </ul>
      //           <div class="card-body" style="display: flex;justify-content: space-between">
      //           <button class="btn btn-outline-success" id="btn1" type="submit"style="background-color: #DBDCDA;">
      //                           <a href="${data["officialSite"]}" style="text-decoration: none; color: black;">Go to website</a>
      //           </button>
      //           <button class="btn btn-outline-success" id="btn2" type="submit" style="background-color: #DBDCDA;">
      //                           <a href="detail.html?detailsId=${data.id}" style="text-decoration: none; color: black;">Go to Detail</a>
      //           </button>
      //           </div>
      //         </div>
      //   </div>`
      // });
    })
}

async function dataTable() {
  await GetCards()
  console.log(productData);

  const pages=[];
  for(let i=0;i<= Math.ceil(productData.length / itemsPerPage); i++){
    pages.push(i)
  }

  const indexOfLastPage= currentPage * itemsPerPage;
  const indexOfFisrtPage=indexOfLastPage-itemsPerPage;
  const currentItems=productData.slice(indexOfFisrtPage,indexOfLastPage);

  card.innerHTML = currentItems.map(data =>
    `       <div class="col-3">
            <div class="card" style="width: 18rem; margin-top: 100px;">
                <img src="${data.image.medium}" class="card-img-top" alt="Sekil tapilmadi">
                <div class="card-body">
                  <h5 class="card-title">${data["name"]}</h5>
                  <p class="card-text">Premiere: ${data["premiered"]}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">IMDB Rating: ${data.rating.average}</li>
                  <li class="list-group-item">Genre: ${data.genres}</li>
                  <li class="list-group-item">Language: ${data["language"]}</li>
                </ul>
                <div class="card-body" style="display: flex;justify-content: space-between">
                <button class="btn btn-outline-success" id="btn1" type="submit"style="background-color: #DBDCDA;">
                                <a href="${data["officialSite"]}" style="text-decoration: none; color: black;">Go to website</a>
                </button>
                <button class="btn btn-outline-success" id="btn2" type="submit" style="background-color: #DBDCDA;">
                                <a href="detail.html?detailsId=${data.id}" style="text-decoration: none; color: black;">Go to Detail</a>
                </button>
                </div>
              </div>
        </div>`
  ).join("")
}
dataTable()


let Form = document.getElementById("form");
let SearchInput = document.getElementById("searchInput");
let formParent = document.getElementById("navbarSupportedContent")
let InfoInput = document.getElementById("info-input")
let searchresult = document.getElementById("searchResults")

Form.addEventListener("submit", ShowCard)
Form.addEventListener("keyup", ShowCard)

SearchInput.addEventListener("keyup", KeyExtention)
function KeyExtention() {

  const inputValue = SearchInput.value.trim().toLowerCase()
  console.log(inputValue.length);
  if (inputValue.length < 3 && inputValue.length > 0) {
    InfoInput.setAttribute("style", "display : block; color: #F51414; margin-bottom: 0")
  } else if (inputValue.length == 0 || inputValue.length > 2) {
    InfoInput.setAttribute("style", "display : none")
  }
}


function ShowCard(e) {
  e.preventDefault()
  const inputValue = SearchInput.value.trim().toLowerCase()
  fetch(`https://api.tvmaze.com/shows`)
    .then(response => response.json())
    .then((datas) => {
      card.innerHTML = "";
      datas.forEach(data => {
        if (data.name.toLowerCase().trim().includes(inputValue) && inputValue.length >= 3) {
          card.innerHTML += `       <div class="col-3" style="height: 100%">
            <div class="card" style="width: 18rem; margin-top: 100px;">
                <img src="${data.image.medium}" class="card-img-top" alt="Sekil tapilmadi">
                <div class="card-body">
                  <h5 class="card-title">${data["name"]}</h5>
                  <p class="card-text">Premiere: ${data["premiered"]}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">IMDB Rating: ${data.rating.average}</li>
                  <li class="list-group-item">Genre: ${data.genres}</li>
                  <li class="list-group-item">Language: ${data["language"]}</li>
                </ul>
                <div class="card-body" style="display: flex;justify-content: space-between">
                <button class="btn btn-outline-success" id="btn1" type="submit"style="background-color: #DBDCDA;">
                                <a href="${data["officialSite"]}" style="text-decoration: none; color: black;">Go to website</a>
                </button>
                <button class="btn btn-outline-success" id="btn2" type="submit" style="background-color: #DBDCDA;">
                                <a href="detail.html?detailsId=${data.id}" style="text-decoration: none; color: black;">Go to Detail</a>
                </button>
                </div>
              </div>
        </div>`
        }
        inputValue.textContent = ""
      });
    })

}

const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const pageNumberValue = document.querySelector("#page-number")
let startIndex = 0;
let endIndex = 10;
let pageNumber = 0;

pageNumberValue.value = pageNumber
prevButton.addEventListener("click", () => {
  if (endIndex < 20) {
    startIndex = 0;
    endIndex = 10;
  } else {
    startIndex -= 10;
    endIndex -= 10;
    pageNumber -= 1;
  }
  pageNumberValue.value = pageNumber;
  mapData();
}); 