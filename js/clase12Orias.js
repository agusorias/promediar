var cantNotas = 0;

function guardarCantNotas (){

    const notas = document.getElementById("cantidadNotas");
    sessionStorage.setItem("cantidadDeNotas", notas.value);
    cantNotas = parseInt(notas.value);
    console.log(cantNotas);



    for (let i = 0; i < cantNotas; i++) {

        let encabezadoTabla = document.getElementById("primeraCol");
        let nuevaColumna = document.createElement("th");
        nuevaColumna.setAttribute("scope", "col");
        nuevaColumna.innerText = "Nota";
        encabezadoTabla.appendChild(nuevaColumna);
    }

}

const listaDeAlumnos = [];
var cantAlumnos = 0

function guardarCantAlumnos (){
    const alumnos = document.getElementById("cantidadAlumnos");
    sessionStorage.setItem("cantidadDeAlumnos", alumnos.value);
    cantAlumnos = parseInt(alumnos.value);
    console.log(cantAlumnos);

    do{
        let entrada = prompt("Ingresar nombres");
        listaDeAlumnos.push(entrada.toUpperCase());
        let posicionEnLista = parseInt(listaDeAlumnos.length - 1);
        console.log("La posición en la lista de: " + entrada + " es: " + posicionEnLista);

        let bodytabla = document.getElementById("bodyDeTabla");
        let nuevaFila = document.createElement("tr");
        nuevaFila.innerHTML = `<th scope="row">${entrada}</th>`;
        bodytabla.appendChild(nuevaFila)

        //Nueva parte
        for (let i = 0; i < cantNotas; i++){
            let nuevaCelda = document.createElement("td");
            nuevaCelda.setAttribute("class", "celda");
            //nuevaCelda.setAttribute("onchange", "guardarValor(this)");
            nuevaCelda.innerHTML = `<input type="number" class="form-control" placeholder="1" min="1" max="10" onchange="guardarValor(this)">`;
            nuevaFila.appendChild(nuevaCelda);
        }
        //Fin de nueva parte
;

    } while (listaDeAlumnos.length != cantAlumnos)

    console.log(listaDeAlumnos);
}


// var botonFinal = document.getElementById("promediando");
// botonFinal.addEventListener("click", promediar);

//Con JQuery
$("#promediando").click(promediar());


const notasIngresadas = [];

//Funcion que guarda el valor del input para luego promediarlo
function guardarValor(datoInput) {
    notasIngresadas.push(datoInput.value);
    console.log(notasIngresadas);
}

//Funcion para promediar las notas ingresadas en los input pero unicamente de dos alumnos
function promediar (){
    console.log("Promediando");

    //Primer Alumno
    let notasPrimerAlumno = notasIngresadas.slice(0, cantNotas);
    let sumaNotasPrimerAlumno = 0;

    for (const nota of notasPrimerAlumno){
        sumaNotasPrimerAlumno = parseInt(sumaNotasPrimerAlumno)+parseInt(nota);
    }

    let promedioPrimerAlumno = 0;
    promedioPrimerAlumno = sumaNotasPrimerAlumno/parseInt(cantNotas);

    console.log("Las notas del primer alumno son: "+notasPrimerAlumno.join(" "));
    console.log("La suma de las notas del primer alumno es: "+sumaNotasPrimerAlumno);
    console.log("El promedio de las notas del primer alumno es: "+promedioPrimerAlumno);

    //Segundo Alumno
    let notasSegundoAlumno = notasIngresadas.slice(cantNotas, cantNotas+cantNotas);
    let sumaNotasSegundoAlumno = 0;

    for (const nota of notasSegundoAlumno){
        sumaNotasSegundoAlumno = parseInt(sumaNotasSegundoAlumno)+parseInt(nota);
    }

    let promedioSegundoAlumno = 0;
    promedioSegundoAlumno = sumaNotasSegundoAlumno/parseInt(cantNotas);

    console.log("Las notas del segundo alumno son: "+notasSegundoAlumno.join(" "));
    console.log("La suma de las notas del segundo alumno es: "+sumaNotasSegundoAlumno);
    console.log("El promedio de las notas del segundo alumno es: "+promedioSegundoAlumno);
}