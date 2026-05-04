let movies = [];

fetch("cgi-bin/get_movies.py")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        movies = data;
        afiseazaFilme();

        document.querySelector("#searchInput").addEventListener("input", filtreaza);
        document.querySelector("#filterGen").addEventListener("change", filtreaza);
        document.querySelector("#filterTip").addEventListener("change", filtreaza);
    });


function afiseazaFilme(){

    let grid = document.querySelector("#movieGrid");
    grid.innerHTML = "";

    let total = 0;
    let ratingSum = 0;

    movies.forEach(function(movie, index){

        if(movie.watched === "yes"){

            total++;
            ratingSum += Number(movie.rating);

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
}


function deleteMovie(index){
    if(confirm("Ești sigur că vrei să ștergi acest film?")){

        let formData = new FormData();
        formData.append("index", index);

        fetch("cgi-bin/delete_movie.py", {
            method: "POST",
            body: formData
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            if(data.success){
                document.querySelector("#card-" + index).remove();
                movies.splice(index, 1);
            }
        });
    }
}


function editComment(index){
    let newComment = prompt("Introdu noul comentariu:");

    if(newComment !== null){

        let formData = new FormData();
        formData.append("index", index);
        formData.append("comment", newComment);

        fetch("cgi-bin/edit_comment.py", {
            method: "POST",
            body: formData
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            if(data.success){
                movies[index].comment = newComment;
                afiseazaFilme();
            }
        });
    }
}


function moveToWatch(index){
    let formData = new FormData();
    formData.append("index", index);
    formData.append("value", "no");

    fetch("cgi-bin/update_movie.py", {
        method: "POST",
        body: formData
    })
    .then(function(){
        movies[index].watched = "no";
        afiseazaFilme();
    });
}


function filtreaza(){
    let search = document.querySelector("#searchInput").value.toLowerCase();
    let gen    = document.querySelector("#filterGen").value;
    let tip    = document.querySelector("#filterTip").value;

    movies.forEach(function(movie, index){
        let card = document.querySelector("#card-" + index);
        if(!card) return;

        let potrivitTitlu = movie.title.toLowerCase().includes(search);
        let potrivitGen   = gen === "" || (movie.genres || []).includes(gen);
        let potrivitTip   = tip === "" || movie.type === tip;

        if(potrivitTitlu && potrivitGen && potrivitTip){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}