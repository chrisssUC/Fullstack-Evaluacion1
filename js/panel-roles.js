let usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

if (!usuarioActual) {
    window.location.href = "login.html";
}

let estados = {
    RECIBIDO: {
        nombre: "Recibido",
        descripcion: "Hemos recibido tu pedido y estamos preparándolo."
    },
    EN_PREPARACION: {
        nombre: "En preparación",
        descripcion: "Tu pedido está siendo preparado en nuestra cocina."
    },
    LISTO_PARA_ENTREGAR: {
        nombre: "Listo para entregar",
        descripcion: "Tu pedido está listo y será enviado por delivery."
    },
    EN_CAMINO: {
        nombre: "En camino",
        descripcion: "Tu pedido está en camino a tu domicilio."
    },
    ENTREGADO: {
        nombre: "Entregado",
        descripcion: "Tu pedido ha sido entregado exitosamente."
    }
};

let pedido = JSON.parse(localStorage.getItem("pedidoDemo")) || {
    id: 1001,
    cliente: "Cesar Garcia",
    productos: "Pastel de choclo y jugo natural",
    total: 11000,
    estado: "RECIBIDO",
    repartidor: ""
};

localStorage.setItem("pedidoDemo", JSON.stringify(pedido));

document.getElementById("titulo-panel").innerHTML =
    "Panel de " + usuarioActual.rol;

document.getElementById("usuario-panel").innerHTML =
    "Usuario: " + usuarioActual.nombre;

document.getElementById("pedido-id").innerHTML = pedido.id;
document.getElementById("pedido-cliente").innerHTML = pedido.cliente;
document.getElementById("pedido-productos").innerHTML = pedido.productos;

function mostrarDireccion(direccion) {
    return direccion.replace(/\d+/g, function(numero) {
        return "<span class=\"numeric-value\">" + numero + "</span>";
    });
}

document.getElementById("pedido-direccion").innerHTML =
    mostrarDireccion(pedido.direccion);
document.getElementById("pedido-total").innerHTML = pedido.total;
document.getElementById("pedido-estado").innerHTML =
    "Estado: " + estados[pedido.estado].nombre;
document.getElementById("pedido-descripcion").innerHTML =
    estados[pedido.estado].descripcion;

document.getElementById("pedido-repartidor").innerHTML = pedido.repartidor == ""
    ? "Repartidor: pendiente de asignación"
    : "Repartidor: " + pedido.repartidor;

function cambiarEstado(nuevoEstado, repartidor) {
    pedido.estado = nuevoEstado;

    if (repartidor) {
        pedido.repartidor = repartidor;
    }

    localStorage.setItem("pedidoDemo", JSON.stringify(pedido));
    location.reload();
}

let acciones = document.getElementById("acciones-pedido");

if (usuarioActual.rol == "Cocinero" && pedido.estado == "RECIBIDO") {
    acciones.innerHTML = "<button onclick=\"cambiarEstado('EN_PREPARACION')\">Iniciar preparación</button>";
}

if (usuarioActual.rol == "Jefe de cocina" && pedido.estado == "RECIBIDO") {
    acciones.innerHTML = "<button onclick=\"cambiarEstado('EN_PREPARACION')\">Priorizar preparación</button>";
}

if (usuarioActual.rol == "Jefe de cocina" && pedido.estado == "EN_PREPARACION") {
    acciones.innerHTML = "<button onclick=\"cambiarEstado('LISTO_PARA_ENTREGAR')\">Marcar listo para entregar</button>";
}

if (usuarioActual.rol == "Repartidor" && pedido.estado == "LISTO_PARA_ENTREGAR") {
    acciones.innerHTML = "<button onclick=\"cambiarEstado('EN_CAMINO', 'Luis Reparto')\">Iniciar entrega</button>";
}

if (usuarioActual.rol == "Repartidor" && pedido.estado == "EN_CAMINO") {
    acciones.innerHTML = "<button onclick=\"cambiarEstado('ENTREGADO', 'Luis Reparto')\">Marcar como entregado</button>";
}

if (usuarioActual.rol == "Cliente" && pedido.estado == "ENTREGADO") {
    acciones.innerHTML = "<p>Califica el servicio cuando recibas tu pedido.</p>";
}

document.getElementById("cerrar-sesion").addEventListener("click", function() {
    localStorage.removeItem("usuarioActual");
    window.location.href = "login.html";
});
