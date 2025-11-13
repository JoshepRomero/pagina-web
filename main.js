document.addEventListener('DOMContentLoaded', () => {
  const infoArriba     = document.querySelector('.informacion-arriba');
  const infoAbajo      = document.querySelector('.informacion-abajo');
  const botonInicio    = document.getElementById('boton-inicio');
  const botonesMenu    = document.querySelectorAll('.menu-boton');
  const muñeco = document.getElementById('muñequito-registro');
  const overlay = document.getElementById('overlay-registro');

if (muñeco && overlay) {
  muñeco.addEventListener('click', () => {
    overlay.classList.remove('hidden');
  });
}


  const secciones = ['combos', 'promociones', 'panes', 'bebidas'];

  const ocultarTodas = () => {
    secciones.forEach(sec => {
      const div = document.querySelector(`.${sec}`);
      if (div) div.style.display = 'none';
    });
  };

  const mostrarSeccion = (sec) => {
    const div = document.querySelector(`.${sec}`);
    if (div) div.style.display = 'block';
  };

  botonesMenu.forEach(boton => {
    boton.addEventListener('click', () => {
      const destino = boton.dataset.seccion;

      // Remover clase activa de todos los botones
      botonesMenu.forEach(b => b.classList.remove('activo-menu'));
      // Agregar clase activa al botón clickeado
      boton.classList.add('activo-menu');

      ocultarTodas();
      mostrarSeccion(destino); 

      infoArriba.style.display = 'none';
      infoAbajo.style.display  = 'none';
    });
  });

  botonInicio.addEventListener('click', () => {
    // Remover clase activa de TODOS los botones del menú
    botonesMenu.forEach(b => b.classList.remove('activo-menu'));
    
    ocultarTodas();
    infoArriba.style.display = 'block';
    infoAbajo.style.display  = 'block';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const carrusel = document.querySelector('.promo-carousel');
  const descripcionBox = document.getElementById('descripcion-promocion');

  carrusel.addEventListener('click', e => {
    const card = e.target.closest('.promo-card');
    if (!card || card.classList.contains('activo')) return;

    const cards = [...carrusel.children];
    const i = cards.indexOf(card);

    let nuevo;
    if (i === 0) nuevo = [cards[2], cards[0], cards[1]];
    else if (i === 2) nuevo = [cards[1], cards[2], cards[0]];
    else return;

    carrusel.innerHTML = '';
    nuevo.forEach((el, idx) => {
      el.classList.toggle('activo', idx === 1);
      carrusel.appendChild(el);
    });

    // actualizar descripción
    descripcionBox.innerHTML = `
      <h3>${nuevo[1].dataset.titulo}</h3>
      <p>${nuevo[1].dataset.detalle}</p>
    `;
  });

  // 👉 Aquí agregas la función dentro del mismo bloque:
  function reordenarInicial() {
    const cards = [...carrusel.children];
    const activa = cards.find(c => c.classList.contains('activo'));
    if (!activa) return;

    const index = cards.indexOf(activa);
    if (index === 1) return; // ya está bien

    let nuevo;
    if (index === 0) nuevo = [cards[2], cards[0], cards[1]];
    else if (index === 2) nuevo = [cards[1], cards[2], cards[0]];

    carrusel.innerHTML = '';
    nuevo.forEach((c, i) => {
      c.classList.toggle('activo', i === 1);
      carrusel.appendChild(c);
    });

    descripcionBox.innerHTML = `
      <h3>${nuevo[1].dataset.titulo}</h3>
      <p>${nuevo[1].dataset.detalle}</p>
    `;
  }

  // 👉 Y aquí la llamas al final del DOMContentLoaded:
  reordenarInicial();
});

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input-busqueda');
  const sugerencias = document.getElementById('sugerencias');

  const secciones = [
    { nombre: 'Combos', clase: 'combos' },
    { nombre: 'Promociones', clase: 'promociones' },
    { nombre: 'Panes', clase: 'panes' },
    { nombre: 'Bebidas', clase: 'bebidas' },
    { nombre: 'Información', clase: 'informacion-arriba' }
  ];

  input.addEventListener('input', () => {
    const valor = input.value.toLowerCase().trim();
    sugerencias.innerHTML = '';

    if (valor === '') {
      sugerencias.style.display = 'none';
      return;
    }

    const coincidencias = secciones.filter(s =>
      s.nombre.toLowerCase().includes(valor)
    );

    if (coincidencias.length === 0) {
      sugerencias.style.display = 'none';
      return;
    }

    coincidencias.forEach(seccion => {
      const li = document.createElement('li');
      li.textContent = seccion.nombre;
      li.style.padding = '10px';
      li.style.cursor = 'pointer';
      li.style.borderBottom = '1px solid #eee';

      li.addEventListener('mouseover', () => {
        li.style.background = '#fdac00';
        li.style.color = '#fff';
      });
      li.addEventListener('mouseout', () => {
        li.style.background = 'white';
        li.style.color = '#000';
      });

      li.addEventListener('click', () => {
        document.querySelectorAll('.combos, .promociones, .panes, .bebidas, .informacion-arriba, .informacion-abajo').forEach(div => {
          if (div) div.style.display = 'none';
        });

        const mostrar = document.querySelector(`.${seccion.clase}`);
        if (mostrar) mostrar.style.display = 'block';

        if (seccion.clase === 'informacion-arriba') {
            const infoArriba = document.querySelector('.informacion-arriba');
            const infoAbajo  = document.querySelector('.informacion-abajo');
            if (infoArriba) infoArriba.style.display = 'block';
            if (infoAbajo)  infoAbajo.style.display  = 'block';
        }

        sugerencias.innerHTML = '';
        sugerencias.style.display = 'none';
        input.value = '';
      });

      sugerencias.appendChild(li);
    });

    sugerencias.style.display = 'block';
  });

  // ⌨️ Enter para seleccionar primera sugerencia
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && sugerencias.firstChild) {
      sugerencias.firstChild.click();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const btnRegistro = document.getElementById('btn-registro');
  const overlay = document.getElementById('overlay-registro');

  btnRegistro.addEventListener('click', () => {
    overlay.classList.remove('hidden');
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.add('hidden');
  });

  document.getElementById('btn-enviar').addEventListener('click', () => {
    overlay.classList.add('hidden');
  });
});

document.getElementById('btn-enviar').addEventListener('click', () => {
  const nombre = document.getElementById('reg-nombre').value.trim();
  const toast = document.getElementById('registro-toast');
  const titulo = document.getElementById('toast-titulo');
  const mensaje = document.getElementById('toast-mensaje');

  if (nombre === '') {
    alert('Por favor ingresa tu nombre.');
    return;
  }

  titulo.textContent = `¡Felicidades, ${nombre}!`;
  mensaje.textContent = "Ahora eres cliente de nuestra panadería 🍞";

  toast.classList.remove('hidden');

  // Ocultar después de 5 segundos
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 5000);

  // Cierra overlay también
  document.getElementById('overlay-registro').classList.add('hidden');
});

