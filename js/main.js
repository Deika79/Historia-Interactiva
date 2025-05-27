const contenedor = document.getElementById("contenedor-personajes");
const modal = document.getElementById("modal");
const modalContenido = document.getElementById("detalle-personaje");
const botonesFiltro = document.querySelectorAll(".filtros button");
const encuesta = document.getElementById("opciones-encuesta");

// 1. Renderizar tarjetas
function mostrarPersonajes(lista) {
  contenedor.innerHTML = "";
  lista.forEach(personaje => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.innerHTML = `
      <img src="${personaje.imagen}" alt="${personaje.nombre}" />
      <h3>${personaje.nombre}</h3>
      <p>${personaje.epoca}</p>
    `;
    tarjeta.addEventListener("click", () => mostrarModal(personaje));
    contenedor.appendChild(tarjeta);
  });
}

// 2. Modal de detalle
function mostrarModal(personaje) {
  modal.classList.remove("oculto");
  modalContenido.innerHTML = `
    <h2>${personaje.nombre}</h2>
    <p><strong>Época:</strong> ${personaje.epoca}</p>
    <p><strong>Frase:</strong> "${personaje.frase}"</p>
    <p><strong>Logros:</strong></p>
    <ul>
      ${personaje.logros.map(logro => `<li>${logro}</li>`).join("")}
    </ul>
    <p><strong>Nacimiento:</strong> ${personaje.nacimiento}</p>
    <p><strong>Muerte:</strong> ${personaje.muerte}</p>
  `;
}

document.querySelector(".cerrar").addEventListener("click", () => {
  modal.classList.add("oculto");
});

// 3. Filtros por época
botonesFiltro.forEach(boton => {
  boton.addEventListener("click", () => {
    botonesFiltro.forEach(b => b.classList.remove("activo"));
    boton.classList.add("activo");
    const filtro = boton.dataset.filtro;
    if (filtro === "todos") {
      mostrarPersonajes(personajes);
    } else {
      const filtrados = personajes.filter(p => p.epoca === filtro);
      mostrarPersonajes(filtrados);
    }
  });
});

// 4. Encuesta final
function cargarEncuesta() {
  encuesta.innerHTML = "";
  personajes.forEach(p => {
    const btn = document.createElement("button");
    btn.textContent = p.nombre;
    btn.addEventListener("click", () => {
      localStorage.setItem("voto", p.nombre);
      btn.textContent = `✔️ Votaste por ${p.nombre}`;
      btn.disabled = true;
    });
    encuesta.appendChild(btn);
  });

  // Marcar si ya votó
  const votoGuardado = localStorage.getItem("voto");
  if (votoGuardado) {
    Array.from(encuesta.children).forEach(btn => {
      if (btn.textContent === votoGuardado) {
        btn.textContent = `✔️ Votaste por ${votoGuardado}`;
        btn.disabled = true;
      }
    });
  }
}

// Inicializar todo
mostrarPersonajes(personajes);
cargarEncuesta();
