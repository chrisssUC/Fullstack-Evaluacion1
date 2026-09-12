let productos = [
    {
        nombre: "Pastel de choclo",
        precio: 8500,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRrtvEr2JWCAtL3kugBnZjw9VFP1Gwhp5JBNE8KHrFPQL71mln9ESx3fvcEYjg0yWp4uE1_Em9VRXbsWrq5cMcbwseqpEm1X8jofEHwF6a7A&s=10"
    },

    {
        nombre: "Cazuela de vacuno",
        precio: 9500,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTchMYwRPLip5JuuvmU99dCKnf9FRJkGN5mC_mIOPZ_jA&s=10"
    },

    {
        nombre: "Completo italiano",
        precio: 4500,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa9-5PUCZXGs-I5phMKBXcbNbunKylknKmQFzDbZP0wA&s=10"
    },

    {
        nombre: "Churrasco con palta",
        precio: 6500,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-7oAYRTMXZKOKc0whwS1CZeRjmCn9DGcN7zD1N7qppA&s=10"
    },

    {
        nombre: "Ensalada chilena",
        precio: 3500,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREkAq3Pc6x-DuikKj2IVTq0zEhFPRxAupGmUNcvaQsA3_x5cHNmQ6gPfYvCj7gWS3tycS8ABxZYBODIPlkTUqHnEtNqv1kRM2XOGIEfUfb6Q&s=10"
    },

    {
        nombre: "Jugo natural de frutilla",
        precio: 2500,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkbFEgyJRVaxX8CIEydOKAEcUdu86VoTnuNhvnP-QZOg&s=10"
    }
];


let lista = document.getElementById("lista-productos");


for (let producto of productos) {

    lista.innerHTML += `
        <article>

            <img src="${producto.imagen}"
                 alt="${producto.nombre}"
                 width="200">

            <h3>${producto.nombre}</h3>

            <p class="price">Precio: $${producto.precio}</p>

            <button onclick="agregarCarrito(${productos.indexOf(producto)})">
                Agregar al carrito
            </button>

        </article>
    `;
}
function agregarCarrito(numero) {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push(productos[numero]);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Producto agregado al carrito");
}