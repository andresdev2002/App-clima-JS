//Conectando html con js
const input = document.getElementById('ciudadInput');
const btn = document.getElementById('buscarBtn');
const resultado = document.getElementById('resultado');

const API_KEY = 'f8d7b0b6e40cc4db1919ff1c15b1aa86';
//Función para normalizar las tildes
function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function buscarClima(){
    const ciudad = input.value;
    if(ciudad == ""){
        alert("Escribe una ciudad")
        return;
    }
        // Mostrar "Cargando..."
    resultado.innerHTML = '<p>🔄 Cargando...</p>';
    // Normalizar ciudad (quitar tildes)
    const ciudadNormalizada = normalizarTexto(ciudad);
    
    // URL de la API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadNormalizada}&appid=${API_KEY}&units=metric&lang=es`;
    
    // Llamar API con fetch
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Ver qué trae la API
            mostrarClima(data);
        })
        .catch(error => {
            resultado.innerHTML = '<p>❌ Error: Ciudad no encontrada</p>';
            console.error(error);
        });
}
btn.addEventListener('click', buscarClima);

function mostrarClima(data) {
    // Extraer datos
    const ciudad = data.name;
    const temperatura = Math.round(data.main.temp);
    const descripcion = data.weather[0].description;
    const icono = data.weather[0].icon;
    
    // Mostrar en HTML
    resultado.innerHTML = `
        <div class="clima-info">
            <h2>${ciudad}</h2>
            <img src="https://openweathermap.org/img/wn/${icono}@2x.png" alt="icono">
            <h1>${temperatura}°C</h1>
            <p>${descripcion}</p>
        </div>
    `;
}

input.addEventListener('keypress', function(evento) {
    if (evento.key === 'Enter') {
        buscarClima();
    }
});