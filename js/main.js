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
  const encuesta = document.getElementById("opciones-encuesta");
  encuesta.innerHTML = "";

  const votoGuardado = localStorage.getItem("voto");

  personajes.forEach(p => {
    const btn = document.createElement("button");
    btn.textContent = p.nombre;

    if (votoGuardado === p.nombre) {
      btn.textContent = `✔️ Votaste por ${p.nombre}`;
      btn.disabled = true;
      btn.classList.add("votado");
    }

    btn.addEventListener("click", () => {
      localStorage.setItem("voto", p.nombre);
      // Desactivar todos los botones
      Array.from(encuesta.children).forEach(b => {
        b.disabled = true;
        b.classList.remove("votado");
      });
      btn.textContent = `✔️ Votaste por ${p.nombre}`;
      btn.classList.add("votado");
    });

    encuesta.appendChild(btn);
  });
}


// Inicializar todo
mostrarPersonajes(personajes);
cargarEncuesta();
