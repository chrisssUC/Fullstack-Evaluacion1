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



function vaciarCarrito() {

    localStorage.removeItem("carrito");

    location.reload();
}