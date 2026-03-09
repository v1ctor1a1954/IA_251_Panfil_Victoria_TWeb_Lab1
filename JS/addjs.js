let form = document.querySelector("form");

form.addEventListener("submit", function(e){

    e.preventDefault();

    let movies = JSON.parse(localStorage.getItem("movies")) || [];

    let title = document.querySelector('input[type="text"]').value;
    let image = document.querySelector('input[type="url"]').value;
    let year = document.querySelector('input[placeholder="An apariție"]').value;
    let genres = [];

        document.querySelectorAll('input[name="genre"]:checked').forEach(function(g){
            genres.push(g.value);
        });
    let type = document.querySelector("select").value;
    let rating = document.querySelector('input[min="1"]').value;
    let comment = document.querySelector("textarea").value;

    let watched = document.querySelector('input[name="watched"]:checked').value;

    let movie = {
        title: title,
        image: image,
        year: year,
        genres: genres,
        type: type,
        rating: rating,
        comment: comment,
        watched: watched
    };
    
    movies.push(movie);

    localStorage.setItem("movies", JSON.stringify(movies));

    alert("Filmul a fost adăugat!");

    form.reset();
});