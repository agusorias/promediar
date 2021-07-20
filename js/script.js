var cantNotas = 0;
var notas = 0;
var alumnos = 0;

//GUARDAR CANTIDAD DE NOTAS
function guardarCantNotas (){

    notas = document.getElementById("cantidadNotas");
    sessionStorage.setItem("cantidadDeNotas", notas.value);
    cantNotas = parseInt(notas.value);
    console.log(cantNotas);


    //CREAR COLUMNAS EN TABLA DE RESULTADOS
    for (let i = 0; i < cantNotas; i++) {

        let encabezadoTabla = document.getElementById("primeraCol");
        let nuevaColumna = document.createElement("th");
        nuevaColumna.setAttribute("scope", "col");
        nuevaColumna.innerText = "Nota";
        encabezadoTabla.appendChild(nuevaColumna);
    }

    //Habilitar y deshabilitar inputs de carga de cantidad de alumnos y notas
    alumnos = document.getElementById("cantidadAlumnos");
    alumnos.disabled = false;
    notas.disabled = true;

}


// GUARDAR CANTIDAD DE ALUMNOS A PROMEDIAR
const listaDeAlumnos = [];
var cantAlumnos = 0

function guardarCantAlumnos (){
    sessionStorage.setItem("cantidadDeAlumnos", alumnos.value);
    cantAlumnos = parseInt(alumnos.value);
    console.log(cantAlumnos);
    
    //Se crea un parrafo explicativo sobre lo que hay que completar
    let seccion = document.getElementById("interaccion");
    let parrafoExplicativo = document.createElement("p");
    parrafoExplicativo.setAttribute("class", "parrafo");
    parrafoExplicativo.innerHTML = "1. Ahora debes completar con un nombre o número de referencia de cada uno de los alumnos.";
    seccion.appendChild(parrafoExplicativo);

    //Se crean inputs para nombres o referencias de cada alumno
    for (let i = 0; i < cantAlumnos; i++){
        let nuevoInputNombre = document.createElement("div");
        nuevoInputNombre.setAttribute("id", "nombre"+i);
        nuevoInputNombre.setAttribute("class", "contenedorInputNombre");
        nuevoInputNombre.innerHTML = `"Referencia del alumno" <input type="text" class="form-control" placeholder="Texto/Número" onchange="guardarNombre(this)">`;
        seccion.appendChild(nuevoInputNombre);
    }

    let parrafoExplicativo2 = document.createElement("p");
    parrafoExplicativo2.setAttribute("class", "parrafo2");
    parrafoExplicativo2.innerHTML = "2. Completa las notas de cada alumno de izquierda a derecha. Primero las notas del primer alumno, luego las del segundo; y así sucesivamente."
    seccion.appendChild(parrafoExplicativo2);
}

class Estudiante {
    constructor(referencia){
        this.referencia = referencia;
        this.notas = [];
    }
}

function guardarNombre(entradaNombre){

    listaDeAlumnos.push(new Estudiante (entradaNombre.value))

    entradaNombre.disabled = true;
    let bodytabla = document.getElementById("bodyDeTabla");
    let nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `<th scope="row">${entradaNombre.value}</th>`;
    bodytabla.appendChild(nuevaFila)

        for (let i = 0; i < cantNotas; i++){

            let nuevaCelda = document.createElement("td");
            nuevaCelda.setAttribute("class", "celda");
            nuevaCelda.innerHTML = `<input type="number" class="form-control" placeholder="1" min="1" max="10" onchange="guardarValor(this)">`;
            nuevaFila.appendChild(nuevaCelda);
        };

    console.log(listaDeAlumnos);
}

//Evento para el boton Generar Promedios
var botonFinal = document.getElementById("promediando");
botonFinal.addEventListener("click", promediar);


// FUNCIÓN que guarda el valor del input en un Array para luego promediarlo
const notasIngresadas = [];
function guardarValor(datoInput) {
    notasIngresadas.push(datoInput.value);
    datoInput.disabled = true;
    // console.log(notasIngresadas);
}

// Funcion para promediar las notas
function promediar (){

    // Crear distintos array con las notas de cada alumno
    for (let i = 0; i < cantAlumnos; i++){
        let corte = notasIngresadas.slice(0, cantNotas);
        listaDeAlumnos[i].notas = corte;
        notasIngresadas.splice(0, cantNotas);
    }

    // Crear tabla para mostrar los resultados
    let seccionInteraccion = document.getElementById("interaccion");
    let nuevaTabla = document.createElement("table");
    nuevaTabla.setAttribute("class", "table");
    nuevaTabla.setAttribute("id", "resultados");
    nuevaTabla.innerHTML = `
        <thead class="thead-dark">
            <tr>
                <th scope="col">Referencia</th>
                <th scope="col">Promedio</th>
            </tr>
        </thead>
        <tbody id="resultadosTableBody">
        </tbody>
        `
    ;
    seccionInteraccion.appendChild(nuevaTabla);

    console.log(listaDeAlumnos);

    // Calculando el resultado de la suma de las calificaciones de cada alumno
    for (let i = 0; i < cantAlumnos; i++){
        let arrayConNotas = listaDeAlumnos[i].notas;
        let resultado = 0;
        arrayConNotas.forEach(calificacion => {
            resultado = resultado + parseInt(calificacion)
        });

        // Agregando al HTML los resultados
        let promedio = resultado/cantNotas;
        let tableBody = document.getElementById("resultadosTableBody");
        let nombreConResultado = document.createElement("tr");
        nombreConResultado.innerHTML = `<th scope="row">${listaDeAlumnos[i].referencia}</th><td>${promedio}</td>`;
        listaDeAlumnos[i].promedio = promedio;
        tableBody.appendChild(nombreConResultado);
        
        if ((promedio >= 6 && promedio <= 10) || (promedio >= 60 && promedio <= 100)){
            nombreConResultado.setAttribute("class", "aprobado");
        } else {
            nombreConResultado.setAttribute("class", "desaprobado");
        }

        console.log(resultado/cantNotas);
    }
}