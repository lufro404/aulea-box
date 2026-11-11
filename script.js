// ===== 1. Número que sube hasta 273 =====
let n = 0;
const contador = setInterval(function () {
  n = n + 9;
  if (n >= 273) { n = 273; clearInterval(contador); }
  document.getElementById("numero").textContent = n;
}, 40);

// ===== 2. Modo oscuro y menú del móvil =====
document.getElementById("modo").addEventListener("click", function () {
  document.body.classList.toggle("oscuro");
  this.textContent = document.body.classList.contains("oscuro") ? "☀️" : "🌙";
});
const enlaces = document.getElementById("enlaces");
document.getElementById("hamburguesa").addEventListener("click", function () {
  enlaces.classList.toggle("abierto");
});
enlaces.querySelectorAll("a").forEach(function (a) {
  a.addEventListener("click", function () { enlaces.classList.remove("abierto"); });
});

// ===== 3. Aparecer al hacer scroll =====
const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add("visible"); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".aparece").forEach(function (el) { observador.observe(el); });

// ===== 4. Barra de progreso y botón de subir =====
const subir = document.getElementById("subir");
window.addEventListener("scroll", function () {
  const alto = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById("progreso").style.width = (window.scrollY / alto * 100) + "%";
  subir.classList.toggle("ver", window.scrollY > 600);
});
subir.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

// ===== 5. ¿Sabías que...? =====
const datos = [
  "En 2024 había unos 273 millones de niños y jóvenes sin escuela.",
  "Aproximadamente 1 de cada 6 niños y jóvenes en edad escolar no va a la escuela.",
  "De esos, unos 79 millones tienen edad de primaria.",
  "Desde 2017 el número de niños sin escuela sube cada año, aunque el porcentaje se mantiene en torno al 17 %.",
  "Hay más chicos fuera de la escuela (140 millones) que chicas (133 millones)."
];
let posicion = 0;
const textoDato = document.getElementById("dato");
textoDato.textContent = datos[0];
document.getElementById("otro-dato").addEventListener("click", function () {
  posicion = (posicion + 1) % datos.length;
  textoDato.textContent = datos[posicion];
});

// ===== 6. Gráfica: las barras crecen y se pueden pulsar =====
const barras = document.querySelectorAll(".barra");
function crecer() {
  barras.forEach(function (b) {
    b.querySelector("div").style.height = (b.dataset.valor / 150 * 100) + "%";
  });
}
new IntersectionObserver(function (entradas, obs) {
  if (entradas[0].isIntersecting) { crecer(); obs.disconnect(); }
}, { threshold: 0.4 }).observe(document.getElementById("grafica"));
barras.forEach(function (b) {
  b.addEventListener("click", function () {
    barras.forEach(function (x) { x.classList.remove("activa"); });
    b.classList.add("activa");
    document.getElementById("detalle").textContent = b.dataset.texto;
  });
});

// ===== 7. Móvil de la demo =====
const pantalla = document.getElementById("pantalla");
// Banco con todas las preguntas posibles, para todas las edades.
// nivel 1 = fácil, 2 = media, 3 = difícil. Cada examen elige 3 fáciles, 4 medias y 3 difíciles (10 en total).
const banco = [
  // Nivel 1: fáciles (peques)
  { nivel: 1, texto: "¿Cuántas patas tiene un perro?", opciones: ["2", "4", "6"], correcta: 1 },
  { nivel: 1, texto: "¿De qué color es el cielo en un día despejado?", opciones: ["Verde", "Rojo", "Azul"], correcta: 2 },
  { nivel: 1, texto: "¿Cuánto es 2 + 3?", opciones: ["5", "4", "6"], correcta: 0 },
  { nivel: 1, texto: "¿Qué animal hace «miau»?", opciones: ["El perro", "El gato", "La vaca"], correcta: 1 },
  { nivel: 1, texto: "¿Cuántos días tiene una semana?", opciones: ["5", "10", "7"], correcta: 2 },
  { nivel: 1, texto: "¿Qué fruta es amarilla y alargada?", opciones: ["El plátano", "La manzana", "La uva"], correcta: 0 },
  { nivel: 1, texto: "¿Con qué parte del cuerpo vemos?", opciones: ["Con las manos", "Con los ojos", "Con los pies"], correcta: 1 },
  { nivel: 1, texto: "¿Cuántos dedos tiene una mano?", opciones: ["5", "4", "10"], correcta: 0 },
  { nivel: 1, texto: "¿Qué sale por el cielo cuando llueve?", opciones: ["Nieve seca", "Agua", "Arena"], correcta: 1 },
  { nivel: 1, texto: "¿Cuál de estos es un animal?", opciones: ["Mesa", "Caballo", "Silla"], correcta: 1 },
  // Nivel 2: medias (jóvenes)
  { nivel: 2, texto: "¿Cuánto es 6 × 7?", opciones: ["36", "42", "48"], correcta: 1 },
  { nivel: 2, texto: "¿Capital de España?", opciones: ["Madrid", "Valencia", "Sevilla"], correcta: 0 },
  { nivel: 2, texto: "¿Cuántos planetas tiene el Sistema Solar?", opciones: ["7", "9", "8"], correcta: 2 },
  { nivel: 2, texto: "¿Qué gas necesitamos para respirar?", opciones: ["Dióxido de carbono", "Helio", "Oxígeno"], correcta: 2 },
  { nivel: 2, texto: "¿En qué continente está Brasil?", opciones: ["América del Sur", "Europa", "África"], correcta: 0 },
  { nivel: 2, texto: "¿Cuál es el océano más grande?", opciones: ["Atlántico", "Pacífico", "Índico"], correcta: 1 },
  { nivel: 2, texto: "¿Qué animal es un mamífero?", opciones: ["Tiburón", "Águila", "Delfín"], correcta: 2 },
  { nivel: 2, texto: "¿Cuántos lados tiene un hexágono?", opciones: ["8", "5", "6"], correcta: 2 },
  { nivel: 2, texto: "¿Qué planeta está más cerca del Sol?", opciones: ["Venus", "Marte", "Mercurio"], correcta: 2 },
  { nivel: 2, texto: "¿Con qué se hacen las páginas web?", opciones: ["Solo con Word", "Con HTML y CSS", "Con un lápiz"], correcta: 1 },
  { nivel: 2, texto: "¿Cuál es el plural de «lápiz»?", opciones: ["Lápizes", "Lápices", "Lápiz"], correcta: 1 },
  { nivel: 2, texto: "¿Qué parte de la planta absorbe el agua?", opciones: ["La flor", "La raíz", "La hoja"], correcta: 1 },
  // Nivel 3: difíciles (mayores)
  { nivel: 3, texto: "¿En qué año llegó el ser humano a la Luna por primera vez?", opciones: ["1959", "1969", "1979"], correcta: 1 },
  { nivel: 3, texto: "¿Quién escribió «Don Quijote de la Mancha»?", opciones: ["Lope de Vega", "Miguel de Cervantes", "Federico García Lorca"], correcta: 1 },
  { nivel: 3, texto: "¿Qué elemento químico tiene el símbolo «Fe»?", opciones: ["Hierro", "Flúor", "Fósforo"], correcta: 0 },
  { nivel: 3, texto: "¿Cuál es la capital de Australia?", opciones: ["Sídney", "Melbourne", "Canberra"], correcta: 2 },
  { nivel: 3, texto: "¿Cuántos huesos tiene un adulto?", opciones: ["206", "150", "300"], correcta: 0 },
  { nivel: 3, texto: "¿Qué es una dirección IP?", opciones: ["Un tipo de cable", "Un número que identifica un dispositivo en una red", "Una marca de ordenadores"], correcta: 1 },
  { nivel: 3, texto: "¿Cuál es la raíz cuadrada de 144?", opciones: ["14", "12", "16"], correcta: 1 },
  { nivel: 3, texto: "¿Qué gas, emitido al quemar combustibles fósiles, es la principal causa del cambio climático?", opciones: ["CO2", "Helio", "Nitrógeno"], correcta: 0 },
  { nivel: 3, texto: "¿Cuántos Objetivos de Desarrollo Sostenible (ODS) tiene la Agenda 2030?", opciones: ["10", "17", "25"], correcta: 1 },
  { nivel: 3, texto: "¿Quién pintó «Las Meninas»?", opciones: ["Goya", "Picasso", "Velázquez"], correcta: 2 }
];
let preguntas = [];
let actual = 0, puntos = 0;

// Mezcla una lista al azar
function mezclar(lista) {
  const copia = lista.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const aux = copia[i]; copia[i] = copia[j]; copia[j] = aux;
  }
  return copia;
}
// Elige 10 preguntas al azar (3 fáciles, 4 medias, 3 difíciles) y mezcla también sus opciones
function elegirPreguntas() {
  let ronda = [];
  [[1, 3], [2, 4], [3, 3]].forEach(function (par) {
    const delNivel = banco.filter(function (p) { return p.nivel === par[0]; });
    ronda = ronda.concat(mezclar(delNivel).slice(0, par[1]));
  });
  return ronda.map(function (p) {
    const textoCorrecto = p.opciones[p.correcta];
    const opciones = mezclar(p.opciones);
    return { nivel: p.nivel, texto: p.texto, opciones: opciones, correcta: opciones.indexOf(textoCorrecto) };
  });
}

function inicio() {
  preguntas = elegirPreguntas();
  actual = 0; puntos = 0;
  pantalla.innerHTML = '<div class="wifi">📶</div><h3>Redes Wi-Fi</h3><p>Sin internet disponible</p><button id="conectar">Conectar a "Aulea-Box"</button>';
  document.getElementById("conectar").addEventListener("click", conectando);
}
function conectando() {
  pantalla.innerHTML = '<div class="wifi">⏳</div><p>Conectando con la caja...</p>';
  setTimeout(function () {
    pantalla.innerHTML = '<div class="wifi">✅</div><h3>Conectado</h3><p>Sin internet, pero con clase.</p><button id="abrir">Abrir clase</button>';
    document.getElementById("abrir").addEventListener("click", pregunta);
  }, 1500);
}
function pregunta() {
  const p = preguntas[actual];
  const niveles = ["Fácil", "Media", "Difícil"];
  let html = "<h3>Pregunta " + (actual + 1) + " de " + preguntas.length + "</h3><p style=\"margin:0;color:#4d6275;font-size:0.85rem\">" + "⭐".repeat(p.nivel) + " " + niveles[p.nivel - 1] + "</p><p>" + p.texto + "</p>";
  p.opciones.forEach(function (o, i) { html += '<button data-i="' + i + '">' + o + "</button>"; });
  pantalla.innerHTML = html;
  pantalla.querySelectorAll("button").forEach(function (b) {
    b.addEventListener("click", function () { responder(Number(b.dataset.i)); });
  });
}
function responder(i) {
  const botones = pantalla.querySelectorAll("button");
  const p = preguntas[actual];
  if (i === p.correcta) { puntos++; botones[i].classList.add("ok"); }
  else { botones[i].classList.add("mal"); botones[p.correcta].classList.add("ok"); }
  botones.forEach(function (b) { b.disabled = true; });
  setTimeout(function () {
    actual++;
    if (actual < preguntas.length) { pregunta(); } else { final(); }
  }, 1000);
}
function final() {
  let mensaje = "¡Sigue practicando!";
  if (puntos >= preguntas.length * 0.8) { mensaje = "¡Excelente!"; }
  else if (puntos >= preguntas.length * 0.5) { mensaje = "¡Muy bien!"; }
  pantalla.innerHTML = '<div class="wifi">🎉</div><h3>¡Clase terminada!</h3><p>Has acertado ' + puntos + " de " + preguntas.length + '.</p><p><b>' + mensaje + '</b></p><button id="repetir">Volver a empezar</button>';
  document.getElementById("repetir").addEventListener("click", inicio);
}
inicio();

// ===== 8. Calculadora de modelo =====
const barra = document.getElementById("barra");
function calcular() {
  const alumnos = Number(barra.value);
  let modelo = "Aulea Box Pro", precio = 299, tarjeta = "t-pro";
  if (alumnos <= 10) { modelo = "Aulea Box Mini"; precio = 79; tarjeta = "t-mini"; }
  else if (alumnos <= 30) { modelo = "Aulea Box Plus"; precio = 149; tarjeta = "t-plus"; }
  document.getElementById("alumnos").textContent = alumnos;
  document.getElementById("modelo").textContent = modelo;
  document.getElementById("coste").textContent = "Son " + (precio / alumnos).toFixed(2).replace(".", ",") + " € por alumno";
  document.querySelectorAll(".tarjeta").forEach(function (t) { t.classList.remove("recomendada"); });
  document.getElementById(tarjeta).classList.add("recomendada");
}
barra.addEventListener("input", calcular);
calcular();

// ===== 9. Botones "Lo quiero" =====
let pedidos = 0;
function mostrarAviso(texto) {
  const aviso = document.getElementById("aviso");
  aviso.textContent = texto;
  aviso.classList.add("ver");
  setTimeout(function () { aviso.classList.remove("ver"); }, 2500);
}
document.querySelectorAll(".pedir").forEach(function (b) {
  b.addEventListener("click", function () {
    pedidos++;
    document.getElementById("pedidos").textContent = pedidos;
    mostrarAviso("Has añadido " + b.dataset.nombre + " (es una demo)");
  });
});

// ===== 10. Formulario de contacto (comprueba los campos) =====
document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("f-nombre").value.trim();
  const correo = document.getElementById("f-correo").value.trim();
  const mensaje = document.getElementById("f-mensaje").value.trim();
  const resultado = document.getElementById("resultado");
  if (nombre === "" || mensaje === "" || !correo.includes("@")) {
    resultado.style.color = "#c0392b";
    resultado.textContent = "Rellena el nombre, un correo válido y el mensaje.";
  } else {
    resultado.style.color = "#1e8a5a";
    resultado.textContent = "¡Gracias, " + nombre + "! Mensaje enviado (es una demo).";
    this.reset();
  }
});

// ===== 11. Vídeo de YouTube =====
// Pega aquí el ID de tu vídeo. Si el enlace es https://www.youtube.com/watch?v=AbC123xyz
// el ID es lo que va después de "v=" (en este ejemplo: AbC123xyz).
const ID_VIDEO = "MEWlRIdVWF8";

const marcoVideo = document.getElementById("marco-video");
if (ID_VIDEO !== "") {
  const enlaceYoutube = "https://www.youtube.com/watch?v=" + ID_VIDEO;
  document.getElementById("enlace-video").href = enlaceYoutube;
  if (location.protocol === "file:") {
    // Al abrir la web con doble clic, YouTube da el error 153 al incrustar el vídeo.
    // Por eso se muestra la miniatura con un botón de play que abre YouTube.
    marcoVideo.innerHTML = '<a class="miniatura" href="' + enlaceYoutube + '" target="_blank" rel="noopener" aria-label="Ver el vídeo en YouTube">' +
      '<img src="https://img.youtube.com/vi/' + ID_VIDEO + '/hqdefault.jpg" alt="Miniatura del vídeo"><span class="play">▶</span></a>';
  } else {
    // Cuando la web está publicada en internet, el vídeo se ve dentro de la página
    marcoVideo.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + ID_VIDEO + '" title="Vídeo sobre educación" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy"></iframe>';
  }
} else {
  marcoVideo.innerHTML = '<div class="sin-video"><span>🎬</span><b>Aquí irá el vídeo</b><small>Pon el ID de YouTube en la variable ID_VIDEO de script.js</small></div>';
}
// ===== 12. Aula interactiva =====
const textoAula = document.getElementById("aula-texto");
const puntosAula = document.querySelectorAll(".punto");
function elegirPunto(p) {
  puntosAula.forEach(function (x) { x.classList.remove("activo"); });
  p.classList.add("activo");
  textoAula.textContent = p.dataset.texto;
}
puntosAula.forEach(function (p) {
  p.addEventListener("click", function () { elegirPunto(p); });
  p.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); elegirPunto(p); }
  });
});
