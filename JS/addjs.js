let form = document.querySelector("form");

form.addEventListener("submit", function(e){
    e.preventDefault();
    // --- Validare JavaScript (sarcina suplimentara) ---

    let title = document.querySelector('input[name="title"]').value.trim();
    let year = document.querySelector('input[name="year"]').value;
    let rating = document.querySelector('input[name="rating"]').value;
    let genres = document.querySelectorAll('input[name="genre"]:checked');

    if(title === ""){
        alert("Te rog introdu titlul filmului!");
        e.preventDefault();
        return;
    }

    if(year === "" || year < 1900 || year > 2026){
        alert("Te rog introdu un an valid (1900 - 2026)!");
        e.preventDefault();
        return;
    }

    if(rating === "" || rating < 1 || rating > 10){
        alert("Te rog introdu un rating intre 1 si 10!");
        e.preventDefault();
        return;
    }

    if(genres.length === 0){
        alert("Te rog selecteaza cel putin un gen!");
        e.preventDefault();
        return;
    }

    // --- Salvare si in localStorage (ca inainte) ---

    let movies = JSON.parse(localStorage.getItem("movies")) || [];

    let image = document.querySelector('input[name="image"]').value;
    let genreList = [];
    genres.forEach(function(g){
        genreList.push(g.value);
    });
    let type = document.querySelector("select").value;
    let comment = document.querySelector("textarea").value;
    let watched = document.querySelector('input[name="watched"]:checked').value;

    let movie = {
        title: title,
        image: image,
        year: year,
        genres: genreList,
        type: type,
        rating: rating,
        comment: comment,
        watched: watched
    };

    movies.push(movie);
    localStorage.setItem("movies", JSON.stringify(movies));
    let formData = new FormData();
formData.append("title", movie.title);
formData.append("image", movie.image);
formData.append("year", movie.year);
movie.genres.forEach(function(g){
    formData.append("genre", g);
});
formData.append("type", movie.type);
formData.append("rating", movie.rating);
formData.append("comment", movie.comment);
formData.append("watched", movie.watched);

fetch("cgi-bin/save_movie.py", {
    method: "POST",
    body: formData
}).then(function(){
    alert("Filmul a fost adăugat!");
    form.reset();
});
})