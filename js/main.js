
let carrito = [];
if(localStorage.carrito != null){
    carrito = JSON.parse(localStorage.carrito);
    document.getElementById('actualiza').innerHTML = carrito.length;   
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

datosProducto.push(new Producto('Ginebra', 'Sillon', 70000, 'Madera y pana', 5, '/media/sillon03.png'));
datosProducto.push(new Producto('Pampa', 'Mesa', 35000, 'Madera y melamina', 6, '/media/mesa13.png'));
datosProducto.push(new Producto('Florencia', 'Silla', 10000, 'Hierro y plastico', 7, '/media/silla09.png'));

localStorage.setItem("productos", JSON.stringify(datosProducto));

console.log(datosProducto);

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

function agregarCarrito(nombre){
    let agregar = datosProducto.find(producto => producto.nombre === nombre);
    if (agregar != undefined){
        carrito.push(agregar);
    }else{
        alert("No se pudo agregar");
    }
    localStorage.carrito = JSON.stringify(carrito);
    document.getElementById('actualiza').innerHTML = carrito.length;
}

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
          <button class="btn badge-pill btn-secondary btnColor" onclick="quitardelCarrito(${item.nombre})">Borrar</button>
        </div>
      </div>
    </div>`
    let Total = document.getElementById("total");
    let valorFinal = item.precio;
    totalSuma = totalSuma + valorFinal;
    Total.textContent = `Total: $${totalSuma}`;
});

document.getElementById("carrito").innerHTML = agregados;

function quitardelCarrito(nombre){

    let borrar = document.getElementById(nombre);

    borrar.parentNode.removeChild(borrar);
}

//ordena los productos de manera ascendentes, por precio
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


let nombre = document.getElementById('nombre').value
let edad = document.getElementById('edad').value
let email = document.getElementById('email').value
let password = document.getElementById('password').value

function validaEdad(event){
    let age = event.target.value;
    if (age < 18){
        console.log("Para comprar tiene que ser mayor de edad");
        age = undefined;
        document.getElementById('edad').style.border = "2px solid red";
    } else {
        console.log("Puede comprar");
        document.getElementById('edad').style.border = "2px solid green";
    }
}

function validaPass(e){
    let pass = e.target.value;
    if (pass.length < 6){
        console.log("Su contraseña tiene que contener como mínimo 6 caracteres");
        pass = undefined;
        document.getElementById('password').style.border = "2px solid red";
    } else {
        console.log("Contraseña válida");
        document.getElementById('password').style.border = "2px solid green";
    }
}

document.getElementById('edad').addEventListener('input', validaEdad);
document.getElementById('password').addEventListener('input', validaPass);
//document.getElementById('password').addEventListener('input', validaPass);

function enviar (){
    const formu = {
        'nombre': nombre,
        'edad': edad,
        'email': email,
        'password': password
    };
    console.log(formu);
    console.log(JSON.stringify(formu));
}
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', enviar)