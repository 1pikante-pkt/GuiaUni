const profesores = [

"Juan Pérez",
"María Gómez",
"Carlos Díaz",
"Ana Rodríguez",
"Pedro Martínez",
"Laura Sánchez",
"José Ramírez",
"Carmen López"

]

let profesorActual=""

const lista = document.getElementById("listaProfesores")

function mostrarProfesores(listaFiltrada){

lista.innerHTML=""

listaFiltrada.forEach(nombre=>{

let div = document.createElement("div")

div.className="profesor"

div.innerText=nombre

div.onclick=()=>seleccionarProfesor(nombre)

lista.appendChild(div)

})

}

mostrarProfesores(profesores)

document.getElementById("buscador").addEventListener("keyup",function(){

let texto = this.value.toLowerCase()

let filtrados = profesores.filter(p=>p.toLowerCase().includes(texto))

mostrarProfesores(filtrados)

})

function seleccionarProfesor(nombre){

profesorActual=nombre

document.getElementById("profesorSeleccionado").innerText="Profesor: "+nombre

cargarComentarios()

}

function agregarComentario(){

let comentario = document.getElementById("comentario").value

let rating = document.getElementById("rating").value

if(profesorActual===""){

alert("Selecciona un profesor primero")

return

}

let data = JSON.parse(localStorage.getItem("comentariosProfesores")) || {}

if(!data[profesorActual]){

data[profesorActual]=[]

}

data[profesorActual].push({

rating:rating,

texto:comentario

})

localStorage.setItem("comentariosProfesores",JSON.stringify(data))

document.getElementById("comentario").value=""

cargarComentarios()

}

function cargarComentarios(){

let data = JSON.parse(localStorage.getItem("comentariosProfesores")) || {}

let contenedor = document.getElementById("comentarios")

contenedor.innerHTML=""

if(!data[profesorActual]){

contenedor.innerHTML="No hay comentarios todavía"

return

}

data[profesorActual].forEach(c=>{

let div = document.createElement("div")

div.className="comentario"

div.innerHTML = `<strong>${c.rating} ⭐</strong><p>${c.texto}</p>`

contenedor.appendChild(div)

})

}