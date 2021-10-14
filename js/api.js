//API MercadoPago - implementacion AJAX con jQuery
const dataMP = carrito.map(producto => {
    return {
        "title": producto.nombre,
        "description": producto.genero,
        "picture_url": producto.imagen,
        "category_id": producto.descripcion,
        "quantity": 1,
        "currency_id": "ARS",
        "unit_price": producto.precio,
    }
});

let data = {
    "items": dataMP,
};

const url = "https://api.mercadopago.com/checkout/preferences";
const pago = (opcion)=>{
    let data = opcion;  
    $.ajaxSetup({
        headers: {
            'Authorization': ' Bearer TEST-4692169109702316-093019-03da479ce0be2945870f3c52964852b2-25169801',
            'Content-Type': 'application/json'
        },
    })
    $.post(url,JSON.stringify(data),(respuesta, status) => {
        urlPago = respuesta.init_point
        window.open(`${urlPago}`);
    }) 
}