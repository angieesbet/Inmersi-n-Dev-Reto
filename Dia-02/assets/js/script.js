// Variables para el control de gastos
let listaDeGastos = [];
let totalGastos = 0;
let eliminarConfirmado = false; // Variable para confirmar la eliminación

// Función para agregar gasto
function clickBoton() {
    const nombreGasto = document.getElementById("nombreGasto").value;
    const valorGasto = parseFloat(document.getElementById("valorGasto").value);
    const descripcionGasto = document.getElementById("descripcionGasto").value;

    if (isNaN(valorGasto) || valorGasto <= 0) {
        alert("Por favor ingresa un valor de gasto válido.");
        return;
    }

    // Mostrar modal si el gasto supera los 150$
    if (valorGasto > 150) {
        mostrarModal();
    }

    const gasto = {
        nombre: nombreGasto,
        valor: valorGasto,
        descripcion: descripcionGasto
    };

    listaDeGastos.push(gasto);
    actualizarGastos();
    
    // Limpiar campos automáticamente después de agregar el gasto
    limpiarTodo();
}

// Función para actualizar la lista de gastos y el total
function actualizarGastos() {
    const listaElement = document.getElementById("listaDeGastos");
    listaElement.innerHTML = "";
    totalGastos = 0;

    listaDeGastos.forEach((gasto, index) => {
        totalGastos += gasto.valor;

        const gastoElement = document.createElement("li");
        gastoElement.innerHTML = `
            <strong>${gasto.nombre}</strong> - $${gasto.valor.toFixed(2)} 
            <p>${gasto.descripcion}</p>
            <button onclick="modificarGasto(${index})">Modificar</button>
        `;
        listaElement.appendChild(gastoElement);
    });

    document.getElementById("totalGastos").textContent = totalGastos.toFixed(2);
}

// Función para modificar un gasto
function modificarGasto(index) {
    const nuevoNombre = prompt("Nuevo nombre del gasto:", listaDeGastos[index].nombre);
    const nuevoValor = parseFloat(prompt("Nuevo valor del gasto:", listaDeGastos[index].valor));
    const nuevaDescripcion = prompt("Nueva descripción del gasto:", listaDeGastos[index].descripcion);

    if (!isNaN(nuevoValor) && nuevoValor > 0) {
        listaDeGastos[index].nombre = nuevoNombre;
        listaDeGastos[index].valor = nuevoValor;
        listaDeGastos[index].descripcion = nuevaDescripcion;
        actualizarGastos();
    } else {
        alert("Por favor, ingresa un valor válido.");
    }
}

// Función para limpiar todos los campos del formulario
function limpiarTodo() {
    document.getElementById("nombreGasto").value = "";
    document.getElementById("valorGasto").value = "";
    document.getElementById("descripcionGasto").value = "";
}

// Función para mostrar el modal de confirmación de eliminación de todos los gastos
function eliminarTodosLosGastos() {
    mostrarConfirmModal(); // Mostrar el modal de confirmación
}

// Función para confirmar la eliminación de todos los gastos
function confirmarEliminar() {
    listaDeGastos = []; // Vaciar la lista de gastos
    actualizarGastos();  // Actualizar la vista
    cerrarConfirmModal(); // Cerrar el modal de confirmación
}

// Función para mostrar el modal
function mostrarModal() {
    const modal = document.getElementById("alertModal");
    modal.style.display = "flex";  // Mostrar el modal
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById("alertModal");
    modal.style.display = "none";  // Ocultar el modal
}

// Función para mostrar el modal de confirmación
function mostrarConfirmModal() {
    const confirmModal = document.getElementById("confirmModal");
    confirmModal.style.display = "flex";  // Mostrar el modal de confirmación
}

// Función para cerrar el modal de confirmación
function cerrarConfirmModal() {
    const confirmModal = document.getElementById("confirmModal");
    confirmModal.style.display = "none";  // Ocultar el modal de confirmación
}