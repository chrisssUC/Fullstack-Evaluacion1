let formulario = document.getElementById("formLogin");

let usuariosDemo = [
    {
        correo: "admin@duoc.cl",
        contrasena: "1234",
        nombre: "Pedro Soto",
        rol: "Administrador",
        destino: "admin.html"
    },
    {
        correo: "cliente@saborcasero.cl",
        contrasena: "1234",
        nombre: "Cesar Garcia",
        rol: "Cliente",
        destino: "panel-roles.html"
    },
    {
        correo: "cocina@saborcasero.cl",
        contrasena: "1234",
        nombre: "Ana Cocina",
        rol: "Cocinero",
        destino: "panel-roles.html"
    },
    {
        correo: "reparto@saborcasero.cl",
        contrasena: "1234",
        nombre: "Luis Reparto",
        rol: "Repartidor",
        destino: "panel-roles.html"
    },
    {
        correo: "jefe@saborcasero.cl",
        contrasena: "1234",
        nombre: "Maria Jefa de Cocina",
        rol: "Jefe de cocina",
        destino: "panel-roles.html"
    }
];

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    let correo = document.getElementById("correo").value.trim();
    let contrasena = document.getElementById("contrasena").value.trim();

    let errorCorreo = document.getElementById("errorCorreo");
    let errorContrasena = document.getElementById("errorContrasena");

    errorCorreo.innerHTML = "";
    errorContrasena.innerHTML = "";


    if (correo == "") {

        errorCorreo.innerHTML = "El correo es obligatorio";
        return;
    }


    if (correo.length > 100) {

        errorCorreo.innerHTML =
            "El correo no puede superar los 100 caracteres";

        return;
    }


    if (
        !correo.endsWith("@duoc.cl") &&
        !correo.endsWith("@profesor.duoc.cl") &&
        !correo.endsWith("@gmail.com") &&
        !correo.endsWith("@saborcasero.cl")
    ) {

        errorCorreo.innerHTML = "Correo no permitido";
        return;
    }


    if (contrasena == "") {

        errorContrasena.innerHTML =
            "La contraseña es obligatoria";

        return;
    }


    if (contrasena.length < 4 || contrasena.length > 10) {

        errorContrasena.innerHTML =
            "La contraseña debe tener entre 4 y 10 caracteres";

        return;
    }


    let usuariosRegistrados =
        JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

    let usuariosDisponibles = usuariosDemo.concat(usuariosRegistrados);

    let usuarioEncontrado = usuariosDisponibles.find(function(usuario) {
        return usuario.correo == correo && usuario.contrasena == contrasena;
    });

    if (!usuarioEncontrado) {
        errorContrasena.innerHTML = "Correo o contraseña incorrectos";
        return;
    }

    localStorage.setItem("usuarioActual", JSON.stringify(usuarioEncontrado));

    alert("Bienvenido " + usuarioEncontrado.nombre);
    window.location.href = usuarioEncontrado.destino;

});