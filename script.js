function searchMovie() {
    const query = document.getElementById("movieInput").value.trim();
    if (query) {
        localStorage.setItem("movieQuery", query);
        window.location.href = "result.html";
    }
}

async function suggestMovies() {
    const query = document.getElementById("movieInput").value.trim();
    if (!query) return;

    const apiKey = "30095435d613bb02d0764dbd0bf0ecf3";
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
    const data = await res.json();
    
    const datalist = document.getElementById("suggestions");
    datalist.innerHTML = "";
    data.results.slice(0, 5).forEach(movie => {
        const option = document.createElement("option");
        option.value = movie.title;
        datalist.appendChild(option);
    });
}
