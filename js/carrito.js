let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let mostrarCarrito = document.getElementById("carrito");

let total = 0;


for (let i = 0; i < carrito.length; i++) {

    mostrarCarrito.innerHTML += `
        <article>

            <img src="${carrito[i].imagen}"
                 alt="${carrito[i].nombre}">

            <h3>${carrito[i].nombre}</h3>

            <p class="price">Precio: $${carrito[i].precio}</p>

        </article>
    `;

    total = total + carrito[i].precio;
}


document.getElementById("total").innerHTML =
    "Total: $" + total;


function confirmarPedido() {

    if (carrito.length == 0) {
        alert("Agrega al menos un producto antes de confirmar el pedido");
        return;
    }

    let usuarioActual =
        JSON.parse(localStorage.getItem("usuarioActual"));

    if (!usuarioActual) {
        alert("Inicia sesión para confirmar tu pedido");
        window.location.href = "login.html";
        return;
    }

    let pedido = {
        id: Date.now(),
        cliente: usuarioActual.nombre,
        productos: carrito.map(function(producto) {
            return producto.nombre;
        }).join(", "),
        total: total,
        direccion: usuarioActual.direccion || "Ñuñoa, Región Metropolitana",
        estado: "RECIBIDO",
        repartidor: ""
    };

    localStorage.setItem("pedidoDemo", JSON.stringify(pedido));
    localStorage.removeItem("carrito");
    window.location.href = "panel-roles.html";
}


document.getElementById("confirmar-pedido").addEventListener(
    "click",
    confirmarPedido
);



function vaciarCarrito() {

    localStorage.removeItem("carrito");

    location.reload();
}