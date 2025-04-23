const apiKey = "30095435d613bb02d0764dbd0bf0ecf3";

async function displayMovie() {
    const query = localStorage.getItem("movieQuery");
    const resultDiv = document.getElementById("result");

    if (!query) {
        resultDiv.innerHTML = "<p>No search term found.</p>";
        return;
    }

    const searchRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
    const searchData = await searchRes.json();
    const movie = searchData.results[0];

    if (!movie) {
        resultDiv.innerHTML = `<p>No results found for "${query}".</p>`;
        return;
    }

    const movieId = movie.id;
    const detailsRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`);

    const details = await detailsRes.json();
    const credits = await creditsRes.json();

    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const cast = credits.cast.slice(0, 3).map(actor => actor.name).join(", ");
    const director = credits.crew.find(person => person.job === "Director")?.name || "Unknown";
    const rating = details.vote_average;

    resultDiv.innerHTML = `
        <h2>${movie.title} (${movie.release_date.slice(0, 4)})</h2>
        <img src="${posterUrl}" alt="${movie.title}" style="width: 300px; border-radius: 10px;">
        <p><strong>Director:</strong> ${director}</p>
        <p><strong>Cast:</strong> ${cast}</p>
        <p><strong>Rating:</strong> <span class="rating-bar"><span style="width:${rating * 10}%;">${rating}</span></span></p>
        <p><strong>Ladder Line:</strong> "${details.tagline || 'No tagline available.'}"</p>
        <br><button onclick="history.back()">🔙 Back</button>
    `;
}

displayMovie();