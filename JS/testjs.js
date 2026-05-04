function verifica(numar) {

    let raspuns = document.getElementById("ans" + numar).value.trim();
    let feedback = document.getElementById("feedback" + numar);

    if (raspuns === "") {
        feedback.innerHTML = "⚠️ Te rog introdu un răspuns!";
        feedback.className = "feedback gresit";
        return;
    }

    // Cream cererea AJAX
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "check_answer.php?intrebare=" + numar + "&raspuns=" + encodeURIComponent(raspuns), true);

    xhr.onload = function() {
        if (xhr.status === 200) {

            let rezultat = JSON.parse(xhr.responseText);

            if (rezultat.corect) {
                feedback.innerHTML = "✅ Corect! " + rezultat.explicatie;
                feedback.className = "feedback corect";
            } else {
                feedback.innerHTML = "❌ Greșit! " + rezultat.explicatie;
                feedback.className = "feedback gresit";
            }
        }
    };

    xhr.send();
}
