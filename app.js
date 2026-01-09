function actualizarReloj() {
    const ahora = new Date();
    document.getElementById('reloj').innerText = ahora.toLocaleTimeString('es-ES', { hour12: true });
    document.getElementById('fecha').innerText = ahora.toLocaleDateString('es-ES', { 
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
    });
}

async function cargarAnimeLatino() {
    const contenedor = document.getElementById('anime-news');
    try {
        const res = await fetch('https://api.jikan.moe/v4/seasons/now?limit=15');
        const json = await res.json();
        contenedor.innerHTML = "";

        json.data.filter(a => a.score > 7).forEach(anime => {
            const item = document.createElement('div');
            item.className = 'anime-item';
            item.innerHTML = `
                <img src="${anime.images.jpg.image_url}" alt="poster">
                <div class="anime-info">
                    <h4>${anime.title}</h4>
                    <span>🇲🇽 Audio Latino</span>
                </div>
            `;
            item.onclick = () => window.open(`https://www.google.com/search?q=${encodeURIComponent(anime.title + " audio latino")}`, '_blank');
            contenedor.appendChild(item);
        });
    } catch (e) {
        contenedor.innerHTML = "<p>Cargando datos...</p>";
    }
}

document.getElementById('fullscreen-btn').onclick = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
};

setInterval(actualizarReloj, 1000);
actualizarReloj();
cargarAnimeLatino();