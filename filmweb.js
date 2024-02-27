let card=document.getElementById("main")
let button1=document.getElementById("btn1")
let button2=document.getElementById("btn2")
function GetCards(){
    fetch(`https://api.tvmaze.com/shows`)
    .then(response=>response.json())
    .then((datas)=>{
        datas.forEach(data => {
            card.innerHTML+=`       <div class="col-3">
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
        });
    })
} 
GetCards()


let Form=document.getElementById("form");
let SearchInput=document.getElementById("searchInput");
let formParent=document.getElementById("navbarSupportedContent")
let InfoInput=document.getElementById("info-input")
let searchresult=document.getElementById("searchResults")

Form.addEventListener("submit",ShowCard)
Form.addEventListener("keyup",ShowCard)

SearchInput.addEventListener("keyup",KeyExtention)
let count=0;
function KeyExtention(){
  const inputValue=SearchInput.value.trim()
  count++
  // console.log(count);
  if(count<=3){
    InfoInput.setAttribute("style","display : block")  
  }else{
    InfoInput.setAttribute("style","display : none")  
  }
  if(inputValue==""){
    count=0
  }
}

function ShowCard(e){
  e.preventDefault()
  const inputValue=SearchInput.value.trim().toLowerCase()
  fetch(`https://api.tvmaze.com/shows`)
    .then(response=>response.json())
    .then((datas)=>{
      card.innerHTML=""
        datas.forEach(data => {
          if(data.name.toLowerCase().trim().includes(inputValue)){
            card.innerHTML+=`       <div class="col-3">
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
          }else{
            card.innerHTML=`<p style="color: red; margin-top: 200px">the size of the entered value must be greater than 3</p>`
          }          
          inputValue.textContent=""
        });
    })
    
}
