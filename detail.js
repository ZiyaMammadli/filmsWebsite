let card=document.getElementById("card")
const id=new URLSearchParams(window.location.search).get('detailsId');
console.log(id);
Getdata(id)
function Getdata(Id){
    fetch(`https://api.tvmaze.com/shows/${Id}`)
    .then(response=>response.json())
    .then((value)=>{
            card.innerHTML=`<div class="card mb-3" style="max-width: 1300px;   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);padding:50px">
                                <div class="row g-0">
                                    <div class="col-md-4" style="max-width: 500px; display:flex ; justify-content: center; ">
                                        <img src="${value.image.original}" class="img-fluid rounded-start" alt="Sekil tapilmadi"style="width: 390px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h2 class="card-title">${value.name}</h2>
                                            <p class="card-text">${value.summary}</p>
                                            <ul>
                                                <li>    
                                                <b>IMDB Point: </b>${value.rating.average}
                                                </li>
                                                <li>
                                                <b>Language: </b>${value.language}
                                                </li>
                                                <li>
                                                <b>Genre: </b>${value.genres}
                                                </li>
                                                <li>
                                                <b>Premiered: </b>${value.premiered}
                                                </li>
                                                <li>
                                                <b>Ended: </b>${value.ended}
                                                </li>
                                            </ul>
                                            <button class="btn btn-outline-success" type="submit" id="btn1" style="border: 0px;background-color: #E70202">
                                            <a href="${value.officialSite}"style="text-decoration: none; color: white;">Go to website</a>
                                            </button>
                                            <button class="btn btn-outline-success" type="submit" id="btn2" style="border: 0px;background-color: #009B2D">
                                            <a href="http://127.0.0.1:5500/filmweb.html"style="text-decoration: none; color: white;">Go back</a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
        });
    
}
