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


