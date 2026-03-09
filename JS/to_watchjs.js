let movies = JSON.parse(localStorage.getItem("movies")) || [];

let grid = document.querySelector("#toWatchGrid");

let total = 0;

movies.forEach(function(movie, index){

    if(movie.watched === "no"){

        total++;

        let card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <div class="poster">
                 <img src="${movie.image}">

                <div class="overlay">
                     <p><b>An:</b> ${movie.year}</p>
                     <p><b>Gen:</b> ${(movie.genres || []).join(", ")}</p>
                     <p><b>Tip:</b> ${movie.type}</p>
                    <p><b>Comentariu:</b> ${movie.comment}</p>
                </div>
            </div>

            <h3>${movie.title}</h3>

             <button onclick="markWatched(${index})">Am văzut filmul</button>
            `;

        grid.appendChild(card);
    }

});

document.querySelector("#totalToWatch").textContent = total;


function markWatched(index){

    movies[index].watched = "yes";

    localStorage.setItem("movies", JSON.stringify(movies));

    location.reload();

}
