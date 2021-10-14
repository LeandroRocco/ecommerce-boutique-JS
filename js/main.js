
let carrito = [];
if(localStorage.carrito != null){
    carrito = JSON.parse(localStorage.carrito);
    document.getElementById('contador-carrito').innerHTML = carrito.length;   
}

class Producto{
    constructor(nombre, genero, precio, descripcion, stock, imagen) {
        this.nombre = nombre;
        this.genero = genero;
        this.precio = parseFloat(precio);
        this.descripcion = descripcion;
        this.stock = stock;
        this.imagen = imagen;
    }
    aplicarDescuento() {
        //descuento de un 10%
        this.precio = this.precio * 0.90;
    }
}
let totalSuma = 0;
const datosProducto = [];

datosProducto.push(new Producto('Ginebra', 'Sillon', 70000, 'Madera y pana', 5, 'https://raw.githubusercontent.com/LeandroRocco/ecommerce-boutique-JS-Rocco/main/media/sillon03.png'));
datosProducto.push(new Producto('Pampa', 'Mesa', 35000, 'Madera y melamina', 6, 'https://raw.githubusercontent.com/LeandroRocco/ecommerce-boutique-JS-Rocco/main/media/mesa13.png'));
datosProducto.push(new Producto('Florencia', 'Silla', 10000, 'Hierro y plastico', 7, 'https://raw.githubusercontent.com/LeandroRocco/ecommerce-boutique-JS-Rocco/main/media/silla09.png'));

localStorage.setItem("productos", JSON.stringify(datosProducto));

console.log(datosProducto);

creaCards();
function creaCards(){
    let acumulador = ``;
    datosProducto.forEach(producto => {
        acumulador += `<div class="card" style="width: 16rem;">
        <img src="${producto.imagen}" class="card-img-top mx-auto"  style="width: 15rem;" alt="...">
        <div class="card-body">
        <h2 class="card-title text-center">${producto.genero} ${producto.nombre}</h2>
        <p class="card-text text-center">Realizado en: ${producto.descripcion}</p>
        <h3 class="card-title text-center">$${producto.precio}</h3>
        </div>
        <div class="card-footer">
        <button class="btn badge-pill btn-secondary btnColor"><a onclick="agregarCarrito('${producto.nombre}')">Agregar</a></button>
        </div>    
        </div>`
    });
    document.getElementById("datosProducto").innerHTML = acumulador;
}


function agregarCarrito(nombre){
    let agregar = datosProducto.find(producto => producto.nombre === nombre);
    if (agregar != undefined){
        carrito.push(agregar);
    }else{
        alert("No se pudo agregar");
    }
    localStorage.carrito = JSON.stringify(carrito);
    document.getElementById('contador-carrito').innerHTML = carrito.length;
}


modalCarrito();
function modalCarrito(){
let agregados = ``;
carrito.forEach(item => {
    agregados += 
    `<div class="row g-0 id="${item.nombre}">
    <div class="col-md-4">
        <img src="${item.imagen}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
        <div class="card-body">
        <h4 class="card-title">${item.genero} ${item.nombre}</h4>
        <h5 class="card-text">$${item.precio}</h5>
        <button class="btn badge-pill btn-secondary btnColor" onclick="quitardelCarrito('${item.nombre}')">Borrar</button>
        </div>
    </div>
    </div>`
    let Total = document.getElementById("total");
    let valorFinal = item.precio;
    totalSuma = totalSuma + valorFinal;
    Total.textContent = `Total: $${totalSuma}`;
});
document.getElementById("carrito").innerHTML = agregados;
}

function quitardelCarrito(nombre){
    const productoEncontrado = carrito.filter(producto => producto.nombre != nombre);
    if (productoEncontrado.length > 0 ){
        carrito =  productoEncontrado
    }else{
        carrito = []
    }
    
    localStorage.carrito = JSON.stringify(carrito);
    document.getElementById("carrito").innerHTML = carrito.length;
    modalCarrito();
    //location.reload();
}

//ordena los productos por precio de manera ascendente
function orden (a, b){
    if (a.precio < b.precio){
        return -1;
    }
    return 0;
}
console.log(datosProducto.sort(orden));

//aplica descuento de 10% al precio de los productos
for (const producto of datosProducto) {
    producto.aplicarDescuento();
}
console.log(datosProducto);