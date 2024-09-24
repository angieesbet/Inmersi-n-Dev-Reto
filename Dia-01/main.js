// Caracteres incluyendo símbolos especiales
const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

// Función para generar la contraseña
function generarContrasena(longitud) {
    let contrasena = '';
    for (let i = 0; i < longitud; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        contrasena += caracteres[randomIndex];
    }
    return contrasena;
}

// Función para validar la fortaleza de la contraseña
function validarContrasena(contrasena) {
    const tieneMayuscula = /[A-Z]/.test(contrasena);
    const tieneMinuscula = /[a-z]/.test(contrasena);
    const tieneNumero = /[0-9]/.test(contrasena);
    const tieneSimbolo = /[!@#$%^&*()]/.test(contrasena);
    const longitud = contrasena.length;

    // Validar contraseña muy fuerte
    if (longitud > 12 && tieneMayuscula && tieneMinuscula && tieneNumero && tieneSimbolo) {
        return { nivel: 'Muy fuerte' };
    }

    // Validar contraseña fuerte
    if (longitud >= 12 && tieneMayuscula && tieneMinuscula && tieneNumero && tieneSimbolo) {
        return { nivel: 'Fuerte', sugerencias: ['Puedes mejorar la fortaleza de tu contraseña con más de 12 caracteres'] };
    }

    // Validar contraseña moderada
    if (longitud >= 8 && longitud <= 11 && ((tieneMayuscula && tieneMinuscula) || (tieneNumero || tieneSimbolo))) {
        return {
            nivel: 'Moderada',
            sugerencias: [
                'Se debe añadir más variedad incluyendo números y símbolos para mayor seguridad.',
                'Intenta aumentar la longitud a 12 caracteres o más.',
                'Evita patrones predecibles como "abcdef" o "12345".'
            ]
        };
    }

    // Validar contraseña débil
    return {
        nivel: 'Débil',
        sugerencias: [
            'La contraseña debe tener al menos 8 caracteres.',
            'Usa una combinación de letras mayúsculas, minúsculas, números y símbolos.',
            'Evita usar contraseñas cortas o comunes.'
        ]
    };
}

document.getElementById('generar').addEventListener('click', function () {
    const cantidad = document.getElementById('cantidad').value;
    const contrasenaGenerada = generarContrasena(cantidad);

    document.getElementById('contrasena').value = contrasenaGenerada;

    const validacion = validarContrasena(contrasenaGenerada);

    // Mostrar el título y nivel de fortaleza de la contraseña en la página
    document.getElementById('mensaje').innerHTML =
        `<span class="titulo">Fortaleza de Contraseña: </span><span class="nivel">${validacion.nivel}</span>`;

    // Mostrar sugerencias si la contraseña es débil o moderada
    const sugerenciasDiv = document.getElementById('sugerencias');
    sugerenciasDiv.innerHTML = '';
    if (validacion.sugerencias.length > 0) {
        const tituloSugerencias = document.createElement('p');
        tituloSugerencias.innerText = 'Sugerencias:';
        sugerenciasDiv.appendChild(tituloSugerencias);

        validacion.sugerencias.forEach(sugerencia => {
            const li = document.createElement('li');
            li.innerText = sugerencia;
            sugerenciasDiv.appendChild(li);
        });
    }
});


// Función para limpiar el campo de la contraseña y los mensajes
document.getElementById('limpiar').addEventListener('click', function () {
    document.getElementById('contrasena').value = '';
    document.getElementById('mensaje').innerText = '';
    document.getElementById('sugerencias').innerHTML = '';
});