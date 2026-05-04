let movies = [];

// Incarcam filmele din movies.json via AJAX
fetch("cgi-bin/get_movies.py")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        movies = data;
        afiseazaFilme();
    });


function afiseazaFilme(){

    let grid = document.querySelector("#toWatchGrid");
    grid.innerHTML = "";

    let total = 0;

    movies.forEach(function(movie, index){

        if(movie.watched === "no"){

            total++;

            let card = document.createElement("div");
            card.classList.add("movie-card");
            card.setAttribute("id", "card-" + index);

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
}


// Marcheaza ca vazut fara reload
function markWatched(index){

    let formData = new FormData();
    formData.append("index", index);
    formData.append("value", "yes");

    fetch("cgi-bin/update_movie.py", {
        method: "POST",
        body: formData
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(data.success){
            // Scoatem cardul din pagina fara reload
            document.querySelector("#card-" + index).remove();
            movies[index].watched = "yes";

            // Actualizam contorul
            let total = parseInt(document.querySelector("#totalToWatch").textContent);
            document.querySelector("#totalToWatch").textContent = total - 1;
        }
    });
}