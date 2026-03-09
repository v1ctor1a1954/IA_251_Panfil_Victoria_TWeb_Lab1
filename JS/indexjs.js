let movies = JSON.parse(localStorage.getItem("movies")) || [];

let grid = document.querySelector("#movieGrid");

let total = 0;
let ratingSum = 0;

movies.forEach(function(movie, index){

    if(movie.watched === "yes"){

        total++;

        ratingSum += Number(movie.rating);

        let card = document.createElement("div");
        card.classList.add("movie-card");

        card.innerHTML = `
            <div class="poster">
                <img src="${movie.image}">

                <div class="overlay">
                    <p><b>An:</b> ${movie.year}</p>
                    <p><b>Gen:</b> ${(movie.genres || []).join(", ")}</p>
                    <p><b>Tip:</b> ${movie.type}</p>
                    <p><b>Rating:</b> ⭐ ${movie.rating}/10</p>
                    <p><b>Comentariu:</b> ${movie.comment}</p>
                </div>
            </div>

            <h3>${movie.title}</h3>

            <button onclick="editComment(${index})">Editează comentariu</button>
            <button onclick="moveToWatch(${index})">Mută la De Vizionat</button>
            <button onclick="deleteMovie(${index})">Șterge film</button>
        `;

        grid.appendChild(card);
    }

});

document.querySelector("#totalMovies").textContent = total;

if(total > 0){
    document.querySelector("#avgRating").textContent = (ratingSum / total).toFixed(1);
}


function editComment(index){

    let newComment = prompt("Introdu noul comentariu:");

    if(newComment !== null){

        movies[index].comment = newComment;

        localStorage.setItem("movies", JSON.stringify(movies));

        location.reload();
    }

}


function moveToWatch(index){

    movies[index].watched = "no";

    localStorage.setItem("movies", JSON.stringify(movies));

    location.reload();

}

function deleteMovie(index) {
    if(confirm("Ești sigur că vrei să ștergi acest film?")) {
        let movies = JSON.parse(localStorage.getItem("movies")) || [];
        movies.splice(index, 1); // șterge filmul la poziția index
        localStorage.setItem("movies", JSON.stringify(movies));
        location.reload(); // reîncarcă pagina pentru a actualiza lista
    }
}