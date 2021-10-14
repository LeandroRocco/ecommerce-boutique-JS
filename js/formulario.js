//Formulario de datos - implementacion jQuery
let nombre = $('nombre').val();
let edad = $('edad').val();
let email = $('email').val();

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
$('#edad').on('input', validaEdad);

function enviar(e){
    e.preventDefault();
    const formu = {
        'nombre': nombre,
        'edad': edad,
        'email': email,
    };
    console.log(formu);
    console.log(JSON.stringify(formu));
}
const miformulario = document.getElementById('formulario');
miformulario.addEventListener('submit', enviar);