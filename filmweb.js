let card = document.getElementById("main")
let button1 = document.getElementById("btn1")
let button2 = document.getElementById("btn2")

let productData = [];
let itemsPerPage=20;
let currentPage=1;

async function GetCards() {
  await fetch(`https://api.tvmaze.com/shows`)
    .then(response => response.json())
    .then((datas) => {
      productData = datas;
    })
}

async function dataTable() {
  await GetCards()

  const pages=[];
  for(let i=0;i<= Math.ceil(productData.length / itemsPerPage); i++){
    pages.push(i)
  } 

  const indexOfLastPage= currentPage * itemsPerPage;
  const indexOfFisrtPage=indexOfLastPage-itemsPerPage;
  const currentItems=productData.slice(indexOfFisrtPage,indexOfLastPage);

  card.innerHTML = currentItems.map(data =>
    `       <div class="col-md-3"style="display: flex;flex-wrap:wrap">
            <div class="card" style="width: 18rem; margin-top: 80px; height: 700px;   box-shadow: 10px 10px 5px lightgrey;">
                <img src="${data.image.medium}" class="card-img-top" alt="Sekil tapilmadi">
                <div class="card-body">
                  <h4 class="card-title"style="  color: #110A63;text-shadow: 2px 2px 4px grey;">${data["name"]}</h4>
                  <p class="card-text">Premiere: ${data["premiered"]}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">IMDB Rating: ${data.rating.average}</li>
                  <li class="list-group-item">Genre: ${data.genres}</li>
                  <li class="list-group-item">Language: ${data["language"]}</li>
                </ul>
                <div class="col-sm card-body" style="display: flex;justify-content: space-between; flex-wrap: wrap">
                <button class="btn btn-outline-success" id="btn1" type="submit"style="border: 0px;background-color: #D30000">
                                <a href="${data["officialSite"]}" style="text-decoration: none; color: white;">Go to website</a>
                </button>
                <button class="btn btn-outline-success" id="btn2" type="submit" style="border: 0px;background-color: #018417">
                                <a href="detail.html?detailsId=${data.id}" style="text-decoration: none; color: white;">Go to Detail</a>
                </button>
                </div>
              </div>
        </div>`
  ).join("")
}
dataTable()

const prevButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const pageNumberValue = document.querySelector("#page-number")
pageNumberValue.value=1;
function prevBTN(){
  if((currentPage-1)*itemsPerPage){
    currentPage--;
    pageNumberValue.value=currentPage;
    dataTable();
  }
}

function nextBTN(){
  if((currentPage*itemsPerPage)/productData.length){
    currentPage++;
    pageNumberValue.value=currentPage;
    dataTable()
  }
}

prevButton.addEventListener("click",prevBTN,false)
nextButton.addEventListener("click",nextBTN,false)

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
            <div class="card" style="width: 18rem; margin-top: 80px; height: 720px; box-shadow: 10px 10px 5px lightgrey;">
                <img src="${data.image.medium}" class="card-img-top" alt="Sekil tapilmadi">
                <div class="card-body">
                  <h5 class="card-title"style="  color: #110A63;text-shadow: 2px 2px 4px grey;">${data["name"]}</h5>
                  <p class="card-text">Premiere: ${data["premiered"]}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">IMDB Rating: ${data.rating.average}</li>
                  <li class="list-group-item">Genre: ${data.genres}</li>
                  <li class="list-group-item">Language: ${data["language"]}</li>
                </ul>
                <div class="card-body" style="display: flex;justify-content: space-between">
                <button class="btn btn-outline-success" id="btn1" type="submit"style="border: 0px;background-color: #E70202">
                                <a href="${data["officialSite"]}" style="text-decoration: none; color: white;">Go to website</a>
                </button>
                <button class="btn btn-outline-success" id="btn2" type="submit" style="border: 0px;background-color: #009B2D">
                                <a href="detail.html?detailsId=${data.id}" style="text-decoration: none; color: white;">Go to Detail</a>
                </button>
                </div>
              </div>
        </div>`
        }
       
      });
      inputValue.length=0;
    })

}


